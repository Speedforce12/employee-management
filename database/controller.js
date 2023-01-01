import Employees from "../model/employee";

// get all employees
export async function getEmployees(req, res) {
  try {
    const employees = await Employees.find({});
    if (!employees) {
      res.status(404).json({ error: "Data not found" });
    }

    res.status(200).json(employees);
  } catch (error) {
    res.status(404).json({ error: "Error fetching Data" });
  }
}

// create a new user
export async function createEmployee(req, res) {
  try {
    if (!req.body) {
      res.status(404).json({ error: "No data provided" });
    }
    const employee = await Employees.create(req.body);
    res.status(201).json({ success: true, data: employee});
  } catch (error) {
    res.status(401).json({ error: "Error While creating user" });
  }
}

// update an existing user
export async function updateEmployee(req, res) {
  try {
    const { employeeId } = req.query;
    const data = req.body;

    if (data && employeeId) {
      const employee = await Employees.findByIdAndUpdate(employeeId, data);
      res.status(200).json(employee);
    }

    res.status(404).json({ error: "No User selected for Updating" });
  } catch (error) {
    res.status(404).json({ error: "Error while updating Data" });
  }
}

// delete an existing user
export async function deleteEmployee(req, res) {
  try {
    const { employeeId } = req.query;
    if (employeeId) {
      const employee = await Employees.findByIdAndDelete(employeeId);
      return res.status(200).json({ success: "user deleted successfully" });
    }

    res.status(404).json({ error: "No User selected for deleting" });
  } catch (error) {
    res.status(404).json({ error: "Error while deleting User" });
  }
}

export async function getEmployee(req, res) {
  try {
    const { employeeId } = req.query;
    const employee = await Employees.findById(employeeId);
    if (employee) {
      res.status(200).json(employee);
    }
  } catch (error) {
    res.status(404).json({ error: "Error fetching user data" });
  }
}
