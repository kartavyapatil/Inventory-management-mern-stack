import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }   , 
    consumer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'coustmer',
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
                ref:'product',
                required:true
    },
    dateoforder:{
        type: Date,
        required: [true, "date is required"],
        trim: true
    },
    isActive:{
        type:Boolean,
        default:true
    }

},{timestamps:true})


const model = mongoose.model("Order",Schema)

export default model