import mysql from "mysql";
import express from "express";
import { db } from "../config/db.js";

const router = express.Router();
const connection = mysql.createConnection(db);

// GET A SINGLE USERS DETAILS
router.get("/", (req, res) => {
  let sqlFind = `SELECT * FROM topics ORDER BY created_on DESC LIMIT 5;`;

  connection.query(sqlFind, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

export default router;
