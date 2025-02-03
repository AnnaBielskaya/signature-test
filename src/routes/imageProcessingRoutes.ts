import express, { Request, Response } from "express";
import multer from "multer";
import { uploadToCloudinary } from "../services/imageProcessingService";

const router = express.Router();
const upload = multer(); // Default multer setup (can be customized)

router.post('/test-image', upload.single('file'), async (req: Request, res: Response): Promise<void> => {
  // Check if file is missing
  if (!req.file) {
    res.status(404).json({ error: "File is missing" });
    return;
  }

  try {
    const cloudinaryData = await uploadToCloudinary(req.file.buffer, req.file.originalname);

    if (!cloudinaryData.secure_url) {
      res.status(500).json({ error: "Cloudinary upload failed", details: cloudinaryData });
      return;
    }

    res.status(200).json({ message: "Upload successful", url: cloudinaryData.secure_url });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload image", details: error });
  }
});

export default router;
