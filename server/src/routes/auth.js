import express from "express";
const router = express.Router();
import authController from "../controllers/AuthController";
import uploadCloud from "../middlewares/uploader";
import middlewareAuth from "../middlewares/auth";

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get(
  "/getDataCustomer",
  middlewareAuth.verifyToken,
  authController.getDataCustomer
);

module.exports = router;
