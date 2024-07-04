import PropTypes from "prop-types";
import { direction, isGameOver } from "./signalHandler";
import { useSignal } from "@preact/signals-react";

function SnakeArea({ numberOFCols, numberOfRows, snake, apple }) {
  useSignal();
  const cellSizeInPixels = Math.min(
    (window.innerWidth > 500 ? window.innerWidth * 0.8 : window.innerWidth * 0.7) / numberOFCols,
    50
  );

  function isSnakeBodyCell(i, j) {
    return snake.slice(1, snake.length - 1).some(([x, y]) => x === i && y === j);
  }

  function isSnakeHeadCell(i, j) {
    return snake[0][0] === i && snake[0][1] === j;
  }

  function isSnakeTailCell(i, j) {
    return snake[snake.length - 1][0] === i && snake[snake.length - 1][1] === j;
  }

  function isAppleCell(i, j) {
    return apple[0] === i && apple[1] === j;
  }

  function directionToHeadRotation() {
    switch (direction.value) {
      case "up":
        return "rotate-0";
      case "down":
        return "rotate-180";
      case "left":
        return "-rotate-90";
      case "right":
        return "rotate-90";
    }
  }

  function nonHeadSnakeElementRotation(x, y) {
    if (isGameOver.value) return;
    const snakeIndex = snake.findIndex(([i, j]) => i === x && j === y);
    const [x1, y1] = snake[snakeIndex - 1];
    const [x2, y2] = snake[snakeIndex];
    if (x1 === x2 && y1 < y2) return "rotate-0";
    if (x1 === x2 && y1 > y2) return "rotate-180";
    if (x1 < x2 && y1 === y2) return "-rotate-90";
    if (x1 > x2 && y1 === y2) return "rotate-90";
  }

  return (
    <div
      className="flex border-4 p-4 border-black relative items-center justify-center w-4/5"
      style={{ width: cellSizeInPixels * numberOFCols, height: cellSizeInPixels * numberOfRows }}
    >
      {!isGameOver.value ? (
        new Array(numberOFCols).fill(1).map((_, i) => (
          <div
            key={"col" + i}
            className={`flex flex-col`}
            style={{ width: `${cellSizeInPixels}px`, height: `${cellSizeInPixels * numberOfRows}px` }}
          >
            {new Array(numberOfRows).fill(1).map((_, j) => (
              <div
                key={"row" + j}
                style={{
                  width: `${cellSizeInPixels - 4}px`,
                  height: `${cellSizeInPixels - 4}px`,
                  margin: "2px",
                  padding: "2px",
                }}
              >
                {isSnakeHeadCell(i, j) && (
                  <img src="/head.svg" className={`h-full w-full object-contain ${directionToHeadRotation()}`} />
                )}
                {isSnakeBodyCell(i, j) && (
                  <img
                    src="/body.svg"
                    className={`h-full w-full object-contain ${nonHeadSnakeElementRotation(i, j)}`}
                  />
                )}
                {isSnakeTailCell(i, j) && (
                  <img
                    src="/tail.svg"
                    className={`h-full w-full object-contain ${nonHeadSnakeElementRotation(i, j)}`}
                  />
                )}
                {isAppleCell(i, j) && <img src="/apple.svg" className={`h-full w-full object-contain`} />}
              </div>
            ))}
          </div>
        ))
      ) : (
        <img src="/game_over.webp" className={`absolute left-[3%] right-[3%] h-[94%] w-[94%] z-10 object-contain}`} />
      )}
    </div>
  );
}

SnakeArea.propTypes = {
  numberOFCols: PropTypes.number.isRequired,
  numberOfRows: PropTypes.number.isRequired,
  snake: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  apple: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default SnakeArea;
