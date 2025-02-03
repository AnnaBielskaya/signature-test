import crypto from "crypto";
import fetch from "node-fetch";
import FormData from "form-data";

type CloudinaryResponse = {
  secure_url?: string;
  [key: string]: any;
};

const CLOUDINARY_CLOUD_NAME = "dnqx9z6kf";
const CLOUDINARY_API_KEY = "321157237975644";
const CLOUDINARY_API_SECRET = "wEnpLNffHXDHS74tfr01NyTMLtQ";
const UPLOAD_PRESET = "ml_default";

async function generateSignature(params: string, secret: string): Promise<string> {
  return crypto.createHmac("sha1", secret).update(params).digest("hex");
}

export async function uploadToCloudinary(fileBuffer: Buffer, fileName: string): Promise<CloudinaryResponse> {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const paramsToSign = `timestamp=${timestamp}&upload_preset=${UPLOAD_PRESET}`;
  const signature = await generateSignature(paramsToSign, CLOUDINARY_API_SECRET);

  const formData = new FormData();
  formData.append("file", fileBuffer, fileName);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("api_key", CLOUDINARY_API_KEY);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);

  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
  const response = await fetch(cloudinaryUrl, { method: "POST", body: formData });
  return new Response(JSON.stringify({data : response}));
}