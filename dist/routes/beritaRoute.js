"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const beritaController_1 = require("../controllers/beritaController");
const router = (0, express_1.Router)();
// GET semua berita
router.get("/", beritaController_1.getBerita);
// GET berita berdasarkan ID
router.get("/:id", beritaController_1.getBeritaById);
// POST tambah berita
router.post("/", beritaController_1.createBerita);
// PUT update berita
router.put("/:id", beritaController_1.updateBerita);
// DELETE hapus berita
router.delete("/:id", beritaController_1.deleteBerita);
exports.default = router;
