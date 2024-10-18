
import httpStatus from 'http-status';
import { coustmermodel } from '../models/index.js';
import ApiError from '../utils/ApiError.js';


class consumerService  {
   static async RegisterConsumer(user,body){
    const { name,email,phone,address,dob } = body;
    const checkExist=await coustmermodel.findOne({email:email,user:user})
    if (checkExist){
        throw new ApiError(httpStatus.BAD_REQUEST,"consumer already in record");
        return
    }
         await coustmermodel.create({
           name,
           email,
           phone,
           address,
           dob,
           user
        })
        return {
            msg:"consumer added:)"
        }
        
   }
   static async deleteconsumer(user,id){
    const checkExist=await coustmermodel.findOneAndDelete({user:user,_id:id})
    if (!checkExist){
        throw new ApiError(httpStatus.BAD_REQUEST,"consumer not in record");
        return
    }
        return {
            msg:"consumer delete  :("
        }   
   }


static async getalluser(user,page=1,query=''){
    const limit = 5;
        const skip = (Number(page)-1)*limit

        const queryies = {
            user,
           $or:[
            {
                 name: new RegExp(query)
            },
            {
                 email: new RegExp(query)
            },
            {
                 address: new RegExp(query)
            },
            {
                 mobile: new RegExp(query)
            }
           ]
        }


const data =  await coustmermodel.find(queryies).select("name email phone")
            .skip(skip)
            .limit(limit)
;

//total document

const totalConsumer = await coustmermodel.countDocuments(queryies)


//hasmore
const hasMore= skip+limit<totalConsumer


    return {
        users:data,
        more:hasMore,
        totalConsumer:totalConsumer
    }




}
static async getuserrforsearch(user){
    

const data =  await coustmermodel.find({user}).select("name phone");


    return {
        users:data,
    }

}
   static async getbyId(user,id){
    const checkExist=await coustmermodel.findOne({user:user,_id:id})
    if (!checkExist){
        throw new ApiError(httpStatus.BAD_REQUEST,"consumer not in record");
        return
    }
        return {
            user:checkExist
        }   
   }
   static async update(user,body,id){
    const { name,email,phone,address,dob } = body;
    const checkExist=await coustmermodel.findById({_id:id})
    if (checkExist.email!==email){
        const checkExistEmail= await coustmermodel.findOne({email:email,user:user})
        if (checkExistEmail){
            throw new ApiError(httpStatus.BAD_REQUEST,"consumer email already in record");
            return
        }
    }
         await coustmermodel.findByIdAndUpdate(id,{
           name,
           email,
           phone,
           address,
           dob,
           user
        })
        return {
            msg:"updated added:)"
        }
        
   }
  
}
export default consumerService;
