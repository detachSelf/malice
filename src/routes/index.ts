import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import testRoutes from "./test.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/test", testRoutes); // Add this line


export default router;




