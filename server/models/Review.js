import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    customername: { type:String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);
