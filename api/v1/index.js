import { Router } from "express";
const app = Router();

import playlist from "./playlist";

app.use("/playlist", playlist);

export default app;
