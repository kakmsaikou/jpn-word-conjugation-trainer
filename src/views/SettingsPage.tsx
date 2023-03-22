import { computed, defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { AdjOptions } from '../components/AdjOptions';
import { Button } from '../components/Button';
import { VerbOptions } from '../components/VerbOptions';
import { useConfigStore } from '../stores/useConfigStore';
import { useWordStore } from '../stores/useWordStore';
import { deepClone } from '../utils/deepClone';
import s from './SettingsPage.module.scss';

export const SettingsPage = defineComponent({
  setup: (props, context) => {
    const configStore = useConfigStore();
    const wordStore = useWordStore();
    const tempConfig: Config = reactive(deepClone(configStore.config));
    const { pos } = tempConfig;
    const router = useRouter();

    const posValid = computed(() => {
      return pos.verb || pos.adj;
    });

    const verbValid = ref<boolean | null>(null);
    const updateVerbValid = (val: boolean) => {
      verbValid.value = val;
    };

    const adjValid = ref<boolean | null>(null);
    const updateAdjValid = (val: boolean) => {
      adjValid.value = val;
    };

    const formValid = computed(() => {
      if (posValid.value === false) return false;
      if (pos.verb === true && verbValid.value === false) return false;
      if (pos.adj === true && adjValid.value === false) return false;
      return true;
    });

    const onClick = (e: MouseEvent) => {
      e.preventDefault();
      configStore.setConfig(tempConfig);
      wordStore.refreshWord();
      router.push('/');
    };
    return () => (
      <div class={s.wrapper}>
        <h2>设置</h2>
        <form class={s.optionsForm}>
          <h4 v-show={!posValid.value}>*你至少需要选择一个类别</h4>
          <VerbOptions tempConfig={tempConfig} onUpdateVerb={updateVerbValid} />
          <AdjOptions tempConfig={tempConfig} onUpdateAdj={updateAdjValid} />
          <Button onClick={onClick} disabled={formValid.value}>
            戻る ↩
          </Button>
        </form>
      </div>
    );
  },
});

export default SettingsPage;