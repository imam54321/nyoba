"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBerita = exports.updateBerita = exports.createBerita = exports.getBeritaById = exports.getBerita = void 0;
const Prisma_1 = __importDefault(require("../lib/Prisma"));
const beritaRepo = Prisma_1.default.berita;
const parseIdParam = (param) => {
    const id = Array.isArray(param) ? param[0] : param;
    if (!id) {
        throw new Error("ID parameter is required");
    }
    return BigInt(id);
};
const getBerita = async (req, res) => {
    try {
        const berita = await beritaRepo.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        return res.json(berita.map((item) => ({
            id: Number(item.id),
            judul: item.judul,
            isi: item.isi,
            gambar: item.gambar,
            penulis: item.penulis,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        })));
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Gagal mengambil data berita",
        });
    }
};
exports.getBerita = getBerita;
const getBeritaById = async (req, res) => {
    try {
        const id = parseIdParam(req.params.id);
        const berita = await beritaRepo.findUnique({
            where: {
                id,
            },
        });
        if (!berita) {
            return res.status(404).json({
                message: "Berita tidak ditemukan",
            });
        }
        return res.json({
            id: Number(berita.id),
            judul: berita.judul,
            isi: berita.isi,
            gambar: berita.gambar,
            penulis: berita.penulis,
            createdAt: berita.createdAt,
            updatedAt: berita.updatedAt,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Gagal mengambil detail berita",
        });
    }
};
exports.getBeritaById = getBeritaById;
const createBerita = async (req, res) => {
    try {
        const { judul, isi, gambar, penulis } = req.body;
        const berita = await beritaRepo.create({
            data: {
                judul,
                isi,
                gambar,
                penulis,
            },
        });
        return res.status(201).json({
            message: "Berita berhasil ditambahkan",
            data: berita,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Gagal menambahkan berita",
        });
    }
};
exports.createBerita = createBerita;
const updateBerita = async (req, res) => {
    try {
        const id = parseIdParam(req.params.id);
        const { judul, isi, gambar, penulis } = req.body;
        const berita = await beritaRepo.update({
            where: {
                id,
            },
            data: {
                judul,
                isi,
                gambar,
                penulis,
            },
        });
        return res.json({
            message: "Berita berhasil diperbarui",
            data: berita,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Gagal memperbarui berita",
        });
    }
};
exports.updateBerita = updateBerita;
const deleteBerita = async (req, res) => {
    try {
        const id = parseIdParam(req.params.id);
        await beritaRepo.delete({
            where: {
                id,
            },
        });
        return res.json({
            message: "Berita berhasil dihapus",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Gagal menghapus berita",
        });
    }
};
exports.deleteBerita = deleteBerita;
