import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  "Home",
  "About",
  "Skills",
  "Experience",
  "Projects",
  "GitHub",
  "CodeChef",
  "Contact",
];
export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[var(--bg)]/80 backdrop-blur-lg shadow-md">
      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-500">
          Rushil<span className="text-[var(--text)]">.</span>
        </h1>

        <ul className="hidden md:flex gap-8 text-gray-300">
          {links.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="hover:text-blue-400 transition"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden text-[var(--text)]"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {open && (
        <div className="card md:hidden">
          {links.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block px-8 py-4 border-b border-gray-700"
              onClick={() => setOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}