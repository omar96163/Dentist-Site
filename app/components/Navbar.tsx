"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NavItem = ({
  href,
  name,
  onClick,
}: {
  href: string;
  name: string;
  onClick?: () => void;
}) => {
  return (
    <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.95 }}>
      <Link
        href={href}
        onClick={onClick}
        className="relative inline-block px-5 py-2.5 rounded-xl font-medium text-sm transition-colors text-gray-800 dark:text-gray-200 hover:text-blue-600 
        dark:hover:text-blue-300"
      >
        {name}
      </Link>
    </motion.div>
  );
};

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navItems = [
    { name: "الرئيسية", href: "#hero" },
    { name: "الخدمات", href: "#services" },
    { name: "الإحصائيات", href: "#stats" },
    { name: "المقالات", href: "#blog" },
    { name: "CTA", href: "#cta" },
  ];

  return (
    <motion.nav
      role="navigation"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[94%] max-w-7xl z-50 rounded-2xl backdrop-blur-2xl bg-white/60 dark:bg-gray-900/60 
      shadow-xl border border-white/20 dark:border-gray-800/40"
    >
      <div className="px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="flex items-center gap-2.5 group"
            >
              <motion.div
                className="w-10 h-10 bg-linear-to-br from-blue-500 via-cyan-500 to-purple-500 rounded-xl flex items-center justify-center 
                text-white font-bold shadow-2xl shadow-cyan-500/40 group-hover:scale-110 transition duration-300"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-white font-black text-lg">D</span>
              </motion.div>
              <span
                className="text-2xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-gray-900 via-cyan-600 to-purple-600 
                dark:from-white dark:via-cyan-200 dark:to-purple-200"
              >
                دنتي
                <span className="text-purple-600 dark:text-purple-300">
                  كير
                </span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavItem key={item.href} href={item.href} name={item.name} />
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Link href="/booking" onClick={closeMobileMenu}>
              <motion.button
                className="px-6 py-2.5 bg-linear-to-r from-purple-500 to-cyan-500 text-white font-bold rounded-xl shadow-lg cursor-pointer"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.6)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                احجز موعداً
              </motion.button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            className="md:hidden p-2 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm cursor-pointer"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0 }}
                  className="w-6 h-6 flex items-center justify-center relative"
                >
                  <motion.span
                    className="absolute w-6 h-0.5 bg-gray-800 dark:bg-white"
                    animate={{ rotate: 45 }}
                  />
                  <motion.span
                    className="absolute w-6 h-0.5 bg-gray-800 dark:bg-white"
                    animate={{ rotate: -45 }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-1"
                >
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: 24 }}
                    className="block w-6 h-0.5 bg-gray-800 dark:bg-white rounded"
                  />
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: 24 }}
                    transition={{ delay: 0.1 }}
                    className="block w-6 h-0.5 bg-gray-800 dark:bg-white rounded"
                  />
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: 24 }}
                    transition={{ delay: 0.2 }}
                    className="block w-6 h-0.5 bg-gray-800 dark:bg-white rounded"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="mt-4 overflow-hidden rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl 
              border border-white/20 dark:border-gray-800/40 md:hidden"
            >
              <div className="flex flex-col items-center px-4 py-5 gap-6">
                {navItems.map((item) => (
                  <NavItem
                    key={item.href}
                    href={item.href}
                    name={item.name}
                    onClick={closeMobileMenu}
                  />
                ))}
                <Link href="/booking" onClick={closeMobileMenu}>
                  <motion.button
                    className="px-6 py-2.5 bg-linear-to-r from-purple-500 to-cyan-500 text-white font-bold rounded-xl shadow-lg cursor-pointer"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.6)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    احجز موعداً
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
