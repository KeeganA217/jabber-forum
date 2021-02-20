import mysql from "mysql";
import express from "express";
import { db } from "../config/db.js";
import bcrypt from "bcrypt";

const router = express.Router();
const connection = mysql.createConnection(db);

// REGISTER A NEW USER

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, password } = req.body.first_name;
  const salt = 10;

  let sqlFind = `SELECT * FROM users WHERE email = ?;`;

  const userExists = await connection.query(sqlFind, email, (err, result) => {
    if (err) {
      console.log(err);
    } else if (result.length !== 0) {
      res.status(400);
      res.send({ message: "This email has already been registered" });
    } else {
      bcrypt.hash(password, salt, (error, hash) => {
        if (error) {
          console.log(error);
        }

        let sqlRegister = `INSERT INTO users (first_name, last_name, email, password) VALUES (?,?,?,?);`;

        connection.query(
          sqlRegister,
          [first_name, last_name, email, hash],
          (err, result) => {
            if (err) {
              res.send(err);
              console.log(err);
            } else {
              res.status(200);
              res.send({
                id: result.insertId,
                first_name: first_name,
                last_name: last_name,
                email: email,
                isAdmin: "0",
                image: null,
              });
            }
          }
        );
      });
    }
  });
});

// LOGIN A USER

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  let sqlFind = `SELECT * FROM users WHERE email = ?;`;

  const userExists = await connection.query(sqlFind, email, (err, result) => {
    if (err) {
      console.log(err);
    } else if (result.length === 0) {
      res.status(400);
      res.send({ message: "User does not exist." });
    } else {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          res.send({
            id: result[0].id,
            first_name: result[0].first_name,
            last_name: result[0].last_name,
            email: result[0].email,
            isAdmin: result[0].isAdmin,
            image: result[0].image,
          });
        } else {
          res.status(400);
          res.send({ message: "Incorrect Email or Password." });
        }
      });
    }
  });
});

// GET A SINGLE USERS DETAILS
router.get("/:id", (req, res) => {
  const id = req.params.id;

  let sqlFind = `SELECT * FROM users WHERE id = ?;`;

  connection.query(sqlFind, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({
        id: result[0].id,
        first_name: result[0].first_name,
        last_name: result[0].last_name,
        email: result[0].email,
        isAdmin: result[0].isAdmin,
        image: result[0].image,
      });
    }
  });
});

export default router;
