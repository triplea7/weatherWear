import mongoose from "mongoose";

const { Schema, model } = mongoose;

export const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.index({ username: 1 }, { unique: true });

export const User = model("User", userSchema);
