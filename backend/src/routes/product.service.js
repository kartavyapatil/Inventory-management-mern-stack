import { Router } from "express";
import Authentication from "../middlewares/Authentication.js";
import validation from "../middlewares/validation.js";
// import consumerController from "../controllers/consumer.contorller.js";
import productvalidation from "../validation/product.validation.js";
import productController from "../controllers/product.controller.js"

const router = Router();
router.use(Authentication);
// router.post("/addproduct",productvalidation.addproduct,validation,productController.addproduct)
router.route("/add-product").post(productvalidation.addproduct,validation,productController.addproduct)
router.route("/get-product").get(productvalidation.Params_query,validation,productController.getproduct)
router.route("/delete-product/:id").delete(productvalidation.Params_id,validation,productController.deleteproduct)
router.route("/getbyid-product/:id").get(productvalidation.Params_id,validation,productController.getbyIdproduct)
router.route("/update-product/:id").patch(productvalidation.addproduct,validation,productController.update)
router.route("/getproductsearch").get(productController.getproductsearch)

export default router;