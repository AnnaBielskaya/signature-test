import express from "express";  
import * as dotenv from "dotenv";
import * as crypto from "crypto";
import uploadRouter from "./routes/imageProcessingRoutes";
import generateSignature from "./routes/generateSignature"


dotenv.config();

const app = express();
app.use(express.json());


app.use('/api/', uploadRouter);
app.use('/api/', generateSignature);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
