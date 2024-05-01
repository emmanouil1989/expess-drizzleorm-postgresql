import crypto from "crypto";
import "dotenv/config";

export const authentication = (salt: string, password: string) => {
  if (process.env.SECRET === undefined) {
    throw new Error("There is something wrong with authentication");
  }
  return crypto
    .createHmac("sha256", [salt, password].join("-"))
    .update(process.env.SECRET)
    .digest("hex");
};

export const random = () => crypto.randomBytes(128).toString("base64");
