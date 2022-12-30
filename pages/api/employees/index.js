import connectMongo from "../../../database/conn";
import { createEmployee, getEmployees } from "../../../database/controller";

export default function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );

  // GET users
  const { method } = req;

  switch (method) {
    case "GET":
      getEmployees(req, res);
      break;
    case "POST":
      createEmployee(req, res);
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
