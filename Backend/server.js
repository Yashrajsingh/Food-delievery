import express from "express";
import cors from "cors";
import { connectdb } from "./config/db.js";
import foodrouter from "./routes/FoodRoute.js";
import UserRouter from "./routes/UserRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// App config
const app = express();
const port = process.env.PORT || 4000; // Use the port from .env or default to 4000

// Middlewares
app.use(express.json()); // For parsing JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing

// DB connection
connectdb();

// Serve static files (images directory)
app.use("/images", express.static("uploads"));
//
//
// API endpoints
app.use("/api/food", foodrouter);
app.use("/api/user", UserRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter)

// Root endpoint
app.get("/", (req, res) => {
    res.send("API WORKING");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is started on http://localhost:${port}`);
});
