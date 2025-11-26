"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Particles from "@tsparticles/react";
import { Calendar, Users, ShieldCheck, Headphones } from "lucide-react";

const stats = [
  { num: 15, suffix: " سنة خبرة", icon: Calendar },
  { num: 5000, suffix: " حالة ناجحة", icon: Users },
  { num: 100, suffix: "% تعقيم وأمان", icon: ShieldCheck },
  { num: 24, suffix: "/7 دعم للطوارئ", icon: Headphones },
];

const StatsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // ✅ No need for particlesInit state or init handler

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="py-32 relative overflow-hidden bg-linear-to-b from-blue-900/95 to-indigo-900/95"
    >
      <div className="text-center mb-12 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          أرقام تتحدث عنّا
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          <span
            className="text-2xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-gray-900 via-cyan-600 to-purple-600 
                dark:from-white dark:via-cyan-200 dark:to-purple-200"
          >
            دنتي
            <span className="text-purple-600 dark:text-purple-300">كير </span>
          </span>
          ، هنا نبني ثقتك على أساس من الخبرة - الجودة - الشفافية ، سنوات من التميز
          جعلتنا الخيار الأول لآلاف العائلات ، وها هي بعض الأرقام التي تروي
          قصتنا : 
        </p>
      </div>

      {/* ✅ Particles without any init prop */}
      {isInView && (
        <Particles
          className="absolute inset-0 pointer-events-none"
          options={{
            fpsLimit: 60,
            background: { opacity: 0 },
            interactivity: {
              detectsOn: "canvas",
              events: { onHover: { enable: false } },
            },
            particles: {
              color: { value: "#5eead4" },
              links: {
                color: "#93c5fd",
                distance: 150,
                enable: true,
                opacity: 0.15,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: "out",
                random: true,
                speed: 0.8,
              },
              number: {
                density: {
                  enable: true,
                  width: 800,
                  height: 800,
                },
                value: 30,
              },
              opacity: { value: 0.4 },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 3 } },
            },
            detectRetina: true,
          }}
        />
      )}

      {/* Floating Orbs */}
      <motion.div
        className="absolute -top-16 -left-16 w-56 h-56 bg-cyan-400/15 rounded-full blur-3xl"
        animate={{ y: [-12, 12, -12] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-16 -right-16 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl"
        animate={{ y: [12, -12, 12] }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, idx) => (
            <StatCard key={idx} stat={stat} index={idx} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

// نفس StatCard من غير تغيير (مع Lucide)
const StatCard = ({
  stat,
  index,
  isInView,
}: {
  stat: { num: number; suffix: string; icon: React.FC };
  index: number;
  isInView: boolean;
}) => {
  const [count, setCount] = useState(0);
  const Icon = stat.icon;

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = stat.num / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.num) {
        setCount(stat.num);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, stat.num]);

  const displayValue =
    stat.num === 100 ? "100%" : stat.num === 24 ? "24/7" : `+${count}`;

  return (
    <motion.div
      className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-8 shadow-lg"
      whileHover={{
        y: -12,
        boxShadow: "0 25px 40px -15px rgba(94, 234, 212, 0.4)",
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.12, type: "spring", stiffness: 300 }}
    >
      <motion.div
        className="relative mb-4 flex items-center justify-center"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-10 h-10 text-cyan-300 drop-shadow-[0_0_8px_rgba(94,234,212,0.6)]">
          <Icon />
        </div>
        <div className="absolute inset-0 rounded-full bg-cyan-400/30 blur-md animate-pulse"></div>
      </motion.div>

      <motion.span
        className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-cyan-300 via-blue-200 to-indigo-200"
        key={displayValue}
      >
        {displayValue}
      </motion.span>

      <span className="text-blue-100 mt-2 text-center text-base md:text-lg font-medium">
        {stat.suffix}
      </span>
    </motion.div>
  );
};

export default StatsSection;
