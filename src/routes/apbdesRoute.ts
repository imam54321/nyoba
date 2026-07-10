import { Router } from "express";
import { createAPBDes, deleteAPBDes, getAPBDes, getAPBDesById, updateAPBDes } from "../controllers/apbdesController";

const router = Router();

// GET /apbdes
// GET /apbdes?type=ringkasan
// GET /apbdes?type=bidang
router.get("/", getAPBDes);
router.get("/:id", getAPBDesById);
router.post("/", createAPBDes);
router.put("/:id", updateAPBDes);
router.delete("/:id", deleteAPBDes);
export default router;