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
    const data = req.body;
    if (!data) {
      res.status(404).json({ error: "No data provided" });
    }
    Users.create(data, function (err, data) {
      res.status(200).json(data);
    });
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
      return res.status(200).json({success:"user deleted successfully"});
    }

    res.status(404).json({ error: "No User selected for deleting" });
  } catch (error) {
    res.status(404).json({ error: "Error while deleting User" });
  }
}

export async function getUser(req, res) {
  try {
    const { userId } = req.query;
    if (userId) {
      const user = await Users.findById(userId);
      res.status(200).json(user);
    }
    res.status(404).json({ error: "User Not selected" });
  } catch (error) {
    res.status(404).json({ error: "Error fetching user data" });
  }
}
