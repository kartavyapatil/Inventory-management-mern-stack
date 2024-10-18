import { query } from 'express';
import { body,param } from 'express-validator';
class OrderValidation {

        static CreateOrder= [
                body("user").isMongoId().notEmpty().withMessage("User Is Required"),
                // body("product").notEmpty().withMessage("product Is Required"),
                // body("dateoforder").notEmpty().withMessage("date Is Required"),
        ]   ;
        static Params_query= [
                query("page"),
                query("query")
                // query("page").optional(),
                // query("query").optional(),
            ]
            static Params_id= [
                param("id").isMongoId().withMessage("provide valid Id").notEmpty().withMessage("Id is required")
            ]
}
export default OrderValidation;