import Reveal from "./Reveal";
const skills = {

Frontend:[
"React",
"JavaScript",
"HTML",
"CSS",
"Tailwind"
],

Backend:[
"Node.js",
"Express",
"MongoDB",
"MySQL"
],

Programming:[
"Python",
"Java",
"C"
],

AI:[
"TensorFlow",
"OpenCV",
"Gemini API"
],

Tools:[
"Git",
"GitHub",
"Linux",
"Jenkins"
]

}

export default function Skills(){

return(
<Reveal>

<section id="skills">

<h2 className="text-5xl font-bold mb-12">
Skills
</h2>

<div className="grid md:grid-cols-3 gap-8">

{
    
    Object.entries(skills).map(([title,list])=>(
        
        <div
        key={title}
        className="card p-8 rounded-xl shadow-lg"
>

<h3 className="text-2xl mb-6 text-blue-500">

{title}

</h3>

<div className="flex flex-wrap gap-3">

{
    
    list.map(skill=>(
        
        <span
        key={skill}
        className="bg-blue-600 px-4 py-2 rounded-lg"
>

{skill}

</span>

))

}

</div>

</div>

))

}

</div>

</section>
</Reveal>

)

}