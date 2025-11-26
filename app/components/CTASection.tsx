"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MessageCircle, Clock } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

// ✅ Hook للعد التنازلي - آمن
const useCountdown = (durationHours: number = 24) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // ✅ Date.now() يُستدعى داخل useEffect (مسموح)
    const target = Date.now() + durationHours * 60 * 60 * 1000;

    const timer = setInterval(() => {
      const now = Date.now();
      const distance = target - now;

      if (distance > 0) {
        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [durationHours]);

  return timeLeft;
};

// ✅ مولد جزيئات ثابت (مرة واحدة)
const useRainParticles = (count: number) => {
  return useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: 5 + (i * 100) / count, // توزيع متساوي
      duration: 2.5 + (i % 3) * 0.5, // 2.5, 3.0, 3.5, ...
      delay: (i * 0.2) % 1.5,
    }));
  }, [count]);
};

const CTASection = () => {
  const { hours, minutes, seconds } = useCountdown(24);
  const rainParticles = useRainParticles(15);

  return (
    <section
      id="cta"
      className="py-32 px-4 relative overflow-hidden min-h-[600px] flex items-center justify-center"
    >
      {/* Sky Background */}
      <div className="absolute inset-0 bg-linear-to-b from-blue-900/30 via-indigo-900/20 to-transparent z-0"></div>

      {/* Floating Clouds */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-16 bg-white/20 rounded-full blur-xl"
        animate={{ x: [-20, 20, -20] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-20 right-20 w-40 h-20 bg-white/25 rounded-full blur-xl"
        animate={{ x: [30, -30, 30] }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Rain Particles - ✅ آمن الآن */}
      <div className="absolute inset-0 z-0">
        {rainParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-8 bg-blue-900/40 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: "-20px",
            }}
            animate={{
              y: ["-20px", "100vh"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -200, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 1,
          }}
          className="max-w-4xl mx-auto z-10 w-full"
        >
          {/* Glass Card */}
          <div className="relative rounded-3xl overflow-hidden p-1 shadow-2xl">
            <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-600 opacity-80 blur-xl"></div>

            <div className="relative bg-white/15 dark:bg-gray-900/30 backdrop-blur-2xl border border-white/30 dark:border-white/20 rounded-3xl p-8 md:p-12 text-center">
              {/* Limited Offer Badge */}
              <motion.div
                className="inline-block mb-6 px-4 py-2 bg-linear-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold rounded-full shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
              >
                <Clock size={16} className="inline mr-1 mb-0.5" /> عرض لفترة
                محدودة
              </motion.div>

              <motion.h2
                className="text-3xl md:text-4xl font-extrabold text-white mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                هل تعاني من ألم في الأسنان؟
              </motion.h2>

              <motion.p
                className="text-blue-100 dark:text-cyan-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                لا تدع الألم يؤثر على حياتك اليومية. فريقنا جاهز لاستقبالك
                وتقديم الرعاية الفورية على مدار الأسبوع.
              </motion.p>

              {/* Countdown Timer */}
              <motion.div
                className="flex justify-center gap-4 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {([hours, minutes, seconds] as const).map((value, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center text-white font-bold text-xl">
                      {String(value).padStart(2, "0")}
                    </div>
                    <span className="text-blue-200 text-xs mt-2">
                      {idx === 0 ? "ساعة" : idx === 1 ? "دقيقة" : "ثانية"}
                    </span>
                  </div>
                ))}
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link href="/booking">
                  <motion.button
                    className="px-8 py-4 bg-linear-to-r from-white to-blue-100 text-blue-800 font-bold rounded-full shadow-lg relative overflow-hidden z-10 cursor-pointer"
                    whileHover={{ y: -8, scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">احجز موعد الآن</span>
                  </motion.button>
                </Link>

                <a
                  href="https://wa.me/201000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.button
                    className="px-8 py-4 border-2 border-white text-white font-bold rounded-full flex items-center gap-2 cursor-pointer"
                    whileHover={{ y: -8, scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MessageCircle size={20} />
                    تواصل معنا
                  </motion.button>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default CTASection;
