export const FORM_LIST: Form[] = ['masu', 'te', 'ta', 'nai', 'ba'];

export const FORM_KEY_MAP: Record<Form, string> = {
  masu: ',1,false,true',
  te: ',3,false,false',
  ta: ',2,false,false',
  nai: ',1,true,false',
  ba: ',4,false,false',
};

export const FORM_KANJI_MAP: Record<Form, string> = {
  masu: 'ます形',
  te: 'て形',
  ta: 'た形',
  nai: 'ない形',
  ba: 'ば形',
};

// 最大几次内单词不会重复
export const MAX_RANDOM_WORDS_COUNT = 3;

export const INIT_CONFIG: Config = {
  verb: {
    masu: true,
    te: true,
    ta: true,
    nai: true,
    ba: true,
  },
};