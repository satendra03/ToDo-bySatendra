import React, { useContext, useRef } from "react";
import Card from "../Card/Card";
import Add from "../Add/Add";
import Form from "../Form/Form";
import { AddContext } from "../Context/AddContext/Addcontext";
import { TodoContext } from "../Context/ToDoContext/Todocontext";

function Foreground() {
  const parent = useRef();
  const { showAdd } = useContext(AddContext);
  const { todo } = useContext(TodoContext);

  if (showAdd) {
    return <Form />;
  }
  return (
    <>
      <div
        ref={parent}
        className="foreground w-full h-full fixed top-0 left-0 z-[3] flex flex-wrap gap-[2vw]  tablet:gap-2 laptop:gap-3 desktop:gap-4"
      >
        {todo.map((item) => (
          <Card key={item.id} refrence={parent} todo={item} />
        ))}
      </div>
      <Add />
    </>
  );
}

export default Foreground;
