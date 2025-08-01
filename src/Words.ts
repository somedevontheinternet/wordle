import allWords from "./words.txt?raw";

export const Words = allWords.split("\n").map((w) => w.toUpperCase());
