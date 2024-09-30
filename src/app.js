import express from "express";
import cookieParser from "cookie-parser"
import __dirname from "./utils.js";
import { MongoDB } from "./config/mongoDB.config.js";
import { config } from "./config/envs.config.js";
import passport from 'passport';
import { iniciarPassport } from './config/passport.config.js';
import { UserRouter } from './routes/userRouter.js';
import { ProductRouter } from './routes/productRouter.js';
import { CartRouter } from './routes/cartRouter.js';

const app = express();
const userRouter = new UserRouter();
const productRouter = new ProductRouter();
const cartRouter = new CartRouter();

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"))

iniciarPassport()

app.use(passport.initialize())
app.use("/api/sessions", userRouter.getRouter());
app.use('/api/products', productRouter.getRouter());
app.use('/api/carts', cartRouter.getRouter());

const httpServer = app.listen(config.PORT, () => {
    console.log(`Server listening on port: ${config.PORT}`);
});

await MongoDB.connect(config.MONGO_URL, config.MONGO_DB);