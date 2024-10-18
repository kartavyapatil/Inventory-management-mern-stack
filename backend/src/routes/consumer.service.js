import { Router } from "express";
import Authentication from "../middlewares/Authentication.js";
import consumervalidation from "../validation/comsumer.validation.js"
import validation from "../middlewares/validation.js";
import consumerController from "../controllers/consumer.contorller.js";
// console.log(consumervalidation.Params_query)
// console.log(validation)
// console.log(consumerController.getconsumerinfo) 
const router = Router();
router.use(Authentication);
router.post("/register",consumervalidation.Registerconsumer,validation,consumerController.RegisterConsumer)
router.delete("/delete/:id",consumervalidation.Params_id,validation,consumerController.DeleteConsumer)
router.get("/getall",consumervalidation.Params_query,validation,consumerController.getconsumerinfo)
router.get("/getusersearch",consumerController.getuserrforsearch)
router.get("/get/:id",consumervalidation.Params_id,validation,consumerController.getbyId)
router.patch("/update/:id",consumervalidation.Registerconsumer,validation,consumerController.update)

export default router;