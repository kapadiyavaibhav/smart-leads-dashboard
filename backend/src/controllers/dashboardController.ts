import { Response } from "express";
import Lead from "../models/Lead";

export const getDashboardStats = async(
req:any,
res:Response
)=>{

try{

const totalLeads=
await Lead.countDocuments({
createdBy:req.user.id
});

const newLeads=
await Lead.countDocuments({
createdBy:req.user.id,
status:"new"
});

const contactedLeads=
await Lead.countDocuments({
createdBy:req.user.id,
status:"contacted"
});

const qualifiedLeads=
await Lead.countDocuments({
createdBy:req.user.id,
status:"qualified"
});

const lostLeads=
await Lead.countDocuments({
createdBy:req.user.id,
status:"lost"
});

const recentLeads=
await Lead.find({
createdBy:req.user.id
})
.sort({
createdAt:-1
})
.limit(5);

res.json({

totalLeads,
newLeads,
contactedLeads,
qualifiedLeads,
lostLeads,
recentLeads

});

}catch(error){

res.status(500).json({

message:"Error fetching dashboard stats"

});

}

};