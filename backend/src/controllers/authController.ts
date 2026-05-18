import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register=async(
req:Request,
res:Response
)=>{

try{

const {
name,
email,
password,
role
}=req.body;

const existingUser=
await User.findOne({
email
});

if(existingUser){

res.status(400);

throw new Error(
"Email already exists"
);

}

const hashedPassword=
await bcrypt.hash(
password,
10
);

const user=
await User.create({

name,
email,
password:
hashedPassword,
role

});

res.status(201).json({

id:user._id,
name:user.name,
email:user.email,
role:user.role

});

}catch(error){

throw error;

}

};

export const login=async(
req:Request,
res:Response
)=>{

try{

const {
email,
password
}=req.body;

const user=
await User.findOne({
email
});

if(!user){

res.status(400);

throw new Error(
"Invalid credentials"
);

}

const isMatch=
await bcrypt.compare(
password,
user.password
);

if(!isMatch){

res.status(400);

throw new Error(
"Invalid credentials"
);

}

const token=
jwt.sign(
{
id:user._id,
role:user.role
},
process.env.JWT_SECRET as string,
{
expiresIn:"7d"
}
);

res.json({

token,

user:{
id:user._id,
name:user.name,
email:user.email,
role:user.role
}

});

}catch(error){

throw error;

}

};