"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 py-10 bg-linear-to-br via-blue-300"
    >
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
        {/* TEXT CONTENT */}
        <motion.div
          className="lg:w-1/2 text-center lg:text-right space-y-6"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block py-2 px-5 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg text-blue-700 dark:text-blue-300 
            text-sm font-semibold shadow-sm border border-white/30 dark:border-gray-700/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            ✨ ابتسامة تعزز ثقتك
          </motion.span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
            رعاية أسنان متكاملة
            <motion.span
              className="block bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-indigo-600 to-cyan-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              لك ولعائلتك
            </motion.span>
          </h1>

          <motion.p
            className="text-lg text-gray-900 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            نقدم أحدث التقنيات في عالم طب وتجميل الأسنان. نضمن لك راحة، جودة،
            وخبرة طبية بأعلى المستويات مع نتائج تدوم طويلاً.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              className="px-8 py-3.5 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 
              hover:shadow-xl hover:shadow-blue-500/30 transition cursor-pointer"
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              استشارة مجانية
            </motion.button>
            <motion.button
              className="px-8 py-3.5 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg text-gray-800 dark:text-gray-200 font-semibold rounded-xl 
              border border-gray-300 dark:border-gray-700 shadow-sm hover:bg-white/80 dark:hover:bg-gray-800/80 transition cursor-pointer"
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              تعرف على خدماتنا
            </motion.button>
          </motion.div>
        </motion.div>

        {/* IMAGE AREA */}
        <motion.div
          className="lg:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative w-full max-w-md">
            {/* Glass Frame */}
            <motion.div
              className="relative w-full aspect-square rounded-[45px] overflow-hidden shadow-2xl border-8 border-white/60 dark:border-gray-800/60 
              bg-linear-to-r from-blue-100/60 to-cyan-100/40 dark:from-blue-900/20 dark:to-indigo-900/30 backdrop-blur-sm"
              whileHover={{ rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/dentist.jpg"
                alt="فريق دنتي كير"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </motion.div>

            {/* Rating Badge - Glass Style */}
            <motion.div
              className="absolute bottom-6 -right-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl p-4 rounded-2xl shadow-xl flex items-center gap-2 
              border border-white/40 dark:border-gray-700/50"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
              whileHover={{ y: -6 }}
            >
              <span className="text-yellow-400 text-xl">★★★★★</span>
              <span className="font-bold text-gray-800 dark:text-gray-100">
                4.9 تقييم المرضى
              </span>
            </motion.div>

            {/* Floating Bubble */}
            <motion.div
              className="absolute -top-4 left-4 w-12 h-12 bg-blue-500/20 dark:bg-indigo-500/20 backdrop-blur-lg rounded-full"
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
