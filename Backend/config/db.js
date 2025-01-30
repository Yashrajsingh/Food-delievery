import mongoose from "mongoose";

export const connectdb = async () => {
    await mongoose
    .connect(`mongodb+srv://yashrajsingh:2550100150@cluster0.zsp6f.mongodb.net/fooddel`)
    
    .then(() => console.log("DB connected"))
}