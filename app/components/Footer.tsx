"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Twitter,
  Facebook,
  ChevronUp,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    const duration = 800;
    const start = window.scrollY;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      window.scrollTo(0, start * (1 - easeOut));
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };
    requestAnimationFrame(animateScroll);
  };

  return (
    <footer className="relative overflow-hidden border-t border-gray-800/50 bg-linear-to-b from-gray-900/95 to-black/95">
      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            className="flex flex-col items-center md:items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.15 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="w-12 h-12 bg-linear-to-br from-blue-500 via-cyan-500 to-purple-500 rounded-xl flex items-center justify-center 
                text-white font-bold shadow-2xl shadow-cyan-500/40"
              >
                D
              </motion.div>
              <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-white via-cyan-200 to-purple-200">
                دنتي<span className="text-purple-300">كير</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm text-center md:text-right max-w-xs leading-relaxed">
              رعاية أسنانك أولويتنا — دقة، جمال، وثقة في كل ابتسامة.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="flex flex-col items-center md:items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-white font-bold mb-4 text-lg">روابط سريعة</h3>
            <nav className="flex flex-col gap-2 text-sm">
              {[
                { label: "الرئيسية", href: "/" },
                { label: "المدونة", href: "/blog" },
                { label: "الخدمات", href: "/#services" },
                { label: "من نحن", href: "/#about" },
                { label: "الأسعار", href: "/pricing" },
              ].map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="text-gray-400 hover:text-purple-300 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="flex flex-col items-center md:items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-white font-bold mb-4 text-lg">تواصل معنا</h3>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-purple-400 mt-0.5 shrink-0" />
                <span className="text-gray-400">القاهرة، مصر</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-purple-400" />
                <span className="text-gray-400">+20 100 000 0000</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-purple-400" />
                <span className="text-gray-400">info@denticare.com</span>
              </div>
            </div>
          </motion.div>

          {/* Social & CTA */}
          <motion.div
            className="flex flex-col items-center md:items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-white font-bold mb-4 text-lg">تابعنا</h3>
            <div className="flex gap-3 mb-6">
              {[
                { Icon: Instagram, href: "#" },
                { Icon: Facebook, href: "#" },
                { Icon: Twitter, href: "#" },
              ].map(({ Icon, href }, idx) => (
                <motion.a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800/60 flex items-center justify-center text-purple-300 hover:bg-purple-500/20 transition"
                  whileHover={{ y: -5, scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>

            <Link
              href="/booking"
              className="px-5 py-2.5 bg-linear-to-r from-purple-500 to-cyan-500 text-white font-medium rounded-lg shadow-lg hover:shadow-purple-500/30 transition"
            >
              احجز موعدك الآن
            </Link>
          </motion.div>
        </div>
        {/* Rolling Credits */}
        <div className="overflow-hidden opacity-20 mt-12">
          <motion.div
            className="text-cyan-300 text-sm whitespace-nowrap"
            animate={{ x: ["100%", "-100%"] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            {Array(10)
              .fill(
                "د. أحمد محمد  --  د. سارة علي  --  د. محمد خالد  --   فريق دنتي كير  -- شكراً لثقتكم "
              )
              .join(" ")}
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="h-px bg-linear-to-r from-transparent via-purple-500/30 to-transparent my-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        />

        {/* Copyright */}
        <motion.div
          className="text-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          © {currentYear} دنتي<span className="text-purple-400">كير</span> لطب
          الأسنان — جميع الحقوق محفوظة.
        </motion.div>
      </div>

      {/* Spaceship Back-to-Top (يظهر دائمًا في الفوتر) */}
      <AnimatePresence>
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 hidden md:flex w-16 h-16 rounded-full items-center justify-center z-50"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          aria-label="عد إلى الأعلى"
        >
          <div className="absolute w-12 h-12 rounded-full bg-linear-to-r from-cyan-400 to-purple-500 blur-xl opacity-70"></div>
          <div className="relative w-10 h-10 rounded-full bg-linear-to-r from-white to-cyan-200 flex items-center justify-center">
            <ChevronUp size={20} className="text-purple-800" />
          </div>
          <motion.div
            className="absolute bottom-0 w-8 h-4 bg-cyan-400/60 rounded-full blur-md"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.button>
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
