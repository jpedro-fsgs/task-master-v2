"use client";

import React, { useContext, useRef } from "react";
import { AlarmContext } from "../../context/AlarmContext";
import { AnimatePresence, motion } from "framer-motion";

const upAnimations = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 50, opacity: 0 },
  transition: { duration: 0.25 },
};

function AlarmInput({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: any;
}) {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);
  const songSelectRef = useRef<HTMLSelectElement>(null);

  const { addAlarm } = useContext(AlarmContext);

  function handleAddAlarm() {
    if (
      timeInputRef.current &&
      songSelectRef.current &&
      titleInputRef.current &&
      timeInputRef.current.value != ""
    ) {
      const title = titleInputRef.current.value || "New Alarm";
      const time = timeInputRef.current.value;
      const song = songSelectRef.current.value;
      if (addAlarm(time, title, song)) setIsOpen(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 flex w-screen items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            {...upAnimations}
            onClick={(event) => event.stopPropagation()}
            className="space-y-7 rounded outline-main-buttoncolor outline outline-1 bg-main-backgroundcolorlighter text-main-textcolor font-notoSans p-12"
          >
            <h1 className="font-bold text-center">New Alarm</h1>
            <div className="flex flex-col gap-2">
              <span className="flex justify-between">
                <label htmlFor="alarm-title">Title: </label>
                <input
                  id="alarm-title"
                  autoComplete="off"
                  placeholder={"New Alarm"}
                  type="text"
                  ref={titleInputRef}
                  className="rounded-sm p-1 w-4/6 bg-main-backgroundcolordarker text-main-textcolor"
                />
              </span>
              <span className="flex justify-between">
                <label htmlFor="alarm-time">Time: </label>
                <input
                  id="alarm-time"
                  type="time"
                  ref={timeInputRef}
                  className="rounded-sm p-1 w-4/6 bg-main-backgroundcolordarker text-main-textcolor"
                />
              </span>
              <span className="flex justify-between">
                <label htmlFor="song-select">Song: </label>
                <select
                  id="song-select"
                  ref={songSelectRef}
                  className="rounded-sm p-1 w-4/6 bg-main-backgroundcolordarker"
                >
                  <option value={0}>Meio Mundo</option>
                  <option value={1}>Dew Gathering</option>
                </select>
              </span>
            </div>
            <div className="flex justify-around">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-transparent outline-main-buttoncolor outline-1 outline p-2 rounded-sm active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAlarm}
                className="bg-main-buttoncolor p-2 rounded-sm active:scale-95"
              >
                Add Alarm
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default AlarmInput;
