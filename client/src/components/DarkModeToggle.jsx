import { useState, useEffect } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      className="px-4 py-2 rounded bg-blue-500 text-white"
      onClick={() => setDark((prev) => !prev)}
    >
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
