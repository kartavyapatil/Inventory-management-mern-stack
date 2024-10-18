import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    productname: {
        type: String,
        required: [true, "name is required"],
        trim: true
    },
    qunatity: {
        type: Number ,
        trim: true,
        required: [true, " number  is required"]
    },
    Details: {
        type: String ,
        trim: true,
        required: [true, "details is required"]
    },
    isActive:{
        type:Boolean,
        default:true
    }
}, { timestamps: true });

const model = mongoose.model('product', schema);
export default model;