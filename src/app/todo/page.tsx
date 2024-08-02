"use client";

import { AnimatePresence, Reorder, useDragControls } from "framer-motion";
import React, { useRef, useState } from "react";
import { BsChevronUp, BsChevronDown, BsX, BsPlus } from "react-icons/bs";
import TodoItem from "./components/TodoItem";

function Todo() {
  const [taskList, setTaskList] = useState([{ id: 1, task: "Enter a Task" }]);
  const inputRef = useRef<HTMLInputElement>(null);

  function addTask() {
    if (inputRef.current === null || inputRef.current.value === "") return;

    const newTask = { id: Date.now(), task: inputRef.current.value };
    setTaskList((t) => [newTask, ...t]);
    inputRef.current.value = "";
  }

  function handleEnter(event: any) {
    if (event.keyCode === 13) addTask();
  }

  function handleDelete(index: Number) {
    const updatedTasks = taskList.filter((_, i) => index !== i);
    setTaskList(updatedTasks);
  }

  return (
    <div className="bg-main-backgroundcolorlighter rounded max-w-[50rem] max-h-[80vh] mx-auto max-md:mx-5 p-10 mt-24 max-sm:mt-5 flex flex-col gap-5">
      <h1 className=" text-main-textcolor text-5xl font-notoSans font-extrabold text-center">
        To Do List
      </h1>
      <span className="bg-main-textcolor p-3 mb-4 flex font-notoSans text-xl font-semibold justify-between items-center rounded-sm">
        <input
          placeholder="Enter Task"
          className="bg-main-textcolor border-none focus:outline-none w-5/6"
          ref={inputRef}
          onKeyDown={handleEnter}
          // id="addTask"
        ></input>
        <button
          className="bg-main-buttoncolor size-8 rounded-sm active:scale-95"
          onClick={addTask}
        >
          <BsPlus className="text-main-textcolor size-full" />
        </button>
      </span>
      <Reorder.Group
        className="flex flex-col gap-5 h-fit w-full overflow-y-auto"
        values={taskList}
        onReorder={setTaskList}
        layoutScroll
        dragConstraints={false}
      >
        <AnimatePresence>
          {taskList.map((taskItem, index) => (
            <TodoItem
              taskItem={taskItem}
              key={taskItem.id}
              index={index}
              handleDelete={handleDelete}
            />
          ))}
        </AnimatePresence>
      </Reorder.Group>
    </div>
  );
}

export default Todo;
