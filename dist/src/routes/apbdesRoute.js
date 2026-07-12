"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apbdesController_1 = require("../controllers/apbdesController");
const router = (0, express_1.Router)();
// GET /apbdes
// GET /apbdes?type=ringkasan
// GET /apbdes?type=bidang
router.get("/", apbdesController_1.getAPBDes);
router.get("/:id", apbdesController_1.getAPBDesById);
router.post("/", apbdesController_1.createAPBDes);
router.put("/:id", apbdesController_1.updateAPBDes);
router.delete("/:id", apbdesController_1.deleteAPBDes);
exports.default = router;
