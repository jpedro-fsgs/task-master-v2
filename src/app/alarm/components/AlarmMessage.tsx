import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const upAnimations = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 50, opacity: 0 },
  transition: { duration: 0.25 },
};

function AlarmMessage({
  alarmMessageIsOpen,
  handleStopAlarm,
  currentAlarm,
}: {
  alarmMessageIsOpen: boolean;
  handleStopAlarm: any;
  currentAlarm: any;
}) {
  return (
    <AnimatePresence>
      {alarmMessageIsOpen && (
        <div className="relative z-50">
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black bg-opacity-50">
            <motion.div
              {...upAnimations}
              className="w-80 space-y-4 rounded outline-main-buttoncolor outline outline-1 bg-main-backgroundcolorlighter text-main-textcolor font-notoSans p-12"
            >
              <h1 className="font-bold text-center">
                {currentAlarm.current?.title}
              </h1>
              <p className="text-center">
                {currentAlarm.current?.time.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <div className="flex justify-center">
                <button
                  onClick={handleStopAlarm}
                  className="bg-main-buttoncolor p-2 mt-5 w-36 rounded-sm active:scale-95"
                >
                  Stop
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default AlarmMessage;
