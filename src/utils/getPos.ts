const v5Endings: Record<string, number> = {
  ぶ: 31,
  ぐ: 32,
  く: 33,
  む: 35,
  ぬ: 36,
  る: 37,
  す: 39,
  つ: 40,
  う: 41,
};

// 根据平假名获得对应的 pos 值，pos 值是 jconj 转换动词参数
export const getPos = (kana: string, type: string): number => {
  if (type === 'v1') return 28;
  if (type === 'v5') {
    const kanaEndsWith = kana.charAt(kana.length - 1);
    return v5Endings[kanaEndsWith];
  }
  // TODO，暂时防止报错，后面再改
  return 31;
};
