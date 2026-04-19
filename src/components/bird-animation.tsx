'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

const DUO_IMAGES: {
  src: string;
  alt: string;
  emphasize?: boolean;
}[] = [
  { src: '/images/duo_bird_1.png', alt: 'Duolingo' },
  { src: '/images/duo_profile.png', alt: 'Duolingo profile', emphasize: true },
  { src: '/images/duo_bird_2.jpg', alt: 'Duolingo' },
];

const DUO_PROFILE_URL = 'https://www.duolingo.com/profile/draconiq_';

interface BirdAnimationProps {
  className?: string;
}

export default function BirdAnimation({ className = '' }: BirdAnimationProps) {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [position, setPosition] = useState({ x: 60, y: 16 }); // Start with fallback position
  const [direction, setDirection] = useState<'left-to-right' | 'right-to-left'>('left-to-right');
  const [isFlying, setIsFlying] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [swingPositions, setSwingPositions] = useState({ 
    left: { x: 60, y: 10 }, 
    right: { x: 800, y: 10 } 
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const [duoModalOpen, setDuoModalOpen] = useState(false);

  // Animation timing
  const FRAME_DURATION = 100; // ms per frame
  const FLIGHT_DURATION = 3000; // ms for full flight
  const LANDING_DURATION = 1000; // ms to rest on swing
  const SPEECH_BUBBLE_DURATION = 2000; // ms to show speech bubble

  const handleBirdClick = () => setDuoModalOpen(true);

  useEffect(() => {
    const root = document.documentElement;
    if (duoModalOpen) {
      root.classList.add('duo-modal-open');
    } else {
      root.classList.remove('duo-modal-open');
    }
    return () => root.classList.remove('duo-modal-open');
  }, [duoModalOpen]);

  // Function to get actual swing positions
  const updateSwingPositions = () => {
    if (typeof window === 'undefined') return;
    
    const leftSwing = document.querySelector('[data-swing="left"]') as HTMLElement;
    const rightSwing = document.querySelector('[data-swing="right"]') as HTMLElement;
    
    if (leftSwing && rightSwing && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const leftRect = leftSwing.getBoundingClientRect();
      const rightRect = rightSwing.getBoundingClientRect();
      
       const newPositions = {
         left: {
           x: leftRect.left - containerRect.left + leftRect.width / 2 - 20, // Adjust for larger bird (40px wide)
           y: leftRect.top - containerRect.top - 8 // Move up so feet are above the swing wood
         },
         right: {
           x: rightRect.left - containerRect.left + rightRect.width / 2 - 20, // Adjust for larger bird (40px wide)
           y: rightRect.top - containerRect.top - 8 // Move up so feet are above the swing wood
         }
       };
      
      console.log('Updated swing positions:', newPositions);
      setSwingPositions(newPositions);
    } else {
       // Fallback to approximate positions
       const fallbackPositions = {
         left: { x: 60, y: 16 }, // Adjusted for larger bird
         right: { x: typeof window !== 'undefined' ? window.innerWidth - 100 : 800, y: 16 }
       };
      console.log('Using fallback positions:', fallbackPositions);
      setSwingPositions(fallbackPositions);
    }
  };

  useEffect(() => {
    // Wait for DOM to be ready, then update swing positions
    const timer = setTimeout(() => {
      updateSwingPositions();
    }, 100);
    
    const handleResize = () => {
      updateSwingPositions();
    };
    
    const handleZoom = () => {
      setTimeout(updateSwingPositions, 100);
    };

    window.addEventListener('resize', handleResize);
    // Removed wheel event listener to prevent scroll glitching
    window.addEventListener('keydown', (e) => {
      if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '0')) {
        handleZoom();
      }
    });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    let frameInterval: NodeJS.Timeout;
    let positionInterval: NodeJS.Timeout;
    let cycleTimeout: NodeJS.Timeout;

    const startAnimation = () => {
      // Start at left swing
      setPosition({ x: swingPositions.left.x, y: swingPositions.left.y });
      setDirection('left-to-right');
      setIsFlying(false);
      setCurrentFrame(1);

      // Wait a bit, then start flying
      cycleTimeout = setTimeout(() => {
        setIsFlying(true);
        
        // Frame animation (bird wing flapping)
        frameInterval = setInterval(() => {
          setCurrentFrame(prev => prev >= 8 ? 1 : prev + 1);
        }, FRAME_DURATION);

        // Position animation (parabolic flight)
        const startTime = Date.now();
        positionInterval = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / FLIGHT_DURATION, 1);
          
          if (progress >= 1) {
            // Flight complete, land on right swing
            setPosition({ x: swingPositions.right.x, y: swingPositions.right.y });
            setIsFlying(false);
            setCurrentFrame(1);
            setShowSpeechBubble(true);
            clearInterval(frameInterval);
            clearInterval(positionInterval);
            
             // Keep speech bubble visible during flight to left swing
             setTimeout(() => {
               setDirection('right-to-left');
               setIsFlying(true);
              
              // Frame animation
              frameInterval = setInterval(() => {
                setCurrentFrame(prev => prev >= 8 ? 1 : prev + 1);
              }, FRAME_DURATION);

              // Position animation (right to left)
              const startTime2 = Date.now();
              positionInterval = setInterval(() => {
                const elapsed2 = Date.now() - startTime2;
                const progress2 = Math.min(elapsed2 / FLIGHT_DURATION, 1);
                
                 if (progress2 >= 1) {
                   // Flight complete, land on left swing
                   setPosition({ x: swingPositions.left.x, y: swingPositions.left.y });
                   setIsFlying(false);
                   setCurrentFrame(1);
                   setShowSpeechBubble(false); // Hide speech bubble on left swing
                   clearInterval(frameInterval);
                   clearInterval(positionInterval);
                   
                   // Restart cycle after landing
                   setTimeout(startAnimation, LANDING_DURATION);
                 } else {
                   // Calculate parabolic position (right to left) - downward then upward curve
                   const x = swingPositions.right.x - (swingPositions.right.x - swingPositions.left.x) * progress2;
                   const y = Math.max(swingPositions.left.y, swingPositions.right.y) + Math.sin(progress2 * Math.PI) * 30;
                   setPosition({ x, y });
                 }
              }, 16); // ~60fps
            }, LANDING_DURATION);
           } else {
             // Calculate parabolic position (left to right) - downward then upward curve
             const x = swingPositions.left.x + (swingPositions.right.x - swingPositions.left.x) * progress;
             const y = Math.max(swingPositions.left.y, swingPositions.right.y) + Math.sin(progress * Math.PI) * 30;
             setPosition({ x, y });
           }
        }, 16); // ~60fps
      }, LANDING_DURATION);
    };

    // Start animation with current swing positions (including fallback)
    startAnimation();

    return () => {
      clearInterval(frameInterval);
      clearInterval(positionInterval);
      clearTimeout(cycleTimeout);
    };
  }, [swingPositions]);

  return (
    <>
      <Dialog modal={false} open={duoModalOpen} onOpenChange={setDuoModalOpen}>
        <DialogContent className="max-h-[85dvh] w-[calc(100vw-1rem)] max-w-4xl !bg-transparent !p-0 !shadow-none sm:max-h-[92vh] sm:w-[calc(100%-2rem)]">
          <DialogTitle className="sr-only">Duolingo profile</DialogTitle>
          <div aria-hidden className="pointer-events-none absolute inset-0 translate-x-[6px] translate-y-[6px] rounded-[18px] border-2 border-pink-500 bg-pink-500" />
          <div className="relative z-[1] flex max-h-[85dvh] flex-col gap-0 overflow-hidden rounded-[18px] border border-border/60 bg-card sm:max-h-[92vh] sm:gap-4 sm:overflow-y-auto sm:p-6 md:p-8">
            <div className="sticky top-0 z-[202] flex shrink-0 items-center justify-end border-b-0 bg-card/95 px-2 py-2 backdrop-blur-sm sm:hidden">
              <DialogClose className="rounded-full p-2 opacity-90 ring-offset-background transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </div>
            <div className="flex min-h-0 flex-1 flex-col justify-center overflow-y-auto px-3 py-6 sm:block sm:overflow-visible sm:px-0 sm:py-0 sm:pb-0 sm:pt-0">
              {/*
                object-cover fills each column’s box so top + bottom edges match across zoom.
                (object-contain + object-top left different letterboxing per aspect ratio, so one
                screenshot looked “taller” / misaligned at the bottom vs duo_bird_1.)
                object-top keeps headers/UI near the top when we crop.
              */}
              <div
                className={cn(
                  'hidden w-full gap-3 sm:grid',
                  'sm:grid-cols-[minmax(0,1fr)_minmax(0,1.65fr)_minmax(0,1fr)]',
                  'sm:items-stretch sm:justify-items-stretch sm:pb-3'
                )}
              >
                {DUO_IMAGES.map(({ src, alt, emphasize }) => (
                  <div
                    key={src}
                    className={cn(
                      'relative flex min-h-0 min-w-0 w-full justify-center overflow-hidden',
                      'sm:h-[min(28rem,52vmin)]',
                      emphasize && 'sm:z-10'
                    )}
                  >
                    <div
                      className={cn(
                        'relative h-full w-full min-h-0 max-w-[min(100%,22rem)] sm:max-w-none',
                        emphasize && 'sm:origin-top sm:scale-[1.12]'
                      )}
                    >
                      <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-cover object-top"
                        sizes={
                          emphasize
                            ? '(max-width: 640px) 100vw, 42vw'
                            : '(max-width: 640px) 100vw, 28vw'
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
              <DialogFooter className="mt-0 flex w-full flex-col items-center justify-center border-t-0 pt-0 sm:mt-2 sm:flex-row sm:justify-center sm:border-t-0 sm:pt-6">
              <a
                href={DUO_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex h-12 min-w-[220px] items-center justify-center rounded-2xl px-8 text-base font-bold text-white',
                  'bg-[#58CC02] shadow-[0_4px_0_#46A302] transition-all',
                  'hover:bg-[#61E002] hover:shadow-[0_4px_0_#389102]',
                  'active:translate-y-[2px] active:shadow-[0_2px_0_#389102]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#58CC02] focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                )}
              >
                Open Duolingo profile
              </a>
            </DialogFooter>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Speech Bubble - Independent container */}
      {showSpeechBubble && (
        <div
          style={{
            position: 'fixed',
            left: `${position.x - 36}px`, // Move left (bird is 40px wide, so adjust for centering)
            top: `${position.y + 10}px`, // Position much higher above bird
            transform: 'translateX(-50%)',
            zIndex: 1000,
            animation: 'speechBubblePop 0.3s ease-out'
          }}
        >
          <Image
            src="/pixel/pixel-speech-bubble.gif"
            alt="Speech bubble"
            width={100}
            height={100}
            className="opacity-90"
            style={{
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
            }}
          />
        </div>
      )}

      {/* Bird Container */}
      <div 
        ref={containerRef}
        className={`absolute pointer-events-none z-40 ${className}`}
        style={{ width: '100%', height: '100px' }}
      >
        <div
          style={{
            position: 'absolute',
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: direction === 'right-to-left' ? 'scaleX(-1)' : 'scaleX(1)',
            transition: isFlying ? 'none' : 'all 0.3s ease-in-out',
            zIndex: 50
          }}
        >
          {/* Bird */}
          <div
            onClick={handleBirdClick}
            style={{
              cursor: 'pointer',
              pointerEvents: 'auto'
            }}
          >
            <Image
              src={`/pixel/bird_${currentFrame}.png`}
              alt="Flying bird"
              width={40}
              height={40}
              className="opacity-90 hover:opacity-100 transition-all duration-300"
              style={{
                filter: 'drop-shadow(0 0 0px rgba(255, 255, 255, 0))',
                transition: 'filter 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 40px rgba(255, 255, 255, 0.6))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'drop-shadow(0 0 0px rgba(255, 255, 255, 0))';
              }}
              priority
            />
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes speechBubblePop {
          0% {
            transform: translateX(-50%) scale(0);
            opacity: 0;
          }
          50% {
            transform: translateX(-50%) scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: translateX(-50%) scale(1);
            opacity: 0.9;
          }
        }
      `}</style>
    </>
  );
}
