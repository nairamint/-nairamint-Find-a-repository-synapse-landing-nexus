
import React, { useState, useEffect, Suspense } from 'react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// Lazy load the 3D canvas to improve FCP
const ShaderCanvas = React.lazy(() => import('./ShaderCanvas'));

interface DiagonalShaderHeroProps {
  children: React.ReactNode;
  colorStart?: string;
  colorEnd?: string;
  angle?: number;
  speed?: number;
  className?: string;
}

export const DiagonalShaderHero: React.FC<DiagonalShaderHeroProps> = ({
  children,
  colorStart = "#ff511c",
  colorEnd = "#9a89e4",
  angle = 45,
  speed = 0.2,
  className
}) => {
  const [shouldUseShader, setShouldUseShader] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [showReducedMotionToggle, setShowReducedMotionToggle] = useState(false);

  // CSS gradient fallback style
  const fallbackGradient = {
    background: `linear-gradient(135deg, ${colorStart} 0%, ${colorEnd} 100%)`
  };

  useEffect(() => {
    // Show toggle for users who can control motion preference
    setShowReducedMotionToggle(true);

    // Delay shader loading for better FCP, but only if motion is allowed
    if (!prefersReducedMotion) {
      const timer = setTimeout(() => {
        setShouldUseShader(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [prefersReducedMotion]);

  const toggleReducedMotion = () => {
    setShouldUseShader(!shouldUseShader);
  };

  return (
    <div className={cn("relative min-h-screen overflow-hidden", className)}>
      {/* Static CSS gradient fallback - always rendered for SSR/FCP */}
      <div 
        className="absolute inset-0 z-0"
        style={fallbackGradient}
        aria-hidden="true"
      />

      {/* 3D Shader Canvas - lazy loaded and respects motion preferences */}
      {shouldUseShader && !prefersReducedMotion && (
        <Suspense fallback={null}>
          <div className="absolute inset-0 z-0" aria-hidden="true">
            <ShaderCanvas
              colorStart={colorStart}
              colorEnd={colorEnd}
              speed={speed}
              angle={angle}
            />
          </div>
        </Suspense>
      )}

      {/* Reduced motion toggle */}
      {showReducedMotionToggle && (
        <button
          onClick={toggleReducedMotion}
          className="absolute top-4 left-4 z-50 px-3 py-1.5 text-xs bg-white/20 backdrop-blur-sm rounded-md text-white hover:bg-white/30 transition-colors"
          aria-label={`${prefersReducedMotion || !shouldUseShader ? 'Enable' : 'Disable'} motion effects`}
        >
          {prefersReducedMotion || !shouldUseShader ? '🎬 Enable Motion' : '⏸️ Reduce Motion'}
        </button>
      )}

      {/* Hero content overlay */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
};
