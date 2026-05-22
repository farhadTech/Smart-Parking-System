import {Outlet} from "react-router-dom";
import {motion} from "framer-motion";
import Footer from "../components/common/Footer";

export default function MainLayout () {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">

      {/* Animated main wrapper */}
      <motion.main
        className="flex-1"
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        <Outlet />
      </motion.main>

      <Footer />
    </div>
  );
}
