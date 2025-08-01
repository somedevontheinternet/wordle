import { LetterState } from "../Letter/LetterState";
import { StateStyles } from "../Wordle";

type InstructionsProps = {
  typingLetters: boolean;
};

type BlockProps = {
  state: LetterState;
};

const Block = ({ state }: BlockProps): React.ReactElement => {
  return <span style={{ color: StateStyles[state].backgroundColor }}>█</span>;
};

export const Instructions = ({
  typingLetters,
}: InstructionsProps): React.ReactElement => {
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <p style={{ fontSize: "2em", margin: 0, padding: 0 }}>
        {typingLetters ? (
          <>Type Letters</>
        ) : (
          <>
            1 = <Block state={LetterState.GREY} /> 2 ={" "}
            <Block state={LetterState.YELLOW} /> 3 ={" "}
            <Block state={LetterState.GREEN} />
          </>
        )}
      </p>
    </div>
  );
};
