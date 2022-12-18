import connectMongo from "../../../database/conn";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../../../database/controller";

export default function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );

  // GET users
  const { method } = req;

  switch (method) {
    case "GET":
      getUsers(req, res);
      break;
    case "POST":
      createUser(req, res);
      break;

    case "DELETE":
      deleteUser(req, res);
      break;

    case "PATCH":
      updateUser(req, res);
      break;

    default:
      res.setHeader(
        "Allow",
        ["GET", "POST", "DELETE", "PATCH"],
        "Content-Type",
        "application/json"
      );
      res.status(405).end(`method ${method} Not allowed`);
  }
}
