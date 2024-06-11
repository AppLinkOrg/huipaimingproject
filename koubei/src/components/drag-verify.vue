<template>
  <div class="section-padding bg-white">
    <VueSlideVerify
      :captchaText="text"
    ></VueSlideVerify>
    <div>请使用下方选项完成上方题目</div>
    <div class="flex-row margin-top-22">
      <div class="flex-1 margin-right-10"><van-button plain block type="primary" size="small" @click="plus(array[0][0]+array[0][1])">{{array[0][0]+array[0][1]}}</van-button></div>
      <div class="flex-1 margin-left-10"><van-button plain block type="primary" size="small" @click="plus(array[1][0]+array[1][1])">{{array[1][0]+array[1][1]}}</van-button></div>
    </div>
    <div class="flex-row margin-top-22">
      <div class="flex-1 margin-right-10"><van-button plain block type="primary" size="small" @click="plus(array[2][0]+array[2][1])">{{array[2][0]+array[2][1]}}</van-button></div>
      <div class="flex-1 margin-left-10"><van-button plain block type="primary" size="small" @click="plus(array[3][0]+array[3][1])">{{array[3][0]+array[3][1]}}</van-button></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue'
//import VueSlideVerify from 'vue-slide-verify'
import VueSlideVerify from './wordcreate.vue'
import { showToast, showDialog } from 'vant'

const getRandomNumber=()=>{
    return Math.floor(Math.random() * 98) + 2; // 2 to 99
}
// 随机打乱数组顺序的函数
const shuffleArray=(array)=>{
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
// 生成a和b的组合
const getCombination=(sum)=>{
    const a = Math.floor(Math.random() * (sum - 1)) + 1;
    const b = sum - a;
    return [a, b];
}
// 生成一个不等于给定数字的随机数
const getUniqueRandomNumber=(exclude)=>{
  let number;
    do {
        number = getRandomNumber();
    } while (number === exclude);
    return number;
}

const c = getRandomNumber();
const [a, b] = getCombination(c);

const text = ref(a+'＋'+b+"＝"+"？")

const c1 = getUniqueRandomNumber(c);
    const c2 = getUniqueRandomNumber(c);
    const c3 = getUniqueRandomNumber(c);

    const [a1, b1] = getCombination(c1);
    const [a2, b2] = getCombination(c2);
    const [a3, b3] = getCombination(c3);

    // 第四步：创建数组并打乱顺序
    let array = [[a, b], [a1, b1], [a2, b2], [a3, b3]];
    shuffleArray(array);

const emit = defineEmits(['success', 'fail'])

const plus=(res)=>{
  if(res==c){
    emit('success')
  }else{
    showToast('回答错误，请重试')
    emit('fail')
  }
}

const success = () => {
  // 验证通过的处理逻辑
  console.log('验证通过!')

  // 手动触发 passed 事件
  emit('success')
}

const fail = () => {
  // 验证通过的处理逻辑
  console.log('验证不通过!')

  // 手动触发 passed 事件
  showToast('验证不通过')
  emit('fail')
}
</script>
