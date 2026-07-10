import { Router } from "express";

import {
  getStatistikPenduduk
} from "../controllers/wargaControllers";

const router = Router();

router.get("/", getStatistikPenduduk);

export default router;