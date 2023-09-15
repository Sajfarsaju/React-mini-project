import express from "express";
import { getDetails, LoginPost, Register, userEdit, userProfile } from "../controller/usersController.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/register", Register);
router.post("/login", LoginPost);
router.get("/getDetails", verifyToken, getDetails);
router.get("/user_profile", verifyToken, userProfile);
router.post("/user_edit", verifyToken, userEdit);

export default router;
