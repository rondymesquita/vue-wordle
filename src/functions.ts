import { Result, ResultItem } from './types';

export const createEmptyResult = (size: number) => {
  const xxx = Array(size).fill({});

  console.log(xxx);
  return xxx;
};

export const resultFromTerm = (
  term: string,
  size: number
): Array<ResultItem> => {
  const result: Array<ResultItem> = [];

  for (let i = 0; i < size; i++) {
    const value = term[i];
    if (value) {
      result.push({
        letter: value,
        isCorrect: false,
        isExist: false,
      });
    } else {
      result.push({
        letter: ' ',
        isCorrect: false,
        isExist: false,
      });
    }
  }

  return result;
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
