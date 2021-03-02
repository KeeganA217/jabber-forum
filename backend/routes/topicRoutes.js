import express from "express";
import {
  getRecentTopics,
  getAllTopics,
  getSingleTopicDetails,
  deleteTopic,
  createTopic,
} from "../controllers/topicsController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/new").get(getRecentTopics);
router.route("/all").get(getAllTopics);
router
  .route("/:id")
  .get(getSingleTopicDetails)
  .delete(protect, admin, deleteTopic);
router.route("/").post(protect, createTopic);

export default router;
