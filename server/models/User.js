import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "restaurant", "customer"], required: true },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", default: null }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
