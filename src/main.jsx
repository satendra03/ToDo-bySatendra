import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { TodoContextProvider } from "./components/Context/ToDoContext/Todocontext.jsx";
import { AddContextProvider } from "./components/Context/AddContext/Addcontext.jsx";
import { EditContextProvider } from "./components/Context/EditContext/Editcontext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TodoContextProvider>
      <EditContextProvider>
        <AddContextProvider>
          <App />
        </AddContextProvider>
      </EditContextProvider>
    </TodoContextProvider>
  </React.StrictMode>
);
