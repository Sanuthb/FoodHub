import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    paymentId: { type: String, required: true },
    planType: { type: String, enum: ["Basic", "Standard"], required: true }, // ✅ Plan Type
    expiryDate: { type: Date, required: true }, // ✅ Subscription Expiry Date
  },
  { timestamps: true }
);

// Function to determine plan type and expiry date
PaymentSchema.pre("save", function (next) {
  if (this.amount === 299) {
    this.planType = "Basic";
    this.expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
  } else if (this.amount === 2999) {
    this.planType = "Standard";
    this.expiryDate = new Date();
    this.expiryDate.setMonth(this.expiryDate.getMonth() + 1); // 1 month from now
  } else {
    return next(new Error("Invalid amount. Cannot determine plan type."));
  }

  next();
});

export default mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);
