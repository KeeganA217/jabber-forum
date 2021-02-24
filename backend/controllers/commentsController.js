import mysql from "mysql";
import { db } from "../config/db.js";
import asyncHandler from "express-async-handler";

const connection = mysql.createConnection(db);

// GET COMMENTS FOR SPECIFIC TOPIC
const getSpecificComments = asyncHandler(async (req, res) => {
  const id = req.params.id;

  let sqlFind = `SELECT comments.comment, comments.date_added, comments.comment_id, topics.topic_id, users.first_name, users.last_name
  FROM comments INNER JOIN topics ON comments.topic_id = topics.topic_id INNER JOIN users ON comments.id = users.id
  WHERE topics.topic_id = ? ORDER BY comments.date_added;`;

  await connection.query(sqlFind, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// POST A NEW COMMENT
const newComment = asyncHandler(async (req, res) => {
  const { comment, topic_id, id } = req.body.comment;

  let sqlFind = `INSERT INTO comments (comment, topic_id, id) VALUES (?, ?, ?);`;

  await connection.query(sqlFind, [comment, topic_id, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// GET A SINGLE USERS COMMEMTS
const getUsersComments = asyncHandler(async (req, res) => {
  const id = req.params.id;

  let sqlFind = `SELECT comment, date_added, topic_id, comment_id FROM comments WHERE id = ?;`;

  await connection.query(sqlFind, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// DELETE A SINGLE COMMENT
const deleteComment = asyncHandler(async (req, res) => {
  const id = req.params.id;

  let sql = `DELETE FROM comments WHERE comment_id = ?;`;

  await connection.query(sql, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// GET ALL COMMENTS
const getAllComments = asyncHandler(async (req, res) => {
  let sql = `SELECT * FROM comments;`;

  await connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

export {
  getSpecificComments,
  newComment,
  getUsersComments,
  deleteComment,
  getAllComments,
};
