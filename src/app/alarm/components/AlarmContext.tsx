"use client";

import { createContext, useEffect, useRef, useState } from "react";
import AlarmMessage from "./AlarmMessage";

export interface AlarmInterface {
  id: number;
  time: Date;
  title: string;
  song: Howl;
  timeout: NodeJS.Timeout | undefined;
}

const songs = ["/alarm1.mp3", "/alarm2.mp3"];

export const AlarmContext = createContext<any>(undefined);

export function AlarmProvider({ children }: { children: React.ReactNode }) {
  const [alarmsList, setAlarmsList] = useState<AlarmInterface[]>([]);
  
  const currentAlarm = useRef<AlarmInterface | null>(null);

  const [alarmMessageIsOpen, setAlarmMessageIsOpen] = useState(false);

  function addAlarm(time: string, title: string,  songNumber: number){
    const [horas, minutos] = time.split(":").map(Number);
    const dataAtual = new Date();
    dataAtual.setHours(horas, minutos, 0, 0);
    if (dataAtual < new Date()) {
      dataAtual.setDate(new Date().getDate() + 1);
    }
    if(alarmsList.some(alarm => alarm.time.getTime() === dataAtual.getTime())) {
      return false;
    }
    const newAlarm = {
      id: Date.now(),
      time: dataAtual,
      title: title,
      song: new Howl({ src: songs[songNumber]}),
      timeout: undefined,
    };
    setAlarmsList((a: AlarmInterface[]) => [...a, newAlarm]);
    return true
  }

  function removeAlarm(id: number){
    const alarm = alarmsList.find(alarm => alarm.id === id);
    if(alarm){
      clearTimeout(alarm.timeout);
      setAlarmsList(a => a.filter(alarm => alarm.id != id));
    }
  }

  function handleActiveAlarm(alarm: AlarmInterface) {
    console.log(currentAlarm.current?.title || "é null");
    if(currentAlarm.current !== null){
      currentAlarm.current.song.stop();
      removeAlarm(currentAlarm.current.id);
    }
    currentAlarm.current = alarm;
    setAlarmMessageIsOpen(true);
    alarm.song.play();
  }

  function handleStopAlarm() {
    if(!currentAlarm.current) return;
    currentAlarm.current.song.stop();
    removeAlarm(currentAlarm.current.id);
    currentAlarm.current = null;
    setAlarmMessageIsOpen(false);
  }

  useEffect(() => {
    alarmsList.forEach((alarm) => {
      if (new Date() > alarm.time) return;
      alarm.timeout = setTimeout(() => {
        handleActiveAlarm(alarm);
      }, alarm.time.getTime() - Date.now());
      // }, 1000);
    });
  }, [alarmsList]);

  return (
    <AlarmContext.Provider
      value={{
        alarmsList,
        addAlarm,
        removeAlarm
      }}
    >
      {children}
      <AlarmMessage
        alarmMessageIsOpen={alarmMessageIsOpen}
        handleStopAlarm={handleStopAlarm}
        currentAlarm={currentAlarm}
      />
    </AlarmContext.Provider>
  );
}
