import bodyParser from "body-parser";
import express from "express";
import {LOTController,LOTGet,LOTDelete,LOTUpdateController,LOTAndroidController} from "../controller/LOT.js";
const router = express.Router();
import { AuthenciatedUser } from "../Middleware/auth.js";
const jsonparser = bodyParser.json();

router.post("/LOT", jsonparser, LOTController);
router.get("/LOT", jsonparser, AuthenciatedUser, LOTGet);
router.delete("/LOT/delete", AuthenciatedUser, LOTDelete);
router.put("/LOT/update", jsonparser, AuthenciatedUser, LOTUpdateController);
router.post("/LOTAndroid", jsonparser, LOTAndroidController);


export default router;
