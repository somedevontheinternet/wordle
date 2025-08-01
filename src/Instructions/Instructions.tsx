type InstructionsProps = {
  typingLetters: boolean;
};

export const Instructions = ({
  typingLetters,
}: InstructionsProps): React.ReactElement => {
  return (
    <div>
      <p style={{ fontSize: "3em", margin: 0 }}>
        {typingLetters ? "Type Letters" : "1 = grey, 2 = yellow, 3 = green"}
      </p>
    </div>
  );
};
