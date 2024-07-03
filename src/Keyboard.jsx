import { useSignals } from "@preact/signals-react/runtime";
import PropTypes from "prop-types";
import {
  clearKeyPressed,
  downKeyPressed,
  leftKeyPressed,
  nextDirection,
  rightKeyPressed,
  upKeyPressed,
} from "./signalHandler";

function Keyboard() {
  useSignals();
  return (
    <div className="flex flex-col gap-1 h-full w-full">
      <div className="flex gap-1 items-center justify-center">
        <DirectionButton name="arrow_upward" isPressed={upKeyPressed.value} direction="up" />
      </div>
      <div className="flex gap-1 items-center justify-center">
        <DirectionButton name="arrow_left_alt" isPressed={leftKeyPressed.value} direction="left" />
        <DirectionButton name="arrow_downward" isPressed={downKeyPressed.value} direction="down" />
        <DirectionButton name="arrow_right_alt" isPressed={rightKeyPressed.value} direction="right" />
      </div>
    </div>
  );
}

function DirectionButton({ name, isPressed, direction }) {
  return (
    <div
      onClick={() => {
        nextDirection.value = direction;
        clearKeyPressed();
      }}
      className={`w-12 h-12 sm:w-24 sm:h-24  hover:bg-blue-800 ${
        isPressed ? "bg-blue-800" : "bg-blue-600"
      } flex items-center justify-center rounded-md border-4 border-stone-800 cursor-pointer`}
    >
      <span className="material-symbols-outlined text-4xl sm:text-6xl text-stone-100 hover:text-stone-200">{name}</span>
    </div>
  );
}

DirectionButton.propTypes = {
  name: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  isPressed: PropTypes.bool.isRequired,
};

export default Keyboard;
