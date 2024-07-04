import { useEffect, useState, useCallback } from "react";
import SnakeArea from "./SnakeArea";
import { direction, isGameOver, isGameStarted, nextDirection } from "./signalHandler";
import { useSignals } from "@preact/signals-react/runtime";
import Keyboard from "./Keyboard";

const DIRECTION_MAP = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0],
};

const SNAKE_INITIAL_POSITION = [
  [2, 0],
  [1, 0],
  [0, 0],
];

function Snake() {
  const numberOfCols = 10;
  const numberOfRows = 10;

  function randomApplePosition() {
    const newPosition = [Math.floor(Math.random() * numberOfCols), Math.floor(Math.random() * numberOfRows)];
    if (snake.some(([x, y]) => x === newPosition[0] && y === newPosition[1])) {
      return randomApplePosition();
    }
    return newPosition;
  }

  useSignals();
  const [snake, setSnake] = useState(SNAKE_INITIAL_POSITION);
  const [apple, setApple] = useState(randomApplePosition());
  const [score, setScore] = useState(0);

  function isGameWon() {
    return snake.length === numberOfCols * numberOfRows;
  }

  const isSnakeHeadOutside = useCallback(
    (headX, headY) => {
      return headX < 0 || headX >= numberOfCols || headY < 0 || headY >= numberOfRows;
    },
    [numberOfCols, numberOfRows]
  );

  const isSnakeCollidedWithItself = useCallback(
    (headX, headY) => {
      return snake.some(([x, y]) => x === headX && y === headY);
    },
    [snake]
  );

  const isSnakeWillEatApple = useCallback(
    (headX, headY) => {
      return headX === apple[0] && headY === apple[1];
    },
    [apple]
  );

  function newGame() {
    setSnake(SNAKE_INITIAL_POSITION);
    direction.value = "right";
    nextDirection.value = "right";
    setApple(randomApplePosition());
    isGameOver.value = false;
    isGameStarted.value = true;
    setScore(0);
  }

  function loseGame() {
    isGameOver.value = true;
    isGameStarted.value = false;
  }

  useEffect(() => {
    if (isGameOver.value || !isGameStarted.value) return;
    const intervalId = setInterval(() => {
      if (isGameWon()) {
        clearInterval(intervalId);
        isGameOver.value = true;
        return;
      }
      direction.value = nextDirection.value;
      setSnake((prevSnake) => {
        const [head, ...body] = prevSnake;
        const newX = head[0] + DIRECTION_MAP[direction.value][0];
        const newY = head[1] + DIRECTION_MAP[direction.value][1];
        if (isSnakeHeadOutside(newX, newY) || isSnakeCollidedWithItself(newX, newY)) {
          clearInterval(intervalId);
          loseGame();
        }
        if (isSnakeWillEatApple(newX, newY)) {
          setApple(randomApplePosition());
          return [[newX, newY], ...prevSnake];
        }
        if (body.length > 0) {
          return [[newX, newY], ...prevSnake.slice(0, -1)];
        }
        return [[newX, newY]];
      });
      setScore((prevScore) => prevScore + 1);
    }, 500);
    return () => clearInterval(intervalId);
  }, [isSnakeCollidedWithItself, isSnakeHeadOutside, isSnakeWillEatApple, isGameStarted.value]);

  return (
    <div className="h-4/5 w-4/5 sm:w-1/4 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center w-full sm:gap-20">
        <button onClick={newGame} className="bg-green-700 py-2 px-4 rounded-md m-4 text-stone-200 sm:text-2xl">
          New game
        </button>
        <p className="font-extrabold sm:text-4xl md:w-64">Score: {score}</p>
      </div>
      <SnakeArea numberOFCols={numberOfCols} numberOfRows={numberOfRows} snake={snake} apple={apple} />
      <div className="h-1/5 w-full flex flex-col items-center justify-start m-2">
        <Keyboard />
      </div>
    </div>
  );
}

export default Snake;
