"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wargaControllers_1 = require("../controllers/wargaControllers");
const router = (0, express_1.Router)();
router.get("/", wargaControllers_1.getStatistikPenduduk);
exports.default = router;
