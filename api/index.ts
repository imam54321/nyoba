import express from "express";
import cors from "cors";

import wargaRoutes from "../src/routes/wargaRoute";
import pendudukRoutes from "../src/routes/pendudukRoute";
import apbdesRoutes from "../src/routes/apbdesRoute";
import authRoute from "../src/routes/authRoute";
import beritaRoutes from "../src/routes/beritaRoute";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/penduduk", pendudukRoutes);
app.use("/warga", wargaRoutes);
app.use("/apbdes", apbdesRoutes);
app.use("/berita", beritaRoutes);
app.use("/api/auth", authRoute);

export default app;