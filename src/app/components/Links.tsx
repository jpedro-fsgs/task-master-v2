"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import { BsAlarm, BsHourglass, BsSliders2, BsStopwatch } from "react-icons/bs";
import { LiaListAltSolid } from "react-icons/lia";
import { PiMetronome } from "react-icons/pi";
import { ClockContext } from "../context/ClockContext";

function Links() {
  const pathname = usePathname();
  const { time } = useContext(ClockContext);

  const active = "font-extrabold max-lg:text-main-backgroundcolordarker";

  return (
    <nav className="z-10 fixed bottom-0 md:top-0 max-lg:justify-between w-full font-notoSans bg-main-buttoncolor h-14 text-main-textcolor text-3xl flex items-center p-5 gap-6">
      <Link
        href="/todo"
        className={"hover:opacity-80 " + (pathname === "/todo" ? active : "")}
      >
        <span className="flex items-center gap-1">
          <LiaListAltSolid size={40} />
          <p className="max-lg:hidden whitespace-nowrap">To Do</p>
        </span>
      </Link>
      <Link
        href="/alarm"
        className={"hover:opacity-85 " + (pathname === "/alarm" ? active : "")}
      >
        <span className="flex items-center gap-1">
          <BsAlarm size={30} />
          <p className="max-lg:hidden">Alarm</p>
        </span>
      </Link>
      <Link
        href="/stopwatch"
        className={
          "hover:opacity-85 " + (pathname === "/stopwatch" ? active : "")
        }
      >
        <span className="flex items-center gap-1">
          <BsStopwatch size={30} />
          <p className="max-lg:hidden">Stopwatch</p>
        </span>
      </Link>
      <Link
        href="/timer"
        className={"hover:opacity-85 " + (pathname === "/timer" ? active : "")}
      >
        <span className="flex items-center gap-1">
          <BsHourglass size={30} />
          <p className="max-lg:hidden">Timer</p>
        </span>
      </Link>
      <Link
        href="/metronome"
        className={
          "hover:opacity-85 " + (pathname === "/metronome" ? active : "")
        }
      >
        <span className="flex items-center gap-1">
          <PiMetronome size={35} />
          <p className="max-lg:hidden">Metronome</p>
        </span>
      </Link>
      <span className="flex items-center lg:justify-self-end lg:ml-auto">
        <p className="max-md:hidden mr-4">
          {time}
        </p>
        <Link
          href="/"
          className={"hover:opacity-85" + (pathname === "/" ? active : "")}
        >
          <span className="flex items-center gap-1">
            <BsSliders2 size={33} />
          </span>
        </Link>
      </span>
    </nav>
  );
}

export default Links;
