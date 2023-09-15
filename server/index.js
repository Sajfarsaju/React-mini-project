import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import morgan from "morgan";
import path from "path";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(morgan("dev"));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.static("public"));
app.use(cookieParser());

import adminRouter from "./routes/admin.js";
import userRouter from "./routes/users.js";

app.use("/admin", adminRouter);
app.use("/", userRouter);

const PORT = 4001;
mongoose
    .connect('mongodb://127.0.0.1:27017/react-auth', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    })
    .catch((error) => console.log(`${error} did not connect`));
