import jwt from "jsonwebtoken";
export const generatoken =(user,expire="1d")=>{
    const token=jwt.sign({user:user._id},process.env.JWT_AUTH,{expiresIn:expire})
    return token
}

 export const validate =(token)=>{
    const tokens=jwt.verify(token,process.env.JWT_AUTH)
    return tokens
}