"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Clock } from "lucide-react";
import { useState } from "react";

// Helper: تقدير مدة القراءة (افتراض ~200 كلمة/دقيقة)
const estimateReadTime = (title: string): number => {
  const words = title.split(" ").length + 50; // +50 كلمة متوسط المقال
  return Math.ceil(words / 200); // بالدقائق
};

const articles = [
  {
    id: 1,
    title: "كيف تختار فرشاة الأسنان المناسبة؟",
    category: "نصائح عامة",
    date: "25 نوفمبر 2024",
    image: "/blog1.png",
  },
  {
    id: 2,
    title: "أسباب نزيف اللثة وطرق العلاج",
    category: "صحة اللثة",
    date: "20 نوفمبر 2024",
    image: "/blog2.png",
  },
  {
    id: 3,
    title: "ما هو الفرق بين الزراعة والتركيبات؟",
    category: "جراحة",
    date: "15 نوفمبر 2024",
    image: "/blog3.png",
  },
];

const BlogSection = () => {
  return (
    <section
      id="blog"
      className="py-28 relative overflow-hidden bg-linear-to-b from-white/80 via-blue-50/40 to-cyan-50/30 dark:from-gray-900/70 dark:via-blue-900/30 dark:to-indigo-900/20"
    >
      {/* Floating Orbs */}
      <motion.div
        className="absolute top-0 left-10 w-40 h-40 bg-blue-300/20 dark:bg-blue-500/15 rounded-full blur-3xl"
        animate={{ y: [-15, 15, -15], x: [-10, 10, -10] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-0 w-52 h-52 bg-cyan-300/20 dark:bg-cyan-400/15 rounded-full blur-3xl"
        animate={{ y: [15, -15, 15], x: [10, -10, 10] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
              أحدث المقالات الطبية
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-md leading-relaxed">
              معلومات موثقة من أطبائنا لزيادة وعيك الصحي ومساعدتك على اتخاذ
              القرار الأفضل.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/blog"
              className="hidden md:block bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-200 dark:border-gray-700/50 text-blue-600 dark:text-blue-300 px-5 py-2.5 rounded-xl font-semibold hover:bg-white/80 dark:hover:bg-gray-800/80 transition shadow-sm hover:shadow-md"
            >
              عرض كل المقالات
            </Link>
          </motion.div>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((post, idx) => (
            <BlogCard key={post.id} post={post} index={idx} />
          ))}
        </div>

        {/* Mobile "See All" */}
        <motion.div
          className="mt-10 text-center md:hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-blue-600 dark:text-cyan-300 font-semibold text-sm hover:gap-2 transition-all"
          >
            عرض كل المقالات
            <span>←</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const BlogCard = ({
  post,
  index,
}: {
  post: (typeof articles)[0];
  index: number;
}) => {
  const [liked, setLiked] = useState(false);
  const readTime = estimateReadTime(post.title);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      whileHover={{
        y: -16,
        rotate: 1.5,
        transition: { type: "spring", stiffness: 300, damping: 15 },
      }}
      className="group relative bg-white/60 dark:bg-gray-800/50 backdrop-blur-xl border border-gray-200 dark:border-gray-700/50 rounded-3xl shadow-lg overflow-hidden cursor-pointer"
    >
      {/* Image with Lazy Loading & Flying Effect */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Like Button - Flying Heart */}
      <motion.button
        className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-full shadow-md"
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setLiked((prev) => !prev);
        }}
        aria-label={liked ? "إزالة الإعجاب" : "إعجاب"}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={liked ? "filled" : "outline"}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            {liked ? (
              <Heart size={20} className="text-red-500 fill-red-500" />
            ) : (
              <Heart size={20} className="text-gray-600 dark:text-gray-300" />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* Content */}
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
          <span className="px-3 py-1 bg-linear-to-r from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 text-blue-700 dark:text-blue-300 font-medium rounded-full">
            {post.category}
          </span>
          <div className="flex items-center gap-1.5">
            <Clock size={12} className="text-gray-500 dark:text-gray-400" />
            <span>{readTime} دقيقة قراءة</span>
          </div>
        </div>

        <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors line-clamp-2 leading-relaxed">
          {post.title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
          {post.date}
        </p>
      </div>
    </motion.div>
  );
};

export default BlogSection;
