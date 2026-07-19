import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import {
  Trophy,
  Star,
  Code,
  ExternalLink,
  LoaderCircle,
} from "lucide-react";

const USERNAME = "pod_space_31";

export default function CodeChef() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          "http://localhost:5001/api/codechef"
        );

        const json = await res.json();

        setData(json);
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return (
      <motion.section
  id="codechef"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
>
        <h2 className="text-5xl font-bold text-center">
          CodeChef
        </h2>

        <div className="flex justify-center mt-16">
          <LoaderCircle
            className="animate-spin"
            size={50}
          />
        </div>
      </motion.section>
    );
  }

  if (!data || data.success === false) {
    return (
      <motion.section
  id="codechef"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
>
        <h2 className="text-5xl font-bold text-center">
          CodeChef
        </h2>

        <div className="text-center mt-10">
          Unable to fetch profile.
        </div>
      </motion.section>
    );
  }

  return (
    <Reveal>

    <motion.section
  id="codechef"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
>

      <div className="max-w-7xl mx-auto">

        <h2 className="text-5xl font-bold text-center">
          CodeChef
        </h2>

        <p className="secondary text-center mt-5">
          Competitive Programming Profile
        </p>

        <div className="grid md:grid-cols-4 gap-6 mt-16">

          <Card
            icon={<Star size={35} />}
            title="Current Rating"
            value={data.currentRating}
            />

          <Card
            icon={<Trophy size={35} />}
            title="Highest Rating"
            value={data.highestRating}
            />

          <Card
            icon={<Code size={35} />}
            title="Stars"
            value={data.stars}
            />

          <Card
            icon={<Trophy size={35} />}
            title="Global Rank"
            value={data.globalRank}
            />

        </div>

        <div className="card mt-12 rounded-2xl p-8">

          <h3 className="text-3xl font-bold">
            Profile
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mt-8">

            <Info
              title="Username"
              value={USERNAME}
              />

            <Info
              title="Country Rank"
              value={data.countryRank}
              />

            <Info
              title="Country"
              value={data.countryName}
              />

            <Info
              title="Institution"
              value={data.institution}
              />

          </div>

          <a
            href={`https://www.codechef.com/users/${USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-10 bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700"
            >
            <ExternalLink size={18} />
            View Profile
          </a>

        </div>

      </div>

    </motion.section>
</Reveal>
  );
}

function Card({ icon, title, value }) {
    return (
        <Reveal>

        <div className="card rounded-xl p-8 text-center">

      <div className="flex justify-center text-blue-500">
        {icon}
      </div>

      <h3 className="text-4xl font-bold mt-5">
        {value}
      </h3>

      <p className="mt-3 secondary">
        {title}
      </p>

    </div>
        </Reveal>
  );
}

function Info({ title, value }) {
  return (
    <Reveal>

    <div>

      <p className="secondary">
        {title}
      </p>

      <h3 className="text-xl font-semibold mt-1">
        {value || "-"}
      </h3>

    </div>
    </Reveal>
  );
}