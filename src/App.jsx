import Die from "./components/Die";
import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = React.useState(() => generateAllNewDice());

  const gameWon = (
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value)
  )

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function rollDice() {
    setDice((prevDice) =>
      prevDice.map((dice) =>
        dice.isHeld === false
          ? { ...dice, value: Math.ceil(Math.random() * 6) }
          : dice
      )
    );
  }

  function hold(id) {
    setDice((prevDice) =>
      prevDice.map((dice) =>
        dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
      )
    );
  }

  const diceElements = dice.map((dieObj) => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={hold}
      id={dieObj.id}
    />
  ));

  return (
    <main>
      {gameWon && <Confetti />}
      <div className="dice-container">{diceElements}</div>

      <button className="roll-dice" onClick={rollDice}>
        {gameWon ? "New Game" : "Roll Dice"}
      </button>
    </main>
  );
}

export default App;
