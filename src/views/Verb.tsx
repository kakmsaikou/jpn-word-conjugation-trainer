import { defineComponent, reactive } from 'vue';
import s from './Verb.module.scss';
import { withEventModifiers } from '../plugins/withEventmodifiers';
import { convertVerbForm } from '../utils/convertVerbForm';

export const Verb = defineComponent({
  setup: (props, context) => {
    const wordData = reactive<WordData>({
      kanji: 'やる',
      kana: 'やる',
      type: 'v5',
    });
    const result = convertVerbForm(wordData, 'ます形');
    const handleInput = (e: any) => {
      const answer = e.srcElement.value;
      if (answer === result.kanji || answer === result.kana) {
        console.log('correct');
      } else {
        console.log('wrong');
      }
    };
    return () => (
      <div class={s.wrapper}>
        <h1>日语词汇变形练习</h1>
        <div class={s.practiceWrapper}>
          <div class={s.record}>
            <div class={s.correctCount}>
              <p>今日正确</p>
              <p>80</p>
            </div>
            <div class={s.practiceCount}>
              <p>今日练习</p>
              <p>100</p>
            </div>
          </div>
          <div class={s.questionWrapper}>
            <div class={s.wordWrapper}>
              <h2 class={s.wordText}>やる</h2>
              <p class={s.meaning}>做、给</p>
            </div>
            <h3 class={s.questionContent}>ます形</h3>
            <p class={s.resultMessage}>やります</p>
          </div>
          <input
            type='text'
            class={s.answer}
            {...withEventModifiers(
              {
                onKeyup: handleInput,
              },
              ['enter']
            )}
          />
          <div class={s.settingWrapper}>
            <span class={s.continue}>单击 Enter 继续</span>
          </div>
        </div>
      </div>
    );
  },
});

export default Verb;
