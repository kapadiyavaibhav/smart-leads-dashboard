import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login(){

const navigate=useNavigate();

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [message,setMessage]=useState("");

const handleLogin=async(
e:React.FormEvent
)=>{

e.preventDefault();

try{

const response=
await api.post(
"/auth/login",
{
email,
password
}
);

localStorage.setItem(
"token",
response.data.token
);

localStorage.setItem(
"user",
JSON.stringify(
response.data.user
)
);

navigate("/dashboard");

}catch(error:any){

setMessage(
error.response?.data?.message
||
"Login failed"
);

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

Welcome Back

</h1>

<form onSubmit={handleLogin}>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>
setEmail(e.target.value)
}
className="border border-gray-200 rounded-xl p-3 w-full mb-4 focus:ring-2 focus:ring-blue-400 outline-none transition"
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>
setPassword(e.target.value)
}
className="border border-gray-200 rounded-xl p-3 w-full mb-4 focus:ring-2 focus:ring-blue-400 outline-none transition"
/>

<button
type="submit"
className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl w-full transition font-medium"
>

Login

</button>

<p className="mt-5 text-center text-gray-600">

Don't have account?

<a
href="/register"
className="text-blue-600 ml-2 font-medium"
>

Register

</a>

</p>

</form>

</div>

</div>

);

}

export default Login;