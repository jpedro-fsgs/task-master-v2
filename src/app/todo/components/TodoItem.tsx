"use client";

import { Reorder, useDragControls } from "framer-motion";
import React, { useEffect, useState } from "react";
import { BsGripHorizontal, BsGripVertical, BsX } from "react-icons/bs";

interface TaskItem {
  id: number;
  task: string;
}

function TodoItem({
  taskItem,
  index,
  handleDelete,
}: {
  taskItem: TaskItem;
  index: number;
  handleDelete: Function;
}) {
  
  const controls = useDragControls();
  const [ isTouchscreen, setIsTouchscreen ] = useState<Boolean>();

  useEffect(() => setIsTouchscreen(("ontouchstart" in window)), []);

  return (
    <Reorder.Item
      key={taskItem.id}
      value={taskItem}
      dragListener={isTouchscreen ? false : true}
      dragControls={controls}
      className="bg-main-textcolor p-3 flex font-notoSans text-xl font-semibold justify-between items-center rounded-sm"
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <span className="flex items-center gap-2 w-5/6">
        <button onPointerDown={(e) => controls.start(e)} style={{touchAction: "none"}} className="size-8">
          <BsGripVertical className="size-full" />
        </button>
        <p className="">{index + 1}</p>
        <p className=" w-5/6">{taskItem.task}</p>
      </span>
      <button
        className="bg-main-buttoncolor size-8 rounded-sm active:scale-95"
        onClick={() => {
          handleDelete(index);
        }}
      >
        <BsX className="text-main-textcolor size-full" />
      </button>
    </Reorder.Item>
  );
}

export default TodoItem;
