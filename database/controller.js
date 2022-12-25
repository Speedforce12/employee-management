import Users from "../model/user";

// get all users
export async function getUsers(req, res) {
  try {
    const users = await Users.find({});
    if (!users) {
      res.status(404).json({ error: "Data not found" });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: "Error fetching Data" });
  }
}

// create a new user
export async function createUser(req, res) {
  try {
    if (!req.body) {
      res.status(404).json({ error: "No data provided" });
    }
    const user = await Users.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(401).json({ error: "Error While creating user" });
  }
}

// update an existing user
export async function updateUser(req, res) {
  try {
    const { userId } = req.query;
    const data = req.body;

    if (data && userId) {
      const user = await Users.findByIdAndUpdate(userId, data);
      res.status(200).json(user);
    }

    res.status(404).json({ error: "No User selected for Updating" });
  } catch (error) {
    res.status(404).json({ error: "Error while updating Data" });
  }
}

// delete an existing user
export async function deleteUser(req, res) {
  try {
    const { userId } = req.query;
    if (userId) {
      const user = await Users.findByIdAndDelete(userId);
      return res.status(200).json({ success: "user deleted successfully" });
    }

    res.status(404).json({ error: "No User selected for deleting" });
  } catch (error) {
    res.status(404).json({ error: "Error while deleting User" });
  }
}

export async function getUser(req, res) {
  try {
    const { userId } = req.query;
    const user = await Users.findById(userId);
    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(404).json({ error: "Error fetching user data" });
  }
}
