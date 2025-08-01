import classes from "./Answers.module.css";

const wordDisplayCount = 30;

type AnswersProps = {
  words: string[];
};

export const Answers = ({ words }: AnswersProps): React.ReactElement => {
  return (
    <div className={classes.container}>
      {words.slice(0, wordDisplayCount).map((w) => (
        <span key={w} className={classes.answer}>
          {w}
        </span>
      ))}
      <Extra wordCount={words.length} />
    </div>
  );
};

type ExtraProps = {
  wordCount: number;
};

const Extra = ({ wordCount }: ExtraProps): React.ReactElement => {
  if (wordCount <= wordDisplayCount) {
    return <span>and {wordCount - wordDisplayCount} more</span>;
  }
  return <></>;
};
