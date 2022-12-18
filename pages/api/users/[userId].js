import connectMongo from "../../../database/conn";
import { getUser } from "../../../database/controller";

export default function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );

  // GET user
  const { method } = req;

  switch (method) {
    case "GET":
      getUser(req, res);
      break;

    default:
      res.setHeader(
        "Allow",
        ["GET"],
        "Content-Type",
        "application/json"
      );
      res.status(405).end(`method ${method} Not allowed`);
  }
}
