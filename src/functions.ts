import { Result, ResultItem } from './types';

export const resultFromTerm = (term: string, size: number): Result => {
  const lettersFromResult: Result = [];
  for (let i = 0; i < size; i++) {
    const value = term[i];
    if (value) {
      lettersFromResult.push({
        letter: value,
        isCorrect: false,
        isExist: false,
      });
    } else {
      lettersFromResult.push({
        letter: ' ',
        isCorrect: false,
        isExist: false,
      });
    }
  }
  return lettersFromResult;
};

export const calculate = (term: string, secretTerm: string) => {
  const result: Result = [];
  for (let i = 0; i < term.length; i++) {
    const letter = term[i];
    const isCorrect = letter === secretTerm[i];
    const isExist = secretTerm.includes(letter) && !isCorrect;
    const letterResult: ResultItem = {
      letter,
      isCorrect,
      isExist,
    };
    result.push(letterResult);
  }
  return result;
};
