import mongoose,{Schema} from "mongoose";
import { ILead } from "../interfaces/ILead";

const leadSchema=new Schema<ILead>(
{
name:{
type:String,
required:true
},

email:{
type:String,
required:true
},

status:{
type:String,
enum:[
"new",
"contacted",
"qualified",
"lost"
],
default:"new"
},

source:{
type:String,
enum:[
"website",
"instagram",
"linkedin",
"facebook",
"referral",
"other"
],
required:true
},

createdBy:{
type:Schema.Types.ObjectId,
ref:"User"
}

},
{
timestamps:true
}
);

export default mongoose.model<ILead>(
"Lead",
leadSchema
);