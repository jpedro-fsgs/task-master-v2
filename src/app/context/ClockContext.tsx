"use client"

import { createContext, useEffect, useState } from "react";

export const ClockContext = createContext<any>(undefined);

export function ClockProvider({ children }: { children: React.ReactNode }) {

  const [date, setDate] = useState<string>();
  const [fullTime, setFullTime] = useState<string>();
  const [time, setTime] = useState<string>();

  useEffect(() => {
    const timeInterval = setInterval(() => {
        const currentDate = new Date();
        setTime(currentDate.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}));
        setFullTime(currentDate.toLocaleTimeString());
        setDate(currentDate.toLocaleDateString());

    }, 1000);
    return () => clearInterval(timeInterval);
  }, []);
  return <ClockContext.Provider value={{date, fullTime, time}}>{children}</ClockContext.Provider>;
}
