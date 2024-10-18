import { Router } from "express";
import Authentication from "../middlewares/Authentication.js";
import validation from "../middlewares/validation.js";
import OrderValidation from "../validation/order.validation.js"
import ordercontroller from "../controllers/order.controlller.js";

const router = Router();
router.use(Authentication);
router.route("/addorder").post(OrderValidation.CreateOrder,validation,ordercontroller.createOrder)
router.route("/getorder").get(OrderValidation.Params_query,validation,ordercontroller.getorder)
router.route("/deleteorder/:id").delete(OrderValidation.Params_id,validation,ordercontroller.deleteorder)

export default router;