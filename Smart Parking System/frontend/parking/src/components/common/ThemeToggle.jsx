import {
  Moon,
  Sun,
} from "lucide-react";

import {useTheme} from "../../context/ThemeContext";

export default function ThemeToggle () {
  const {
    darkMode,
    setDarkMode,
  } = useTheme();

  return (
    <button
      onClick={() =>
        setDarkMode(!darkMode)
      }
      className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center transition"
    >

      {darkMode ? (
        <Sun
          size={20}
          className="text-yellow-400"
        />
      ) : (
        <Moon
          size={20}
          className="text-gray-700"
        />
      )}

    </button>
  );
}
