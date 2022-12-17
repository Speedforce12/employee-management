import connectMongo from "../../../database/conn";
import { createUser, getUsers } from "../../../database/controller";

export default function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );

  // GET users
  const { method } = req;

  switch (method) {
    case "GET":
      return getUsers(req, res)
      break;
    case "POST":
      return createUser(req, res)
      break;

    case "DELETE":
      return res.status(200).json({ method });
      break;

    case "PATCH":
      return res.status(200).json({ method });
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

  res.status(200).json({ name: "John Doe" });
}
