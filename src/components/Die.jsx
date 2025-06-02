export default function Die(props) {
  // This component represents a single die in the Tenzies game.
  return (
    <button
      style={{ backgroundColor: props.isHeld ? "#59E391" : "white" }}
      onClick={() => props.hold(props.id)}
      aria-label={`Die showing ${props.value}, ${
        props.isHeld ? "held" : "not held"
      }`}
      aria-pressed={props.isHeld}
    >
      {props.value}
    </button>
  );
}
