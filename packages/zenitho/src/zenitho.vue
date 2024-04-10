<script setup lang="ts">
import Gradient from './Gradient.ts';
import {onMounted, onUnmounted, ref} from 'vue';

const zenitho = ref<HTMLDivElement | null>(null);
let gradient: Gradient | null = null;

onMounted(() => {
  if (!zenitho.value) {
    return;
  }

  const ctn = zenitho.value;
  gradient = new Gradient();
  gradient.initGradient({
    gradientColors: ["#ef008f", "#6ec3f4", "#7038ff", "#ffba27"],
  });

  ctn.appendChild(gradient.el);
});

onUnmounted(() => {
  if (!zenitho.value || !gradient) {
    return;
  }

  const ctn = zenitho.value;
  gradient.disconnect();
  ctn.removeChild(gradient.el);
  gradient.minigl.gl.getExtension('WEBGL_lose_context')?.loseContext();
});
</script>
<template>
  <div class="ogl-zenitho">
    <div ref="zenitho"></div>
  </div>
</template>
<style scoped>
.ogl-zenitho {
  width: 100%;
  height: 100%;
}
</style>

