"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { BsPause, BsPlay, BsStop } from "react-icons/bs";
import { TimerContext } from "../context/TimerContext";

function formatTimer(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function Timer() {

  const {
    isRunning,
    timer,
    inputRef,
    handlePause,
    handleStart,
    handleStop,
    handleChange,
    setInputValue
  } = useContext(TimerContext);

  const playButton = useRef<HTMLButtonElement>(null);
  const pauseButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    console.log(setInputValue(timer));
    inputRef.current.value = setInputValue(timer);
    
    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === "Space") {
        event.preventDefault();
        if (playButton.current) playButton.current.click();
        else if (pauseButton.current) pauseButton.current.click();
      } else if (event.code == "KeyS"){
        if(inputRef.current) inputRef.current.focus();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputRef]);

  return (
    <div tabIndex={0} className="bg-main-backgroundcolorlighter rounded max-w-[50rem] max-h-[80vh] mx-auto max-md:mx-5 p-10 mt-[25vh] max-sm:mt-[20vh] flex flex-col gap-5">
      <div className="flex flex-col justify-center h-36">
        <h1
          className={
            "text-main-textcolor text-8xl max-md:text-6xl p-4 text-center font-notoSans" +
            (isRunning ? "" : " hidden")
          }
        >
          {formatTimer(timer)}
        </h1>
        <input
          ref={inputRef}
          inputMode="numeric"
          onChange={handleChange}
          placeholder="mm:ss"
          defaultValue="0:00"
          className={
            "bg-main-backgroundcolordarker focus:outline-main-backgroundcolordarker text-main-textcolor rounded md:w-7/12 md:mx-auto text-8xl max-md:text-6xl p-4 text-center font-notoSans" +
            (isRunning ? " hidden" : "")
          }
        />
      </div>
      <span className="flex max-md:justify-around justify-center gap-5">
        <button
          className="bg-main-buttoncolor size-10 rounded-sm active:scale-95"
          onClick={handleStop}
        >
          <BsStop className="text-main-textcolor size-full" />
        </button>
        {isRunning ? (
          <button
            className="bg-main-buttoncolor size-10 rounded-sm active:scale-95"
            onClick={handlePause}
            ref={pauseButton}
          >
            <BsPause className="text-main-textcolor size-full" />
          </button>
        ) : (
          <button
            className="bg-main-buttoncolor size-10 rounded-sm active:scale-95"
            onClick={handleStart}
            ref={playButton}
          >
            <BsPlay className="text-main-textcolor size-full" />
          </button>
        )}
      </span>
    </div>
  );
}

export default Timer;
