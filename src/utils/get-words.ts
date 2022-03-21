import words from 'src/data/words.json';
import dictionary from 'src/data/dictionary.json';

export const getWord = (): string => {
  return words[Math.floor(Math.random() * words.length)];
};

export const isValidWord = (word: string): boolean => {
  return words.concat(dictionary).includes(word);
};
