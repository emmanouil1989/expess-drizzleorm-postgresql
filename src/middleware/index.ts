import { Request, Response, NextFunction } from "express";
import { SESSION_TOKEN } from "../users/controller";
import { getUserBySessionToken } from "../users/services";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken = req.cookies[SESSION_TOKEN];
    if (!sessionToken) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    const result = await getUserBySessionToken(sessionToken);

    if (result.length === 0) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    return next();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
