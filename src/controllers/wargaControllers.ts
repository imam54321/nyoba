import type { Request, Response } from "express";
import { prisma } from "../lib/Prisma";

const bigIntSerializer = (data: unknown) => {
  return JSON.parse(
    JSON.stringify(data, (_, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
};

const toBigIntOrNull = (value: unknown) => {
  if (value === undefined || value === null || value === "") return null;
  return BigInt(String(value));
};

const toIntOrNull = (value: unknown) => {
  if (value === undefined || value === null || value === "") return null;
  return Number(value);
};
export const getStatistikPenduduk = async (req: Request, res: Response) => {
  try {
    const [totalPenduduk, totalLakiLaki, totalPerempuan] = await Promise.all([
      prisma.dataWargaDesaMaribaya.count(),

      prisma.dataWargaDesaMaribaya.count({
        where: {
          JENIS_KLMIN: {
            contains: "LAKI",
          },
        },
      }),

      prisma.dataWargaDesaMaribaya.count({
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
  } catch (error: any) {
    console.error("ERROR GET STATISTIK PENDUDUK:", error);

    return res.status(500).json({
      message: "Gagal mengambil statistik penduduk",
      error: error?.message,
    });
  }
};