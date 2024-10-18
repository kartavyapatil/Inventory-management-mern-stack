import asynchandler from "../utils/asynchandler.js";
import consumerservice from "../services/consumer.service.js"
import httpStatus from "http-status";
import productservice from "../services/product.service.js";

class productController{
    static addproduct=asynchandler(async(req,res)=>{
        const res_obj=await productservice.addproduct(req?.user , req.body);
         return res.status(httpStatus.CREATED).json(res_obj)
    })
    static getproduct =asynchandler(async(req,res)=>{
        const res_obj=await productservice.getproduct(req?.user,req.query?.page,req.query?.query);
        return res.status(httpStatus.OK).json(res_obj)
    })
    static deleteproduct=asynchandler(async(req,res)=>{
        const res_obj=await productservice.deleteproduct(req?.user ,req.params.id);
        return res.status(httpStatus.OK).json(res_obj)
    })
    static getbyIdproduct =asynchandler(async(req,res)=>{
        const res_obj=await productservice.getbyId(req?.user ,req.params.id);
        return res.status(httpStatus.OK).json(res_obj)
    })
    static update=asynchandler(async(req,res)=>{
        const res_obj=await productservice.updateproduct(req?.user , req.body,req.params.id);
        return res.status(httpStatus.OK).json(res_obj)
    })
    static getproductsearch=asynchandler(async(req,res)=>{
        const res_obj=await productservice.getproductforsearch(req?.user );
        return res.status(httpStatus.OK).json(res_obj)
    })
}
export default productController