import React, { useRef, useState, useEffect } from 'react';

interface OptimizedVideoProps {
  src: string;
  poster?: string;
  className?: string;
  isHero?: boolean;
  rootMargin?: string;
  objectFit?: 'cover' | 'contain';
  ariaLabel?: string;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  playbackRate?: number;
  autoPlay?: boolean;
}

export const OptimizedVideo: React.FC<OptimizedVideoProps> = ({
  src,
  poster,
  className = '',
  isHero = false,
  rootMargin = '350px 0px',
  objectFit = 'cover',
  ariaLabel = 'Logistics video playback',
  loop = true,
  muted = true,
  playsInline = true,
  playbackRate = 1.0,
  autoPlay = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(isHero);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // IntersectionObserver for lazy loading below-the-fold and pausing off-screen
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // If hero, it loads immediately, but still pauses when scrolled away
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Enter near viewport -> trigger source load if not loaded yet
            setShouldLoad(true);

            // Attempt to play if allowed
            if (videoRef.current && autoPlay && !prefersReducedMotion) {
              const playPromise = videoRef.current.play();
              if (playPromise !== undefined) {
                playPromise
                  .then(() => setIsPlaying(true))
                  .catch(() => setIsPlaying(false));
              }
            }
          } else {
            // Exit viewport -> pause to free GPU threads and memory
            if (videoRef.current) {
              videoRef.current.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: isHero ? '100px 0px' : rootMargin,
        threshold: 0.05,
      }
    );

    observer.observe(container);
    return () => {
      observer.disconnect();
    };
  }, [isHero, rootMargin, autoPlay, prefersReducedMotion]);

  // Set playbackRate
  useEffect(() => {
    if (videoRef.current && playbackRate !== 1.0) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate, shouldLoad]);

  // Pause when reduced motion is requested
  useEffect(() => {
    if (prefersReducedMotion && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden bg-[#E8E6E2] ${className}`}
    >
      {/* Fallback & Loading Placeholder Skeleton (Prevents Layout Shifts) */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-0 bg-[#E8E6E2] flex items-center justify-center">
          <div className="w-full h-full bg-linear-to-r from-[#E8E6E2] via-[#F0EEEA] to-[#E8E6E2] animate-pulse" />
        </div>
      )}

      {/* Video Element rendered only when near viewport or hero */}
      {shouldLoad && !hasError && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay={autoPlay && !prefersReducedMotion}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          preload={isHero ? 'metadata' : 'none'}
          aria-label={ariaLabel}
          onLoadedData={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ objectFit }}
        />
      )}

      {/* Error Fallback: Clean Industrial Backdrop */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-[#F0EEEA] text-[#A5A5A4] font-mono text-xs text-center border border-[#D0CEC9]">
          <div className="w-8 h-8 rounded-lg bg-[#E8E6E2] flex items-center justify-center mb-2 text-[#A5A5A4]">
            <span className="font-bold text-[10px]">360</span>
          </div>
          <span className="text-[#292D2F] font-sans font-semibold">Logistics Video Telemetry</span>
          <span className="text-[10px] text-[#A5A5A4] mt-0.5">Hardware acceleration active</span>
        </div>
      )}
    </div>
  );
};
