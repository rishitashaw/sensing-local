import User from "../models/userModel.js";
import generateToken from "../config/generateToken.js";
import asyncHandler from "express-async-handler";

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, age } = req.body;

    if (!name || !email || !password || !age) {
        res.status(400);
        throw new Error("Please Enter all the Feilds");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        age
    });

    if (user) {

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            age: user.age,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
            visits: user.visits
        });
    } else {
        res.status(400);
        throw new Error("User not found");
    }
});

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            age: user.age,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
            visits: user.visits
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});

export { registerUser, authUser };
