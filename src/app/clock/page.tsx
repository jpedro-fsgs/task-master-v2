"use client";

import React, { useEffect, useState } from "react";

function Clock() {
  const [horario, setHorario] = useState<string>("");
  const [data, setData] = useState<string>("");

  useEffect(() => {
    setHorario(new Date().toLocaleTimeString());
    setData(new Date().toLocaleDateString());
    setInterval(() => {
      const newDate = new Date();
      
      setHorario(newDate.toLocaleTimeString());
      setData(newDate.toLocaleDateString());
    }, 1000);
  }, []);
  
  return (
    <div className="bg-main-backgroundcolorlighter rounded max-w-[50rem] max-h-[80vh] mx-auto max-md:mx-5 p-10 mt-[25vh] max-sm:mt-[20vh] flex flex-col gap-5">{/* //mt-24 */}
      <h1 className="text-main-textcolor text-8xl max-md:text-6xl text-center font-notoSans break-words">{horario}</h1>
      <h2 className="text-main-textcolor text-4xl max-md:text-3xl text-center font-notoSans break-words">{data}</h2>
    </div>
  );
}

export default Clock;
