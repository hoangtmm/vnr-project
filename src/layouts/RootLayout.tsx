import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollTop from "../components/ScrollTop";
import { AnimatePresence, motion } from "framer-motion";
import { fade } from "../anim";
import CommandPalette from "../components/CommandPalette"; // ⬅️ thêm dòng này

export default function RootLayout() {
  const location = useLocation();
  return (
    <div className="min-h-dvh flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* CommandPalette phải ở TRONG Router → đặt tại đây */}
        <CommandPalette>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={fade}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </CommandPalette>
      </main>
      <Footer />
      <ScrollTop />
    </div>
  );
}
