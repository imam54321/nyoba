import { Router } from "express";

import {
  getAllPenduduk,
  getPendudukById,
  createPenduduk,
  updatePenduduk,
  deletePenduduk,
} from "../controllers/pendudukController";

const router = Router();

router.get("/", getAllPenduduk);

router.get("/:id", getPendudukById);

router.post("/", createPenduduk);

router.put("/:id", updatePenduduk);

router.delete("/:id", deletePenduduk);

export default router;