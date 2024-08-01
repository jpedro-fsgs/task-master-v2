"use client";

import { Reorder } from "framer-motion";
import React, { useRef, useState } from "react";
import { BsChevronUp, BsChevronDown, BsX, BsPlus } from "react-icons/bs";


function Todo() {
  const [taskList, setTaskList] = useState([{id: 1, task: "Enter a Task"}]);
  const inputRef = useRef<HTMLInputElement>(null);



  function addTask(){
    if(inputRef.current === null || inputRef.current.value === '') return;
      
    const newTask = {id: Date.now(), task: inputRef.current.value};
    setTaskList(t => [newTask, ...t]);
    inputRef.current.value = "";
  }

  function handleEnter(event: any){
    if(event.keyCode === 13) addTask();
  }

  function handleDelete(index: Number){
    const updatedTasks = taskList.filter((_, i) => index !== i);
    setTaskList(updatedTasks);
  }

  return (
    <div className="bg-main-backgroundcolorlighter max-w-[50rem] max-h-[85vh] mx-auto max-md:mx-5 p-10 mt-24 flex flex-col gap-5">
      <h1
        className=" text-main-textcolor text-5xl font-notoSans font-extrabold text-center"
      >
        To Do List
      </h1>
      <span className="bg-main-textcolor p-3 flex font-notoSans text-xl font-semibold justify-between rounded-sm">
        <input
          placeholder="Enter Task"
          className="bg-main-textcolor border-none focus:outline-none w-5/6"
          ref={inputRef}
          onKeyDown={handleEnter}
          id="addTask"
        ></input>
        <button className="bg-main-buttoncolor size-8 rounded-sm"
        onClick={addTask}
        >
          <BsPlus className="text-main-textcolor size-full" />
        </button>
      </span>
      <Reorder.Group className="flex flex-col gap-5 h-fit w-full overflow-y-auto" values={taskList} onReorder={setTaskList}>
        {taskList.map((taskItem, index) => (
          <Reorder.Item
            key={taskItem.id}
            value={taskItem}
            className="bg-main-textcolor p-3 flex font-notoSans text-xl font-semibold justify-between rounded-sm"
          >
            <p className="w-5/6">{index + 1}- {taskItem.task}</p>
            <button className="bg-main-buttoncolor size-8 rounded-sm"
            onClick={() => handleDelete(index)}>
            <BsX className="text-main-textcolor size-full" />
            </button>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}

export default Todo;
