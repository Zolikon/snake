import { signal } from "@preact/signals-react";

export const direction = signal("right");
export const nextDirection = signal("right");

export const leftKeyPressed = signal(false);
export const rightKeyPressed = signal(false);
export const upKeyPressed = signal(false);
export const downKeyPressed = signal(false);

export function clearKeyPressed() {
  leftKeyPressed.value = false;
  rightKeyPressed.value = false;
  upKeyPressed.value = false;
  downKeyPressed.value = false;
}

export const isGameOver = signal(false);
