import connectMongo from "../../../database/conn";
import { deleteEmployee, getEmployee, updateEmployee } from "../../../database/controller";

export default function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );

  // GET user
  const { method } = req;

  switch (method) {
    case "GET":
      getEmployee(req, res);
      break;

    case "PATCH":
      updateEmployee(req, res);
      break;

    case "DELETE":
      deleteEmployee(req, res);
      break;

    default:
      res.setHeader(
        "Allow",
        ["GET", "DELETE", "PATCH"],
        "Content-Type",
        "application/json"
      );
      res.status(405).end(`method ${method} Not allowed`);
  }
}
