"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAPBDes = exports.updateAPBDes = exports.createAPBDes = exports.getAPBDesById = exports.getAPBDes = void 0;
const Prisma_1 = __importDefault(require("../lib/Prisma"));
const getAPBDes = async (req, res) => {
    try {
        const type = req.query.type;
        const data = await Prisma_1.default.aPBDES.findFirst();
        if (!data) {
            return res.status(404).json({
                message: "Data APBDes tidak ditemukan",
            });
        }
        if (type === "ringkasan") {
            return res.json({
                pemasukan: data.PEMASUKAN ?? 0,
                pengeluaran: data.PENGELUARAN ?? 0,
                surplus: data.SURPLUS ?? 0,
            });
        }
        if (type === "bidang") {
            return res.json({
                pemerintahan: data.PEMERINTAHAN ?? 0,
                pembangunan: data.PEMBANGUNAN ?? 0,
                pembinaan: data.PEMBINAAN ?? 0,
                mendesak: data.MENDESAK ?? 0,
                pemberdayaan: data.PEMBERDAYAAN ?? 0,
            });
        }
        return res.json({
            id: Number(data.NO_ID),
            pemasukan: data.PEMASUKAN ?? 0,
            pengeluaran: data.PENGELUARAN ?? 0,
            surplus: data.SURPLUS ?? 0,
            pemerintahan: data.PEMERINTAHAN ?? 0,
            pembangunan: data.PEMBANGUNAN ?? 0,
            pembinaan: data.PEMBINAAN ?? 0,
            mendesak: data.MENDESAK ?? 0,
            pemberdayaan: data.PEMBERDAYAAN ?? 0,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Gagal mengambil data APBDes",
        });
    }
};
exports.getAPBDes = getAPBDes;
const getAPBDesById = async (req, res) => {
    try {
        const id = BigInt(String(req.params.id));
        const data = await Prisma_1.default.aPBDES.findUnique({
            where: {
                NO_ID: id,
            },
        });
        if (!data) {
            return res.status(404).json({
                message: "Data tidak ditemukan",
            });
        }
        return res.json({
            id: Number(data.NO_ID),
            pemasukan: data.PEMASUKAN ?? 0,
            pengeluaran: data.PENGELUARAN ?? 0,
            surplus: data.SURPLUS ?? 0,
            pemerintahan: data.PEMERINTAHAN ?? 0,
            pembangunan: data.PEMBANGUNAN ?? 0,
            pembinaan: data.PEMBINAAN ?? 0,
            pemberdayaan: data.PEMBERDAYAAN ?? 0,
            mendesak: data.MENDESAK ?? 0,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Gagal mengambil data APBDes",
        });
    }
};
exports.getAPBDesById = getAPBDesById;
const createAPBDes = async (req, res) => {
    try {
        const { pemasukan, pengeluaran, surplus, pemerintahan, pembangunan, pembinaan, pemberdayaan, mendesak, } = req.body;
        const data = await Prisma_1.default.aPBDES.create({
            data: {
                PEMASUKAN: pemasukan,
                PENGELUARAN: pengeluaran,
                SURPLUS: surplus,
                PEMERINTAHAN: pemerintahan,
                PEMBANGUNAN: pembangunan,
                PEMBINAAN: pembinaan,
                PEMBERDAYAAN: pemberdayaan,
                MENDESAK: mendesak,
            },
        });
        return res.status(201).json(data);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Gagal menambahkan data APBDes",
        });
    }
};
exports.createAPBDes = createAPBDes;
const updateAPBDes = async (req, res) => {
    try {
        const id = BigInt(String(req.params.id));
        const { pemasukan, pengeluaran, surplus, pemerintahan, pembangunan, pembinaan, pemberdayaan, mendesak, } = req.body;
        const data = await Prisma_1.default.aPBDES.update({
            where: {
                NO_ID: id,
            },
            data: {
                PEMASUKAN: pemasukan,
                PENGELUARAN: pengeluaran,
                SURPLUS: surplus,
                PEMERINTAHAN: pemerintahan,
                PEMBANGUNAN: pembangunan,
                PEMBINAAN: pembinaan,
                PEMBERDAYAAN: pemberdayaan,
                MENDESAK: mendesak,
            },
        });
        return res.json(data);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Gagal mengubah data APBDes",
        });
    }
};
exports.updateAPBDes = updateAPBDes;
const deleteAPBDes = async (req, res) => {
    try {
        const id = BigInt(String(req.params.id));
        await Prisma_1.default.aPBDES.delete({
            where: {
                NO_ID: id,
            },
        });
        return res.json({
            message: "Data berhasil dihapus",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Gagal menghapus data APBDes",
        });
    }
};
exports.deleteAPBDes = deleteAPBDes;
