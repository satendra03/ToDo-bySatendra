import React, { useContext } from "react";
import { FaPenAlt } from "react-icons/fa";
import { AddContext } from "../Context/AddContext/Addcontext";

function Add() {
  const { setAdd } = useContext(AddContext);
  return (
    <>
      <button
        onClick={setAdd}
        className="add-pen cursor-pointer absolute bottom-[1vw] right-[1vw] z-10  rounded-full  flex items-center justify-center w-[15vw] h-[15vw] Lmobile:w-[13vw] Lmobile:h-[13vw] tablet:w-[8vw] tablet:h-[8vw] laptop:w-[6vw] laptop:h-[6vw] desktop:w-[5vw] desktop:h-[5vw]"
      >
        <div className="pen-icon">
          <FaPenAlt />
        </div>
      </button>
    </>
  );
}

export default Add;
