import { query } from 'express';
import { body,param } from 'express-validator';

class productvalidation{
    static addproduct=[
        body("productname").notEmpty().withMessage("the name cannot be empty"),
        body("qunatity").notEmpty().withMessage("the quantity is not empty"),
        body("Details").notEmpty().withMessage("the details should not be empty")
    ];
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
export default productvalidation;