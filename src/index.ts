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
app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/crypto", cryptoRouter);
app.use("/auth", userRouter);

app.get("/", (_, res) => {
  res.send("hi");
});

app.get("/heaven", (_, res) => {
  res.json("motherfucker");
});

app.listen(port, () => {
  console.log("you are listening to port 4000");
});
