import { useEffect, useState } from "react";
import api from "../services/api";
import LeadTable from "../components/LeadTable";
import Navbar from "../components/Navbar";
import LeadModal from "../components/LeadModal";

interface Lead{
_id:string;
name:string;
email:string;
status:string;
source:string;
}

interface DashboardStats{
totalLeads:number;
newLeads:number;
contactedLeads:number;
qualifiedLeads:number;
lostLeads:number;
}

function Dashboard(){

const [message,setMessage]=useState("");
const [selectedLead,setSelectedLead]=useState<Lead | null>(null);

const [modalOpen,setModalOpen]=useState(false);

const [modalMode,setModalMode]=useState<
"view"|"edit"|"delete"
>("view");
const [role,setRole]=useState("");
const [stats,setStats]=useState<DashboardStats | null>(null);
const [leads,setLeads]=useState<Lead[]>([]);
const [loading,setLoading]=useState(false);

const [search,setSearch]=useState("");
const [status,setStatus]=useState("");
const [source,setSource]=useState("");
const [sort,setSort]=useState("latest");
const [page,setPage]=useState(1);

const [totalPages,setTotalPages]=useState(1);
const [leadForm,setLeadForm]=useState({
name:"",
email:"",
status:"new",
source:"website"
});

const token=
localStorage.getItem("token");

useEffect(()=>{

fetchDashboard();

},[]);

useEffect(()=>{
const user=
JSON.parse(
localStorage.getItem("user") || "{}"
);

setRole(
user.role || ""
);
const timer=setTimeout(()=>{

fetchLeads();

},500);

return()=>clearTimeout(timer);

},[
search,
status,
source,
sort,
page
]);

const fetchDashboard=async()=>{

try{

const response=await api.get(
"/dashboard",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

setStats(response.data);

}catch(error){

console.log(error);

}

};

const fetchLeads=async()=>{

setLoading(true);

try{

const response=
await api.get(
`/leads?search=${search}&status=${status}&source=${source}&sort=${sort}&page=${page}&limit=10`,
{
headers:{
Authorization:
`Bearer ${token}`
}
}
);

setLeads(
response.data.leads
);

setTotalPages(
response.data.pages
);

}catch(error){

console.log(error);

}finally{

setLoading(false);

}

};

const createLead=async()=>{

if(!leadForm.name.trim()){

setMessage(
"Name required"
);

return;

}

if(
!/^[^\s@]+@[^\s@]+\.[^\s@]+$/
.test(
leadForm.email
)
){

setMessage(
"Enter valid email"
);

return;

}

try{

await api.post(
"/leads",
leadForm,
{
headers:{
Authorization:
`Bearer ${token}`
}
}
);

fetchLeads();
fetchDashboard();

setLeadForm({
name:"",
email:"",
status:"new",
source:"website"
});

setMessage(
"Lead created successfully"
);

setTimeout(()=>{

setMessage("");

},3000);

}catch(error){

console.log(error);

}

};

const updateLead=async(
id:string,
status:string
)=>{

try{

await api.put(
`/leads/${id}`,
{status},
{
headers:{
Authorization:
`Bearer ${token}`
}
}
);

fetchLeads();
fetchDashboard();

}catch(error){

console.log(error);

}

};

const deleteLead=async(
id:string
)=>{

try{

await api.delete(
`/leads/${id}`,
{
headers:{
Authorization:
`Bearer ${token}`
}
}
);

setModalOpen(false);

fetchLeads();
fetchDashboard();

}catch(error){

console.log(error);

}

};

const viewLead=async(
id:string
)=>{

try{

const response=
await api.get(
`/leads/${id}`,
{
headers:{
Authorization:
`Bearer ${token}`
}
}
);

setSelectedLead(
response.data
);

setModalMode("view");

setModalOpen(true);

}catch(error){

console.log(error);

}

};

const editLead=(lead:Lead)=>{

setSelectedLead(lead);

setModalMode("edit");

setModalOpen(true);

};

const saveLead=async(
lead:Lead
)=>{

try{

await api.put(
`/leads/${lead._id}`,
{
name:lead.name,
email:lead.email,
status:lead.status,
source:lead.source
},
{
headers:{
Authorization:
`Bearer ${token}`
}
}
);

setModalOpen(false);

fetchLeads();

fetchDashboard();

setMessage(
"Lead updated successfully"
);

setTimeout(()=>{

setMessage("");

},3000);

}catch(error){

console.log(error);

}

};

const openDelete=(lead:Lead)=>{

setSelectedLead(lead);

setModalMode("delete");

setModalOpen(true);

};

const logout=()=>{

localStorage.removeItem(
"token"
);

window.location.href="/";

};
const exportCSV=async()=>{

try{

const response=
await api.get(
"/leads/export/csv",
{
headers:{
Authorization:
`Bearer ${token}`
},
responseType:"blob"
}
);

const url=
window.URL.createObjectURL(
new Blob([response.data])
);

const link=
document.createElement("a");

link.href=url;

link.setAttribute(
"download",
"leads.csv"
);

document.body.appendChild(
link
);

link.click();

link.remove();

}catch(error){

console.log(error);

}

};
return(

<div className="min-h-screen bg-gray-100 p-4 md:p-6">

<Navbar
logout={logout}
userName={
JSON.parse(
localStorage.getItem("user") || "{}"
).name || "User"
}
/>

{message && (

<div className="bg-green-100 text-green-700 p-3 rounded mb-4">

{message}

</div>

)}

{stats && (

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">

<div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-2xl p-5 shadow-lg hover:-translate-y-1 transition">

<p className="opacity-80">
Total
</p>

<h2 className="text-4xl font-bold mt-2">
{stats.totalLeads}
</h2>

</div>

<div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl p-5 shadow-lg hover:-translate-y-1 transition">

<p className="opacity-80">
New
</p>

<h2 className="text-4xl font-bold mt-2">
{stats.newLeads}
</h2>

</div>

<div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-2xl p-5 shadow-lg hover:-translate-y-1 transition">

<p className="opacity-80">
Contacted
</p>

<h2 className="text-4xl font-bold mt-2">
{stats.contactedLeads}
</h2>

</div>

<div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-5 shadow-lg hover:-translate-y-1 transition">

<p className="opacity-80">
Qualified
</p>

<h2 className="text-4xl font-bold mt-2">
{stats.qualifiedLeads}
</h2>

</div>

<div className="bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl p-5 shadow-lg hover:-translate-y-1 transition">

<p className="opacity-80">
Lost
</p>

<h2 className="text-4xl font-bold mt-2">
{stats.lostLeads}
</h2>

</div>

</div>

)}

<div className="bg-white rounded-2xl shadow-md p-6 mb-6">

<h2 className="font-bold text-lg mb-4">
Add Lead
</h2>

<div className="grid md:grid-cols-4 gap-3">

<input
className="border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
placeholder="Enter lead name"
value={leadForm.name}
onChange={(e)=>
setLeadForm({
...leadForm,
name:e.target.value
})
}
/>

<input
className="border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
placeholder="Enter email"
value={leadForm.email}
onChange={(e)=>
setLeadForm({
...leadForm,
email:e.target.value
})
}
/>

<select
value={leadForm.source}
onChange={(e)=>
setLeadForm({
...leadForm,
source:e.target.value
})
}
className="border border-gray-200 p-3 rounded-xl"
>

<option value="website">
Website
</option>

<option value="instagram">
Instagram
</option>

<option value="linkedin">
LinkedIn
</option>

<option value="facebook">
Facebook
</option>

<option value="referral">
Referral
</option>

</select>

<button
onClick={createLead}
className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
>

+ Add Lead

</button>

</div>

</div>

<div className="bg-white rounded-2xl shadow-md p-6 mb-6">

<h2 className="font-bold text-lg mb-4">
Filters
</h2>

<div className="grid grid-cols-1 md:grid-cols-4 gap-3">

<input
className="border border-gray-200 p-3 rounded-xl"
placeholder="Search leads..."
value={search}
onChange={(e)=>
setSearch(e.target.value)
}
/>

<select
className="border border-gray-200 p-3 rounded-xl"
value={status}
onChange={(e)=>
setStatus(e.target.value)
}
>

<option value="">
All Status
</option>

<option value="new">
New
</option>

<option value="contacted">
Contacted
</option>

<option value="qualified">
Qualified
</option>

<option value="lost">
Lost
</option>

</select>

<select
className="border border-gray-200 p-3 rounded-xl"
value={source}
onChange={(e)=>
setSource(e.target.value)
}
>

<option value="">
All Sources
</option>

<option value="website">
Website
</option>

<option value="instagram">
Instagram
</option>

<option value="referral">
Referral
</option>

</select>

<select
className="border border-gray-200 p-3 rounded-xl"
value={sort}
onChange={(e)=>
setSort(e.target.value)
}
>

<option value="latest">
Latest
</option>

<option value="oldest">
Oldest
</option>

</select>

</div>

</div>

<div className="flex justify-end mb-4">

<button
onClick={exportCSV}
className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-medium"
>

Export CSV

</button>

</div>

{loading ? (

<div className="text-center p-6">

Loading...

</div>

):(

<LeadTable
leads={leads}
onDelete={(id)=>{

const lead=
leads.find(
l=>l._id===id
);

if(lead){

openDelete(
lead
);

}

}}
onView={viewLead}
onEdit={editLead}
onUpdate={updateLead}
role={role}
/>

)}
<div className="flex justify-center items-center gap-4 mt-6">

<button
disabled={page===1}
onClick={()=>
setPage(page-1)
}
className={`px-4 py-2 rounded-lg
${
page===1
?
"bg-gray-300"
:
"bg-blue-600 text-white"
}`}
>

Previous

</button>

<span className="font-medium">

Page {page} of {totalPages}

</span>

<button
disabled={page===totalPages}
onClick={()=>
setPage(page+1)
}
className={`px-4 py-2 rounded-lg
${
page===totalPages
?
"bg-gray-300"
:
"bg-blue-600 text-white"
}`}
>

Next

</button>

</div>
<LeadModal
lead={selectedLead}
open={modalOpen}
mode={modalMode}

onClose={()=>{
setModalOpen(false);
}}

setLead={setSelectedLead}

onSave={(lead)=>{

if(modalMode==="view"){
setModalMode("edit");
return;
}

if(modalMode==="edit"){
saveLead(lead);
setModalOpen(false);
}

}}

onDelete={()=>{

if(selectedLead){
deleteLead(selectedLead._id);
setModalOpen(false);
}

}}
/>
</div>

);
}

export default Dashboard;