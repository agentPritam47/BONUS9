import React from "react";
import Scene from "./components/Scene";
import LocomotiveScroll from "locomotive-scroll";

const App = () => {
  const locomotiveScroll = new LocomotiveScroll();
  return (
    <div className="w-full page1 relative">
      <div className="w-full h-screen sticky top-0 left-0">
        <Scene />
      </div>
    </div>
  );
};

export default App;
