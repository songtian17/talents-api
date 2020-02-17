import { Request, Response, NextFunction } from "express";
import { getAccountIdFromToken } from "../aws";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let authHeader = req.header("Authorization");
  let token = authHeader.split(" ")[1];
  let accountId = await getAccountIdFromToken(token);
  console.log("accountId:", accountId);
  if (!accountId) {
    res.sendStatus(401);
    return;
  }
  res.locals.accountId = accountId;
  next();
};
