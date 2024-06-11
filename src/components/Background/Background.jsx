import React from "react";

function Background() {
  return (
    <>
      <div className="background w-full h-screen fixed z-[2] pointer-events-none">
        <h1 className="heading absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] text-[16vw] tablet:text-[12vw] laptop:text-[8vw] desktop:text-[6vw] text-zinc-600 font-semibold tracking-tight leading-none">
          ToDo.
          <p className=" tracking-normal text-xs tablet:text-sm laptop:text-lg font-thin text-center">
            By Satendra
          </p>
        </h1>
      </div>
    </>
  );
}

export default Background;
