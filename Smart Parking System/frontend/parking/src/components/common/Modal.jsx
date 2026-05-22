import {motion} from "framer-motion";

export default function Modal ({
  open,
  onClose,
  title,
  children,
}) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
    >

      <motion.div
        onClick={(e) =>
          e.stopPropagation()
        }
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-[32px] p-8 shadow-2xl"
      >

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold dark:text-white">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400"
          >
            ✕
          </button>

        </div>

        <div className="mt-6">
          {children}
        </div>

      </motion.div>
    </div>
  );
}