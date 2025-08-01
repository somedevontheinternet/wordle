import type { GuessRow } from "./App";
import { LetterState } from "./Letter/LetterState";
import { Words } from "./Words";

export const process = (guesses: GuessRow[]): string[] => {
  return Words.filter((w): boolean => {
    for (const guess of guesses) {
      for (let i = 0; i < guess.states.length; i++) {
        const letter = guess.letters[i];
        switch (guess.states[i]) {
          case LetterState.GREY: {
            if (w.includes(letter)) return false;
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
  });
};
