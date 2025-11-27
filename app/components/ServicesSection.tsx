"use client";

import { motion } from "framer-motion";
import {
  // Tooth, ❌ شيلنا دي خلاص لأنها مش موجودة
  Sparkles,
  ShieldCheck,
  Smile,
  HeartPulse,
  Brush,
  Star,
  ChevronRight,
  LucideProps,
} from "lucide-react";

// ✅ 1. عملنا أيقونة "سِنة" مخصوصة بنفس ستايل المكتبة
const ToothIcon = (props: LucideProps) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4.22 19.78a2 2 0 0 0 1.56.22h.06a4 4 0 0 0 2.66-2.58l.64-2.12c.18-.61.69-1.07 1.3-1.18l.18-.04a2.9 2.9 0 0 1 3.2 1.52l.41 1.09a4 4 0 0 0 3.08 2.53l.1.02a2 2 0 0 0 2.37-2.39 12 12 0 0 0-3.32-8.35 6 6 0 0 0-9.28.1 12 12 0 0 0-3 8.52c0 1 .1 1.84.22 2.6Z" />
    <path d="M8 14v4" />
    <path d="M16 14v4" />
  </svg>
);

// ✅ تعريف الـ Interface
interface ServiceItem {
  icon: React.ElementType; // غيرناها عشان تقبل الأيقونة المخصصة
  title: string;
  desc: string;
  color: string;
  bg: string;
  text: string;
}

const services: ServiceItem[] = [
  {
    icon: ToothIcon, // ✅ دلوقتي شغالة 100%
    title: "تنظيف وتلميع الأسنان",
    desc: "جلسات تنظيف احترافية لإزالة الجير وتلميع الأسنان باستخدام أحدث الأجهزة.",
    color: "from-cyan-400 to-blue-500",
    bg: "bg-cyan-50 dark:bg-cyan-900/20",
    text: "text-cyan-600 dark:text-cyan-400",
  },
  {
    icon: Sparkles,
    title: "تبييض الأسنان",
    desc: "تبييض الأسنان بالليزر للحصول على ابتسامة أكثر إشراقًا في جلسة واحدة فقط.",
    color: "from-blue-400 to-indigo-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    text: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: ShieldCheck,
    title: "علاج التسوس والحشوات",
    desc: "علاج التسوس وحشوات ضوئية عالية الجودة بدون ألم وبنتيجة مضمونة.",
    color: "from-indigo-400 to-purple-500",
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
    text: "text-indigo-600 dark:text-indigo-400",
  },
  {
    icon: Smile,
    title: "تقويم الأسنان",
    desc: "تقويم شفاف ومعدني لتحسين شكل الأسنان وتصحيح العضة.",
    color: "from-purple-400 to-pink-500",
    bg: "bg-purple-50 dark:bg-purple-900/20",
    text: "text-purple-600 dark:text-purple-400",
  },
  {
    icon: HeartPulse,
    title: "علاج اللثة",
    desc: "علاج التهابات اللثة والجيوب اللثوية باستعمال تقنيات غير جراحية.",
    color: "from-pink-400 to-rose-500",
    bg: "bg-pink-50 dark:bg-pink-900/20",
    text: "text-pink-600 dark:text-pink-400",
  },
  {
    icon: Brush,
    title: "تركيبات وتجميل الأسنان",
    desc: "تركيبات ثابتة وزراعة الأسنان وعدسات ابتسامة (فينير – لومينير).",
    color: "from-rose-400 to-orange-500",
    bg: "bg-rose-50 dark:bg-rose-900/20",
    text: "text-rose-600 dark:text-rose-400",
  },
];

export default function DentalServices() {
  return (
    <section className="py-28 relative overflow-hidden bg-gradient-to-b from-gray-50/80 to-white dark:from-gray-900/70 dark:to-gray-900">
      {/* Animated Background Orbs */}
      <motion.div
        className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-400/20 dark:bg-cyan-500/15 rounded-full blur-3xl"
        animate={{ y: [-20, 20, -20], rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-500/20 dark:bg-blue-600/15 rounded-full blur-3xl"
        animate={{ y: [20, -20, 20], rotate: -360 }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          delay: 1,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 px-4 py-2 rounded-full mb-6">
            <Star size={16} className="text-cyan-600 dark:text-cyan-400" />
            <span className="text-cyan-700 dark:text-cyan-300 font-medium">
              خدماتنا الذهبية
            </span>
          </div>

          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            خدمات طب الأسنان
          </motion.h2>

          <motion.p
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            نقدم لك أفضل الخدمات العلاجية والتجميلية باستخدام أحدث تقنيات طب
            الأسنان.
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv, i) => (
            <ServiceCard key={i} service={srv} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

const ServiceCard = ({
  service,
  index,
}: {
  service: ServiceItem;
  index: number;
}) => {
  const IconComponent = service.icon;

  return (
    <motion.div
      className="group relative rounded-3xl overflow-hidden cursor-pointer h-full"
      initial={{ opacity: 0, y: 30, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      <div className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-xl border border-gray-200 dark:border-gray-700/50 rounded-3xl p-8 h-full flex flex-col">
        {/* Icon Container */}
        <motion.div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 shadow-lg shrink-0`}
          whileHover={{ scale: 1.1, y: -2 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <IconComponent size={28} className="text-white" />
        </motion.div>

        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
          {service.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
          {service.desc}
        </p>

        <motion.button
          className={`w-full py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 ${service.bg} ${service.text} mt-auto`}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          احجز الآن
          <ChevronRight size={16} />
        </motion.button>
      </div>

      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%)`,
        }}
      />
    </motion.div>
  );
};
