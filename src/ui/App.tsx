import React from "react";
import MainGame from "../game";
import WarbibleScene from "../scenes/WarbibleScene";

const handleClick = () => {
  const scene = MainGame.scene.keys["WarbibleScene"] as WarbibleScene;
};

function App() {
  return (
    <div>
      <button onClick={handleClick}>Profile</button>
    </div>
  );
}

export default App;
