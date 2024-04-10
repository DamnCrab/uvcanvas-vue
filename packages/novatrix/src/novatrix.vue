<script setup lang="ts">
import {Renderer, Program, Mesh, Color, Triangle} from "ogl";
import vert from "./vert.glsl";
import frag from "./frag.glsl";
import {onMounted, onUnmounted, ref, defineProps} from 'vue'

const props = defineProps({
  speed: {
    type: Number,
    default: 1,
  },
  color: {
    type: String,
    default: '#4c337f',
  },
})

const novatrix = ref<HTMLDivElement | null>(null);
let animateId: number | null = null;

const resize = (renderer: Renderer, ctn: HTMLDivElement) => {
  const scale = 1;
  renderer.setSize(ctn.offsetWidth * scale, ctn.offsetHeight * scale);
};
const renderer = new Renderer();
const gl = renderer.gl;
const initOGL = () => {
  if (!novatrix.value) return;

  const ctn = novatrix.value;
  gl.clearColor(1, 1, 1, 1);

  window.addEventListener('resize', () => resize(renderer, ctn), false);
  resize(renderer, ctn);

  const geometry = new Triangle(gl);

  const program = new Program(gl, {
    vertex: vert,
    fragment: frag,
    uniforms: {
      uTime: {value: 0},
      uColor: {value: new Color(props.color)},
    },
  });

  const mesh = new Mesh(gl, {geometry, program});

  const update = (t: number) => {
    animateId = requestAnimationFrame(update);

    const {speed} = props;

    program.uniforms.uTime.value = t * 0.001 * speed;

    renderer.render({scene: mesh});
  };

  animateId = requestAnimationFrame(update);

  ctn.appendChild(gl.canvas);
}

const cleanUp = () => {
  if (animateId !== null) {
    cancelAnimationFrame(animateId);
  }
  window.removeEventListener('resize', resize);
  if (novatrix.value && novatrix.value.contains(gl.canvas)) {
    novatrix.value.removeChild(gl.canvas);
  }
  gl.getExtension('WEBGL_lose_context')?.loseContext();
};
onMounted(() => {
  initOGL();
})
onUnmounted(() => {
  cleanUp();
})
</script>

<template>
  <div class="ogl" ref="novatrix"></div>
</template>

<style scoped>
.ogl {
  width: 100%;
  height: 100%;
}
</style>
