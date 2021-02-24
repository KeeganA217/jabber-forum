import express from "express";
import {
  getRecentTopics,
  getAllTopics,
  getSingleTopicDetails,
  deleteTopic,
  createTopic,
} from "../controllers/topicsController.js";

const router = express.Router();

router.route("/new").get(getRecentTopics);
router.route("/all").get(getAllTopics);
router.route("/:id").get(getSingleTopicDetails).delete(deleteTopic);
router.route("/").post(createTopic);

export default router;
