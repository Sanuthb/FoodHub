import express from "express";
import { addMenuItem, getallmenu,getMenu, deleteMenu } from "../controllers/restaurantController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add-menu", authMiddleware, addMenuItem);
router.get("/get-menu/:id",authMiddleware,getMenu);
router.delete("/deletemenu/:id",authMiddleware,deleteMenu);
router.get("/menu", getallmenu);

export default router;
