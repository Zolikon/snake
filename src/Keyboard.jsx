import { useSignals } from "@preact/signals-react/runtime";
import PropTypes from "prop-types";
import {
  clearKeyPressed,
  downKeyPressed,
  indicateDownNext,
  indicateLeftNext,
  indicateRightNext,
  indicateUpNext,
  leftKeyPressed,
  rightKeyPressed,
  upKeyPressed,
} from "./signalHandler";

function Keyboard() {
  useSignals();
  return (
    <div className="flex flex-col gap-1 h-full w-full">
      <div className="flex gap-1 items-center justify-center">
        <DirectionButton name="arrow_upward" isPressed={upKeyPressed.value} onClickAction={indicateUpNext} />
      </div>
      <div className="flex gap-1 items-center justify-center">
        <DirectionButton name="arrow_left_alt" isPressed={leftKeyPressed.value} onClickAction={indicateLeftNext} />
        <DirectionButton name="arrow_downward" isPressed={downKeyPressed.value} onClickAction={indicateDownNext} />
        <DirectionButton name="arrow_right_alt" isPressed={rightKeyPressed.value} onClickAction={indicateRightNext} />
      </div>
    </div>
  );
}

function DirectionButton({ name, isPressed, onClickAction }) {
  return (
    <button
      onClick={() => {
        onClickAction();
        clearKeyPressed();
      }}
      className={`w-12 h-12 sm:w-16 sm:h-16  hover:bg-blue-800 ${
        isPressed ? "bg-blue-800" : "bg-blue-600"
      } flex items-center justify-center rounded-md border-4 border-stone-800 cursor-pointer`}
    >
      <span className="material-symbols-outlined text-4xl sm:text-6xl text-stone-100 hover:text-stone-200 select-none">
        {name}
      </span>
    </button>
  );
}

DirectionButton.propTypes = {
  name: PropTypes.string.isRequired,
  onClickAction: PropTypes.func.isRequired,
  isPressed: PropTypes.bool.isRequired,
};

export default Keyboard;
