import mongoose from "mongoose";

export const ticketModel = mongoose.model(
    "tickets",
    new mongoose.Schema(
        {
            ticketNumber: Number,
            date: Date,
            buyerEmail: String,
            totalAmount: Number,
            details: { type: [] }
        },
        { timestamps: true }
    )
);
