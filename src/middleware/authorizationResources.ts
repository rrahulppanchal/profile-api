import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authorization = (req: any, res: any, next: any) => {
  try {
    const headerToken = req.headers.authorization;
    if (!headerToken || !headerToken.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }
    const token = headerToken.split(" ")[1];
    jwt.verify(token, "your_secret_key", (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }
      req.user = decoded;
      next();
    });
  } catch {
    res.status(500).json("Internal server error.");
  }
};
