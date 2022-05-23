import { Router } from "express";
const router = Router();

import * as reservaCtrl from "../controllers/reserva.controller";
import { authJwt } from "../middlewares";
router.get("/", reservaCtrl.getReservas);

router.get("/:reservaId", reservaCtrl.getReservaById);

router.post("/", reservaCtrl.createReserva);

router.put("/:reservaId", reservaCtrl.updateReservaById);

router.delete("/:reservaId", reservaCtrl.deleteReservaById);

export default router;