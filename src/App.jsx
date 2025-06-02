import Die from "./components/Die";
import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = React.useState(() => generateAllNewDice());

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  const newGameRef = React.useRef(null);

  const [rolls, setRolls] = React.useState(0);

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
    setRolls((prevRolls) => prevRolls + 1);
  }

  function hold(id) {
    setDice((prevDice) =>
      prevDice.map((dice) =>
        dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
      )
    );
  }

  function newGame() {
    setDice(generateAllNewDice());
    setRolls(0);
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

  React.useEffect(() => {
    if (gameWon) {
      newGameRef.current.focus();
    }
  }, [gameWon]);

  return (
    <main>
      {gameWon && <Confetti />}
      <div className="sr-only" aria-live="polite">
        {gameWon && (
          <p>
            Congratulations! You won the game! Click "New Game" to start a new
            game.
          </p>
        )}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Click a die to hold the value or release the held value. You win when
        all die have the same value.
      </p>
      {gameWon && (
        <p className="win-message">
          You won! You rolled a total of {<strong>{rolls}</strong>} times!
        </p>
      )}
      <div className="dice-container">{diceElements}</div>

      <button
        className="roll-dice"
        onClick={gameWon ? newGame : rollDice}
        aria-label={gameWon ? "Start New Game" : "Roll Dice"}
        ref={newGameRef}
      >
        {gameWon ? "New Game" : "Roll Dice"}
      </button>
    </main>
  );
}

export default App;
