import { useState } from "react";

export default function RepositorySearch({
  repos
}) {

  const [search,setSearch]=useState("");

  const filtered = repos.filter(repo =>
    repo.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

<div>

<input

type="text"

placeholder="Search Repository..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="w-full card p-4 rounded-xl mb-8 outline-none"

/>

<div className="grid md:grid-cols-2 gap-6">

{

filtered.map(repo=>(

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

<div className="mt-5 flex gap-5">

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

Open Repository →

</a>

</div>

))

}

</div>

</div>

)

}