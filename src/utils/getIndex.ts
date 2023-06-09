const usedIndexes: number[] = [];

export const getIndex = (arr: WordData[], uniqueCount: number): number => {
  const max = arr.length;
  let randomIndex = Math.floor(Math.random() * max);
  if (usedIndexes.length >= uniqueCount) {
    usedIndexes.shift();
  }
  while (usedIndexes.includes(randomIndex)) {
    randomIndex = Math.floor(Math.random() * max);
  }
  usedIndexes.push(randomIndex);
  return randomIndex;
};
