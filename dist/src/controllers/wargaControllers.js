"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatistikPenduduk = void 0;
const Prisma_1 = require("../lib/Prisma");
const bigIntSerializer = (data) => {
    return JSON.parse(JSON.stringify(data, (_, value) => typeof value === "bigint" ? value.toString() : value));
};
const toBigIntOrNull = (value) => {
    if (value === undefined || value === null || value === "")
        return null;
    return BigInt(String(value));
};
const toIntOrNull = (value) => {
    if (value === undefined || value === null || value === "")
        return null;
    return Number(value);
};
const getStatistikPenduduk = async (req, res) => {
    try {
        const [totalPenduduk, totalLakiLaki, totalPerempuan] = await Promise.all([
            Prisma_1.prisma.dataWargaDesaMaribaya.count(),
            Prisma_1.prisma.dataWargaDesaMaribaya.count({
                where: {
                    JENIS_KLMIN: {
                        contains: "LAKI",
                    },
                },
            }),
            Prisma_1.prisma.dataWargaDesaMaribaya.count({
                where: {
                    JENIS_KLMIN: {
                        contains: "PEREMPUAN",
                    },
                },
            }),
        ]);
        return res.status(200).json({
            message: "Berhasil mengambil statistik penduduk",
            totalPenduduk,
            totalLakiLaki,
            totalPerempuan,
        });
    }
    catch (error) {
        console.error("ERROR GET STATISTIK PENDUDUK:", error);
        return res.status(500).json({
            message: "Gagal mengambil statistik penduduk",
            error: error?.message,
        });
    }
};
exports.getStatistikPenduduk = getStatistikPenduduk;
