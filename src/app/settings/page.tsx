"use client";

import React, { useContext, useEffect } from "react";
import { MetronomeContext } from "../context/MetronomeContext";
import { AlarmContext } from "../context/AlarmContext";
import { TimerContext } from "../context/TimerContext";
import VolumeIcon from "./components/VolumeIcon";

function Settings() {
  const { setAlarmVolume, alarmVolume } = useContext(AlarmContext);
  const { setTimerVolume, timerVolume, mainVolume, setMainVolume } =
    useContext(TimerContext);
  const { setMetronomeVolume, metronomeVolume } = useContext(MetronomeContext);

  useEffect(() => {
    Howler.volume(mainVolume);
  }, [mainVolume]);

  function handleMainVolume(event: React.ChangeEvent<HTMLInputElement>) {
    setMainVolume(Number(event.target.value));
  }

  function handleMetronomeVolume(event: React.ChangeEvent<HTMLInputElement>) {
    setMetronomeVolume(Number(event.target.value));
  }

  function handleAlarmVolume(event: React.ChangeEvent<HTMLInputElement>) {
    setAlarmVolume(Number(event.target.value));
  }

  function handleTimerVolume(event: React.ChangeEvent<HTMLInputElement>) {
    setTimerVolume(Number(event.target.value));
  }

  return (
    <div className="bg-main-backgroundcolorlighter rounded max-w-[50rem] max-h-[80vh] mx-auto max-md:mx-5 p-10 mt-[25vh] max-sm:mt-[20vh]">
      <h2 className="text-4xl font-extrabold text-center font-notoSans text-main-textcolor col-span-5 mb-7">
        Sound
      </h2>
      <div className="lg:w-3/4 mx-auto font-notoSans text-main-textcolor grid grid-cols-5 gap-5 py-5">
        <p className="text-lg  col-span-2 font-semibold">Main</p>
        <span className="flex items-center gap-2 col-span-3">
          <VolumeIcon size={30} volume={mainVolume} setVolume={setMainVolume}/>
          <input
            type="range"
            className="accent-main-buttoncolor w-full"
            min={0}
            step={0.01}
            max={1}
            value={mainVolume}
            onChange={handleMainVolume}
            onTouchStartCapture={(e) => e.stopPropagation()}
            onTouchEndCapture={(e) => e.stopPropagation()}
          />
        </span>
        <p className="text-lg  col-span-2 font-semibold">Alarm</p>
        <span className="flex items-center gap-2 col-span-3">
          <VolumeIcon size={30} volume={alarmVolume} setVolume={setAlarmVolume}/>
          <input
            type="range"
            className="accent-main-buttoncolor w-full"
            min={0}
            step={0.01}
            max={1}
            value={alarmVolume}
            onChange={handleAlarmVolume}
            onTouchStartCapture={(e) => e.stopPropagation()}
            onTouchEndCapture={(e) => e.stopPropagation()}
          />
        </span>
        <p className="text-lg  col-span-2 font-semibold">Timer</p>
        <span className="flex items-center gap-2 col-span-3">
          <VolumeIcon size={30} volume={timerVolume} setVolume={setTimerVolume}/>
          <input
            type="range"
            className="accent-main-buttoncolor w-full"
            min={0}
            step={0.01}
            max={1}
            value={timerVolume}
            onChange={handleTimerVolume}
            onTouchStartCapture={(e) => e.stopPropagation()}
            onTouchEndCapture={(e) => e.stopPropagation()}
          />
        </span>
        <p className="text-lg  col-span-2 font-semibold">Metronome</p>
        <span className="flex items-center gap-2 col-span-3">
          <VolumeIcon size={30} volume={metronomeVolume} setVolume={setMetronomeVolume}/>
          <input
            type="range"
            className="accent-main-buttoncolor w-full"
            value={metronomeVolume}
            onChange={handleMetronomeVolume}
            min={0}
            step={0.01}
            max={1}
            onTouchStartCapture={(e) => e.stopPropagation()}
            onTouchEndCapture={(e) => e.stopPropagation()}
          />
        </span>
      </div>
    </div>
  );
}

export default Settings;
