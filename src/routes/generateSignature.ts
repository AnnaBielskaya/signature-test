
import express, { Request, Response } from "express";
import * as crypto from "crypto";

const router = express.Router();

const CLOUDINARY_CLOUD_NAME = "dnqx9z6kf";
const CLOUDINARY_API_KEY = "321157237975644";
const CLOUDINARY_API_SECRET = "wEnpLNffHXDHS74tfr01NyTMLtQ";
const UPLOAD_PRESET = "ml_default";

router.post("/sign-cloudinary", (req, res) => {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const paramsToSign = `timestamp=${timestamp}&upload_preset=${UPLOAD_PRESET}`;

    const signature = generateSignature(paramsToSign, CLOUDINARY_API_SECRET);

    console.log(signature);

    res.json({ timestamp, signature, api_key: CLOUDINARY_API_KEY });
});


function generateSignature(params: string, secret: string): string {
    return crypto.createHmac("sha1", secret).update(params).digest("hex");
}

export default router;
