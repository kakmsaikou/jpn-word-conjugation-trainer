import { defineStore } from 'pinia';
import { wordDataList } from '../assets/wordDataList';
import { getArrayRandomIndex } from '../utils/getRandomIndex';

type State = {
  currentWordData: WordData | null;
};
type Getters = {
  wordData: () => WordData;
  kanji: () => string;
  kana: () => string;
  meaning: () => string;
};
type Actions = {
  refreshWordData: () => void;
};

const MAX_RANDOM_WORDS_COUNT = 3;

export const useWordDataStore = defineStore<string, State, Getters, Actions>('wordData', {
  state: () => ({
    currentWordData: null,
  }),
  getters: {
    wordData() {
      if (this.currentWordData === null) {
        const randomIndex = getArrayRandomIndex(wordDataList, MAX_RANDOM_WORDS_COUNT);
        this.currentWordData = wordDataList[randomIndex];
      }
      return this.currentWordData;
    },
    kanji(){
      return this.wordData.kanji;
    },
    kana(){
      return this.wordData.kana;
    },
    meaning(){
      return this.wordData.meaning;
    },
  },
  actions: {
    refreshWordData() {
      const index = getArrayRandomIndex(wordDataList, MAX_RANDOM_WORDS_COUNT);
      this.currentWordData = wordDataList[index];
    },
  },
});
