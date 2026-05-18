interface Props{
logout:()=>void;
userName:string;
}

function Navbar({
logout,
userName
}:Props){

return(

<div className="bg-white rounded-xl shadow-md p-5 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">

<div>

<h1 className="text-3xl font-bold text-gray-800">

Smart Leads CRM

</h1>

<p className="text-gray-500">

Manage and track your business leads

</p>

</div>

<div className="flex items-center gap-4">

<div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center font-bold text-lg shadow">

{userName?.charAt(0).toUpperCase()}

</div>

<button
onClick={logout}
className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition shadow"
>

Logout

</button>

</div>

</div>

);

}

export default Navbar;