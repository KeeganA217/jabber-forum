import mysql from "mysql";
import express from "express";
import { db } from "../config/db.js";

const router = express.Router();
const connection = mysql.createConnection(db);

// GET COMMENTS FOR SPECIFIC TOPIC
router.get("/:id", (req, res) => {
  const id = req.params.id;

  let sqlFind = `SELECT comments.comment, comments.date_added, comments.comment_id, topics.topic_id, users.first_name, users.last_name
  FROM comments INNER JOIN topics ON comments.topic_id = topics.topic_id INNER JOIN users ON comments.id = users.id
  WHERE topics.topic_id = ? ORDER BY comments.date_added;`;

  connection.query(sqlFind, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// POST A NEW COMMENT
router.post("/", (req, res) => {
  const { comment, topic_id, id } = req.body.comment;

  let sqlFind = `INSERT INTO comments (comment, topic_id, id) VALUES (?, ?, ?);`;

  connection.query(sqlFind, [comment, topic_id, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// GET A SINGLE USERS COMMEMTS
router.get("/admin/:id", (req, res) => {
  const id = req.params.id;

  let sqlFind = `SELECT comment, date_added, topic_id, comment_id FROM comments WHERE id = ?;`;

  connection.query(sqlFind, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// DELETE A SINGLE COMMENT
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  let sql = `DELETE FROM comments WHERE comment_id = ?;`;

  connection.query(sql, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

export default router;
