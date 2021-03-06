import { Request, Response } from "express";
import { getRepository, Like } from "typeorm";

import { Talent } from "../entity/Talent";

class TalentController {
  static listAll = async (req: Request, res: Response) => {
    // get talents from database
    const talentRepository = getRepository(Talent);
    const talents = await talentRepository.find();
    res.send(talents);
  };

  static searchAll = async (req: Request, res: Response) => {
    // get username search from query string
    const username: string = req.query.username.toLowerCase();

    const talentRepository = getRepository(Talent);
    if (username) {
      try {
        const talent = await talentRepository.find({
          where: { username: Like(`%${username}%`) }
        });
        res.send(talent);
        return;
      } catch (err) {
        res.status(404).send("No talents found");
      }
    }
  };

  static getOneByUsername = async (req: Request, res: Response) => {
    // get lowercase username from url
    const username: string = req.params.username.toLowerCase();
    console.log(username);

    // get talent from db
    const talentRepository = getRepository(Talent);
    try {
      const talent = await talentRepository.findOneOrFail({
        where: { username }
      });
      res.send(talent);
    } catch (err) {
      res.status(404).send("Talent not found");
    }
  };

  static getOneById = async (req: Request, res: Response) => {
    // get id from url
    const id: number = Number(req.params.id);

    // get talent from db
    const talentRepository = getRepository(Talent);
    try {
      const talent = await talentRepository.findOneOrFail(id);
      res.send(talent);
    } catch (err) {
      res.status(404).send("Talent not found");
    }
  };

  static newTalent = async (req: Request, res: Response) => {
    // get params from body
    let { name, username, profileImageUri, bio, accountId } = req.body;
    let talent = new Talent();
    talent.name = name;
    talent.username = username.toLowerCase();
    talent.profileImageUri = profileImageUri;
    talent.bio = bio;
    talent.accountId = accountId;
    talent.isSubscribed = false;

    const talentRepository = getRepository(Talent);
    try {
      await talentRepository.save(talent);
    } catch (err) {
      res.status(500).send(err);
    }

    res.status(201).send("Talent created");
  };

  static editTalent = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
    const authenticatedTalentId = res.locals.talentId;

    const { name, username, profileImageUri, bio, isSubscribed } = req.body;

    const talentRepository = getRepository(Talent);
    let talent: Talent;
    try {
      talent = await talentRepository.findOneOrFail(id);
      if (authenticatedTalentId != talent.id) {
        return res.sendStatus(403);
      }
    } catch (err) {
      res.status(404).send("Talent not found");
    }

    talent.name = name;
    talent.username = username ? username.toLowerCase() : undefined;
    talent.profileImageUri = profileImageUri;
    talent.bio = bio;
    talent.isSubscribed = isSubscribed;

    try {
      await talentRepository.save(talent);
    } catch (err) {
      res.status(500).send(err);
    }

    res.status(200).send("Talent updated");
  };

  static deleteTalent = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);

    const talentRepository = getRepository(Talent);
    let talent: Talent;

    try {
      talent = await talentRepository.findOneOrFail(id);
    } catch (err) {
      res.status(404).send("Talent not found");
    }
    talentRepository.delete(id);

    res.status(200).send("Talent deleted");
  };
}

export default TalentController;
