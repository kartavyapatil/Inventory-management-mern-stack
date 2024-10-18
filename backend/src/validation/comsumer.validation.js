import { query } from 'express';
import { body,param } from 'express-validator';

class consumervalidation {
    static Registerconsumer = [
        body('name').notEmpty().withMessage('name cannot be empty'),
        body('email').isEmail().withMessage('email must be valid').notEmpty().withMessage('email cannot be empty'),
        body('phone').notEmpty().withMessage('phone number is required'),
        body('address').notEmpty().withMessage('address cannot be empty'),
        body('dob').notEmpty().withMessage("it should be date")
    ];

    static Params_id= [
        param("id").isMongoId().withMessage("provide valid Id").notEmpty().withMessage("Id is required")
    ]
    static Params_query= [
        query("page"),
        query("query")
        // query("page").optional(),
        // query("query").optional(),
    ]

    
}

export default consumervalidation;
