import UserModel from "../models/UserModel.js";

const addtoCart = async (req,res) => {
    try {
        let userData = await UserModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        if(!cartData[req.body.ItemId]){
            cartData[req.body.ItemId] = 1
        } else{
            cartData[req.body.ItemId] += 1
        }
        await UserModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"Added to cart"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

const removeFromCart = async (req,res) => {
    try {
        let userData = await UserModel.findById(req.body.userId)
        let cartData = await userData.cartData
        if (cartData[req.body.ItemId] > 0) {
            cartData[req.body.ItemId] -= 1;
        }
        await UserModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"Removed from cart"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}
const getCart = async (req,res) => {
    try {
        let userData = await UserModel.findById(req.body.userId)
        let cartData = await userData.cartData
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }   
}


export {addtoCart,removeFromCart,getCart}