const express = require("express");
const userController = require("../controllers/user");

const userRouter = express.Router();

userRouter
  .post("/", (req, resp) => {
    userController.create(req.body, (err, res) => {
      let respObj;
      if (err) {
        respObj = {
          status: "error",
          msg: err.message,
        };
        return resp.status(400).json(respObj);
      }
      respObj = {
        status: "success",
        msg: res,
      };
      resp.status(201).json(respObj);
    });
  })
  .get("/:username", (req, resp, next) => {
    const username = req.params.username;
    if (!username)
      return callback(new Error("Username must be provided"), null);

    userController.get(username, (err, res) => {
      let respObj;
      if (err) {
        respObj = {
          status: "User doesn't exists",
          msg: err.message,
        };
        return resp.status(400).json(respObj);
      }
      respObj = {
        status: "success",
        msg: res,
      };
      resp.status(201).json(respObj);
    });
  });

module.exports = userRouter;
