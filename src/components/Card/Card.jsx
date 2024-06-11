import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";

import { FaPenAlt, FaDownload, FaTasks } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FiFileText } from "react-icons/fi";
import { MdOutlineDoneOutline } from "react-icons/md";
import { AddContext } from "../Context/AddContext/Addcontext";
import { TodoContext } from "../Context/ToDoContext/Todocontext";
import { EditContext } from "../Context/EditContext/Editcontext";

function Card({ refrence, todo }) {
  const { setAdd } = useContext(AddContext);
  const { deleteTodo, toggleComplete } = useContext(TodoContext);
  const { setEdit, setTodoToEdit } = useContext(EditContext);
  const [text, setText] = useState(todo.desc);

  const getPriorityBgColor = (priority) => {
    switch (priority) {
      case "low":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "high":
        return "bg-orange-500";
      case "urgent":
        return "bg-red-500";
      default:
        return "bg-sky-500"; // Default color if no priority is selected
    }
  };
  
  const file = new Blob([text], { type: "text/plain" });
  const [size, setSize] = useState(file.size);

  const handleDownload = (e) => {
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = `${todo.title}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  const handelEdit = (e) => {
    e.preventDefault();
    setAdd();
    setEdit(true);
    setTodoToEdit(todo);
  };
  const handelDelete = (e) => {
    e.preventDefault();
    deleteTodo(todo.id);
  };
  const handelComplete = (e) => {
    e.preventDefault();
    toggleComplete(todo.id);
  };

  return (
    <>
      <motion.div
        key={todo.id}
        drag
        dragConstraints={refrence}
        whileDrag={{
          scale: 1.2,
          cursor: "grabbing",
          zIndex: 10,
          shadow: "10px 10px white",
        }}
        dragElastic={0.1}
        className={`card ${
          todo.completed ? ` opacity-30 line-through` : ""
        } z-[5] cursor-grab overflow-hidden p-3 relative rounded-[20px] bg-zinc-900 w-[45vw] tablet:w-[25vw] laptop:w-[17vw] h-[33vh] tablet:h-[35vh] laptop:h-[40vh]`}
      >
        <div className="icon scale-90 tablet:scale-125 flex items-center w-fit  gap-[3vw] tablet:gap-[1vw] tablet:px-4">
          <div className=" opacity-90">
            <FiFileText />
          </div>
          <p className=" capitalize font-semibold overflow-hidden line-clamp-2 opacity-90">{todo.title}</p>
        </div>
        <div className="text w-full overflow-auto text-ellipsis h-[70%] tablet:h-[80%] mt-2 desktop:mt-5">
          <p className="todoText leading-[5vw] Lmobile:leading-[4vw] tablet:leading-[3vw] laptop:leading-6 text-[4vw] Lmobile:text-[3vw] tablet:text-[2vw] laptop:text-[1.3vw] tablet:pb-3">
            {todo.desc}
          </p>
        </div>
        <div
          className={`card-foot w-full h-[3vh] Lmobile:h-[4vh] laptop:h-[5vh] ${getPriorityBgColor(
            todo.priority
          )} absolute bottom-0 left-0 py-3 flex flex-col justify-between pb-[4vh]`}
        >
          <div className="foot-items pb-2 px-[5vw] tablet:px-[2vw] laptop:px-[1vw] flex justify-between w-full">
            <div className="size-todo text-sm">{`${size}`}B</div>
            <div className="icon flex items-center justify-center gap-1 tablet:gap-4 laptop:gap-5 laptop:scale-110">
              <div
                className={`completed cursor-pointer`}
                onClick={handelComplete}
              >
                <div
                  className={`card-icons  ${
                    todo.completed ? "text-black" : ""
                  } `}
                >
                  <MdOutlineDoneOutline />
                </div>
              </div>
              <div
                className={`download ${
                  todo.completed ? " pointer-events-none" : "cursor-pointer"
                } `}
                onClick={handleDownload}
              >
                <div className="card-icons">
                  <FaDownload />
                </div>
              </div>
              <div
                className={`pen ${
                  todo.completed ? " pointer-events-none" : "cursor-pointer"
                }`}
                onClick={handelEdit}
              >
                <div className={`card-icons`}>
                  <FaPenAlt />
                </div>
              </div>
              <div
                className={`bin ${
                  todo.completed ? " pointer-events-none" : "cursor-pointer"
                }`}
                onClick={handelDelete}
              >
                <div className="card-icons">
                  <RiDeleteBin6Fill />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Card;
