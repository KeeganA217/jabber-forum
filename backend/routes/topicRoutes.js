import mysql from "mysql";
import express from "express";
import { db } from "../config/db.js";

const router = express.Router();
const connection = mysql.createConnection(db);

// GET MOST RECENT TOPICS
router.get("/new", (req, res) => {
  let sqlFind = `SELECT * FROM topics ORDER BY created_on DESC LIMIT 5;`;

  connection.query(sqlFind, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// GET ALL TOPICS
router.get("/all", (req, res) => {
  let sqlFind = `SELECT * FROM topics ORDER BY title`;

  connection.query(sqlFind, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// CREATE NEW TOPIC
router.post("/", async (req, res) => {
  const { title, id } = req.body.title;

  let sqlFind = `SELECT * FROM topics WHERE title = ?;`;

  const topicExists = await connection.query(sqlFind, title, (err, result) => {
    if (err) {
      console.log(err);
    } else if (result.length !== 0) {
      res.status(400);
      res.send({ message: "This topic has already been created." });
    } else {
      let sqlRegister = `INSERT INTO topics (title, id) VALUES (?,?);`;

      connection.query(sqlRegister, [title, id], (err, result) => {
        if (err) {
          res.send(err);
          console.log(err);
        } else {
          res.status(200);
          res.send(result);
        }
      });
    }
  });
});

export default router;
