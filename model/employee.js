import { models, model, Schema } from "mongoose";

const employeeSchema = new Schema(
  {
    name: String,
    avatar: String,
    email: String,
    address: String,
    birth: String,
    joined: String,
    department: String,
    status: String,
    contact: String,
    medicals: String,
    qualifications: String,
    teacher: String,
    successes: String,
  },
  { timestamps: true }
);

const Employees = models.employee || model("employee", employeeSchema);

export default Employees;
