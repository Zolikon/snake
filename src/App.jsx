import { useRef } from "react";
import Snake from "./Snake";
import {
  clearKeyPressed,
  direction,
  downKeyPressed,
  leftKeyPressed,
  nextDirection,
  rightKeyPressed,
  upKeyPressed,
} from "./signalHandler";

function App() {
  const dialogRef = useRef(null);

  const openDialog = () => {
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
  };

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
      upKeyPressed.value = true;
      if (direction.value === "down") return;
      nextDirection.value = "up";
    } else if (event.key === "ArrowDown") {
      downKeyPressed.value = true;
      if (direction.value === "up") return;
      nextDirection.value = "down";
    } else if (event.key === "ArrowLeft") {
      leftKeyPressed.value = true;
      if (direction.value === "right") return;
      nextDirection.value = "left";
    } else if (event.key === "ArrowRight") {
      rightKeyPressed.value = true;
      if (direction.value === "left") return;
      nextDirection.value = "right";
    }
  });

  document.addEventListener("keyup", () => {
    clearKeyPressed();
  });

  return (
    <>
      <div className="flex flex-col h-full w-full">
        <header className="h-[10%] flex items-center justify-center bg-gradient-to-br from-teal-700 to-teal-500 ">
          <img src="/icon.svg" className="h-3/5 rounded-xl object-contain" />
          <div className="text-center font-bold text-3xl text-stone-300 select-none">nake</div>
        </header>
        <main className="flex flex-col flex-grow items-center justify-center">
          <Snake />
        </main>

        <footer className="h-[20px] xl:h-[40px] bg-gray-200 bg-gradient-to-br from-teal-700 to-teal-500 flex justify-end gap-4 px-2 items-center">
          <button onClick={openDialog}>About</button>
          <p className="">Snake | 2024</p>
        </footer>
      </div>
      <dialog ref={dialogRef}>
        <div className="w-[80vw] h-[80vh] p-4 flex flex-col items-center justify-between">
          <div className="h-[10%] flex items-center justify-center ">
            <img src="/icon.svg" className="h-3/5 rounded-xl object-contain" />
            <div className="text-center font-bold text-3xl text-stone-800 select-none">nake</div>
          </div>
          <div>
            <p>Standard snake game with on screen keyboard for mobile</p>
          </div>
          <button onClick={closeDialog} className="bg-green-600 py-2 px-4 rounded-md text-stone-200">
            Close
          </button>
        </div>
      </dialog>
    </>
  );
}

export default App;
