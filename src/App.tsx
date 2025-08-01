import { useEffect, useState } from "react";
import { Letter } from "./Letter/Letter";
import { LetterState } from "./Letter/LetterState";
import { Row } from "./Row";
import { process } from "./processor";

export type GuessRow = {
  letters: string[];
  states: LetterState[];
};

const countToFive = [0, 1, 2, 3, 4];

export const App = (): React.ReactElement => {
  const [guesses, setGuesses] = useState<GuessRow[]>([
    {
      letters: [],
      states: [],
    },
  ]);

  const words = process(guesses);

  useEffect(() => {
    const f = (e: KeyboardEvent): void => {
      const key = e.key.toUpperCase();
      setGuesses((guesses): GuessRow[] => {
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
      });
    };

    const backspace = (e: KeyboardEvent): void => {
      if (e.key !== "Backspace") return;
      setGuesses((guesses): GuessRow[] => {
        // if we're at the start just do nothing.
        if (guesses.length === 1 && guesses[0].letters.length === 0)
          return guesses;

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
      });
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
      <div>
        <p style={{ fontSize: "3em", margin: 0 }}>
          {guesses[guesses.length - 1].letters.length < 5
            ? "Type Letters"
            : "1 = grey, 2 = yellow, 3 = green"}
        </p>
      </div>
      <div>
        {guesses.map((g, i) => (
          <Row key={i}>
            {countToFive.map((i) => (
              <Letter
                key={i}
                letter={g.letters[i]}
                state={g.states[i] ?? (g.letters[i] === undefined ? 0 : 1)}
              />
            ))}
          </Row>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: "32px",
          width: "50%",
        }}
      >
        {words.slice(0, 30).map((w) => (
          <span
            key={w}
            style={{
              marginRight: "25px",
              fontFamily: "monospace",
              fontSize: "2em",
            }}
          >
            {w}
          </span>
        ))}
        {words.length > 30 && <span>and {words.length - 30} more</span>}
      </div>
    </div>
  );
};
