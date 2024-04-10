// src/Adion/Plugin.js
import { useAdion } from '@/Adion';

export default {
  install: (app) => {
    const adion = useAdion();
    app.config.globalProperties.$adion = adion;
  }
};
