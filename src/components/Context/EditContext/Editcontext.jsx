import { createContext, useContext, useState } from "react";

export const EditContext = createContext();

export const EditContextProvider = (props) => {
  const [edit, setEdit] = useState(false);
  const [toDoToEdit, setTodoToEdit] = useState(null);

  return (
    <EditContext.Provider
      value={{ edit, setEdit, toDoToEdit, setTodoToEdit, setTodoToEdit }}
    >
      {props.children}
    </EditContext.Provider>
  );
};
