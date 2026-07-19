import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Reveal from "./Reveal";
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Copy,
  Code
} from "lucide-react";

import { sendEmail } from "../services/email";

export default function Contact() {

const [form,setForm]=useState({
name:"",
email:"",
subject:"",
message:""
});

const handleChange=(e)=>{
setForm({
...form,
[e.target.name]:e.target.value
});
};

const handleSubmit=async(e)=>{

e.preventDefault();

if(
!form.name||
!form.email||
!form.subject||
!form.message
){
toast.error("Please fill all fields");
return;
}

try{

await sendEmail(form);

toast.success("Message sent successfully!");

setForm({
name:"",
email:"",
subject:"",
message:""
});

}catch(err){

toast.error("Unable to send message.");

}

};

const copy=(text)=>{
navigator.clipboard.writeText(text);
toast.success("Copied");
};

return(
<Reveal>

<motion.section

id="contact"

initial={{opacity:0,y:50}}

whileInView={{opacity:1,y:0}}

transition={{duration:.8}}

>

<div className="max-w-7xl mx-auto">

<h2 className="text-5xl font-bold text-center">

Contact Me

</h2>

<p className="text-center secondary mt-4">

Let's build something amazing together.

</p>

<div className="grid lg:grid-cols-2 gap-12 mt-16">

<div>

<div className="space-y-6">

<ContactCard

icon={<Mail/>}

title="Email"

value="grushilreddy2004@gmail.com"

copy={()=>copy("grushilreddy2004@gmail.com")}

/>

<ContactCard

icon={<Phone/>}

title="Phone"

value="+91 7013650345"

copy={()=>copy("+917013650345")}

/>

</div>

<div className="flex gap-5 mt-10">

<Social

icon={<Github/>}

link="https://github.com/rushil-guess"

/>

<Social

icon={<Linkedin/>}

link="https://www.linkedin.com/in/rushil-reddy-gujjula-12212a284/"

/>

<Social

icon={<Code/>}

link="https://www.codechef.com/users/pod_space_31"

/>

</div>

</div>

<form

onSubmit={handleSubmit}

className="card rounded-2xl p-8"

>

<input

name="name"

placeholder="Your Name"

value={form.name}

onChange={handleChange}

className="w-full p-4 rounded-xl bg-[#1f2937] mb-5 outline-none"

/>

<input

name="email"

placeholder="Your Email"

value={form.email}

onChange={handleChange}

className="w-full p-4 rounded-xl bg-[#1f2937] mb-5 outline-none"

/>

<input

name="subject"

placeholder="Subject"

value={form.subject}

onChange={handleChange}

className="w-full p-4 rounded-xl bg-[#1f2937] mb-5 outline-none"

/>

<textarea

rows="6"

name="message"

placeholder="Message"

value={form.message}

onChange={handleChange}

className="w-full p-4 rounded-xl bg-[#1f2937] mb-6 outline-none"

/>

<button

className="w-full bg-blue-600 py-4 rounded-xl hover:bg-blue-700 transition"

>

Send Message

</button>

</form>

</div>

</div>

</motion.section>

</Reveal>
)

}

function ContactCard({
    
    icon,
    
    title,
    
    value,
    
    copy
    
}){

return(


<div className="card rounded-xl p-6 flex justify-between items-center">

<div className="flex gap-4 items-center">

<div className="text-blue-500">

{icon}

</div>

<div>

<p className="secondary">

{title}

</p>

<h3>

{value}

</h3>

</div>

</div>

<button

onClick={copy}

>

<Copy/>

</button>

</div>


)

}

function Social({
    
    icon,
    
    link
    
}){
    
return(

<a

href={link}

target="_blank"

rel="noreferrer"

className="card p-5 rounded-full hover:bg-blue-600 transition"

>

{icon}

</a>

)

}