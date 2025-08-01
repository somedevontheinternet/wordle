export type LetterState = (typeof LetterState)[keyof typeof LetterState];

export const LetterState = Object.freeze({
  EMPTY: 0,
  UNKNOWN: 1,
  GREY: 2,
  YELLOW: 3,
  GREEN: 4,
});
