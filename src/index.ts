import express from "express";
import cryptoRouter from "./crypto/crypto";
import userRouter from "./users/users";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import "dotenv/config";

const app = express();

const port = process.env.PORT || 4000;
// Get domain from env or use angular localhost
const domain = process.env.DOMAIN || "http://localhost:4200";
app.use(cors({ origin: domain, credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/crypto", cryptoRouter);
app.use("/auth", userRouter);

app.listen(port, () => {
  console.log("you are listening to port 4000");
});
