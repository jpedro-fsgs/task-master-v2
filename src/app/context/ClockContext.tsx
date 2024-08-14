"use client"

import { createContext, useEffect, useState } from "react";

export const ClockContext = createContext<any>(undefined);

export function ClockProvider({ children }: { children: React.ReactNode }) {

  const [rawDate, setRawDate] = useState<Date>();
  const [date, setDate] = useState<string>();
  const [time, setTime] = useState<string>();

  useEffect(() => {
    const timeInterval = setInterval(() => {
        const currentDate = new Date();
        setRawDate(currentDate);
        setDate(currentDate.toLocaleDateString());
        setTime(currentDate.toLocaleTimeString());
      return () => clearInterval(timeInterval);
    }, 1000);
  }, []);
  return <ClockContext.Provider value={{rawDate, date, time}}>{children}</ClockContext.Provider>;
}
