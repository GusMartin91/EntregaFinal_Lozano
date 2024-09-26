import express from "express";
import cookieParser from "cookie-parser"
import __dirname from "./utils.js";
import { connectMongoDB } from "./config/mongoDB.config.js";
import envs from "./config/envs.config.js";
import passport from 'passport';
import { iniciarPassport } from './config/passport.config.js';
import { UsersRouter } from './routes/usersRouter.js';

const app = express();
const usersRouter = new UsersRouter();
connectMongoDB();

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"))

iniciarPassport()

app.use(passport.initialize())
app.use("/api/users", usersRouter.getRouter());

const httpServer = app.listen(envs.PORT, () => {
    console.log(`Server listening on port: ${envs.PORT}`);
});