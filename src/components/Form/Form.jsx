import React, { useContext, useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { TodoContext } from "../Context/ToDoContext/Todocontext";
import { AddContext } from "../Context/AddContext/Addcontext";
import { EditContext } from "../Context/EditContext/Editcontext";

// Basic Structure
// const todo_card = {
//     id: Date.now(),
//     title: title,
//     desc: desc,
//     priority: pri,
//     completed: completed
//  }

function Form() {
  const { setAdd } = useContext(AddContext);
  const { todo, addTodo, setTodo } = useContext(TodoContext);
  const { edit, setEdit, toDoToEdit } = useContext(EditContext);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [pri, setPri] = useState("");

  useEffect(() => {
    if (edit && toDoToEdit) {
      setTitle(toDoToEdit.title);
      setDesc(toDoToEdit.desc);
      setPri(toDoToEdit.pri);
    }
  }, [edit, toDoToEdit]);

  const [selectedPriority, setSelectedPriority] = useState(null);
  const handlePriorityChange = (priority) => {
    setSelectedPriority(priority.target.value);
    setPri(priority.target.value);
  };
  const priorities = [
    {
      value: "low",
      label: "Low",
      color: "bg-green-500",
      selCol: "bg-green-800",
    },
    {
      value: "medium",
      label: "Medium",
      color: "bg-yellow-500",
      selCol: "bg-yellow-800",
    },
    {
      value: "high",
      label: "High",
      color: "bg-orange-500",
      selCol: "bg-orange-800",
    },
    {
      value: "urgent",
      label: "Urgent",
      color: "bg-red-500",
      selCol: "bg-red-800",
    },
  ];
  const getTodoLimit = () => {
    const width = window.innerWidth;

    if (width < 480) {
        return 6; // Small screen (e.g., mobile)
    } else {
        return 10; // Large screen (e.g., desktop)
    }
};
  const handelAdd = (e) => {
    e.preventDefault();
    if (!todo) return;
    let todoobjs = JSON.parse(localStorage.getItem('todo')) || [];
    const limit = getTodoLimit();
    if (todoobjs.length >= limit) {
      alert(`Limit of ${limit} todos reached. Please remove an item before adding a new one.`);
      return;
    }
    addTodo({
      id: Date.now(),
      title: title,
      desc: desc,
      priority: pri,
      completed: false,
    });
    setEdit(false);
    setAdd();
  };
  const handleEdit = (e) => {
    e.preventDefault();
    const todotoedit = toDoToEdit;
    const editid = todotoedit.id;
    const todoobjs = JSON.parse(localStorage.getItem("todo"));

    const updatedTodoobjs = todoobjs.map((todoobj) =>
      todoobj.id === editid
        ? { ...todoobj, title, desc, priority: pri }
        : todoobj
    );
    localStorage.clear();
    setTodo(updatedTodoobjs);
    localStorage.setItem("todo", JSON.stringify(updatedTodoobjs));

    setAdd();
  };
  return (
    <>
      <button
        onClick={setAdd}
        className="add-pen cursor-pointer absolute bottom-[1vw] right-[1vw] z-10  rounded-full  flex items-center justify-center w-[15vw] h-[15vw] Lmobile:w-[13vw] Lmobile:h-[13vw] tablet:w-[8vw] tablet:h-[8vw] laptop:w-[6vw] laptop:h-[6vw] desktop:w-[5vw] desktop:h-[5vw]"
      >
        <div className="pen-icon">
          <ImCross />
        </div>
      </button>
      <div className="form flex gap-2 items-center justify-center h-full w-full">
        <div className="form-container grid grid-cols-1 justify-center items-center gap-2">
          <div className="title flex flex-col items-center justify-center gap-[1vw] laptop:gap-1">
            <label
              htmlFor="title"
              className="cursor-pointer text-[7vw] tablet:text-[3vw] font-semibold opacity-70"
            >
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="title"
              type="text"
              placeholder="Enter Title"
              className="w-full text-center outline-none border-none px-[2vw] py-[2vw] tablet:px-[1vw] tablet:py-[1vw] rounded-md"
            />
          </div>
          <div className="desc flex flex-col items-center justify-center gap-[1vw] laptop:gap-1">
            <label
              htmlFor="todo"
              className=" cursor-pointer text-[7vw] tablet:text-[3vw] font-semibold opacity-70"
            >
              ToDo
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              id="todo"
              type="text"
              placeholder="Enter Todo"
              className="w-full resize-none text-center outline-none border-none px-[2vw] py-[2vw] tablet:px-[1vw] tablet:py-[1vw] rounded-md"
            />
          </div>
          <div className="priority flex flex-col items-center justify-center gap-[1vw] laptop:gap-1">
            <label
              htmlFor="priority"
              className="text-[7vw] tablet:text-[3vw] font-semibold opacity-70"
            >
              Priority
            </label>
            <div className="flex gap-2">
              {priorities.map((priority) => (
                <label
                  key={priority.value}
                  className={`cursor-pointer flex items-center gap-2 p-2 text-white rounded-md ${
                    priority.color
                  } ${
                    selectedPriority === priority.value
                      ? "ring-2 ring-offset-2 ring-blue-500"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="priority"
                    value={priority.value}
                    checked={selectedPriority === priority.value}
                    onChange={handlePriorityChange}
                    className="hidden"
                  />
                  <span>{priority.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="add-btn">
            <button
              className="w-full mt-3 bg-green-400 text-black/80"
              onClick={edit ? handleEdit : handelAdd}
            >
              <p>{edit ? "Update ToDo" : "Add ToDo"}</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
