import { Request, Response } from "express";
import { prisma } from "../lib/Prisma";
function hitungUmur(tglLahir: string | null): number {
  if (!tglLahir) return 0;

  const lahir = new Date(tglLahir);
  const sekarang = new Date();

  let umur = sekarang.getFullYear() - lahir.getFullYear();

  const belumUltah =
    sekarang.getMonth() < lahir.getMonth() ||
    (sekarang.getMonth() === lahir.getMonth() &&
      sekarang.getDate() < lahir.getDate());

  if (belumUltah) umur--;

  return umur;
}
export const getAllPenduduk = async (req: Request, res: Response) => {
  try {
    const data = await prisma.dataWargaDesaMaribaya.findMany({
      orderBy: {
        NAMA_LGKP: "asc",
      },
    });

    const result = data.map((item: { NO_ID: any; NAMA_LGKP: any; JENIS_KLMIN: any; ALAMAT: any; TGL_LHR: string | null; }) => ({
      id: Number(item.NO_ID),
      nama: item.NAMA_LGKP ?? "",
      jenis_kelamin: item.JENIS_KLMIN ?? "",
      alamat: item.ALAMAT ?? "",
      usia: hitungUmur(item.TGL_LHR),
    }));

    return res.json(result);
  } catch (err) {
    console.error("ERROR GET PENDUDUK:", err);

    return res.status(500).json({
      message: "Gagal mengambil data penduduk",
    });
  }
};
export const getPendudukById = async (req: Request, res: Response) => {
  const id = BigInt(
    Array.isArray(req.params.id) ? req.params.id[0] : req.params.id,
  );

  const data = await prisma.dataWargaDesaMaribaya.findUnique({
    where: {
      NO_ID: id,
    },
  });

  res.json(data);
};

export const createPenduduk = async (req: Request, res: Response) => {
  const data = await prisma.dataWargaDesaMaribaya.create({
    data: req.body,
  });

  res.json(data);
};

export const updatePenduduk = async (req: Request, res: Response) => {
  const id = BigInt(
    Array.isArray(req.params.id) ? req.params.id[0] : req.params.id,
  );

  const data = await prisma.dataWargaDesaMaribaya.update({
    where: {
      NO_ID: id,
    },
    data: req.body,
  });

  res.json(data);
};

export const deletePenduduk = async (req: Request, res: Response) => {
  const id = BigInt(
    Array.isArray(req.params.id) ? req.params.id[0] : req.params.id,
  );

  await prisma.dataWargaDesaMaribaya.delete({
    where: {
      NO_ID: id,
    },
  });

  res.json({
    message: "Berhasil dihapus",
  });
};
