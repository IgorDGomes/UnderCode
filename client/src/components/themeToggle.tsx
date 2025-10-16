import { MoonIcon, SunIcon } from "lucide-react";
import { useState, useEffect } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean>(() => {
    if (localStorage.theme == "dark") return true;

    if (!("theme" in localStorage)) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    return false;
  });

  useEffect(() => {
    if (dark) {
        document.documentElement.classList.add("dark");
        localStorage.theme = "dark";
    } else {
        document.documentElement.classList.remove("dark");
        localStorage.removeItem("theme");
    }
  }, [dark]);

  return (
    <button className="z-50 fixed top-5 right-5 theme-rotate rounded-full p-2 bg-white dark:bg-[#2d2d2d] shadow-sm dark:shadow-white/5 hover:cursor-pointer" onClick={() => setDark(!dark)}>
        {dark ? <SunIcon className="text-white fill-transparent stroke-[1.5]" /> : <MoonIcon className="fill-zinc-700 stroke-0" />}
    </button>
  );
}
