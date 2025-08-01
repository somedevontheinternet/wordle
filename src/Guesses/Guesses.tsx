import { Letter } from "../Letter/Letter";
import type { LetterState } from "../Letter/LetterState";
import classes from "./Guesses.module.css";

export type GuessRow = {
  letters: string[];
  states: LetterState[];
};

const countToFive = [0, 1, 2, 3, 4];

type GuessesProps = {
  guesses: GuessRow[];
};

export const Guesses = ({ guesses }: GuessesProps): React.ReactElement => {
  return (
    <>
      {guesses.map((g, i) => (
        <div key={i} className={classes.row}>
          {countToFive.map((i) => (
            <Letter
              key={i}
              letter={g.letters[i]}
              state={g.states[i] ?? (g.letters[i] === undefined ? 0 : 1)}
            />
          ))}
        </div>
      ))}
    </>
  );
};
