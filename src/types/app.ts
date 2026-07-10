import express from "express";
import cors from "cors";

import wargaRoutes from "../routes/wargaRoute";
import pendudukRoutes from "../routes/pendudukRoute";
import apbdesRoutes from "../routes/apbdesRoute";
import authRoute from "../routes/authRoute";
import beritaRoutes from "../routes/beritaRoute";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/penduduk", pendudukRoutes);
app.use("/warga", wargaRoutes);
app.use("/apbdes", apbdesRoutes);
app.use("/berita", beritaRoutes);
app.use("/api/auth", authRoute);


export default app;