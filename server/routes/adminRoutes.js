import express from "express";
import { addRestaurant, getRestaurants, deleteRestaurant ,getUsers,deleteUsers} from "../controllers/adminController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add-restaurant", authMiddleware, addRestaurant);
router.get("/restaurants", authMiddleware, getRestaurants);
router.delete("/restaurant/:id", authMiddleware, deleteRestaurant);
router.get("/users", authMiddleware, getUsers);
router.delete("/user/:id", authMiddleware, deleteUsers);

export default router;
