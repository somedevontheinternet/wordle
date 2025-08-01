import { useEffect, useState } from "react";
import { LetterState } from "./Letter/LetterState";
import { process } from "./process";
import { Guesses, type GuessRow } from "./Guesses/Guesses";
import { Answers } from "./Answers/Answers";
import { Instructions } from "./Instructions/Instructions";

const handleKeypress =
  (key: string) =>
  (guesses: GuessRow[]): GuessRow[] => {
    if (guesses[guesses.length - 1].letters.length < 5) {
      if (/[A-Z]/.exec(key)) {
        guesses[guesses.length - 1].letters.push(key);
        return [...guesses];
      }
    } else if (guesses[guesses.length - 1].states.length < 5) {
      if (/[1-3]/.exec(key)) {
        guesses[guesses.length - 1].states.push(
          (parseInt(key) + 1) as LetterState
        );
        if (guesses[guesses.length - 1].states.length >= 5) {
          guesses.push({
            letters: [],
            states: [],
          });
        }
        return [...guesses];
      }
    }

    return guesses;
  };

const handleBackspace = (guesses: GuessRow[]): GuessRow[] => {
  // if we're at the start just do nothing.
  if (guesses.length === 1 && guesses[0].letters.length === 0) return guesses;

  // clear states if partway through a row
  if (guesses[guesses.length - 1].states.length > 0) {
    guesses[guesses.length - 1].states = [];
    return [...guesses];
  }

  // then clear letters if partway through a row
  if (guesses[guesses.length - 1].letters.length > 0) {
    guesses[guesses.length - 1].letters = [];
    return [...guesses];
  }

  // Otherwise clear states of previous row
  guesses.splice(-1, 1);
  guesses[guesses.length - 1].states = [];
  return [...guesses];
};

export const App = (): React.ReactElement => {
  const [guesses, setGuesses] = useState<GuessRow[]>([
    {
      letters: [],
      states: [],
    },
  ]);

  const words = process(guesses);

  useEffect(() => {
    const f = (e: KeyboardEvent): void =>
      setGuesses(handleKeypress(e.key.toUpperCase()));

    const backspace = (e: KeyboardEvent): void => {
      if (e.key !== "Backspace") return;
      setGuesses(handleBackspace);
    };

    document.addEventListener("keypress", f);
    document.addEventListener("keydown", backspace);

    return (): void => {
      document.removeEventListener("keypress", f);
      document.removeEventListener("keydown", backspace);
    };
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Instructions
        typingLetters={guesses[guesses.length - 1].letters.length < 5}
      />
      <div>
        <Guesses guesses={guesses} />
      </div>
      <Answers words={words} />
    </div>
  );
};
