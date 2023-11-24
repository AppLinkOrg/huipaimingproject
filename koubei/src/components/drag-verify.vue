<template>
    <div>
      <VueSlideVerify
        ref="verify"
        @success="success"
        @fail="fail"
        :bgColor="'#f0f0f0'"
        :text="text"
      ></VueSlideVerify>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, defineEmits } from 'vue';
  import VueSlideVerify from 'vue-slide-verify';

  const text = ref('请拖动滑块完成验证');
  const emit = defineEmits(['success', 'fail']);
  
  
  const success = () => {
    // 验证通过的处理逻辑
    console.log('验证通过!');
  
    // 手动触发 passed 事件
    emit('success');
  };
  
  const fail = () => {
    // 验证通过的处理逻辑
    console.log('验证不通过!');
  
    // 手动触发 passed 事件
    emit('fail');
  };
  </script>
  