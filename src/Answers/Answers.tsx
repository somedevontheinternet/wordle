import { OriginalSolutions, PastSolutions } from "../process";
import classes from "./Answers.module.css";

const wordDisplayCount = 180;

type AnswersProps = {
  words: string[];
};

export const Answers = ({ words }: AnswersProps): React.ReactElement => {
  return (
    <>
      <div className={classes.container}>
        {words.slice(0, wordDisplayCount).map((w) => {
          const extraClass = PastSolutions.includes(w)
            ? " " + classes.pastSolution
            : OriginalSolutions.includes(w)
            ? " " + classes.originalSolution
            : "";
          return (
            <span key={w} className={classes.answer + extraClass}>
              {w}
            </span>
          );
        })}
        <br />
      </div>
      <Extra wordCount={words.length} />
    </>
  );
};

type ExtraProps = {
  wordCount: number;
};

const Extra = ({ wordCount }: ExtraProps): React.ReactElement => {
  if (wordCount > wordDisplayCount) {
    return <span>and {wordCount - wordDisplayCount} more</span>;
  }
  return <></>;
};
