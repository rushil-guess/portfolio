import { useEffect, useState } from "react";

export default function CursorGlow() {

const [pos,setPos]=useState({
x:0,
y:0
});

useEffect(()=>{

const move=(e)=>{

setPos({

x:e.clientX,

y:e.clientY

});

};

window.addEventListener("mousemove",move);

return()=>window.removeEventListener("mousemove",move);

},[]);

return(

<div

className="fixed w-40 h-40 rounded-full pointer-events-none z-40"

style={{

left:pos.x-80,

top:pos.y-80,

background:
"radial-gradient(circle,rgba(59,130,246,.18),transparent 70%)",

transition:"left .05s linear, top .05s linear"

}}

/>

)

}