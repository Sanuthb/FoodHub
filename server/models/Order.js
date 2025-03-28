import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
    items: [
      {
        menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: "Menu", required: true },
        quantity: { type: Number, required: true }
      }
    ],
    totalPrice: { type: Number, required: true },
    address: { type: String, required: true }, // ✅ Added address field
    status: { type: String, enum: ["Pending", "Paid", "Delivered"], default: "Pending" }
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
