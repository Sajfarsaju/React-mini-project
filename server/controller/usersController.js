import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateAuthToken, verifyToken } from "../middleware/auth.js";
import userModel from "../models/userSchema.js";

export const Register = async (req, res, next) => {
    try {
        let userDetails = req.body;
        const user = await userModel.find({ email: userDetails.email });
        if (user.length === 0) {
            console.log(444);
            userDetails.password = await bcrypt.hash(userDetails.password, 10);
            userModel
                .create({
                    name: userDetails.name,
                    email: userDetails.email.toLowerCase(),
                    phone: userDetails.phone,
                    password: userDetails.password,
                })
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {
                    console.log(error);
                });

            res.json({ status: true, result: userDetails });
        } else {
            return res.json({ error: true });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const LoginPost = async (req, res, next) => {
    let userSignUp = {
        Status: false,
        message: null,
        token: null,
        name: null,
    };
    try {
        const userDetails = req.body;
        const findUser = await userModel.findOne({ email: userDetails.email });
        if (findUser) {
            const isMatch = await bcrypt.compare(userDetails.password, findUser.password);
            if (isMatch === true) {
                const token = generateAuthToken(findUser);
                const name = findUser.name;
                userSignUp.message = "You are logged";
                userSignUp.Status = true;
                userSignUp.token = token;
                userSignUp.name = findUser.name;

                const obj = {
                    token,
                    name,
                };

                res.cookie("jwt", obj, {
                    httpOnly: false,
                    maxAge: 6000 * 1000,
                })
                    .status(200)
                    .send({ userSignUp });
            } else {
                userSignUp.message = " Password is wrong";
                userSignUp.Status = false;
                res.send({ userSignUp });
            }
        } else {
            userSignUp.message = "your Email wrong";
            userSignUp.Status = false;
            res.send({ userSignUp });
        }
    } catch (error) {
        res.json({ status: "failed", message: error.message });
    }
};

export const getDetails = async (req, res, next) => {
    console.log(req.user, "id");
    try {
        const user = await userModel.findById(req.user._id);
        console.log(user);

        res.json({
            name: user.name,
            email: user.email,
            phone: user.phone,
            image: user.image || null,
        });
    } catch (error) {
        res.json({ status: "failed", message: error.message });
    }
};

export const userProfile = async (req, res, next) => {
    try {
        const id = req.user;
        console.log(req.user);
        console.log(id, 1111);
        let userDetails = await userModel.findOne({ _id: id._id });

        if (userDetails) {
            res.status(200).json({ data: userDetails });
        } else {
            res.status(500).send({ error: "no user" });
        }
    } catch (error) {
        res.json({ status: "failed", message: error.message });
    }
};

export const userEdit = async (req, res, next) => {
    const data = req.body;
    const id = req.user._id;
    try {
        await userModel.updateOne({ _id: id }, { $set: { name: data.name, phone: data.phone, image: data.photo } });
        res.json({ status: "success" });
    } catch (error) {
        console.log(error.message);
        res.json({ status: "failed", message: error.message });
    }
};
