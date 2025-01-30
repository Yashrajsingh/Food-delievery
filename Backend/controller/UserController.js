import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Function to create a JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET); // Token valid for 3 days
};

// Login user
const LoginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);
        res.status(200).json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error during login" });
    }
};


// Register user
const RegisterUser = async (req, res) => {
    const { name, password, email } = req.body;

    try {
        // Check if the user already exists
        const exist = await UserModel.findOne({ email });
        if (exist) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Validate the email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        // Check for strong password
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save the new user
        const newUser = new UserModel({
            name:name,
            email:email,
            password: hashedPassword,
        });

        const user = await newUser.save();

        // Generate a token upon successful registration
        const token = createToken(user._id);

        res.status(201).json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error during registration" });
    }
};

export { LoginUser, RegisterUser };
