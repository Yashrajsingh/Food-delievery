import foodmodel from "../models/FoodModel.js";
import fs from "fs";

const addfood = async (req, res) => {
    try {
        // Use a default value or directly access `req.file.filename` if the file exists
        const image_url = req.file?.filename || "default.jpg"; // Fallback to "default.jpg" if no file uploaded

        // Create a new food document
        const food = new foodmodel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            Image: image_url, // Save the filename or fallback value
        });

        // Save to the database
        await food.save();

        res.status(201).json({ success: true, message: "Food added successfully", data: food });
    } catch (error) {
        console.error("Error while adding food:", error);
        res.status(500).json({ success: false, message: "An error occurred while adding the food" });
    }
};



// Get all food items
const listfood = async (req, res) => {
    try {
        const foods = await foodmodel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Remove food item
const removefood = async (req, res) => {
    try {
        const food = await foodmodel.findById(req.body.id);
        fs.unlink(`uploads/${food.Image}`, () => {})

        await foodmodel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { addfood, listfood, removefood };
