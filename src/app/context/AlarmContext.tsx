"use client";

import { createContext, useEffect, useRef, useState } from "react";
import AlarmMessage from "../alarm/components/AlarmMessage";
import { Howl } from "howler";

export interface AlarmInterface {
  id: number;
  time: Date;
  title: string;
  song: Howl;
  songNumber: number;
  timeout: NodeJS.Timeout | undefined;
}

interface AlarmData {
  time: Date;
  title: string;
  songNumber: number;
}

function setAlarmData({ time, title, songNumber }: AlarmInterface) {
  return {
    time,
    title,
    songNumber,
  };
}

export const AlarmContext = createContext<any>(undefined);

export function AlarmProvider({ children }: { children: React.ReactNode }) {
  const [alarmsList, setAlarmsList] = useState<AlarmInterface[]>([]);

  const currentAlarm = useRef<AlarmInterface | null>(null);
  const [alarmVolume, setAlarmVolume] = useState<number>(2);

  const [alarmMessageIsOpen, setAlarmMessageIsOpen] = useState(false);

  const songs = useRef<Howl[]>([]);

  useEffect(() => {
    if(songs.current){
      songs.current.forEach(song => song.volume(alarmVolume));
    }
    if(alarmVolume != 2){
      localStorage.setItem("alarmVolume", String(alarmVolume));
    }
  }, [alarmVolume]);

  useEffect(() => {
    songs.current = [
      new Howl({ src: "/alarm1.mp3", volume: alarmVolume }),
      new Howl({ src: "/alarm2.mp3", volume: alarmVolume }),
    ];
    const storedAlarmVolume = localStorage.getItem("alarmVolume");
    if(storedAlarmVolume) setAlarmVolume(Number(storedAlarmVolume));
    
    const storedAlarmsList = localStorage.getItem("alarmsList");
    
    function getAlarmData(stringData: string) {
      const data = JSON.parse(stringData);
      return data
        .map(({ time, title, songNumber }: AlarmData) => {
          return {
            id: Date.now(),
            time: new Date(time),
            title,
            song: songs.current[songNumber],
            songNumber,
            timeout: undefined,
          };
        })
        .filter(({ time }: AlarmInterface) => time.getTime() > Date.now());
    }
    if (storedAlarmsList !== null)
      setAlarmsList(getAlarmData(storedAlarmsList));
  }, []);

  function addAlarm(time: string, title: string, songNumber: number) {
    const [horas, minutos] = time.split(":").map(Number);
    const dataAtual = new Date();
    dataAtual.setHours(horas, minutos, 0, 0);
    if (dataAtual < new Date()) {
      dataAtual.setDate(new Date().getDate() + 1);
    }
    if (
      alarmsList.some((alarm) => alarm.time.getTime() === dataAtual.getTime())
    ) {
      return false;
    }
    const newAlarm = {
      id: Date.now(),
      time: dataAtual,
      title: title,
      song: songs.current[songNumber],
      songNumber,
      timeout: undefined,
    };
    setAlarmsList((a: AlarmInterface[]) => [...a, newAlarm]);
    return true;
  }

  function removeAlarm(id: number) {
    const alarm = alarmsList.find((alarm) => alarm.id === id);
    if (alarm) {
      clearTimeout(alarm.timeout);
      setAlarmsList((a) => a.filter((alarm) => alarm.id != id));
    }
  }

  function handleActiveAlarm(alarm: AlarmInterface) {
    if (currentAlarm.current !== null) {
      currentAlarm.current.song.stop();
      removeAlarm(currentAlarm.current.id);
    }
    currentAlarm.current = alarm;
    setAlarmMessageIsOpen(true);
    alarm.song.play();
  }

  function handleStopAlarm() {
    if (!currentAlarm.current) return;
    currentAlarm.current.song.stop();
    removeAlarm(currentAlarm.current.id);
    currentAlarm.current = null;
    setAlarmMessageIsOpen(false);
  }

  useEffect(() => {
    alarmsList.forEach((alarm) => {
      if (new Date() > alarm.time) return;
      if (alarm.timeout) return;
      alarm.timeout = setTimeout(() => {
        handleActiveAlarm(alarm);
      }, alarm.time.getTime() - Date.now());
    });
    if (alarmsList.length > 0) {
      localStorage.setItem(
        "alarmsList",
        JSON.stringify(alarmsList.map(setAlarmData))
      );
    }
  }, [alarmsList]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AlarmContext.Provider
      value={{
        alarmsList,
        addAlarm,
        removeAlarm,
        alarmVolume,
        setAlarmVolume
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
