import { db } from "../utils/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = (req: any, res: any) => {
  try {
    const q = "SELECT * FROM `profile`.users WHERE email = ? OR username = ?";
    db.query(q, [req.body.email, req.body.username], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("User already exists!");

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const q =
        "INSERT INTO `profile`.users(`username`,`email`,`password`) VALUES (?)";
      const values = [req.body.username, req.body.email, hash];

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("User has been created.");
      });
    });
  } catch {
    res.status(500).json("Internal server error.");
  }
};

export const loginUser = (req: any, res: any) => {
  try {
    const q = "SELECT * FROM `profile`.users";
    db.query(q, (err, data) => {
      const { username, password } = req.body;

      const user = data.find((u: any) => u.username === username);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Compare password hash
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.status(500).json({ error: "Internal server error" });
        }

        if (result) {
          // Generate JWT token
          const token = jwt.sign({ id: user.id }, "your_secret_key");

          return res
            .cookie("access_token", token, {
              httpOnly: true,
            })
            .json({
              token,
              id: user.id,
              username: user.username,
              email: user.email,
            });
        }

        return res.status(401).json({ error: "Invalid password" });
      });
    });
  } catch {
    res.status(500).json("Internal server error.");
  }
};
