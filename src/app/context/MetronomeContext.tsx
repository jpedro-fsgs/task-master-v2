"use client";

import { createContext, useEffect, useRef, useState } from "react";
import { Howl } from "howler";

export const MetronomeContext = createContext<any>(undefined);

export function MetronomeProvider({ children }: { children: React.ReactNode }) {
  const [bpm, setBpm] = useState(100);
  const [isRunning, setIsRunning] = useState(false);

  const bpmIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const metronomeAudio = useRef<Howl | null>(null);
  const [metronomeVolume, setMetronomeVolume] = useState<number>(2);

  const [buttonGlowActive, setButtonGlowActive] = useState(false);

  function handleStart() {
    if (isRunning) return;
    setIsRunning(true);
  }
  function handlePause() {
    if (!isRunning) return;
    setIsRunning(false);
  }
  function handleUp() {
    if (bpm >= 250) return;
    setBpm((b) => {
      return b + 1;
    });
  }
  function handleDown() {
    if (bpm <= 40) return;
    setBpm((b) => {
      return b - 1;
    });
  }

  function handleSliderChange(event: React.ChangeEvent<HTMLInputElement>) {
    setBpm(Number(event.target.value));
  }

  useEffect(() => {
    if (bpm === 100) return;
    localStorage.setItem("bpm", JSON.stringify(bpm));
  }, [bpm]);

  useEffect(() => {
    if (isRunning) {
      bpmIntervalRef.current = setInterval(() => {
        metronomeAudio.current?.play();

        setButtonGlowActive(true);
        setTimeout(() => setButtonGlowActive(false), 80);
      }, 60000 / bpm);
    }
    return () => {
      if (bpmIntervalRef.current) {
        clearInterval(bpmIntervalRef.current);
      }
    };
  }, [isRunning, bpm]);

  useEffect(() => {
    const storedMetronomeVolume = localStorage.getItem("metronomeVolume");
    if (storedMetronomeVolume)
      setMetronomeVolume(Number(storedMetronomeVolume));

    metronomeAudio.current = new Howl({
      src: ["/metronome.mp3"],
      autoplay: false,
      volume: metronomeVolume,
    });

    const storedBpm = localStorage.getItem("bpm");
    if (storedBpm) setBpm(Number(localStorage.getItem("bpm")));
  }, []);

  useEffect(() => {
    if (metronomeAudio.current) {
      metronomeAudio.current.volume(metronomeVolume);
    }
    if (metronomeVolume != 2){
      localStorage.setItem("metronomeVolume", JSON.stringify(metronomeVolume));
    }
  }, [metronomeVolume]);

  return (
    <MetronomeContext.Provider
      value={{
        bpm,
        handleUp,
        handleDown,
        handleSliderChange,
        handlePause,
        handleStart,
        isRunning,
        buttonGlowActive,
        setMetronomeVolume,
        metronomeVolume,
      }}
    >
      {children}
    </MetronomeContext.Provider>
  );
}
