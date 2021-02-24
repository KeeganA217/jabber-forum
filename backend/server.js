import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import colors from "colors";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import topicRoutes from "./routes/topicRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/comments", commentRoutes);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const __dirname = path.resolve();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
