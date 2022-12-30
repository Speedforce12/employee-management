import axios from "axios";

// create base backend URL
const userApi = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_URL}` });

// fetch all users from the server
export const getEmployees = async () => {
  const response = await userApi.get("/employees");
  const users = await response.data;

  return users;
};

// fetch a single user
export async function getEmployee(userId) {
  try {
    const response = await userApi.get(`/employees/${userId}`);

    const user = await response.data;

    return user;
  } catch (error) {
    return error;
  }
}

// handle creation of a new user
export const createEmployee = async (data) => {
  try {
    const response = await userApi.post("/employees", data);
    const newUser = await response.data;

    return newUser;
  } catch (error) {
    return error;
  }
};

// handle update user
export const updateEmployee = async (userId, data) => {
  try {
    const response = await userApi.patch(`/employees/${userId}`, data);
    const updatedUser = await response.data;

    return updatedUser;
  } catch (error) {
    return error;
  }
};

// delete a user from the database
export const deleteEmployee = async (userId) => {
  try {
    const response = await userApi.delete(`/employees/${userId}`);
    const updatedUser = await response.data;

    return updatedUser;
  } catch (error) {
    return error;
  }
};
