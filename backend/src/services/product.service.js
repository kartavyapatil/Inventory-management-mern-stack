import httpStatus from 'http-status';
import { productmodel } from '../models/index.js';
import ApiError from '../utils/ApiError.js';

class productservice{
    static async addproduct(user,body){
        const {productname,qunatity,Details } = body;
        const checkExist=await productmodel.findOne({productname:productname, user: user})
        if (checkExist){
            throw new ApiError(httpStatus.BAD_REQUEST,"consumer already in record");
            return
        }
             await productmodel.create({
               productname,
               qunatity,
               Details,
               user
            })
            return {
                msg:"product added:)"
            }
            
       }

       static async getproduct(user,page=1,query=''){
        const limit = 4;
            const skip = (Number(page)-1)*limit
    
            const queryies = {
                user,
               $or:[
                {
                    productname: new RegExp(query)
                }
               ]
            }
    const data =  await productmodel.find(queryies).select("productname qunatity Details")
                .skip(skip)
                .limit(limit)
    ;
    //total document
    const totalproduct = await productmodel.countDocuments(queryies)
    //hasmore
    const hasMore= skip+limit<totalproduct
        return {
            users:data,
            more:hasMore,
            totalproduct:totalproduct
        }
    }
    static async deleteproduct(user,id){
        const checkExist=await productmodel.findOneAndDelete({user:user,_id:id})
        if (!checkExist){
            throw new ApiError(httpStatus.BAD_REQUEST,"consumer not in record");
            return
        }
            return {
                msg:"consumer delete  :("
            }   
       }

    static async getbyId(user,id){
        const checkExist=await productmodel.findOne({user:user,_id:id})
        if (!checkExist){
            throw new ApiError(httpStatus.BAD_REQUEST,"consumer not in record");
            return
        }
            return {
                user:checkExist
            }   
       }

       static async  getproductforsearch(user){
    

        const data =  await productmodel.find({user}).select("productname");
        
        
            return {
                users:data,
            }
        
        }

       static async updateproduct(user,body,id){
        const {productname,qunatity,Details  } = body;
        const checkExist=await productmodel.findById({_id:id})
        if (checkExist.productname!==productname){
            const checkExistEmail= await productmodel.findOne({productname:productname,user:user})
            if (checkExistEmail){
                throw new ApiError(httpStatus.BAD_REQUEST," product already in record");
                return
            }
        }
             await productmodel.findByIdAndUpdate(id,{
                productname,qunatity,Details,
               user
            })
            return {
                msg:"updated added:)"
            }
            
       }
    
}

export default productservice;