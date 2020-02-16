import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Talent } from "../entity/Talent";

export const setTalentId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let accountId = res.locals.accountId;
  let talentRepository = getRepository(Talent);

  try {
    const talent = await talentRepository.findOneOrFail({
      select: ["id"],
      where: { accountId: accountId }
    });
    res.locals.talentId = talent.id;
  } catch (err) {
    return res.sendStatus(401);
  }

  if (!accountId) {
    return res.sendStatus(401);
  }
  res.locals.accountId = accountId;
  next();
};
