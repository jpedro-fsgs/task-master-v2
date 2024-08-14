"use client";

import React, { useContext, useEffect, useRef } from "react";
import { BsChevronDown, BsChevronUp, BsPause, BsPlay } from "react-icons/bs";
import { MetronomeContext } from "../context/MetronomeContext";


function Metronome() {
  const {
    bpm,
    handleUp,
    handleDown,
    handleSliderChange,
    handlePause,
    handleStart,
    isRunning,
    buttonGlowActive,
  } = useContext(MetronomeContext);

  const pauseButton = useRef<HTMLButtonElement>(null);
  const playButton = useRef<HTMLButtonElement>(null);
  const upButton = useRef<HTMLButtonElement>(null);
  const downButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    console.log(document.referrer);
    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === "Space") {
        event.preventDefault();
        if (playButton.current) {
          playButton.current.click();
          return;
        }
        if (pauseButton.current) pauseButton.current.click();
        return;
      }
      if (event.code === "ArrowUp") {
        event.preventDefault();
        if (upButton.current) upButton.current.click();
        return;
      }
      if (event.code === "ArrowDown") {
        event.preventDefault();
        if (downButton.current) downButton.current.click();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="bg-main-backgroundcolorlighter rounded max-w-[50rem] max-h-[80vh] mx-auto max-md:mx-5 p-10 mt-[25vh] max-sm:mt-[20vh] flex flex-col gap-5 border-main-buttoncolor ">
      <span className="flex mx-auto gap-5">
        <h1
          className={
            "text-main-textcolor w-48 text-8xl text-center font-notoSans "
          }
        >
          {bpm}
        </h1>
        <span className="flex flex-col max-md:justify-around justify-center gap-5">
          <button
            className="bg-main-buttoncolor size-10 rounded-sm active:scale-95"
            onClick={handleUp}
            ref={upButton}
          >
            <BsChevronUp className="text-main-textcolor size-full" />
          </button>
          <button
            className="bg-main-buttoncolor size-10 rounded-sm active:scale-95"
            onClick={handleDown}
            ref={downButton}
          >
            <BsChevronDown className="text-main-textcolor size-full" />
          </button>
        </span>
      </span>
      <input
        type="range"
        className="accent-main-buttoncolor cursor-pointer my-5"
        min={40}
        max={250}
        value={bpm}
        onChange={handleSliderChange}
        // onMouseDown={(e) => e.stopPropagation()}
        // onMouseUp={(e) => e.stopPropagation()}
        // onMouseMove={(e) => e.stopPropagation()}
        // onTouchMove={(e) => e.stopPropagation()}
        // onTouchStart={(e) => e.stopPropagation()}
        onTouchStartCapture={(e) => e.stopPropagation()}
        onTouchEndCapture={(e) => e.stopPropagation()}
        // onTouchEnd={(e) => e.stopPropagation()}
        // onTouchCancel={(e) => e.stopPropagation()}
      />
      <span className="mx-auto">
        {isRunning ? (
          <button
            className={
              "bg-main-buttoncolor h-10 w-32 rounded-sm active:scale-95" +
              (buttonGlowActive ? " shadow-button-glow" : "")
            }
            onClick={handlePause}
            ref={pauseButton}
          >
            <BsPause className="text-main-textcolor size-full" />
          </button>
        ) : (
          <button
            className="bg-main-buttoncolor h-10 w-32 rounded-sm active:scale-95"
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

export default Metronome;
