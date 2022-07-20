const User = require("../models/user");
const { ObjectId } = require("mongodb");
const { auth } = require("../middleware/firebaseConfig");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}).lean();

    const transformedUsers = users.map((c) => {
      return {
        id: c._id,
        name: c.name,
        email: c.email,
        role: c.role,
      };
    });

    return res.status(200).json({
      message: "Retrieved Users",
      users: transformedUsers,
    });
  } catch (err) {
    console.log(`Error in getUsers => ${err.message}`);
    return res.status(500).json({ message: "Error in getUsers " });
  }
};

exports.getUser = async (req, res) => {
  try {
    let user = await User.findOne({
      _id: req.params.id,
    }).lean();

    let transformedUser = {
      id: user._id,
      ...user,
    };
    delete transformedUser._id;
    console.log("User Retrieved :=========> ", transformedUser);
    return res.status(200).json({
      message: "Got user successfully!",
      user: transformedUser,
    });
  } catch (err) {
    console.log(`Error finding user => ${err.message}`);
    return res.status(500).json({ message: "Error finding user " });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { name, password, email, phone, dob, gender } = req.body;

    if (!name || !password || !email) {
      return res.status(400).send({ message: "Missing fields" });
    }

    const { uid } = await auth.createUser({
      displayName: name,
      password,
      email,
    });

    try {
      const user = await User.create({
        _id: uid,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        dob: req.body.dob,
        gender: req.body.gender,
      });

      console.log("User created successfully!", user);
      return res.status(200).json({ message: "User added successfully!" });
    } catch (err) {
      console.log("Error while adding user :=======> ", err);
      return res.status(500).json({ message: err.message });
    }
  } catch (err) {
    console.log("Error while creating user :=======> ", err);
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
  }
};

exports.editUser = async (req, res) => {
  try {
    const { id, name, email, phone, role } = req.body;

    await auth.updateUser(id, {
      displayName: name,
      email,
      phoneNumber: "+91" + phone,
    });
    await auth.setCustomUserClaims(id, { role });

    try {
      await User.updateOne(
        { _id: req.body.id },
        {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          role: req.body.role,
        }
      );

      return res.status(200).json({ message: "User updated successfully!" });
    } catch (err) {
      console.log("Error while updating user :============> ", err);
      res
        .status(500)
        .json({ message: `Error while updating user :============> ${err}` });
    }
  } catch (error) {
    console.log("Error while updating user :=======> ", error);
    return res
      .status(500)
      .send({ message: `${error.code} - ${error.message}` });
  }
};

exports.createSuperAdmin = async (req, res) => {
  const { uid } = await auth.createUser({
    displayName: "Himanshu Borole",
    password: "Himanshu@123",
    email: "himanshu.borole@gmail.com",
    phoneNumber: "+918446628681",
  });
  await auth.setCustomUserClaims(uid, { role: "superAdmin" });

  await User.create({
    _id: uid,
    name: "Himanshu Borole",
    email: "himanshu.borole@gmail.com",
    phone: "+918446628681",
    role: "superadmin",
  });

  return res.status(200).json({ message: "User created successfully!" });
};
