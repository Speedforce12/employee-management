import axios from "axios";


// create base backend URL
const userApi = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_URL}` });


// fetch all users from the server
export const getUsers = async () => {
  const response = await userApi.get("/users");
  const users = await response.data;

  return users;
};


// fetch a single user
export async function getUser(userId) {
  try {
    const response = await userApi.get(`/users/${userId}`);

    const user = await response.data;

    return user;
  } catch (error) {
    return error;
  }
}

// handle creation of a new user
export const createUser = async (data) => {
  try {
    const response = await userApi.post("/users", data);
    const newUser = await response.data;

    return newUser;
  } catch (error) {
    return error;
  }
};

// handle update user
export const updateUser = async (userId, data) => {
  try {
    const response = await userApi.patch(`/users/${userId}`, data);
    const updatedUser = await response.data;

    return updatedUser;
  } catch (error) {
    return error;
  }
}

// delete a user from the database
export async function deleteUser(userId) {
  try {
    const response = await userApi.delete(`/users/${userId}`);
    const updatedUser = await response.data;

    return updatedUser;
  } catch (error) {
    return error;
  }
}
