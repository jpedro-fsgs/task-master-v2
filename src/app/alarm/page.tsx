"use client";

import React, { useContext, useState } from "react";
import { BsAlarm, BsPlus, BsX } from "react-icons/bs";
import { ClockContext } from "../context/ClockContext";

import AlarmInput from "./components/AlarmInput";
import { AlarmContext, AlarmInterface } from "../context/AlarmContext";
import { AnimatePresence, motion } from "framer-motion";

function Alarm() {
  const { alarmsList, removeAlarm } = useContext(AlarmContext);

  const { date, fullTime } = useContext(ClockContext);
  const [isInputOpen, setIsInputOpen] = useState(false);

  return (
    <div className="bg-main-backgroundcolorlighter rounded max-w-[50rem] max-h-[80vh] mx-auto max-md:mx-5 p-10 mt-24 max-sm:mt-5 flex flex-col gap-5">
      <div className="flex flex-col justify-center items-center gap-4">
        <h2 className="text-main-textcolor text-4xl max-md:text-3xl text-center font-notoSans break-words">
          {date}
        </h2>
        <h1 className="text-main-textcolor text-8xl max-md:text-6xl text-center font-notoSans break-words">
          {fullTime}
        </h1>
        <button
          className="bg-main-buttoncolor text-main-textcolor mt-5 h-10 p-1 rounded-sm active:scale-95 flex"
          onClick={() => setIsInputOpen(true)}
        >
          <BsPlus className="size-full" />
          <BsAlarm className="size-full p-1" />
        </button>
      </div>
      <ul className="flex flex-col gap-5 h-fit w-full overflow-y-auto">
        <AnimatePresence>
          {alarmsList
            .sort(
              (a: AlarmInterface, b: AlarmInterface) =>
                a.time.getTime() - b.time.getTime()
            )
            .map((alarm: AlarmInterface) => (
              <motion.li
                key={alarm.id}
                className="mx-auto w-full md:w-2/4 p-2 gap-2 rounded-sm bg-main-textcolor font-notoSans text-xl flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="font-bold">
                  {alarm.time.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p className="truncate">{alarm.title}</p>
                <button
                  className="bg-main-buttoncolor justify-self-end ml-auto size-8 min-w-fit rounded-sm active:scale-95"
                  onClick={() => removeAlarm(alarm.id)}
                >
                  <BsX className="text-main-textcolor size-full" />
                </button>
              </motion.li>
            ))}
        </AnimatePresence>
      </ul>
      <AlarmInput isOpen={isInputOpen} setIsOpen={setIsInputOpen} />
    </div>
  );
}

export default Alarm;
