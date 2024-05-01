import { Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  createCrypto,
  deleteCrypto,
  getAllCryptos,
  getCryptoByid,
  updateCrypto,
} from "./services";
import { BodyRequest, RequestParams } from "./types";

export const createCryptoController = async (
  req: Request<{}, BodyRequest>,
  res: Response
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, price, symbol, iconUrl } = req.body;

    const crypto = await createCrypto({ name, price, symbol, iconUrl });

    res.status(201).json({ crypto: crypto[0] });
  } catch (error: any) {
    if (error.code === "23505") {
      return res.status(400).json({ error: "This record already exists!" });
    }
    console.log(error);

    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllCryptosController = async (req: Request, res: Response) => {
  try {
    const allCyrptos = await getAllCryptos();
    res.json({ allCyrptos });
  } catch (error: any) {
    console.log(error);

    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateCryptoController = async (
  req: Request<RequestParams, BodyRequest>,
  res: Response
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, price, symbol, iconUrl } = req.body;
    const resourceId = parseInt(req.params.cryptoId);

    const existingResource = await getCryptoByid(resourceId);

    if (existingResource && existingResource.length === 0) {
      return res.status(404).json("This resource does not exist");
    }

    const updatedResource = await updateCrypto(resourceId, {
      name,
      price,
      symbol,
      iconUrl,
    });

    res.status(200).json({ updatedResource });
  } catch (error: any) {
    if (error.code === "23505") {
      return res.status(400).json({ error: "This record already exists!" });
    }
    console.log(error);

    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCryptoController = async (
  req: Request<RequestParams>,
  res: Response
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const resourceId = parseInt(req.params.cryptoId);

  try {
    const record = await getCryptoByid(resourceId);

    if (record.length === 0) {
      res.status(404).json({ error: "Resource not found" });
    }

    await deleteCrypto(resourceId);

    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
