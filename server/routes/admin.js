import express from "express";
const router = express.Router();
import { adminLogin, deleteUser, editUser, getUser, userEdit } from "../controller/adminController.js";
import { verifyToken } from "../middleware/auth.js";

router.post("/adminLogin", adminLogin);
router.get("/getUsers", verifyToken, getUser);
router.get("/user_edit", verifyToken, userEdit);
router.post("/edit_user_post", verifyToken, editUser);
router.post("/delete_user", verifyToken, deleteUser);

export default router;
