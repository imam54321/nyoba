import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findAdmin } from "../authServices";

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const admin = await findAdmin(username);

    if (!admin) {
      return res.status(404).json({
        message: "Username tidak ditemukan",
      });
    }

    const valid = await bcrypt.compare(password, admin.password);

    if (!valid) {
      return res.status(401).json({
        message: "Password salah",
      });
    }

    const token = jwt.sign(
      {
        id: admin.id,
        username: admin.username,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    return res.json({
      message: "Login berhasil",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Terjadi kesalahan server",
    });
  }
};