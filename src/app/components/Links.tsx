"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsAlarm, BsClock, BsHourglass, BsListTask, BsSliders2, BsStopwatch } from "react-icons/bs";
import { PiMetronome } from "react-icons/pi";

function Links() {
  const pathname = usePathname();
  const [pathHistory, setPathHistotry] = useState<string[]>([]);

  useEffect(() => {
    setPathHistotry(p => [...p, pathname]);
  }, [pathname]);
  
  useEffect(() => {
    console.log(pathHistory);
  }, [pathHistory]);

  const active = "font-extrabold max-lg:text-main-backgroundcolordarker";

  return (
    <nav className="z-10 fixed bottom-0 md:top-0 max-lg:justify-between w-full font-notoSans bg-main-buttoncolor h-14 text-main-textcolor text-3xl flex items-center p-5 gap-7">
      <Link href="/todo" className={"hover:opacity-80 " + (pathname === "/todo" ? active : "")}>
        <span className="flex items-center gap-2">
          <BsListTask/>
          <p className="max-lg:hidden">Todo</p>
        </span>
      </Link>
      <Link href="/alarm" className={"hover:opacity-85 " + (pathname === "/alarm" ? active : "")}>
        <span className="flex items-center gap-1">
          <BsAlarm className=""/>
          <p className="max-lg:hidden">Alarm</p>
        </span>
      </Link>
      <Link href="/stopwatch" className={"hover:opacity-85 " + (pathname === "/stopwatch" ? active : "")}>
        <span className="flex items-center gap-1">
          <BsStopwatch />
          <p className="max-lg:hidden">Stopwatch</p>
        </span>
      </Link>
      <Link href="/timer" className={"hover:opacity-85 " + (pathname === "/timer" ? active : "")}>
        <span className="flex items-center gap-1">
          <BsHourglass />
          <p className="max-lg:hidden">Timer</p>
        </span>
      </Link>
      <Link href="/metronome" className={"hover:opacity-85 " + (pathname === "/metronome" ? active : "")}>
        <span className="flex items-center gap-1">
          <PiMetronome size={35} />
          <p className="max-lg:hidden">Metronome</p>
        </span>
      </Link>
      <Link href="/" className={"hover:opacity-85 lg:justify-self-end lg:ml-auto " + (pathname === "/" ? active : "")}>
        <span className="flex items-center gap-1">
          <BsSliders2 size={35} />
        </span>
      </Link>
    </nav>
  );
}

export default Links;
