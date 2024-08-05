"use client";

import React, { useEffect, useRef, useState } from "react";
import { BsPause, BsPlay, BsStop } from "react-icons/bs";

function formatTimer(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function Timer() {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const inputRefMinutes = useRef<any>(null);
  const inputRefSeconds = useRef<any>(null);

  const intervalRef = useRef<any>(null);

  function handleStart() {
    console.log(1)
    if (isRunning || timer === 0) return;
    console.log(2)
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 0) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          inputRefMinutes.current.value = 0;
          inputRefSeconds.current.value = 0;
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }

  function handlePause() {
    if (!isRunning) return;
    setIsRunning(false);
    clearInterval(intervalRef.current);
  }

  function handleStop() {
    if (!isRunning) return;
    setTimer(0);
    setIsRunning(false);
    clearInterval(intervalRef.current);
  }

  const [timerFocus, setTimerFocus] = useState(false);

  useEffect(() => {
    if (timerFocus) inputRefSeconds.current.focus();
  }, [timerFocus]);

  function handleBlur() {
    setTimeout(() => {
      if (
        !inputRefMinutes.current.contains(document.activeElement) &&
        !inputRefSeconds.current.contains(document.activeElement)
      ) {
        setTimerFocus(false);
        console.log(Number(inputRefMinutes.current.value));
        setTimer(
          (Number(inputRefMinutes.current.value) || 0) * 60 + (Number(inputRefSeconds.current.value) || 0)
        );
      }
    }, 0);
  }

  function handleClick(){
    setTimerFocus(true);
    clearInterval(intervalRef.current);
    setIsRunning(false);
    inputRefMinutes.current.value = Math.floor(timer/60);
    inputRefSeconds.current.value = timer % 60;
  }

  return (
    <div className="bg-main-backgroundcolorlighter rounded max-w-[50rem] max-h-[80vh] mx-auto max-md:mx-5 p-10 mt-24 max-sm:mt-5 flex flex-col gap-5">
      <div>
        <h1
          className={
            "text-main-textcolor text-8xl max-md:text-6xl p-4 text-center font-notoSans" +
            (timerFocus ? " hidden" : "")
          }
          onClick={handleClick}
        >
          {formatTimer(timer)}
        </h1>
        <span
          className={
            "flex justify-center items-center text-main-textcolor text-8xl max-md:text-6xl p-4 text-center font-notoSans" +
            (timerFocus ? "" : " hidden")
          }
        >
          <input
            ref={inputRefMinutes}
            type="number"
            placeholder="m"
            min="0"
            className="bg-transparent focus:outline-main-backgroundcolordarker w-36 text-right"
            onBlur={handleBlur}
          />
          :
          <input
            ref={inputRefSeconds}
            type="number"
            placeholder="ss"
            min="0"
            max="59"
            className="bg-transparent focus:outline-main-backgroundcolordarker w-36"
            onBlur={handleBlur}
          />
        </span>
      </div>
      <span className="flex max-md:justify-around justify-center gap-5">
        {isRunning?
        (<button
          className="bg-main-buttoncolor size-10 rounded-sm active:scale-95"
          onClick={handlePause}
        >
          <BsPause className="text-main-textcolor size-full" />
        </button>) :
        (<button
          className="bg-main-buttoncolor size-10 rounded-sm active:scale-95"
          onClick={handleStart}
        >
          <BsPlay className="text-main-textcolor size-full" />
        </button>)}
        <button
          className="bg-main-buttoncolor size-10 rounded-sm active:scale-95"
          onClick={handleStop}
        >
          <BsStop className="text-main-textcolor size-full" />
        </button>
      </span>
    </div>
  );
}

export default Timer;
