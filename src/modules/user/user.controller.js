import { User } from "../../models/user.model.js";
import { hashPassword } from "../../utils/hashPassword.js";
export const addUser = async (req, res) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }
    if (req.body.password) {
      req.body.password = await hashPassword(req.body.password);
    }

    let data = new User(req.body);
    await data.save();

    const { password, ...dataWithoutPassword } = data._doc;
    res.status(201).json({ message: "success", data: dataWithoutPassword });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    let data = await User.find().select("-password");
    res.status(200).json({ message: "success", data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const getOneUser = async (req, res) => {
  try {
    let { id } = req.params;
    let data = await User.findById(id).select("-password");

    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "success", data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    let { id } = req.params;
    const { name, email } = req.body;

    // if (req.body.password) {
    //   req.body.password = hashPassword(req.body.password);
    // }

    let data = await User.findByIdAndUpdate(
      id,
      { name, email },
      {
        returnDocument: "after",
        projection: { password: 0 },
      },
    );

    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "success", data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    let { id } = req.params;

    let data = await User.findByIdAndDelete(id);

    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};
