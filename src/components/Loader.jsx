import { useEffect, useState } from "react";

export default function Loader() {

const [loading,setLoading]=useState(true);

useEffect(()=>{

const timer=setTimeout(()=>{

setLoading(false);

},1800);

return()=>clearTimeout(timer);

},[]);

if(!loading) return null;

return(

<div className="fixed inset-0 bg-[#0f172a] flex items-center justify-center z-[9999]">

<div className="text-center">

<div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"/>

<h1 className="mt-8 text-4xl font-bold">

Rushil.

</h1>

<p className="mt-3 text-gray-400">

Loading Portfolio...

</p>

</div>

</div>

)

}