const { generateKeyPairSync } = require("node:crypto");

const { publicKey, privateKey } = generateKeyPairSync("ec", {
  namedCurve: "prime256v1",
});

const publicJwk = publicKey.export({ format: "jwk" });
const privateJwk = privateKey.export({ format: "jwk" });
const publicRaw = `04${base64UrlToHex(publicJwk.x)}${base64UrlToHex(publicJwk.y)}`;

console.log(`VAPID_PUBLIC_KEY=${hexToBase64Url(publicRaw)}`);
console.log(`VAPID_PRIVATE_KEY=${privateJwk.d}`);

function base64UrlToHex(value) {
  return Buffer.from(value.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("hex");
}

function hexToBase64Url(value) {
  return Buffer.from(value, "hex").toString("base64url");
}
