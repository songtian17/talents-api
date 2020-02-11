import { Router, Request, Response } from "express";
import user from "./user";
import talent from "./talent";
import post from "./post";

const routes = Router();

routes.use("/user", user);
routes.use("/talent", talent);
routes.use("/post", post);

export default routes;
