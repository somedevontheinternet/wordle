import { StateStyles } from "../Wordle";
import classes from "./Letter.module.css";
import { LetterState } from "./LetterState";
type LetterProp = {
  letter: string;
  state: LetterState;
};

export const Letter = ({ letter, state }: LetterProp): React.ReactElement => {
  return (
    <div className={classes.letter} style={StateStyles[state]}>
      {letter}
    </div>
  );
};
