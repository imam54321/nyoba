"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePenduduk = exports.updatePenduduk = exports.createPenduduk = exports.getPendudukById = exports.getAllPenduduk = void 0;
const Prisma_1 = require("../lib/Prisma");
function hitungUmur(tglLahir) {
    if (!tglLahir)
        return 0;
    const lahir = new Date(tglLahir);
    const sekarang = new Date();
    let umur = sekarang.getFullYear() - lahir.getFullYear();
    const belumUltah = sekarang.getMonth() < lahir.getMonth() ||
        (sekarang.getMonth() === lahir.getMonth() &&
            sekarang.getDate() < lahir.getDate());
    if (belumUltah)
        umur--;
    return umur;
}
const getAllPenduduk = async (req, res) => {
    try {
        const data = await Prisma_1.prisma.dataWargaDesaMaribaya.findMany({
            orderBy: {
                NAMA_LGKP: "asc",
            },
        });
        const result = data.map((item) => ({
            id: Number(item.NO_ID),
            nama: item.NAMA_LGKP ?? "",
            jenis_kelamin: item.JENIS_KLMIN ?? "",
            alamat: item.ALAMAT ?? "",
            usia: hitungUmur(item.TGL_LHR),
        }));
        return res.json(result);
    }
    catch (err) {
        console.error("ERROR GET PENDUDUK:", err);
        return res.status(500).json({
            message: "Gagal mengambil data penduduk",
        });
    }
};
exports.getAllPenduduk = getAllPenduduk;
const getPendudukById = async (req, res) => {
    const id = BigInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    const data = await Prisma_1.prisma.dataWargaDesaMaribaya.findUnique({
        where: {
            NO_ID: id,
        },
    });
    res.json(data);
};
exports.getPendudukById = getPendudukById;
const createPenduduk = async (req, res) => {
    const data = await Prisma_1.prisma.dataWargaDesaMaribaya.create({
        data: req.body,
    });
    res.json(data);
};
exports.createPenduduk = createPenduduk;
const updatePenduduk = async (req, res) => {
    const id = BigInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    const data = await Prisma_1.prisma.dataWargaDesaMaribaya.update({
        where: {
            NO_ID: id,
        },
        data: req.body,
    });
    res.json(data);
};
exports.updatePenduduk = updatePenduduk;
const deletePenduduk = async (req, res) => {
    const id = BigInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    await Prisma_1.prisma.dataWargaDesaMaribaya.delete({
        where: {
            NO_ID: id,
        },
    });
    res.json({
        message: "Berhasil dihapus",
    });
};
exports.deletePenduduk = deletePenduduk;
