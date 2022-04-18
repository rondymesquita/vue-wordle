export const calculate = (term: string, secretTerm: string) => {
  const result: any = [];
  for (let i = 0; i < term.length; i++) {
    const letter = term[i];
    const isCorrect = letter === secretTerm[i];
    const isExist = secretTerm.includes(letter) && !isCorrect;
    const letterResult = {
      letter,
      isCorrect,
      isExist,
    };
    result.push(letterResult);
  }
  return result;
};
