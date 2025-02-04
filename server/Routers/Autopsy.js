import bodyParser from "body-parser";
import express from "express";
import {
  AutopsyController,
  AutopsyGetController,
  AutopsyUpdateController,
} from "../controller/Autopsy.js";
import { AuthenciatedUser } from "../Middleware/auth.js";
import { autopsy_delete } from "../controller/delete/Autopsy_delete.js";
const router = express.Router();
const jsonparser = bodyParser.json();

router.post("/Autopsy", jsonparser, AutopsyController);
router.get("/Autopsy", jsonparser,AuthenciatedUser ,AutopsyGetController);
router.put("/Autopsy/update", jsonparser, AuthenciatedUser, AutopsyUpdateController);

router.delete('/Autopsy/delete',AuthenciatedUser , autopsy_delete);

export default router;
