<template>
  <div ref="captchaContainer" class="captcha-container"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

// 参数
const props = defineProps({
  captchaText: {
    type: String,
    required: true
  }
});

const captchaContainer = ref(null);

const drawCaptcha = (text) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Set canvas dimensions
  const width = 250;
  const height = 50;
  canvas.width = width;
  canvas.height = height;

  // Add background color
  ctx.fillStyle = '#f3f3f3';
  ctx.fillRect(0, 0, width, height);

  // Add text
  ctx.font = '30px Arial';
  ctx.fillStyle = '#000';
  ctx.fillText(text, 10, 35);

  // Add random lines for interference
  for (let i = 0; i < 15; i++) {
    ctx.strokeStyle = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.7)`;
    ctx.beginPath();
    ctx.moveTo(Math.random() * width, Math.random() * height);
    ctx.lineTo(Math.random() * width, Math.random() * height);
    ctx.stroke();
  }

  // Append canvas to the container
  captchaContainer.value.innerHTML = ''; // Clear previous canvas if any
  captchaContainer.value.appendChild(canvas);
};

onMounted(() => {
  drawCaptcha(props.captchaText);
});
</script>

<style scoped>
.captcha-container {
  display: inline-block;
}
</style>
