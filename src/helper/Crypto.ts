import CryptoJS from "crypto-js";

export interface EncryptedResult {
  data: string;
  iv: string;
}
export const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY;

export const encryptBase64 = (
  base64Str: string,
  secretKeyHex: string = SECRET_KEY
): EncryptedResult => {
  const key = CryptoJS.enc.Hex.parse(secretKeyHex);
  const iv = CryptoJS.lib.WordArray.random(16);

  const encrypted = CryptoJS.AES.encrypt(base64Str, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return {
    data: encrypted.ciphertext.toString(CryptoJS.enc.Hex), // hex
    iv: iv.toString(CryptoJS.enc.Hex),
  };
};

export const decryptBase64 = (
  encryptedHex: string,
  ivHex: string,
  secretKeyHex: string = SECRET_KEY
): string | null => {
  try {
    const key = CryptoJS.enc.Hex.parse(secretKeyHex);
    const iv = CryptoJS.enc.Hex.parse(ivHex);
    const ciphertext = CryptoJS.enc.Hex.parse(encryptedHex);

    const cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext });

    const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
};
