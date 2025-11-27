import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CTASection from "./components/CTASection";
import BlogSection from "./components/BlogSection";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import ServicesSection from "./components/ServicesSection";

export default function Home() {
  return (
    <div dir="rtl" className="font-sans text-gray-800 bg-gray-50">
      {/* Header / Navbar */}
      <Navbar />

      {/* Hero Section */}

      <HeroSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Blog Preview Section */}
      <BlogSection />

      {/* Call to Action */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
