import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    ownerEmail: { type: String, required: true, unique: true }
}, { timestamps: true });

export default mongoose.models.Restaurant || mongoose.model("Restaurant", RestaurantSchema);
