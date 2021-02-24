import express from "express";
import {
  getSpecificComments,
  getUsersComments,
  newComment,
  deleteComment,
  getAllComments,
} from "../controllers/commentsController.js";

const router = express.Router();

router.route("/admin/:id").get(getUsersComments);
router.route("/:id").get(getSpecificComments).delete(deleteComment);
router.route("/").post(newComment).get(getAllComments);

export default router;
