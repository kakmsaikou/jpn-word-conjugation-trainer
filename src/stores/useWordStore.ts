import { getWordList } from './../utils/getWordList';
import { getTransword } from './../utils/getTransword';
import { getKey } from './../utils/getKey';
import { useConfigStore } from './useConfigStore';
import { defineStore } from 'pinia';
import { verbList } from '../assets/wordData/verbList';
import { adjList } from '../assets/wordData/adjList';
import { getIndex } from '../utils/getIndex';
import { POS_LIST, VERB_FORM_LIST, VERB_TYPE_LIST, ADJ_TYPE_LIST, BILINGUAL_LIST, ADJ_TENSE_LIST } from '../const';

type State = {
  pos: Pos;
  _form: WordAttribute | null;
  _selectedWordData: WordData | null;
  _answerArr: [string, string] | null;
};
type Getters = {
  attribute: () => WordAttribute;
  selectedWordDataList: () => WordData[];
  selectWordData: () => WordData;
  transwordArray: () => [string, string];
  formattedAnswer: () => string;
  isAnswerCorrect: () => (answer: string) => boolean;
  formattedType: () => WordType;
  formattedKanji: () => string;
};
type Actions = {
  refreshPos: () => void;
  refreshAttribute: () => void;
  refreshSelectedWordData: () => void;
  refreshTranswordArray: () => void;
  refreshWord: () => void;
};

const configStore = useConfigStore();

/*
 * 顺序：
 *   1. 获取词性 pos，包括动词、形容词，比如 verb、adj
 *   2. 获取形态 attribute，包括ます形、て形等等
 *   3. 获取单词 selectWordData
 *   4. 获取 formattedAnswer
 */
export const useWordStore = defineStore<string, State, Getters, Actions>('Word', {
  state: () => ({
    pos: getPos(),
    _form: null,
    _selectedWordData: null,
    _voices: null,
    _answerArr: null,
  }),
  getters: {
    // 获得形态 masu、te、ta、nai 和 adj
    attribute() {
      if (this._form === null) {
        this._form = getAttribute(this.pos);
      }
      return this._form;
    },
    selectedWordDataList() {
      return VERB_FORM_LIST.includes(this.attribute as VerbForm)
        ? getWordList(configStore.tempConfig.verb!, VERB_TYPE_LIST, verbList)
        : getWordList(configStore.tempConfig.adj!, ADJ_TYPE_LIST, adjList);
    },
    selectWordData() {
      if (this._selectedWordData === null) {
        this._selectedWordData = getSelectWordData(this.selectedWordDataList);
      }
      return this._selectedWordData;
    },
    transwordArray() {
      if (this._answerArr === null) {
        this._answerArr = getTransword(this.selectWordData, this.attribute);
      }
      return this._answerArr;
    },
    formattedAnswer() {
      return this.transwordArray[0] === this.transwordArray[1]
        ? this.transwordArray[0]
        : this.transwordArray[1] + '\n' + this.transwordArray[0];
    },
    isAnswerCorrect() {
      return (answer: string) => this.transwordArray.includes(answer);
    },
    formattedType() {
      return BILINGUAL_LIST[this.selectWordData.type] as WordType;
    },
    formattedKanji() {
      return BILINGUAL_LIST[this.attribute] ? BILINGUAL_LIST[this.attribute] : this.attribute;
    },
  },
  actions: {
    refreshPos() {
      this.pos = getPos();
    },
    refreshAttribute() {
      this._form = getAttribute(this.pos);
    },
    refreshSelectedWordData() {
      this._selectedWordData = getSelectWordData(this.selectedWordDataList);
    },
    refreshTranswordArray() {
      this._answerArr = getTransword(this.selectWordData, this.attribute);
    },
    refreshWord() {
      this.refreshPos();
      this.refreshAttribute();
      this.refreshSelectedWordData();
      this.refreshTranswordArray();
    },
  },
});

const getPos = () => {
  return configStore.tempConfig.pos ? getKey(configStore.tempConfig.pos, POS_LIST) : 'verb';
};
const getAttribute = (pos: Pos) => {
  return pos === 'verb'
    ? getKey(configStore.tempConfig.verb!, VERB_FORM_LIST)
    : getKey(configStore.tempConfig.adj!, ADJ_TENSE_LIST);
};
const getSelectWordData = (wordList: WordData[]) => {
  const randomIndex = getIndex(wordList, wordList.length < 3 ? 0 : 3);
  return wordList[randomIndex];
};
