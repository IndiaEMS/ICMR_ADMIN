import bodyParser from "body-parser";
import express from "express";
import {
  AutopsyController,
  AutopsyGetController,
} from "../controller/Autopsy.js";
const router = express.Router();
const jsonparser = bodyParser.json();

router.post("/Autopsy", jsonparser, AutopsyController);
router.get("/Autopsy", jsonparser, AutopsyGetController);

export default router;
