import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {

  const { theme, toggleTheme } = useTheme();

  return (

<button

style={{

transform:

theme==="dark"

?

"rotate(0deg)"

:

"rotate(180deg)"

}}

className="fixed right-6 top-24

z-50

p-4

rounded-full

bg-blue-600

hover:bg-blue-700

transition-all

duration-500"
>

{

theme==="dark"

?

<Sun size={22}/>

:

<Moon size={22}/>

}

</button>

)

}