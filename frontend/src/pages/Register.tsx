import { useState } from "react";
import api from "../services/api";

function Register(){

const [message,setMessage]=useState("");

const [form,setForm]=useState({

name:"",
email:"",
password:""

});

const register=async()=>{

if(!form.name.trim()){

setMessage(
"Name is required"
);

return;

}

if(
!/^[^\s@]+@[^\s@]+\.[^\s@]+$/
.test(form.email)
){

setMessage(
"Enter valid email"
);

return;

}

if(
form.password.length<6
){

setMessage(
"Password should be at least 6 characters"
);

return;

}

try{

await api.post(
"/auth/register",
form
);

setMessage(
"Registration successful"
);

setTimeout(()=>{

window.location.href="/";

},1500);

}
catch(error:any){

if(
error.response?.data?.message
){

setMessage(
error.response.data.message
);

}else{

setMessage(
"Registration failed"
);

}

}

};

return(

<div className="min-h-screen flex justify-center items-center bg-slate-100 px-4">

<div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md">

{message && (

<div className="bg-red-100 text-red-700 p-3 rounded-xl mb-4">

{message}

</div>

)}

<div className="mb-6">

<h2 className="text-3xl font-bold text-gray-800">

⚡ Smart Leads CRM

</h2>

<p className="text-gray-500 text-sm mt-1">

Manage and track your business leads

</p>

</div>

<h1 className="text-2xl font-bold mb-4 text-gray-800">

Create Account

</h1>

<input
className="border border-gray-200 rounded-xl p-3 w-full mb-4 focus:ring-2 focus:ring-blue-400 outline-none transition"
placeholder="Name"
onChange={(e)=>
setForm({
...form,
name:e.target.value
})
}
/>

<input
className="border border-gray-200 rounded-xl p-3 w-full mb-4 focus:ring-2 focus:ring-blue-400 outline-none transition"
placeholder="Email"
onChange={(e)=>
setForm({
...form,
email:e.target.value
})
}
/>

<input
type="password"
className="border border-gray-200 rounded-xl p-3 w-full mb-4 focus:ring-2 focus:ring-blue-400 outline-none transition"
placeholder="Password"
onChange={(e)=>
setForm({
...form,
password:e.target.value
})
}
/>

<button
onClick={register}
className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl w-full transition font-medium"
>

Register

</button>

<p className="mt-5 text-center text-gray-600">

Already have account?

<a
href="/"
className="text-blue-600 ml-2 font-medium"
>

Login

</a>

</p>

</div>

</div>

);

}

export default Register;