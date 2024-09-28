import mongoose from "mongoose";

export const productModel = mongoose.model(
    "products",
    new mongoose.Schema(
        {
            title: { type: String, required: true },
            code: { type: String, required: true, unique: true },
            price: { type: Number, required: true },
            stock: { type: Number, required: true },
        },
        {
            timestamps: true, strict: false
        }
    )
)