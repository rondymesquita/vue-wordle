import { Result } from './types';

export const sanitize = (letter: string): string => {
  return letter
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
};

export const calculate = (term: string, secretTerm: string): Array<Result> => {
  const result: Array<Result> = [];
  const sanitizedTerm = sanitize(term);
  const sanitizedSecretTerm = sanitize(secretTerm);

  for (let i = 0; i < sanitizedTerm.length; i++) {
    const letter = sanitizedTerm[i];
    const isCorrect = letter === sanitizedSecretTerm[i];
    const isExist = sanitizedSecretTerm.includes(letter) && !isCorrect;
    const letterResult: Result = {
      letter: isCorrect ? secretTerm[i] : letter,
      isCorrect,
      isExist,
    };
    result.push(letterResult);
  }
  return result;
};
