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
      await Users.findByIdAndUpdate(userId, data);
      res.status(200).json(data);
    }

    res.status(404).json({ error: "No User selected for Updating" });
  } catch (error) {
    res.status(404).json({ error: "Error while updating Data" });
  }
}
