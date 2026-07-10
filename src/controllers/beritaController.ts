import { Request, Response } from "express";
import prisma from "../lib/Prisma";

const beritaRepo = (prisma as any).berita;

const parseIdParam = (param: string | string[] | undefined): bigint => {
  const id = Array.isArray(param) ? param[0] : param;
  if (!id) {
    throw new Error("ID parameter is required");
  }
  return BigInt(id);
};

export const getBerita = async (req: Request, res: Response) => {
  try {
    const berita = await beritaRepo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json(
      berita.map((item : any) => ({
        id: Number(item.id),
        judul: item.judul,
        isi: item.isi,
        gambar: item.gambar,
        penulis: item.penulis,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })),
    );
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Gagal mengambil data berita",
    });
  }
};

export const getBeritaById = async (req: Request, res: Response) => {
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
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Gagal mengambil detail berita",
    });
  }
};

export const createBerita = async (req: Request, res: Response) => {
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
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Gagal menambahkan berita",
    });
  }
};

export const updateBerita = async (req: Request, res: Response) => {
  try {
    const id = parseIdParam (req.params.id);

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
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Gagal memperbarui berita",
    });
  }
};

export const deleteBerita = async (req: Request, res: Response) => {
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
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Gagal menghapus berita",
    });
  }
};
