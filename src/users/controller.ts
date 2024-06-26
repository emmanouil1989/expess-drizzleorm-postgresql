import { Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  createUser,
  getUserByEmail,
  updateByUserId,
  getUsers,
  getUserBySessionToken,
  getUserById,
} from "./services";
import { authentication, random } from "./util";
import moment from "moment-timezone";

export const SESSION_TOKEN = "MY-SESSION-TOKEN";
const DOMAIN = "localhost";

export const register = async (
  req: Request<{}, { username: string; email: string; password: string }>,
  res: Response
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, username, password } = req.body;

    const response = await getUserByEmail(email);

    if (response.length > 0) {
      return res
        .status(400)
        .json({ error: `A user with ${email} exists already.` });
    }

    const salt = random();
    const user = await createUser({
      username,
      email,
      salt,
      password: authentication(salt, password),
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (
  req: Request<{}, { email: string; password: string }>,
  res: Response
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const response = await getUserByEmail(email);

    if (response.length === 0) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    const user = response[0];

    const expectedHash = authentication(user.salt, password);
    if (expectedHash !== user.password) {
      return res
        .status(403)
        .json({ error: "There is a problem with email or password" });
    }

    user.sessionToken = authentication(random(), user.password);

    const updateduserList = await updateByUserId(user.id, {
      ...user,
    });
    const expirationTime = moment().add(1, "day").tz("Europe/London").toDate();
    res.cookie(SESSION_TOKEN, user.sessionToken, {
      domain: DOMAIN,
      path: "/",
      expires: expirationTime,
      httpOnly: true,
    });
    res.status(200).json({
      user: updateduserList[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUser = await getUsers();
    res.status(200).json({
      users: allUser,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const sessionToken = req.cookies[SESSION_TOKEN];
    if (sessionToken === undefined) {
      return res.status(200).json({ msg: "Logout successfullly" });
    }

    const userArray = await getUserBySessionToken(sessionToken);

    if (userArray.length === 0) {
      return res.status(200).json({ msg: "Logout successfullly" });
    }
    const userBySessionToken = userArray[0];
    const newUser = {
      ...userBySessionToken,
      sessionToken: null,
    };
    await updateByUserId(userBySessionToken.id, newUser);
    res.clearCookie(SESSION_TOKEN);

    res.status(200).json({ msg: "Logout successfullly" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const userById = async (req: Request, res: Response) => {
  try {
    const resourceId = parseInt(req.params.userId);
    const user = await getUserById(resourceId);

    if (!user) {
      res.status(404).json({ error: "User not Found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const userBySessionToken = async (req: Request, res: Response) => {
  try {
    const sessionToken = req.cookies[SESSION_TOKEN];
    const userList = await getUserBySessionToken(sessionToken);

    const { id, email, username } = userList[0];
    res.status(200).json({
      user: {
        id,
        email,
        username,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
