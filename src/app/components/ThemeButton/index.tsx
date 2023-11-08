"use client";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export const ThemeButton = () => {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") ? localStorage.getItem("theme")! : "light"
  );

  const handleToggle = (): void => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      // add custom data-theme attribute to html tag required to update theme using DaisyUI
      document.querySelector("html")?.setAttribute("data-theme", localTheme);
    }
  }, [theme]);
  return (
    <div>
      <button onClick={handleToggle}>
        {theme === "dark" ? <FaSun /> : <FaMoon />}
      </button>
    </div>
  );
};
