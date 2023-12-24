import express from "express";
const router = express.Router();
import adminController from "../controllers/AdminController";
import uploadCloud from "../middlewares/uploader";
import middlewareAuth from "../middlewares/auth";

// router.post("/register", middlewareAuth.verifyTokenStaff, uploadCloud.single("image"), adminController.register);
router.post("/createCustomer", middlewareAuth.verifyTokenStaff, uploadCloud.single("image"), adminController.register);
router.post("/createAdmin", middlewareAuth.verifyTokenStaff, uploadCloud.single("image"), adminController.register);
router.post("/createPost", middlewareAuth.verifyTokenStaff, uploadCloud.single("image"), adminController.createPost);
router.post("/login", adminController.login); //middlewareAuth.verifyTokenStaff
router.post("/logoutAdmin", adminController.logout); //middlewareAuth.verifyTokenStaff
router.delete("/deleteCustomer?:id", middlewareAuth.verifyTokenStaff, adminController.deleteCustomer);
router.delete("/deleteAdmin?:id", middlewareAuth.verifyTokenStaff, adminController.deleteAdmin);
router.delete("/deleteAdmin?:id", middlewareAuth.verifyTokenStaff, adminController.deleteAdmin);
router.delete("/deletePost?:id", middlewareAuth.verifyTokenStaff, adminController.deletePost);
router.delete("/deleteCategory?:id", middlewareAuth.verifyTokenStaff, adminController.deleteCategory);
router.delete("/deleteComment?:id", middlewareAuth.verifyTokenStaff, adminController.deleteComment);
router.put("/updateStatus", middlewareAuth.verifyTokenStaff, adminController.updateStatus);
router.put("/updateCustomer", middlewareAuth.verifyTokenStaff, uploadCloud.single("image"), adminController.updateCustomer);
router.put("/updateAdmin", middlewareAuth.verifyTokenStaff, uploadCloud.single("image"), adminController.updateAdmin);
router.put("/updateRoleAdmin", middlewareAuth.verifyTokenAdmin, uploadCloud.single("image"), adminController.updateRoleAdmin);
router.put("/updatePost", middlewareAuth.verifyTokenStaff, uploadCloud.single("image"), adminController.updatePost);
router.get("/getListAdmin", adminController.getListAdmin);
router.get("/getAllPostByAdmin", adminController.getAllPostByAdmin);
router.get("/getDetailAdmin", middlewareAuth.verifyTokenStaff, adminController.detail);
router.get("/getRole", middlewareAuth.verifyTokenStaff, adminController.getRole);
router.get("/searchAdmin", middlewareAuth.verifyTokenStaff, adminController.searchAdmin);
router.get("/statistical", adminController.statistical);
// router.get('/getDataCustomer', middlewareAuth.verifyToken, AdminAuthController.getDataCustomer)

module.exports = router;
