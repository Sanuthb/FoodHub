import Review from "../models/Review.js";

export const addReview = async (req, res) => {
    const { customername, rating, comment } = req.body;
    try {
        const review = await Review.create({ 
            customername, 
            rating, 
            comment 
        });
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRestaurantReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
