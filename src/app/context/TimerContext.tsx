"use client";

import { createContext, useEffect, useRef, useState } from "react";

export const TimerContext = createContext<any>(undefined);

export function TimerProvider({ children }: any) {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const inputRef = useRef<any>(null);
  const intervalRef = useRef<any>(null);
  const beepAudio = useRef<any>(null);

  useEffect(() => {
    beepAudio.current = new Audio("/beep.mp3");
    // inputRef.current.value = setInputValue(timer);
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimer((t) => {
          if (t <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            if (inputRef.current) inputRef.current.value = setInputValue(0);
            beepAudio.current.play();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  function handleStart() {
    if (getInputValue() == 0) return;
    setIsRunning(true);
    setTimer(getInputValue());
  }

  function handlePause() {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    inputRef.current.value = setInputValue(timer);
  }

  function handleStop() {
    setTimer(0);
    setIsRunning(false);
    clearInterval(intervalRef.current);
    inputRef.current.value = setInputValue(0);
  }

  function handleChange() {
    const numeros = inputRef.current.value.replace(/\D/g, "");
    const seconds = String(Number(numeros.slice(numeros.length - 2, numeros.length)));
    const minutes = String(Number(numeros.slice(0, numeros.length - 2)));
    const formatted = minutes.padStart(1, "0") + ":" + seconds.padStart(2, "0");
    inputRef.current.value = formatted;
  }

  function setInputValue(value: number) {
    return `${String(Math.floor(value / 60)).padStart(1, "0")}:${String(
      value % 60
    ).padStart(2, "0")}`;
  }

  function getInputValue() {
    if (inputRef.current.value === "") return 0;
    const time = inputRef.current.value.split(":");
    return Number(time[0]) * 60 + Number(time[1]);
  }

  return (
    <TimerContext.Provider
      value={{
        timer,
        isRunning,
        inputRef,
        handleStart,
        handlePause,
        handleStop,
        handleChange,
        setInputValue
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}
