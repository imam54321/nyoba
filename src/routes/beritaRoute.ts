import { Router } from "express";

import {
  getBerita,
  getBeritaById,
  createBerita,
  updateBerita,
  deleteBerita,
} from "../controllers/beritaController";

const router = Router();

// GET semua berita
router.get("/", getBerita);

// GET berita berdasarkan ID
router.get("/:id", getBeritaById);

// POST tambah berita
router.post("/", createBerita);

// PUT update berita
router.put("/:id", updateBerita);

// DELETE hapus berita
router.delete("/:id", deleteBerita);

export default router;