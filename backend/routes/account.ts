import express from "express";
import { User } from "../models/user";
import isAuthenticated from "../middlewares/isAuthenticated";

const aRouter = express.Router();

aRouter.post("/signup", async (req, res, next) => {
  const { username, password } = req.body as {
    username: string;
    password: string;
  };

  if (!username || !password) {
    return res.status(400).send("Username and password are required!");
  }

  try {
    const usernameTaken = await User.findOne({ username });
    if (usernameTaken) {
      return res.status(400).send(`${username} is already taken!`);
    }
    const user = new User({ username, password });
    await user.save();

    req.session.user = username;
    res.send("User saved successfully!");
  } catch (err) {
    next(err);
  }
});

aRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required!");
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).send("User not found!");
    }

    if (user.password !== password) {
      return res.status(401).send("Incorrect password :/");
    }

    req.session.user = username;
    console.log(req.session.user);
    res.send("User login is a success!");
  } catch (err) {
    next(err);
  }
});

aRouter.post("/logout", isAuthenticated, (req, res) => {
  req.session.user = null;
  res.send("User logged out successfully!");
});

aRouter.get("/userstatus", async (req, res) => {
  if (
    req.session.user === null ||
    req.session.user === "" ||
    req.session.user === undefined
  ) {
    res.send("Logged out");
  } else {
    res.send(req.session.user);
  }
});

export default aRouter;
