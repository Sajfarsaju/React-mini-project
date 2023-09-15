import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import adminModel from "../models/adminSchema.js";
import { adminToken, generateAuthToken } from "../middleware/auth.js";
import userModel from "../models/userSchema.js";
import mongoose from "mongoose";

export const adminLogin = async (req, res, next) => {
    try {
        let adminResult = {
            Status: false,
            message: null,
            token: null,
        };
        let adminDetails = req.body;
        const admin = await adminModel.findOne({ email: adminDetails.email });
        if (admin) {
            if (admin.password === adminDetails.password) {
                const token = adminToken(admin);
                adminResult.Status = true;
                adminResult.token = token;
                res.json({ adminResult });
            } else {
                adminResult.message = "Your Password not matched";
                res.json({ adminResult });
            }
        } else {
            adminResult.message = "Your email is wrong";
            res.json({ adminResult });
        }
    } catch (error) {
        console.log(error);
    }
};

export const isAdminAuth = async (req, res, next) => {
    try {
        const admin = await adminModel.findById(req.adminId);
        console.log(req.adminId);
        const adminDetails = { email: admin.email };
        res.json({ auth: true, result: adminDetails, status: "success", message: "signIn success" });
    } catch (error) {
        console.log(error);
        res.json({ status: "failed", message: error.message });
    }
};

export const editUser = async (req, res, next) => {
    try {
        let userDetails = req.body;
        console.log(req.body, 232);
        const id = req.body.id;
        await userModel.updateOne({ _id: id }, { $set: { name: userDetails.name, phone: userDetails.phone } });
        res.json({ status: "success" });
    } catch (error) {
        console.log(error.message);
        res.json({ status: "failed", message: error.message });
    }
};

export const getUser = async (req, res, next) => {
    try {
        const users = await userModel.find({});
        res.json({ status: "success", result: users });
    } catch (error) {
        res.json({ status: "failed", message: error.message });
    }
};

export const userEdit = async (req, res, next) => {
    try {
        const id = req.query.id;
        const findUser = await userModel.findById(id);
        res.json({ result: findUser });
    } catch (error) {
        console.log(error);
    }
};

export const blockUser = async (req, res, next) => {
    try {
        await userModel.findByIdAndUpdate(id, { isBanned: true });
        const users = await userModel.find({});
        res.json({ status: "success", result: users });
    } catch (error) {
        res.json({ status: "failed", message: error.message });
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        await userModel.deleteOne({ _id: req.body.id });
        const users = await userModel.find({});
        res.json({ status: "success", result: users });
    } catch (error) {
        res.json({ status: "failed", message: error.message });
        console.log(error);
    }
};
