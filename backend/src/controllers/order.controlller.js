import asynchandler from "../utils/asynchandler.js";
import consumerservice from "../services/consumer.service.js"
import httpStatus from "http-status";
import OrderService from "../services/order.service.js";

class ordercontroller{
    static createOrder= asynchandler(async(req,res)=>{
        const res_obj  = await OrderService.createOrder(req?.user,req.body);
        return    res.status(httpStatus.CREATED).json(res_obj)
         
    })
    static getorder =asynchandler(async(req,res)=>{
        const res_obj=await OrderService.getorder(req?.user,req.query?.page,req.query?.query);
        return res.status(httpStatus.OK).json(res_obj)
    })
    // static deleteOrder= CatchAsync(async(req,res)=>{
    //     const res_obj  = await OrderService.deleteOrder(req?.user,req?.params?.id);
    //     return    res.status(httpStatus.OK).json(res_obj)
         
    // })
    static deleteorder=asynchandler(async(req,res)=>{
        const res_obj=await OrderService.deleteorder(req?.user,req.params.id);
        return res.status(httpStatus.OK).json(res_obj)
    })
}
export default ordercontroller;