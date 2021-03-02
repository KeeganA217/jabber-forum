import express from "express";
import {
  getSpecificComments,
  getUsersComments,
  newComment,
  deleteComment,
  getAllComments,
} from "../controllers/commentsController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/admin/:id").get(protect, getUsersComments);
router
  .route("/:id")
  .get(getSpecificComments)
  .delete(protect, admin, deleteComment);
router.route("/").post(protect, newComment).get(protect, admin, getAllComments);

export default router;
