"use client";

import { createContext, useEffect, useRef, useState } from "react";

export const StopwatchContext = createContext<any>(undefined);

export function StopwatchProvider ({children}: any){

    const [splitList, setSplitList] = useState<number[]>([]);

    const [stopwatch, setStopwatch] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef<any>(null);
    const startTime = useRef(0);
  
    function handleStart() {
      if (isRunning) return;
      setIsRunning(true);
      startTime.current = Date.now() - stopwatch;
    }
    function handleStop() {
      setIsRunning(false);
      setStopwatch(0);
      setSplitList([]);
      clearInterval(intervalRef.current);
    }
    function handlePause() {
      setIsRunning(false);
      clearInterval(intervalRef.current);
    }
    function handleSplit() {
      if (splitList.includes(stopwatch) || stopwatch === 0) return;
      const updatedSplitList = [...splitList, stopwatch];
      setSplitList(updatedSplitList);
    }
  
    useEffect(() => {
      if (isRunning) {
        intervalRef.current = setInterval(() => {
          setStopwatch(Date.now() - startTime.current);
        }, 1);
      }
    }, [isRunning]);
    
    return <StopwatchContext.Provider value={{splitList, stopwatch, isRunning, handleStart, handleStop, handlePause, handleSplit }}>{children}</StopwatchContext.Provider>
}