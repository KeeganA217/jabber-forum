import mysql from "mysql";
import { db } from "../config/db.js";
import asyncHandler from "express-async-handler";

const connection = mysql.createPool(db);

// GET MOST RECENT TOPICS
const getRecentTopics = asyncHandler(async (req, res) => {
  let sqlFind = `SELECT * FROM topics ORDER BY created_on DESC LIMIT 5;`;

  await connection.query(sqlFind, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// GET ALL TOPICS
const getAllTopics = asyncHandler(async (req, res) => {
  let sqlFind = `SELECT * FROM topics ORDER BY title`;

  const topics = await connection.query(sqlFind, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// GET SINGLE TOPIC DETAILS
const getSingleTopicDetails = asyncHandler(async (req, res) => {
  const id = req.params.id;

  let sqlFind = `SELECT topics.topic_id, topics.title, topics.created_on, users.first_name, users.last_name
  FROM topics INNER JOIN users ON topics.id = users.id WHERE topics.topic_id = ?;`;

  await connection.query(sqlFind, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result[0]);
    }
  });
});

// DELETE A SINGLE TOPIC
const deleteTopic = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM topics WHERE topic_id = ?;`;

  await connection.query(sql, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// CREATE NEW TOPIC
const createTopic = asyncHandler(async (req, res) => {
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

export {
  getRecentTopics,
  getAllTopics,
  getSingleTopicDetails,
  deleteTopic,
  createTopic,
};
