import { Router } from "express";
const router = Router();

import * as salassCtrl from "../controllers/sala.controllers";
import { authJwt } from "../middlewares";
router.get("/", salassCtrl.getSalas);

router.get("/:salaId", salassCtrl.getSalaById);

router.post("/", salassCtrl.createSala);

router.put("/:salaId", salassCtrl.updateSalaById);

router.delete("/:salaId", salassCtrl.deleteSalaById);

export default router;