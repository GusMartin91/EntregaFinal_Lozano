import mongoose from "mongoose";

export const ticketModel = mongoose.model(
    "tickets",
    new mongoose.Schema(
        {
            ticketNumber: String,
            date: Date,
            buyerEmail: String,
            totalAmount: Number,
            details: { type: [] }
        },
        { timestamps: true }
    )
);
