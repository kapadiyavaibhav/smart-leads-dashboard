interface Lead{
_id:string;
name:string;
email:string;
status:string;
source:string;
}

interface Props{
lead:Lead|null;
open:boolean;
mode:"view"|"edit"|"delete";
onClose:()=>void;
onSave?:(lead:Lead)=>void;
onDelete?:()=>void;
setLead?:(lead:Lead)=>void;
}

function LeadModal({
lead,
open,
mode,
onClose,
onSave,
onDelete,
setLead
}:Props){

if(!open || !lead){
return null;
}

const statusColor={

new:"bg-yellow-100 text-yellow-700",
contacted:"bg-blue-100 text-blue-700",
qualified:"bg-green-100 text-green-700",
lost:"bg-red-100 text-red-700"

};

return(

<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

<div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">

<div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">

<h2 className="text-3xl font-bold">

{
mode==="view"
?"Lead Details"
:
mode==="edit"
?"Edit Lead"
:
"Delete Lead"
}

</h2>

<p className="text-white/80 text-sm mt-1">

Manage lead information

</p>

</div>

<div className="p-6">

{mode==="delete" ? (

<div>

<p className="text-gray-600 text-lg mb-6">

Delete <b>{lead.name}</b> permanently?

</p>

<div className="flex justify-end gap-3">

<button
onClick={onClose}
className="px-5 py-2 border rounded-xl"
>

Cancel

</button>

<button
onClick={onDelete}
className="bg-red-500 text-white px-5 py-2 rounded-xl"
>

Delete

</button>

</div>

</div>

):(

<div className="space-y-5">

<input
disabled={mode==="view"}
value={lead.name}
onChange={(e)=>
setLead?.({
...lead,
name:e.target.value
})
}
className="w-full border rounded-xl p-3"
/>

<input
disabled={mode==="view"}
value={lead.email}
onChange={(e)=>
setLead?.({
...lead,
email:e.target.value
})
}
className="w-full border rounded-xl p-3"
/>

{mode==="view" ? (

<div className="grid grid-cols-2 gap-3">

<div className="border rounded-xl p-4">

<p className="text-gray-500 text-sm">

Status

</p>

<div
className={`mt-2 px-3 py-2 rounded-lg text-center font-medium ${statusColor[lead.status as keyof typeof statusColor]}`}
>

{lead.status}

</div>

</div>

<div className="border rounded-xl p-4">

<p className="text-gray-500 text-sm">

Source

</p>

<div className="mt-2 bg-gray-100 rounded-lg px-3 py-2 text-center">

{lead.source}

</div>

</div>

</div>

):(

<>

<select
value={lead.status}
onChange={(e)=>
setLead?.({
...lead,
status:e.target.value
})
}
className="w-full border rounded-xl p-3"
>

<option value="new">New</option>
<option value="contacted">Contacted</option>
<option value="qualified">Qualified</option>
<option value="lost">Lost</option>

</select>

<select
value={lead.source}
onChange={(e)=>
setLead?.({
...lead,
source:e.target.value
})
}
className="w-full border rounded-xl p-3"
>

<option value="website">Website</option>
<option value="instagram">Instagram</option>
<option value="linkedin">LinkedIn</option>
<option value="facebook">Facebook</option>
<option value="referral">Referral</option>

</select>

</>

)}

<div className="flex justify-end gap-3 pt-4">

<button
onClick={onClose}
className="px-5 py-2 border rounded-xl"
>

Close

</button>

{mode==="view" && (

<button
onClick={()=>
onSave?.({
...lead
})
}
className="bg-green-600 text-white px-5 py-2 rounded-xl"
>

Edit

</button>

)}

{mode==="edit" && (

<button
onClick={()=>
onSave?.(lead)
}
className="bg-blue-600 text-white px-5 py-2 rounded-xl"
>

Save Changes

</button>

)}

</div>

</div>

)}

</div>

</div>

</div>

);

}

export default LeadModal;