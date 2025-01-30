import express from "express";
import { addfood, listfood, removefood } from "../controller/FoodController.js";
import multer from "multer";

const foodrouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Route to add food with image upload
foodrouter.post("/add", upload.single("image"), addfood);

// Route to list all foods
foodrouter.get("/list", listfood);

// Route to remove food
foodrouter.post("/remove", removefood);

export default foodrouter;
