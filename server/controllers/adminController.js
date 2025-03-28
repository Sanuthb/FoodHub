import User from "../models/User.js";
import Restaurant from "../models/Restaurant.js";
import bcrypt from "bcryptjs";

// ✅ Add Restaurant & Auto-Generate Password (without Email)
export const addRestaurant = async (req, res) => {
    const { name, location, ownerEmail, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create Restaurant
        const restaurant = await Restaurant.create({ name, location, ownerEmail });

        // Create Restaurant User
        await User.create({
            name,
            email: ownerEmail,
            password: hashedPassword,
            role: "restaurant",
            restaurantId: restaurant._id
        });

        res.status(201).json({ 
            message: "Restaurant added successfully!", 
            credentials: { email: ownerEmail, password } // ✅ Return Credentials in Response
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Get All Restaurants
export const getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Delete Restaurant
export const deleteRestaurant = async (req, res) => {
    try {
        await Restaurant.findByIdAndDelete(req.params.id);
        res.json({ message: "Restaurant deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteUsers = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};