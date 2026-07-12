"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAdmin = void 0;
const Prisma_1 = __importDefault(require("./lib/Prisma"));
const findAdmin = async (username) => {
    return Prisma_1.default.admin.findUnique({
        where: {
            username,
        },
    });
};
exports.findAdmin = findAdmin;
