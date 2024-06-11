import React from "react";
import Background from "./components/Background/Background";
import Foreground from "./components/Foreground/Foreground";
function App() {
  console.log('by Satendra Kumar Parteti');
  return (
    <>
      <div className="app parent relative w-full h-screen">
        <Foreground />
        <Background />
      </div>
    </>
  );
}

export default App;
