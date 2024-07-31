import express from "express";
import bodyParser from "body-parser";
import { GetUser, CreateUser } from "../controller/user.js";

const router = express.Router();
const jsonparser = bodyParser.json();

router.get("/user", jsonparser, GetUser);
router.post("/user", jsonparser, CreateUser);

export default router;
