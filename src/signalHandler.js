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

export function indicateLeftNext() {
  if (direction.value === "right") return;
  nextDirection.value = "left";
}

export function indicateRightNext() {
  if (direction.value === "left") return;
  nextDirection.value = "right";
}

export function indicateUpNext() {
  if (direction.value === "down") return;
  nextDirection.value = "up";
}

export function indicateDownNext() {
  if (direction.value === "up") return;
  nextDirection.value = "down";
}

export const isGameStarted = signal(false);
export const isGameOver = signal(false);
