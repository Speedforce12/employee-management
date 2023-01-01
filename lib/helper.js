import axios from "axios";

// create base backend URL
const employeeApi = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_URL}` });

// fetch all users from the server
export const getEmployees = async () => {
  const response = await employeeApi.get("/employees");
  const users = await response.data;

  return users;
};

// fetch a single user
export async function getEmployee(employeeId) {
  try {
    const response = await employeeApi.get(`/employees/${employeeId}`);

    const user = await response.data;

    return user;
  } catch (error) {
    return error;
  }
}

// handle creation of a new user
export const createEmployee = async (data) => {
  try {
    const response = await employeeApi.post("/employees", data);
    const newUser = await response.data;

    return newUser;
  } catch (error) {
    return error;
  }
};

// handle update user
export const updateEmployee = async (employeeId, data) => {
  try {
    const response = await employeeApi.patch(`/employees/${employeeId}`, data);
    const updatedUser = await response.data;

    return updatedUser;
  } catch (error) {
    return error;
  }
};

// delete a user from the database
export const deleteEmployee = async (employeeId) => {
  try {
    const response = await employeeApi.delete(`/employees/${employeeId}`);
    const deletedUser = await response.data;

    return deletedUser;
  } catch (error) {
    return error;
  }
};
