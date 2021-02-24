import express from "express";
import {
  deleteUser,
  getSingleUser,
  listAllUsers,
  loginUser,
  registerUser,
  updateUserProfile,
  updateUser,
} from "../controllers/usersController.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/:id").delete(deleteUser).get(getSingleUser).put(updateUser);
router.route("/profile").put(updateUserProfile);
router.route("/").get(listAllUsers);

export default router;
