import { motion } from "framer-motion";
import { MapPin, Building, Link2 } from "lucide-react";
import Reveal from "./Reveal";

export default function GithubProfileCard({ profile }) {
  return (
    <Reveal>

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: .5 }}
      className="card rounded-2xl p-8 shadow-xl"
      >
      <div className="flex flex-col md:flex-row gap-8 items-center">

        <img
          src={profile.avatar_url}
          alt={profile.login}
          className="w-40 h-40 rounded-full border-4 border-blue-500"
          />

        <div className="flex-1">

          <h2 className="text-4xl font-bold">
            {profile.name}
          </h2>

          <p className="text-blue-400 mt-2">
            @{profile.login}
          </p>

          <p className="secondary mt-5 leading-7">
            {profile.bio}
          </p>

          <div className="mt-6 space-y-3">

            {profile.location && (
                <div className="flex gap-3">
                <MapPin size={18}/>
                {profile.location}
              </div>
            )}

            {profile.company && (
                <div className="flex gap-3">
                <Building size={18}/>
                {profile.company}
              </div>
            )}

            {profile.blog && (
                <a
                href={profile.blog}
                target="_blank"
                rel="noreferrer"
                className="flex gap-3 text-blue-400"
                >
                <Link2 size={18}/>
                {profile.blog}
              </a>
            )}

          </div>

        </div>

      </div>
    </motion.div>
            </Reveal>
  );
}