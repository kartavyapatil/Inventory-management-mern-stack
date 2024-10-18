import asynchandler from "../utils/asynchandler.js";
import consumerservice from "../services/consumer.service.js"
import httpStatus from "http-status";
class consumerController{
    static RegisterConsumer=asynchandler(async(req,res)=>{
        const res_obj=await consumerservice.RegisterConsumer(req?.user , req.body);
         return res.status(httpStatus.CREATED).json(res_obj)
    })
    static DeleteConsumer=asynchandler(async(req,res)=>{
        const res_obj=await consumerservice.deleteconsumer(req?.user ,req.params.id);
        return res.status(httpStatus.OK).json(res_obj)
    })
    static getuserrforsearch=asynchandler(async(req,res)=>{
        const res_obj=await consumerservice.getuserrforsearch(req?.user );
        return res.status(httpStatus.OK).json(res_obj)
    })
    static getconsumerinfo=asynchandler(async(req,res)=>{
        const res_obj=await consumerservice.getalluser(req?.user,req.query?.page,req.query?.query);
        return res.status(httpStatus.OK).json(res_obj)
    })
    static getbyId =asynchandler(async(req,res)=>{
        const res_obj=await consumerservice.getbyId(req?.user ,req.params.id);
        return res.status(httpStatus.OK).json(res_obj)
    })
    static update=asynchandler(async(req,res)=>{
        const res_obj=await consumerservice.update(req?.user , req.body,req.params.id);
        return res.status(httpStatus.OK).json(res_obj)
    })
}

export default consumerController;  