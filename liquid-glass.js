// One spring and gesture model for the bottom menu and learning categories.
(() => {
  const controllers = new WeakMap();
  window.setupLiquidGlassSelector = (container, options) => {
    if (!container || controllers.has(container)) return controllers.get(container);
    const buttons = [...container.querySelectorAll(options.buttonSelector)];
    if (!buttons.length) return;
    const lens = document.createElement("div");
    lens.className = options.lensClass;
    lens.setAttribute("aria-hidden", "true");
    container.prepend(lens);
    container.classList.add("glass-selector-ready");
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    let bounds = [], rect, position = 0, target = 0, velocity = 0, frame = 0, lastTime = 0;
    let pointer = null, suppressedPointer = null, suppressionTimer;
    let wheelDistance = 0, lastWheel = 0, lastWheelCommit = -Infinity;

    const selectedIndex = () => Math.max(0, buttons.findIndex(options.isSelected));
    const draw = (stretch = 1) => {
      lens.style.transform = `translate3d(${position}px, 0, 0) scaleX(${stretch})`;
    };
    const tick = (time) => {
      const dt = Math.min((time - lastTime) / 1000 || 1 / 60, 1 / 30);
      lastTime = time;
      if (pointer?.dragged) {
        // Touch tracking must reach the latest finger position in one frame.
        // Keep the spring for release and programmatic selection only.
        const travel = target - position;
        position = target;
        velocity = 0;
        draw(reducedMotion.matches ? 1 : 1 + Math.min(Math.abs(travel) / dt / 12000, 0.13));
        frame = 0;
        return;
      }
      velocity += ((target - position) * 340 - velocity * 30) * dt;
      position += velocity * dt;
      draw(1 + Math.min(Math.abs(velocity) / 12000, 0.13));
      if (Math.abs(target - position) > 0.08 || Math.abs(velocity) > 0.2) {
        frame = requestAnimationFrame(tick);
      } else {
        position = target;
        velocity = 0;
        frame = 0;
        draw();
      }
    };
    const moveTo = (x, immediate = false) => {
      target = x;
      if (immediate || reducedMotion.matches) {
        cancelAnimationFrame(frame);
        frame = 0;
        velocity = 0;
        position = target;
        draw();
      } else if (!frame) {
        lastTime = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };
    const sync = (immediate = false) => {
      const index = selectedIndex();
      options.onSync?.(buttons, index);
      if (!pointer && bounds[index]) moveTo(bounds[index].left, immediate);
    };
    const measure = (immediate = true) => {
      rect = container.getBoundingClientRect();
      // A hidden learning page is measured when it becomes visible.
      if (!rect.width || !buttons[0].offsetWidth) return;
      bounds = buttons.map((button) => ({ left: button.offsetLeft, width: button.offsetWidth }));
      lens.style.width = `${bounds[0].width}px`;
      sync(immediate);
    };
    const nearest = (clientX) => {
      const x = clientX - rect.left - container.clientLeft;
      return bounds.reduce((best, item, i) =>
        Math.abs(item.left + item.width / 2 - x)
          < Math.abs(bounds[best].left + bounds[best].width / 2 - x) ? i : best, 0);
    };
    const activate = (index) => {
      if (!buttons[index]?.disabled && index !== selectedIndex()) buttons[index].click();
      // Let existing navigation guards decide whether selection is accepted.
      sync();
    };
    const suppressNativeClick = (id) => {
      suppressedPointer = id;
      clearTimeout(suppressionTimer);
      suppressionTimer = setTimeout(() => { suppressedPointer = null; }, 700);
    };
    const finish = (event, cancelled = false) => {
      if (!pointer || pointer.id !== event.pointerId) return;
      const gesture = pointer;
      pointer = null;
      container.classList.remove("glass-pressed", "glass-dragging");
      if (container.hasPointerCapture(event.pointerId)) container.releasePointerCapture(event.pointerId);
      if (gesture.dragged) {
        suppressNativeClick(event.pointerId);
        const inside = event.clientY >= rect.top - 24 && event.clientY <= rect.bottom + 24;
        if (!cancelled && inside) {
          const distance = event.clientX - gesture.x;
          // A few pixels of tap jitter can start visual tracking and retarget
          // the native click to the container. Still commit the pressed button.
          let index = Math.abs(distance) <= 10 ? gesture.index : nearest(event.clientX);
          const speed = distance / Math.max(1, event.timeStamp - gesture.time);
          if (index === gesture.index && Math.abs(distance) > 20 && Math.abs(speed) > 0.35) {
            index = Math.max(0, Math.min(buttons.length - 1, index + Math.sign(distance)));
          }
          activate(index);
        }
      }
      sync();
    };
    container.addEventListener("pointerdown", (event) => {
      const button = event.target.closest(options.buttonSelector);
      if (!event.isPrimary || event.button !== 0 || button?.disabled || pointer) return;
      clearTimeout(suppressionTimer);
      suppressedPointer = null;
      measure(false);
      if (!bounds.length) return;
      const index = button ? buttons.indexOf(button) : nearest(event.clientX);
      if (index < 0 || buttons[index].disabled) return;
      pointer = { id: event.pointerId, x: event.clientX, y: event.clientY,
        time: event.timeStamp, index, dragged: false,
        grabOffset: event.clientX - rect.left - container.clientLeft - bounds[index].left };
      container.classList.add("glass-pressed");
      moveTo(bounds[index].left);
    });
    container.addEventListener("pointermove", (event) => {
      if (!pointer || pointer.id !== event.pointerId) return;
      const dx = event.clientX - pointer.x, dy = event.clientY - pointer.y;
      if (!pointer.dragged && Math.abs(dy) > 7 && Math.abs(dy) >= Math.abs(dx)) {
        // Keep vertical scrolling native; it must never become a menu tap.
        suppressNativeClick(event.pointerId);
        finish(event, true);
        return;
      }
      if (!pointer.dragged && Math.abs(dx) > 3 && Math.abs(dx) > Math.abs(dy)) {
        pointer.dragged = true;
        container.setPointerCapture(event.pointerId);
        container.classList.add("glass-dragging");
      }
      if (pointer.dragged) {
        // Preserve where the finger grabbed the segment instead of jumping
        // the segment's centre underneath an off-centre touch.
        const x = event.clientX - rect.left - container.clientLeft - pointer.grabOffset;
        moveTo(Math.max(bounds[0].left, Math.min(bounds.at(-1).left, x)));
      }
    });
    container.addEventListener("pointerup", (event) => finish(event));
    container.addEventListener("pointercancel", (event) => finish(event, true));
    container.addEventListener("lostpointercapture", (event) => {
      // Implicit touch capture on a child button is lost when this container
      // takes over a drag. Its bubbling event is a handoff, not cancellation.
      if (event.target === container && !container.hasPointerCapture(event.pointerId)) {
        finish(event, true);
      }
    });
    container.addEventListener("pointerleave", (event) => {
      if (pointer && !pointer.dragged) finish(event, true);
    });
    container.addEventListener("click", (event) => {
      if (event.isTrusted && event.detail !== 0 && suppressedPointer !== null
        && (event.pointerId === undefined || event.pointerId === suppressedPointer)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        suppressedPointer = null;
      }
    }, true);
    container.addEventListener("wheel", (event) => {
      if (event.ctrlKey || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      const now = performance.now();
      if (now - lastWheel > 180) wheelDistance = 0;
      lastWheel = now;
      wheelDistance += event.deltaX * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? rect.width : 1);
      if (Math.abs(wheelDistance) >= 48 && now - lastWheelCommit > 240) {
        activate(Math.max(0, Math.min(buttons.length - 1, selectedIndex() + Math.sign(wheelDistance))));
        wheelDistance = 0;
        lastWheelCommit = now;
      }
    }, { passive: false });
    new ResizeObserver(() => measure()).observe(container);
    new MutationObserver(() => sync()).observe(container, {
      attributes: true, attributeFilter: ["class", "aria-selected"], subtree: true,
    });
    reducedMotion.addEventListener("change", () => sync(true));
    document.fonts?.ready.then(() => measure());
    const controller = { sync, measure };
    controllers.set(container, controller);
    measure();
    return controller;
  };
})();
