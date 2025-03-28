import multer from 'multer';
import path from 'path';
import Menu from "../models/Menu.js";
import Order from "../models/Order.js";

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/images'); // Directory where images will be stored
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const fileName = `${Date.now()}-${file.fieldname}${fileExtension}`;
    cb(null, fileName); // Unique filename
  }
});

// Initialize multer with storage configuration
const upload = multer({ storage: storage });

// Route for adding menu item
export const addMenuItem = [
  upload.single('image'),  // This will process the file uploaded under the 'image' field
  async (req, res) => {
    const { name, price, cuisine } = req.body;
    console.log(name, price, cuisine);

    try {
      const image = req.file ? `/uploads/images/${req.file.filename}` : null;

      const menuItem = await Menu.create({
        restaurantId: req.user.restaurantId,
        name,
        price,
        cuisine,
        image,
      });

      res.status(201).json(menuItem);
    } catch (error) {
      console.error('Error adding menu item:', error); // Log the error for better debugging
      res.status(500).json({ message: error.message });
    }
  }
];

export const getallmenu = async (req, res) => {
  try {
    const allmenu = await Menu.find()
    res.json(allmenu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getMenu = async (req, res) => {
  const restaurantId = req.params.id;
  try {
    const menu = await Menu.find({ restaurantId });
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMenu = async (req, res) => {
    try {
        await Menu.findByIdAndDelete(req.params.id);
        res.json({ message: "Menu deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};