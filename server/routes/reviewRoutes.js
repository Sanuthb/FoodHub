import express from "express";
import { addReview, getRestaurantReviews } from "../controllers/reviewController.js";

const router = express.Router();

router.post("/add-review", addReview);
router.get("/restaurant-reviews", getRestaurantReviews);

export default router;
