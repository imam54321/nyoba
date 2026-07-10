"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authServices_1 = require("../authServices");
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await (0, authServices_1.findAdmin)(username);
        if (!admin) {
            return res.status(404).json({
                message: "Username tidak ditemukan",
            });
        }
        const valid = await bcrypt_1.default.compare(password, admin.password);
        if (!valid) {
            return res.status(401).json({
                message: "Password salah",
            });
        }
        const token = jsonwebtoken_1.default.sign({
            id: admin.id,
            username: admin.username,
        }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        return res.json({
            message: "Login berhasil",
            token,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Terjadi kesalahan server",
        });
    }
};
exports.login = login;
