import type { GuessRow } from "./Guesses/Guesses";
import { LetterState } from "./Letter/LetterState";
import allGuesses from "./guesses.txt?raw";
import originalSolutions from "./solutions.txt?raw";
import pastSolutions from "./past_answers_2025_08_01.txt?raw";
import frequency from "./frequency.json";

const Frequency: Record<string, number> = frequency;

export const PastSolutions = pastSolutions.split("\n");
const ValidGuesses = allGuesses.split("\n");
export const OriginalSolutions = originalSolutions.split("\n");

const countLetter = (w: string, letter: string): number => {
  let count = 0;
  for (let i = 0; i < w.length; i++) {
    if (w[i] === letter) count++;
  }
  return count;
};

const maxGuessStates: LetterState[] = [LetterState.GREEN, LetterState.YELLOW];

const countMaxGuess = (guess: GuessRow, letter: string): number => {
  let count = 0;
  for (let i = 0; i < guess.states.length; i++) {
    if (maxGuessStates.includes(guess.states[i]) && guess.letters[i] === letter)
      count++;
  }
  return count;
};

export const process = (guesses: GuessRow[]): string[] => {
  return ValidGuesses.filter((w): boolean => {
    for (const guess of guesses) {
      for (let i = 0; i < guess.states.length; i++) {
        const letter = guess.letters[i];
        switch (guess.states[i]) {
          case LetterState.GREY: {
            if (countMaxGuess(guess, letter) < countLetter(w, letter))
              return false;
            break;
          }
          case LetterState.YELLOW: {
            if (!w.includes(letter)) return false;
            if (w[i] === letter) return false;
            break;
          }
          case LetterState.GREEN: {
            if (w[i] !== letter) return false;
            break;
          }
        }
      }
    }

    return true;
  }).sort((a, b): number => (Frequency[b] ?? 0) - (Frequency[a] ?? 0));
};
