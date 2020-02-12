import { Router, Request, Response } from "express";
import talent from "./talent";
import post from "./post";
import comment from "./comment";

const routes = Router();

routes.use("/talent", talent);
routes.use("/post", post);
routes.use("/comment", comment);

export default routes;
