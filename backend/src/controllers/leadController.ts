import { Response } from "express";
import Lead from "../models/Lead";
import { AuthRequest } from "../middleware/authMiddleware";
import { Parser } from "json2csv";

interface LeadQuery {
status?:string;
search?:string;
source?:string;
sort?:string;
page?:string;
limit?:string;
}

export const createLead=async(
req:AuthRequest,
res:Response
)=>{

try{

const lead=
await Lead.create({

...req.body,

createdBy:
req.user?.id

});

res.status(201).json(
lead
);

}catch(error){

throw error;

}

};

export const getLeads=async(
req:AuthRequest,
res:Response
)=>{

try{

const {
status,
search,
source,
sort,
page,
limit
}=req.query as LeadQuery;

const pageNumber=
Number(page)||1;

const limitNumber=
Number(limit)||10;

const skip=
(pageNumber-1)
*
limitNumber;

const filter:Record<string,any>={
createdBy:req.user?.id
};

if(status){

filter.status=
status;

}

if(source){

filter.source=
source;

}

if(search){

filter.$or=[

{
name:{
$regex:search,
$options:"i"
}
},

{
email:{
$regex:search,
$options:"i"
}
}

];

}

const sortOption:Record<string,1|-1>={
createdAt:
sort==="oldest"
?1
:-1
};

const leads=
await Lead.find(
filter
)
.sort(sortOption)
.skip(skip)
.limit(limitNumber);

const total=
await Lead.countDocuments(
filter
);

res.json({

total,

page:
pageNumber,

pages:
Math.ceil(
total/
limitNumber
),

leads

});

}catch(error){

throw error;

}

};

export const updateLead=async(
req:AuthRequest,
res:Response
)=>{

try{

const lead=
await Lead.findByIdAndUpdate(
req.params.id,
req.body,
{
returnDocument:"after"
}
);

res.json(
lead
);

}catch(error){

throw error;

}

};

export const deleteLead=async(
req:AuthRequest,
res:Response
)=>{

try{

await Lead.findByIdAndDelete(
req.params.id
);

res.json({

message:
"Lead deleted"

});

}catch(error){

throw error;

}

};

export const getSingleLead=async(
req:AuthRequest,
res:Response
)=>{

try{

const lead=
await Lead.findById(
req.params.id
);

if(!lead){

res.status(404);

throw new Error(
"Lead not found"
);

}

res.json(
lead
);

}catch(error){

throw error;

}

};

export const exportLeadsCSV=async(
req:AuthRequest,
res:Response
)=>{

try{

const leads=
await Lead.find({

createdBy:
req.user?.id

});

const fields=[

"name",
"email",
"status",
"source"

];

const parser=
new Parser({
fields
});

const csv=
parser.parse(
leads
);

res.header(
"Content-Type",
"text/csv"
);

res.attachment(
"leads.csv"
);

res.send(
csv
);

}catch(error){

throw error;

}

};