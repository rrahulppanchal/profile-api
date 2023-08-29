import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import validate from "./middleware/validateResource";
import { createUserSchema } from "./schema/user.schema";
import { loginUserSchema, registerUserSchema } from "./schema/users.schema";
import { loginUser, registerUser } from "./controller/users.controll";
import { authorization } from "./middleware/authorizationResources";
import { getAllProjects } from "./controller/projects/projects";

function routes(app: Express) {
  app.get("/api", authorization, (req: Request, res: Response) => {
    res.status(200).json("hello from api");
  });
  app.post("/api/users", validate(createUserSchema), createUserHandler);
  app.post("/register/user", validate(registerUserSchema), registerUser);
  app.post("/login/user", validate(loginUserSchema), loginUser);

  app.get("/api/projects", authorization, getAllProjects);
}

export default routes;
