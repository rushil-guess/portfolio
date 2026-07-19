import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import {
  Trophy,
  Code,
  ExternalLink,
  LoaderCircle,
  CheckCircle,
  Award,
} from "lucide-react";

const USERNAME = "grushilreddy";

export default function LeetCode() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("http://localhost:5001/api/leetcode");
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
        id="leetcode"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-5xl font-bold text-center">LeetCode</h2>

        <div className="flex justify-center mt-16">
          <LoaderCircle className="animate-spin" size={50} />
        </div>
      </motion.section>
    );
  }

  if (!data || data.success === false) {
    return (
      <motion.section
        id="leetcode"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-5xl font-bold text-center">LeetCode</h2>

        <div className="text-center mt-10">
          Unable to fetch profile.
        </div>
      </motion.section>
    );
  }

  return (
    <Reveal>
      <motion.section
        id="leetcode"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center">
            LeetCode
          </h2>

          <p className="secondary text-center mt-5">
            Competitive Programming Profile
          </p>

          <div className="grid md:grid-cols-4 gap-6 mt-16">
            <Card
              icon={<CheckCircle size={35} />}
              title="Problems Solved"
              value={data.totalSolved}
            />

            <Card
              icon={<Code size={35} />}
              title="Contest Rating"
              value={data.contestRating}
            />

            <Card
              icon={<Award size={35} />}
              title="Global Rank"
              value={data.ranking}
            />

            <Card
              icon={<Trophy size={35} />}
              title="Acceptance"
              value={data.acceptanceRate}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <Card
              icon={<CheckCircle size={30} />}
              title="Easy"
              value={data.easySolved}
            />

            <Card
              icon={<CheckCircle size={30} />}
              title="Medium"
              value={data.mediumSolved}
            />

            <Card
              icon={<CheckCircle size={30} />}
              title="Hard"
              value={data.hardSolved}
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
                title="Real Name"
                value={data.realName}
              />

              <Info
                title="Country"
                value={data.country}
              />

              <Info
                title="Institution"
                value={data.school}
              />

              <Info
                title="Contribution Points"
                value={data.contributionPoints}
              />

              <Info
                title="Reputation"
                value={data.reputation}
              />
            </div>

            <a
              href={`https://leetcode.com/u/${USERNAME}/`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-10 bg-yellow-500 px-6 py-3 rounded-lg hover:bg-yellow-600 text-black font-semibold"
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
        <div className="flex justify-center text-yellow-500">
          {icon}
        </div>

        <h3 className="text-4xl font-bold mt-5">
          {value ?? "-"}
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