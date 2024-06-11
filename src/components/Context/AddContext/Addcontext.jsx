import { createContext, useContext, useState } from "react";
import { EditContext } from "../EditContext/Editcontext";

export const AddContext = createContext();

export const AddContextProvider = (props) => {
  const { setEdit } = useContext(EditContext);
  const [showAdd, setShowAdd] = useState(false);
  const setAdd = () => {
    setShowAdd((prev) => !prev);
    setEdit(false);
  };
  return (
    <AddContext.Provider value={{ showAdd, setAdd }}>
      {props.children}
    </AddContext.Provider>
  );
};
