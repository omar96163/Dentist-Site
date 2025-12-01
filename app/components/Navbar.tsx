"use client";

import Link from "next/link";
import { useEffect, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

// -------------------------------------------------
// Nav Item Component (Optimized + memoized)
// -------------------------------------------------
const NavItem = React.memo(function NavItem({
  name,
  href,
  active,
  onClick,
}: {
  name: string;
  href: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.96 }}>
      <a
        href={href}
        onClick={onClick}
        className="relative px-5 py-2.5 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-cyan-500 dark:hover:text-cyan-300 transition"
      >
        {name}

        {/* Underline (Active) */}
        {active && (
          <motion.span
            layoutId="underline"
            className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[3px] w-6 rounded-full bg-cyan-500 dark:bg-cyan-300"
          />
        )}
      </a>
    </motion.div>
  );
});

// -------------------------------------------------
// ScrollSpy Hook
// -------------------------------------------------
const useScrollSpy = (sectionIds: string[]) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(`#${entry.target.id}`);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
};

// -------------------------------------------------
// Main Navbar
// -------------------------------------------------
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sectionIds = useMemo(
    () => ["hero", "services", "stats", "blog", "cta"],
    []
  );

  const activeSection = useScrollSpy(sectionIds);

  const navItems = useMemo(
    () => [
      { name: "الرئيسية", href: "#hero" },
      { name: "الخدمات", href: "#services" },
      { name: "الإحصائيات", href: "#stats" },
      { name: "المقالات", href: "#blog" },
      { name: "CTA", href: "#cta" },
    ],
    []
  );

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 250, damping: 25 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 w-[94%] max-w-7xl z-50 rounded-2xl backdrop-blur-2xl bg-white/60 dark:bg-gray-900/60 shadow-xl border border-white/20 dark:border-gray-800/40"
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
                className="w-10 h-10 bg-linear-to-br from-cyan-500 via-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold shadow-xl"
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-white font-black text-lg">D</span>
              </motion.div>

              <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-gray-900 via-cyan-600 to-purple-600 dark:from-white dark:via-cyan-200 dark:to-purple-200">
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
              <NavItem
                key={item.href}
                name={item.name}
                href={item.href}
                active={activeSection === item.href}
              />
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link href="/booking">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 font-bold text-white rounded-xl shadow-lg bg-linear-to-r from-purple-500 to-cyan-500"
              >
                احجز موعداً
              </motion.button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="toggle menu"
            className="md:hidden p-2 rounded-xl bg-white/70 dark:bg-gray-800/60 backdrop-blur-md"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-6 h-6 relative"
                >
                  <span className="absolute w-6 h-0.5 bg-gray-800 dark:bg-white rotate-45 top-1/2 -translate-y-1/2"></span>
                  <span className="absolute w-6 h-0.5 bg-gray-800 dark:bg-white -rotate-45 top-1/2 -translate-y-1/2"></span>
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-1"
                >
                  <span className="block w-6 h-0.5 bg-gray-800 dark:bg-white"></span>
                  <span className="block w-6 h-0.5 bg-gray-800 dark:bg-white"></span>
                  <span className="block w-6 h-0.5 bg-gray-800 dark:bg-white"></span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="md:hidden mt-4 rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-white/20 dark:border-gray-800/40"
            >
              <div className="flex flex-col items-center px-4 py-5 gap-6">
                {navItems.map((item) => (
                  <NavItem
                    key={item.href}
                    name={item.name}
                    href={item.href}
                    active={activeSection === item.href}
                    onClick={closeMobileMenu}
                  />
                ))}

                <Link href="/booking" onClick={closeMobileMenu}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 bg-linear-to-r from-purple-500 to-cyan-500 text-white font-bold rounded-xl shadow-lg"
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
}
