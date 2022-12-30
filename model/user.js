import { models, model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: String,
    avatar: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

const Users = models.user || model("user", userSchema);

export default Users;
