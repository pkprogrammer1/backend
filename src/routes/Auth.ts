import { Request, Response, Router, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models";

const router = Router();

interface AuthRequest extends Request {
  user?: { id: string };
}

// Register Route
router.post("/register", async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ success: false, msg: "User already exists" });
      return 
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ success: true, msg: "User created" });
    return 
  } catch (error) {
    console.error("Error in /register:", error);
    res.status(500).json({ success: false, msg: "Internal server error" });
    return 
  }
});

// Login Route
router.post("/login", async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, msg: "Invalid credentials" });
    }

    // Ensure JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ success: false, msg: "JWT secret not configured" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("Error in /login:", error);
    return res.status(500).json({ success: false, msg: "Internal server error" });
  }
});

// Middleware to Verify Token
const verifyToken = (req: AuthRequest, res: Response, next: NextFunction):void => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      res.status(401).json({ success: false, msg: "Access denied" });
      return;
    }

    if (!process.env.JWT_SECRET) {
      res.status(500).json({ success: false, msg: "JWT secret not configured" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ success: false, msg: "Invalid token" });
    return 
  }
};

// Get Profile Route
router.get("/profile", verifyToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, msg: "Unauthorized" });
      return;
    }

    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      res.status(404).json({ success: false, msg: "User not found" });
      return;
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error in /profile:", error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
});

export default router;