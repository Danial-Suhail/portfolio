'use client';

import { useEffect, useRef } from 'react';

// Shogi drop sound effect - using the provided .m4a file
const SHOGI_DROP_SOUND = '/audio/shogi.m4a';

export function ShogiSoundProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio(SHOGI_DROP_SOUND);
    audio.volume = 0.3; // Adjust volume
    audioRef.current = audio;

    // Add click event listener to play sound on ANY click
    const handleClick = (e: MouseEvent) => {
      // Play sound on ANY click anywhere on the site
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {
          // Ignore autoplay restrictions
        });
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return <>{children}</>;
}

// Hook for manual sound triggering
export function useShogiSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(SHOGI_DROP_SOUND);
    audio.volume = 0.3;
    audioRef.current = audio;
  }, []);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Ignore autoplay restrictions
      });
    }
  };

  return { playSound };
}
