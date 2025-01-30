import orderModel from "../models/OrderModel.js";
import UserModel from "../models/UserModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order for frontend
const placeOrder = async (req, res) => {
    const frontend_url = process.env.FRONTEND_URL || "http://localhost:5173";

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });

        await newOrder.save();
        await UserModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Stripe line items configuration
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "usd", // Payment in USD
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 // Convert dollars to cents
            },
            quantity: item.quantity
        }));

        // Add delivery charge
        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 200 // $2 delivery charge in cents
            },
            quantity: 1
        });

        // Create Stripe session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error("Stripe Payment Error:", error);
        res.json({ success: false, message: "Error processing payment" });
    }
};

const verifyOrder = async (req,res) => {
    const {orderId,success} = req.body
    try {
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            res.json({success:true,message:"Paid"})
        } else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false,message:"not paid"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

// user orders for frontend
const userOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

// Listing orders for admin panel
const listOrders = async(req,res) => {
    try {
        const orders = await orderModel.find({})
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export { placeOrder, verifyOrder,userOrders,listOrders };
