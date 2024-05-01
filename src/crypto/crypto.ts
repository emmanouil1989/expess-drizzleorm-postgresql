import express from "express";
const router = express.Router();
import { bodyValidors, idParamValidator } from "./validators";
import { isAuthenticated } from "../middleware";
import {
  createCryptoController,
  deleteCryptoController,
  getAllCryptosController,
  updateCryptoController,
} from "./controller";

router
  .get("/", isAuthenticated, getAllCryptosController)
  .post("/", isAuthenticated, bodyValidors, createCryptoController)
  .delete(
    "/:cryptoId",
    isAuthenticated,
    idParamValidator,
    deleteCryptoController
  )
  .put(
    "/:cryptoId",
    isAuthenticated,
    [...idParamValidator, ...bodyValidors],
    updateCryptoController
  );

export default router;
