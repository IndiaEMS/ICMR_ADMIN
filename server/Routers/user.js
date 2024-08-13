import express from "express";
import bodyParser from "body-parser";
import {
  GetUser,
  CreateUser,
  logout,
  getAllUser,
  deleteUser,
  createAdminUserBySuperAdmin,
  loginUser,
} from "../controller/user.js";
import { AuthenciatedUser, authorizerole } from "../Middleware/auth.js";
const router = express.Router();
const jsonparser = bodyParser.json();

router.post("/login", loginUser);
router.get("/user", jsonparser, GetUser);
router.post("/user", jsonparser, CreateUser);
router.post("/logout", logout);
router.get(
  "/getuser",
  AuthenciatedUser,
  authorizerole("admin", "superadmin"),
  getAllUser
);
router.put(
  "/deleteUser/:id",
  AuthenciatedUser,
  authorizerole("superadmin"),
  deleteUser
);
router.post(
  "/superadmin/createAdmin",
  AuthenciatedUser,
  authorizerole("superadmin"),
  createAdminUserBySuperAdmin
);
export default router;
