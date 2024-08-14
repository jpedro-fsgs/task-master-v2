"use client";

import { createContext, useEffect, useRef, useState } from "react";

export const StopwatchContext = createContext<any>(undefined);

export function StopwatchProvider({ children }: { children: React.ReactNode }) {
  const [splitList, setSplitList] = useState<number[]>([]);

  const [stopwatch, setStopwatch] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<any>(null);
  const startTime = useRef(0);

  function handleStart() {
    if (isRunning) return;
    setIsRunning(true);
  }

  function handleStop() {
    setIsRunning(false);
    setStopwatch(0);
    setSplitList([]);
  }
  function handlePause() {
    if (!isRunning) return;
    setIsRunning(false);
  }

  function handleSplit() {
    if (splitList.includes(stopwatch) || stopwatch === 0) return;
    const updatedSplitList = [...splitList, stopwatch];
    setSplitList(updatedSplitList);
  }

  useEffect(() => {
    if (isRunning) {
      startTime.current = Date.now() - stopwatch;
      intervalRef.current = setInterval(() => {
        setStopwatch(Date.now() - startTime.current);
      }, 1);
    } else {
      clearInterval(intervalRef.current);
      startTime.current = 0;
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <StopwatchContext.Provider
      value={{
        splitList,
        stopwatch,
        isRunning,
        handleStart,
        handleStop,
        handlePause,
        handleSplit,
      }}
    >
      {children}
    </StopwatchContext.Provider>
  );
}
