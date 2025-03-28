import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    cuisine: { type: String, required: true },
    image: { type: String, required: true } 
}, { timestamps: true });

export default mongoose.models.Menu || mongoose.model("Menu", MenuSchema);
