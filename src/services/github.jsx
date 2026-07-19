const USERNAME = "rushil-guess";

const BASE = "https://api.github.com";

export async function getProfile() {
  const res = await fetch(`${BASE}/users/${USERNAME}`);

  if (!res.ok) {
    throw new Error("Unable to fetch profile");
  }

  return await res.json();
}

export async function getRepos() {
  const res = await fetch(
    `${BASE}/users/${USERNAME}/repos?sort=updated&per_page=100`
  );

  if (!res.ok) {
    throw new Error("Unable to fetch repositories");
  }

  const repos = await res.json();

  return repos.filter(repo => !repo.fork);
}

export async function getPinnedRepos() {

  const repos = await getRepos();

  return repos
    .sort((a,b)=>b.stargazers_count-a.stargazers_count)
    .slice(0,6);

}

export async function getLanguages(){

const repos = await getRepos();

const languages={};

for(const repo of repos){

if(repo.language){

languages[repo.language]=(languages[repo.language]||0)+1;

}

}

return languages;

}