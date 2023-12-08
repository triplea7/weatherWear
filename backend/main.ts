import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import aRouter from "./routes/account";

const app = express();
app.use(express.json());
app.use(
  cookieSession({
    name: "session",
    keys: ["triplea"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
