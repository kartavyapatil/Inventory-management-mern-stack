
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import { ordermodel, productmodel } from '../models/index.js';
import { coustmermodel } from '../models/index.js';
class OrderService{
    static async createOrder(user,body){
        await ordermodel.create({
            user,
            consumer:body.user,
            product:body.product,
            dateoforder:body.order_date
        })
        
        return {
            msg:"Order Created Successfully"
        }
        
    }
    // static async getorder(user,page=1,query=''){
        
    //     const limit = 5;
    //         const skip = (Number(page)-1)*limit

    //         const toatalproduct=await ordermodel.countDocuments({user:user})
    // const userdata =await ordermodel.find({user:user})
    // const consumerid =  await ordermodel.find({user:user}).select("consumer")
    // const productid =  await ordermodel.find({user:user}).select("product")
  
    // productname = await productmodel.findById(productid[0].product).select("productname qunatity")
    // consumername = await coustmermodel.findById(consumerid[0].consumer).select("name email")
    //     return {
    //         consumerdetails:consumername,
    //         productdetails:productname,
    //         userdata:userdata,
    //         toatal:toatalproduct
    //     }
    // }

    static async getorder(user, page = 1, query = '') {
        const limit = 5;
        const skip = (Number(page) - 1) * limit;
    
        // Get the orders with pagination
        const orders = await ordermodel.find({ user: user })
                                       .skip(skip)
                                       .limit(limit);
        const numberoforder=await ordermodel.countDocuments({user:user})
    
        // Extract unique product IDs and consumer IDs
        const productIds = [...new Set(orders.map(order => order.product))];
        const consumerIds = [...new Set(orders.map(order => order.consumer))];
    
        // Fetch product details for all unique product IDs
        const products = await productmodel.find({ _id: { $in: productIds } }).select("productname qunatity");
    
        // Fetch consumer details for all unique consumer IDs
        const consumers = await coustmermodel.find({ _id: { $in: consumerIds } }).select("name email");
    
        // Create lookup maps for quick access
        const productMap = new Map(products.map(product => [product._id.toString(), product]));
        const consumerMap = new Map(consumers.map(consumer => [consumer._id.toString(), consumer]));
    
        // Enhance the orders with product and consumer details
        const enhancedOrders = orders.map(order => ({
            ...order._doc,
            productdetails: productMap.get(order.product.toString()) || null,
            consumerdetails: consumerMap.get(order.consumer.toString()) || null,
        }));
    
        return {
            orders: enhancedOrders,
            more: orders.length > limit, // or some other logic to determine if there are more results
            numberoforder:numberoforder
        };
    }
    
    static async deleteorder(user,id){
        const existOrder = await ordermodel.findOne({user,_id:id})
        if(!existOrder){
                    throw new ApiError(httpStatus.NOT_FOUND,"Order Not Found");
                    return 
        }
        await ordermodel.findByIdAndDelete(existOrder._id);
        return {
               msg:'Order Delete Successfully'
            }
    }
    // static async deleteOrder(user,id){
     
    //     const existOrder = await ordermodel.findOne({user,_id:id})

    //     if(!existOrder){
    //         throw new ApiError(httpStatus.NOT_FOUND,"Order Not Found");
    //         return 
    //     }

    //     await ordermodel.findByIdAndDelete(existOrder._id);
        

    // return {
    //    msg:'Order Delete Successfully'
        
    // }

// }

}
export default OrderService;