interface Lead{
_id:string;
name:string;
email:string;
status:string;
source:string;
}

interface Props{
leads?:Lead[];
onDelete:(id:string)=>void;
onUpdate:(id:string,status:string)=>void;
onView:(id:string)=>void;
onEdit:(lead:Lead)=>void;
role:string;
}

function LeadTable({
leads=[],
onDelete,
onView,
onEdit,
role
}:Props){

return(

<div className="bg-white rounded-2xl shadow-md overflow-hidden">

<h2 className="text-2xl font-bold px-6 pt-6 pb-4 text-gray-800">

Leads

</h2>

<div className="overflow-x-auto">

<table className="min-w-full">

<thead className="bg-gray-50">

<tr>

<th className="px-6 py-4 text-left">
Name
</th>

<th className="px-6 py-4 text-left">
Email
</th>

<th className="px-6 py-4 text-left">
Status
</th>

<th className="px-6 py-4 text-left">
Source
</th>

<th className="px-6 py-4 text-left">
Actions
</th>

</tr>

</thead>

<tbody>

{leads.map((lead)=>(

<tr
key={lead._id}
className="border-t hover:bg-gray-50 transition"
>

<td className="px-6 py-5">

<div className="font-medium">

{lead.name}

</div>

</td>

<td className="px-6 py-5">

{lead.email}

</td>

<td className="px-6 py-5">

<span
className={`px-4 py-2 rounded-full text-xs font-semibold text-white
${
lead.status==="new"
?"bg-yellow-500"
:
lead.status==="contacted"
?"bg-blue-500"
:
lead.status==="qualified"
?"bg-green-500"
:
"bg-red-500"
}`}
>

{lead.status}

</span>

</td>

<td className="px-6 py-5 capitalize">

{lead.source}

</td>

<td className="px-6 py-5">

<div className="flex gap-2">

<button
onClick={()=>
onView(lead._id)
}
className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
>

View

</button>

<button
onClick={()=>
onEdit(lead)
}
className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
>

Edit

</button>

{role==="admin" && (

<button
onClick={()=>
onDelete(lead._id)
}
className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
>

Delete

</button>

)}

</div>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

);

}

export default LeadTable;