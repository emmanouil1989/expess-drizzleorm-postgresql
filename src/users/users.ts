import express from "express";
import { loginBodyValidator, registerBodyValidators } from "./validators";
import { register, login, getAllUsers, logout } from "./controller";
import { isAuthenticated } from "../middleware";

const router = express.Router();

router.post("/register", registerBodyValidators, register);
router.post("/login", loginBodyValidator, login);
router.get("/users", isAuthenticated, getAllUsers);
router.post("/logout", logout);
export default router;
