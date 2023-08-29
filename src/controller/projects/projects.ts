import { Response, Request } from "express";
import { db } from "../../utils/db";

export const getAllProjects = (req: Request, res: Response) => {
  try {
    const q = "SELECT * FROM  `profile`.projects";
    db.query(q, (err, data) => {
      res.json(data);
    });
  } catch {
    res.status(500).json("Internal server error.");
  }
};
