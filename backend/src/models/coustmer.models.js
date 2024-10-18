import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, "email is required"],
        trim: true,
        lowercase: true
    },
    phone: {
        type: String ,
        trim: true,
        required: [true, "Phone number  is required"]
    },
    address: {
        type: String ,
        trim: true,
        required: [true, "address is required"]
    },
    dob: {
        type: String ,
        trim: true
        // required: [true, "Phone number  is required"]
    },
    isActive:{
        type:Boolean,
        default:true
    }
}, { timestamps: true });

const model = mongoose.model('coustmer', schema);
export default model;