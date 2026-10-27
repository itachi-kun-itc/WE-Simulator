(() => {
  const nav = document.querySelector(".bottom-tabs");
  if (!nav) return;
  nav.classList.add("liquid-glass-nav");
  window.setupLiquidGlassSelector(nav, {
    buttonSelector: ".tab",
    lensClass: "liquid-glass-selection",
    isSelected: (button) => button.classList.contains("active"),
    onSync: (buttons, index) => buttons.forEach((button, i) => {
      if (i === index) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    }),
  });
  nav.addEventListener("keydown", (event) => {
    const buttons = [...nav.querySelectorAll(".tab")];
    const index = buttons.indexOf(event.target.closest(".tab"));
    if (index < 0 || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? buttons.length - 1
      : (index + (event.key === "ArrowRight" ? 1 : -1) + buttons.length) % buttons.length;
    buttons[next].focus();
    buttons[next].click();
  });
})();
