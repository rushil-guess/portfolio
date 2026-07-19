import { useEffect, useState } from "react";
import GithubProfileCard from "./GithubProfileCard";
import Reveal from "./Reveal";
import { lazy, Suspense } from "react";
import CountUp from "react-countup";
import RepositorySearch from "./RepositorySearch";
import {
    Github,
    Users,
    BookOpen,
    Star
} from "lucide-react";

import {
    getProfile,
    getPinnedRepos,
    getLanguages
} from "../services/github";

export default function GithubStats(){
    
const GithubStats = lazy(() =>
    import("../components/GithubStats")
    );
const [profile,setProfile]=useState(null);

const [repos,setRepos]=useState([]);

const [languages,setLanguages]=useState({});

useEffect(()=>{

async function load(){

try{

const p=await getProfile();

const r=await getPinnedRepos();

const l=await getLanguages();

setProfile(p);

setRepos(r);

setLanguages(l);

}catch(err){

console.log(err);

}

}

load();

},[]);

if(!profile){

return(
<Reveal>
    
<section id="github">

<h2 className="text-5xl font-bold text-center">

GitHub

</h2>

<p className="text-center mt-10">

Loading...

</p>

</section>
</Reveal>

)

}

return(
<Reveal>

<section id="github">

<div className="max-w-7xl mx-auto">

<h2 className="text-5xl font-bold text-center">

GitHub

</h2>

<p className="secondary text-center mt-4">

My Open Source Work

</p>
<div className="mt-16">
    <GithubProfileCard profile={profile}/>
</div>
<div className="grid md:grid-cols-4 gap-6 mt-14">

<div className="card rounded-xl p-8 text-center">

<Github
size={42}
className="mx-auto text-blue-500"
/>

<h3 className="mt-5 text-4xl font-bold">

<CountUp
end={profile.public_repos}
duration={2}
/>

</h3>

<p>

Repositories

</p>

</div>

<div className="card rounded-xl p-8 text-center">

<Users
size={42}
className="mx-auto text-blue-500"
/>

<h3 className="mt-5 text-4xl font-bold">

{profile.followers}

</h3>

<p>

Followers

</p>

</div>

<div className="card rounded-xl p-8 text-center">

<BookOpen
size={42}
className="mx-auto text-blue-500"
/>

<h3 className="mt-5 text-4xl font-bold">

{profile.following}

</h3>

<p>

Following

</p>

</div>

<div className="card rounded-xl p-8 text-center">

<Star
size={42}
className="mx-auto text-blue-500"
/>

<h3 className="mt-5 text-4xl font-bold">

{repos.reduce((a,b)=>a+b.stargazers_count,0)}

</h3>

<p>

Total Stars

</p>

</div>

</div>

<h2 className="text-3xl font-bold mt-20">

Repositories

</h2>

<div className="mt-10">

<RepositorySearch repos={repos}/>

</div>

<div className="grid md:grid-cols-2 gap-6 mt-8">

{
    
    repos.map(repo=>(
        
        <div
        
        key={repo.id}
        
        className="card rounded-xl p-6"
        
>

<h3 className="text-2xl font-bold">

{repo.name}

</h3>

<p className="secondary mt-3">

{repo.description}

</p>

<div className="flex gap-4 mt-6">

<span>

⭐ {repo.stargazers_count}

</span>

<span>

🍴 {repo.forks_count}

</span>

</div>

<a

href={repo.html_url}

target="_blank"

rel="noreferrer"

className="inline-block mt-6 text-blue-500"

>

View Repository →

</a>

</div>

))

}

</div>

<h2 className="text-3xl font-bold mt-20">

Languages

</h2>

<div className="flex flex-wrap gap-4 mt-8">

{
    
    Object.entries(languages).map(([lang,count])=>(
        
        <div
        
        key={lang}
        
        className="bg-blue-600 px-5 py-3 rounded-full"
        
>

{lang} ({count})

</div>

))

}

</div>

</div>

</section>

</Reveal>
)

}