import {
  Command,
} from "cmdk";

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

export default function CommandPalette () {
  const [
    open,
    setOpen,
  ] = useState(false);

  const navigate =
    useNavigate();

  useEffect(() => {
    const down = (e) => {
      if (
        (e.metaKey ||
          e.ctrlKey) &&
        e.key === "k"
      ) {
        e.preventDefault();

        setOpen(
          (open) =>
            !open
        );
      }
    };

    document.addEventListener(
      "keydown",
      down
    );

    return () =>
      document.removeEventListener(
        "keydown",
        down
      );
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-start justify-center pt-40">

      <Command className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl">

        <Command.Input
          placeholder="Search pages..."
          className="w-full h-16 px-6 outline-none border-b border-gray-100 dark:border-gray-800 bg-transparent"
        />

        <Command.List className="p-3">

          <Command.Item
            onSelect={() =>
              navigate(
                "/dashboard"
              )
            }
            className="px-5 py-4 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
          >
            Dashboard
          </Command.Item>

          <Command.Item
            onSelect={() =>
              navigate(
                "/parking-slots"
              )
            }
            className="px-5 py-4 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
          >
            Parking Slots
          </Command.Item>

          <Command.Item
            onSelect={() =>
              navigate(
                "/reservations"
              )
            }
            className="px-5 py-4 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
          >
            Reservations
          </Command.Item>

        </Command.List>

      </Command>

    </div>
  );
}
