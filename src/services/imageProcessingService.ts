import crypto from "crypto";
import fetch from "node-fetch";
import FormData from "form-data";
import { Readable } from "stream";

const CLOUDINARY_CLOUD_NAME = "dnqx9z6kf";
const CLOUDINARY_API_KEY = "321157237975644";
const CLOUDINARY_API_SECRET = "wEnpLNffHXDHS74tfr01NyTMLtQ"; 
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export async function uploadImageToCloudinary(imageBuffer: Buffer, fileName = "image.jpg"): Promise<any> {
  try {
    const timestamp = Math.floor(Date.now() / 1000);
    const signatureString = `timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;
    const signature = crypto.createHash("sha1").update(signatureString).digest("hex");
    const stream = Readable.from(imageBuffer);

    const formData = new FormData();
    formData.append("file", stream, fileName); 
    formData.append("api_key", CLOUDINARY_API_KEY);
    formData.append("timestamp", timestamp.toString());
    formData.append("signature", signature);

    const response = await fetch(UPLOAD_URL, {
      method: "POST",
      body: formData as any,
      headers: formData.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Upload Fail: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Cloudinary upload fail:", error);
    throw error;
  }
}
