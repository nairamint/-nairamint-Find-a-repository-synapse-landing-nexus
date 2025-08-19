
import { useState, useEffect } from "react";
import { DiagonalShaderHero } from "./hero/DiagonalShaderHero";
import { SynapsesHeroContent } from "./hero/SynapsesHeroContent";
import { USPFeatureSection } from "./features/USPFeatureSection";

const HeroSection = () => {
  const [animate, setAnimate] = useState(false);

  // Trigger animations after component mounts
  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 100);
  }, []);

  return (
    <div
      style={{ minHeight: "calc(100vh - 64px)" }}
      className="w-full"
      id="hero-section"
    >
      {/* 1. Shader Background - First in render order */}
      <DiagonalShaderHero
        colorStart="#ff511c"
        colorEnd="#9a89e4"
        speed={0.2}
      >
        {/* 2. Dashboard Embed & Hero Content - Second in render order */}
        <SynapsesHeroContent />
      </DiagonalShaderHero>

      {/* 3. USP Feature Section - Below Hero */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className={`transition-all duration-700 ease-out ${animate ? 'opacity-100' : 'opacity-0 translate-y-6'}`}>
            <USPFeatureSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
