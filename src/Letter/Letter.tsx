import classes from "./Letter.module.css";
import { LetterState } from "./LetterState";
type LetterProp = {
  letter: string;
  state: LetterState;
};

const stateStyles = {
  [LetterState.EMPTY]: {
    color: "#000",
    backgroundColor: "#fff",

    borderColor: "rgb(211, 214, 218)",
    borderWidth: "2px",
    borderStyle: "solid",
  },
  [LetterState.UNKNOWN]: {
    color: "#000",
    backgroundColor: "#fff",

    borderColor: "#000000",
    borderWidth: "2px",
    borderStyle: "solid",
  },
  [LetterState.GREY]: {
    color: "#fff",
    backgroundColor: "#787c7e",

    borderColor: "#787c7e",
    borderWidth: "2px",
    borderStyle: "solid",
  },
  [LetterState.YELLOW]: {
    color: "#fff",
    backgroundColor: "#c9b458",

    borderColor: "#c9b458",
    borderWidth: "2px",
    borderStyle: "solid",
  },
  [LetterState.GREEN]: {
    color: "#fff",
    backgroundColor: "#6aaa64",

    borderColor: "#6aaa64",
    borderWidth: "2px",
    borderStyle: "solid",
  },
};

export const Letter = ({ letter, state }: LetterProp): React.ReactElement => {
  return (
    <div className={classes.letter} style={stateStyles[state]}>
      {letter}
    </div>
  );
};
