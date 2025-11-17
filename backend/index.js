import express from "express";
import cors from "cors";
import imageRouter from "./router/imageRouter.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploaded-images", express.static(path.join(__dirname, "uploaded-images")));

app.get("/health", (req, res) => {
    res.send("OK");
});

app.use("/api/image", imageRouter);

app.listen(PORT, () => {
    console.log("Server is running on port" + PORT);
});