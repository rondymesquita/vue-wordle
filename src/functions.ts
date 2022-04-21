import { Result, ResultItem } from "./types";

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
        letter: " ",
        isCorrect: false,
        isExist: false,
      });
    }
  }

  return result;
};

const sanitize = (term: string) => {
  return term
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
};

export const calculate = (term: string, secretTerm: string) => {
  const result: Result = [];
  const sanitizedTerm = sanitize(term);
  const sanitizedSecretTerm = sanitize(secretTerm);

  for (let i = 0; i < sanitizedTerm.length; i++) {
    const letter = sanitizedTerm[i];
    const isCorrect = letter === sanitizedSecretTerm[i];
    const isExist = sanitizedSecretTerm.includes(letter) && !isCorrect;
    const letterResult: ResultItem = {
      letter: isCorrect ? secretTerm[i] : letter,
      isCorrect,
      isExist,
    };
    result.push(letterResult);
  }
  return result;
};
