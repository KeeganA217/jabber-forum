import express from "express";
import {
  deleteUser,
  getSingleUser,
  listAllUsers,
  loginUser,
  registerUser,
  updateOwnProfile,
  updateUser,
} from "../controllers/usersController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router
  .route("/:id")
  .delete(protect, deleteUser)
  .get(protect, getSingleUser)
  .put(protect, admin, updateUser);
router.route("/profile/:id").put(protect, updateOwnProfile);
router.route("/").get(protect, admin, listAllUsers);

export default router;
