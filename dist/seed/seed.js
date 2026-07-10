"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    const hash = await bcrypt_1.default.hash("admin123", 10);
    await prisma.admin.upsert({
        where: {
            username: "admin",
        },
        update: {},
        create: {
            username: "admin",
            password: hash,
        },
    });
    console.log("Admin berhasil dibuat");
}
main()
    .catch(console.error)
    .finally(async () => {
    await prisma.$disconnect();
});
