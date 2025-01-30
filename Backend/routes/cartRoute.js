import express from "express"
import authMiddleware from "../middleware/auth.js"
import { addtoCart,removeFromCart, getCart } from "../controller/cartController.js"

const cartRouter = express.Router()

cartRouter.post("/add",authMiddleware,  addtoCart)
cartRouter.post("/remove",authMiddleware, removeFromCart)
cartRouter.post("/get",authMiddleware, getCart)

export default cartRouter
