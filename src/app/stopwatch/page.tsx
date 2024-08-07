"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useEffect, useRef } from "react";
import { BsPause, BsPlay, BsStop } from "react-icons/bs";
import { LiaFlagCheckeredSolid } from "react-icons/lia";
import { StopwatchContext } from "../context/StopwatchContext";

function formatStopwatch(time: number) {
  const milisseconds = time % 1000;
  time = Math.floor(time / 1000);

  const seconds = time % 60;
  time = Math.floor(time / 60);

  const minutes = time % 60;
  time = Math.floor(time / 60);

  const hours = time % 24;
  time = Math.floor(time / 24);

  return (
    (time > 0 ? time + ":" : "") +
    (hours > 0 ? hours + ":" : "") +
    `${minutes}:${String(seconds).padStart(2, "0")}:${String(
      milisseconds
    ).padStart(3, "0")}`
  );
}

function formatSplit(time: number) {
  if (time > 86400000) return `${Math.floor(time / 86400000)}d`;
  if (time > 3600000) return `${Math.floor(time / 3600000)}h`;
  return formatStopwatch(time);
}

function Stopwatch() {
  const {
    splitList,
    stopwatch,
    isRunning,
    handlePause,
    handleStart,
    handleStop,
    handleSplit,
  } = useContext(StopwatchContext);

  const splitButton = useRef<HTMLButtonElement>(null);
  const playButton = useRef<HTMLButtonElement>(null);
  const pauseButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === "Space") {
        event.preventDefault();
        if (playButton.current) playButton.current.click();
        else if (pauseButton.current) pauseButton.current.click();
      }
      else if (event.code === "KeyS"){
        event.preventDefault();
        if(splitButton.current) splitButton.current.click();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="bg-main-backgroundcolorlighter rounded max-w-[50rem] max-h-[80vh] mx-auto max-md:mx-5 p-10 my-24 max-sm:mt-5 flex flex-col gap-9">
      <h1 className="text-main-textcolor text-8xl max-md:text-6xl text-center font-notoSans break-words">
        {formatStopwatch(stopwatch)}
      </h1>
      <span className="flex max-md:justify-around justify-center gap-5">
        <button
          className="bg-main-buttoncolor size-10 rounded-sm active:scale-95"
          onClick={handleStop}
        >
          <BsStop className="text-main-textcolor size-full" />
        </button>
        <button
          className="bg-main-buttoncolor size-10 p-1 rounded-sm active:scale-95"
          onClick={handleSplit}
          ref={splitButton}
        >
          <LiaFlagCheckeredSolid className="text-main-textcolor size-full" />
        </button>{" "}
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
      <div className="overflow-y-auto">
        <AnimatePresence>
          {splitList
            .toReversed()
            .map((split: number, index: number, array: number[]) => (
              <motion.div
                key={split}
                className="bg-main-textcolor w-2/4 max-md:w-full p-1 mb-4 mx-auto flex font-notoSans text-xl font-semibold items-center justify-center rounded-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="size-full text-left flex items-center text-slate-500">
                  {array.length - index}
                </p>
                <p className="size-full text-center">
                  {formatStopwatch(split)}
                </p>
                <p className="size-full text-right text-sm text-slate-500">
                  +{formatSplit(split - (array[index + 1] || 0))}
                </p>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Stopwatch;
