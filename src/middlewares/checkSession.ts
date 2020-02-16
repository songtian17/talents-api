import { Request, Response, NextFunction } from "express";
import { getAccountIdFromToken } from "../aws";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.header("Authorization").split(" ")[1];
  let accountId = getAccountIdFromToken(token);
  if (!accountId) {
    return res.sendStatus(401);
  }
  res.locals.accountId = accountId;
  next();
};
