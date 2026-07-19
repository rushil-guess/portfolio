import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import Reveal from "./Reveal";
export default function Footer() {

const year = new Date().getFullYear();

const scrollTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};

return (
<Reveal>
<footer className="bg-[#0b1120] border-t border-gray-800 mt-20">

<div className="max-w-7xl mx-auto px-8 py-16">

<div className="grid md:grid-cols-3 gap-12">

{/* Left */}

<div>

<h2 className="text-3xl font-bold">

Rushil<span className="text-blue-500">.</span>

</h2>

<p className="mt-5 secondary leading-8">

Full Stack Developer passionate about
building scalable web applications,
AI solutions and modern software.

</p>

</div>

{/* Middle */}

<div>

<h3 className="text-2xl font-semibold mb-6">

Quick Links

</h3>

<div className="flex flex-col gap-4">

<a href="#home" className="hover:text-blue-400 transition">

Home

</a>

<a href="#about" className="hover:text-blue-400 transition">

About

</a>

<a href="#skills" className="hover:text-blue-400 transition">

Skills

</a>

<a href="#experience" className="hover:text-blue-400 transition">

Experience

</a>

<a href="#projects" className="hover:text-blue-400 transition">

Projects

</a>

<a href="#github" className="hover:text-blue-400 transition">

GitHub

</a>

<a href="#codechef" className="hover:text-blue-400 transition">

CodeChef

</a>

<a href="#contact" className="hover:text-blue-400 transition">

Contact

</a>

</div>

</div>

{/* Right */}

<div>

<h3 className="text-2xl font-semibold mb-6">

Connect

</h3>

<div className="flex gap-5">

<a

href="https://github.com/rushil-guess"

target="_blank"

rel="noreferrer"

className="card p-4 rounded-full hover:bg-blue-600 transition"

>

<Github size={22}/>

</a>

<a

href="https://www.linkedin.com/in/rushil-reddy-gujjula-12212a284/"

target="_blank"

rel="noreferrer"

className="card p-4 rounded-full hover:bg-blue-600 transition"

>

<Linkedin size={22}/>

</a>

<a

href="mailto:grushilreddy2004@gmail.com"

className="card p-4 rounded-full hover:bg-blue-600 transition"

>

<Mail size={22}/>

</a>

</div>

<button

onClick={scrollTop}

className="mt-10 flex items-center gap-3 bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-700 transition"

>

<ArrowUp size={20}/>

Back To Top

</button>

</div>

</div>

<hr className="my-10 border-gray-800"/>

<div className="flex flex-col md:flex-row justify-between items-center gap-4">

<p className="text-gray-500">

© {year} Rushil Reddy Gujjula.
All Rights Reserved.

</p>

<p className="text-gray-500">

Designed & Developed with ❤️ using React + Tailwind CSS

</p>

</div>

</div>

</footer>
</Reveal>
);

}