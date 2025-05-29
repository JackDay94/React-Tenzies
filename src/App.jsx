import Die from "./components/Die";
import React from "react";

function App() {
  const [dice, setDice] = React.useState(generateAllNewDice);

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => Math.ceil(Math.random() * 6));
  }

  const diceElements = dice.map(num => <Die value={num} />)

  return (
    <main>
      <div className="button-container">
        {diceElements}
      </div>
    </main>
  );
}

export default App;
