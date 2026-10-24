import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { VideoItem } from '../../config/videoConfig';

interface CinematicVideoBackgroundProps {
  video: VideoItem | { src: string; path?: string; ariaLabel?: string; title?: string };
  overlayVariant?: 'left' | 'bottom' | 'subtle' | 'editorial' | 'none';
  overlayOpacity?: number; // 0 to 1, default subtle
  enableParallax?: boolean;
  className?: string;
  isHero?: boolean;
  children?: React.ReactNode;
}

export const CinematicVideoBackground: React.FC<CinematicVideoBackgroundProps> = ({
  video,
  overlayVariant = 'left',
  overlayOpacity = 0.45,
  enableParallax = false,
  className = '',
  isHero = false,
  children,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(isHero);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Extract source path
  const videoSrc = 'path' in video && video.path ? video.path : 'src' in video ? video.src : '';
  const ariaLabel = video.ariaLabel || 'Cinematic logistics video background';

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Parallax transforms based on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Viewport-based IntersectionObserver: Lazy-load below-the-fold & pause off-screen
  useEffect(() => {
    const containerEl = containerRef.current;
    if (!containerEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Lazy load video stream when nearing viewport
            setShouldLoad(true);

            if (videoRef.current && !prefersReducedMotion) {
              const playPromise = videoRef.current.play();
              if (playPromise !== undefined) {
                playPromise.catch(() => {});
              }
            }
          } else {
            // Pause playback off-screen to conserve GPU and memory
            if (videoRef.current) {
              videoRef.current.pause();
            }
          }
        });
      },
      {
        root: null,
        rootMargin: isHero ? '100px 0px' : '350px 0px',
        threshold: 0.05,
      }
    );

    observer.observe(containerEl);

    return () => {
      observer.disconnect();
    };
  }, [isHero, prefersReducedMotion]);

  // Handle playback rate
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.95;
    }
  }, [shouldLoad]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
    >
      {/* 1. LAYER: CRYSTAL-CLEAR VIDEO ELEMENT WITH NATURAL CONTRAST */}
      <motion.div
        style={{
          scale: enableParallax && !prefersReducedMotion ? videoScale : 1,
        }}
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      >
        {shouldLoad && (
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay={!prefersReducedMotion}
            loop
            muted
            playsInline
            preload={isHero ? 'metadata' : 'none'}
            aria-label={ariaLabel}
            onLoadedData={() => setVideoLoaded(true)}
            className={`w-full h-full object-cover object-center transition-opacity duration-500 ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Ambient neutral warm loader */}
        {!videoLoaded && (
          <div className="absolute inset-0 bg-[#EEECE7] animate-pulse" />
        )}
      </motion.div>

      {/* 2. LAYER: LOCALIZED LIGHT INDUSTRIAL WARM GRADIENTS (Videos remain bright & visible) */}
      {overlayVariant === 'left' && (
        <div 
          className="absolute inset-0 pointer-events-none z-1"
          style={{
            background: 'linear-gradient(to right, rgba(245, 243, 238, 0.94) 0%, rgba(245, 243, 238, 0.78) 35%, rgba(245, 243, 238, 0.25) 65%, transparent 100%)',
          }}
        />
      )}

      {overlayVariant === 'bottom' && (
        <div 
          className="absolute inset-0 pointer-events-none z-1"
          style={{
            background: 'linear-gradient(to top, rgba(0, 59, 64, 0.3) 0%, rgba(0, 59, 64, 0.15) 40%, transparent 80%)',
          }}
        />
      )}

      {overlayVariant === 'editorial' && (
        <div 
          className="absolute inset-0 pointer-events-none z-1"
          style={{
            background: 'radial-gradient(ellipse at 30% 50%, rgba(0, 59, 64, 0.3) 0%, rgba(0, 59, 64, 0.15) 60%, transparent 90%)',
          }}
        />
      )}

      {overlayVariant === 'subtle' && (
        <div 
          className="absolute inset-0 pointer-events-none z-1"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 59, 64, 0.25) 0%, rgba(0, 59, 64, 0.08) 100%)',
          }}
        />
      )}

      {/* Subtle top/bottom feathering into neighboring sections */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#F5F3EE] to-transparent pointer-events-none z-2 opacity-60" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#F5F3EE] to-transparent pointer-events-none z-2" />

      {/* 3. LAYER: UI & CONTENT LAYER WITH SMOOTH PARALLAX */}
      <motion.div
        style={{
          y: enableParallax && !prefersReducedMotion ? contentY : 0,
        }}
        className="relative z-10 w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};
