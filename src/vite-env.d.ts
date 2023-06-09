/// <reference types="vite/client" />

// 动词配置相关
type VerbType = 'v1' | 'v5' | 'suru' | 'kuru';
type VerbForm =
  | 'verbPoliteForm'
  | 'verbPolitePastForm'
  | 'verbPoliteNegativeForm'
  | 'verbPolitePastNegativeForm'
  | 'verbGerundForm'
  | 'verbSimpleNegativeForm'
  | 'verbSimplePastForm'
  | 'verbSimplePastNegativeForm'
  | 'verbImperativeForm'
  | 'verbVolitionalForm'
  | 'verbAssumedForm'
  | 'verbPotentialForm'
  | 'verbCausativeForm'
  | 'verbCausativePassiveForm'
  | 'verbProhibitiveForm';
interface VerbData extends BaseWordData {
  type: VerbType;
}

// 形容词配置相关
type AdjType = 'i' | 'na';
type AdjForm =
  | 'adjSimpleNegativeForm'
  | 'adjSimplePastForm'
  | 'adjSimplePastNegativeForm'
  | 'adjPoliteForm'
  | 'adjPoliteNegativeForm'
  | 'adjPolitePastForm'
  | 'adjPolitePastNegativeForm';
interface AdjData extends BaseWordData {
  type: AdjType;
}

// 通用配置相关
type Pos = 'verb' | 'adj';
interface BaseWordData {
  kanji: string;
  kana: string;
  meaning: string;
}
type WordData = VerbData | AdjData;
type WordType = VerbType | AdjType;
type WordForm = VerbForm | AdjForm;
// userConfig 参数相关
type VerbConfig = Record<VerbType | VerbForm, boolean>;
type AdjConfig = Record<AdjType | AdjForm, boolean>;
type Pron = '平假名' | '罗马音' | '无注音';
type Config = {
  pron: Pron;
  target: number;
  voice: boolean;
  getFormByWeight: boolean;
  pos: Record<Pos, boolean>;
  verb: VerbConfig;
  adj: AdjConfig;
};
