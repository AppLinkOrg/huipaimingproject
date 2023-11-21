<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import Config from '../httphelper/Config'
import { HttpHelper } from '../httphelper/HttpHelper'
import Line from '../components/line.vue'
const route = useRoute()
const router = useRouter()
const uploadpath = Config.UploadPath
const resource = ref(null)
const mobile = ref('')
const loading = ref(false)
const checked = ref(false)
HttpHelper.Post('inst/resources').then((data) => {
  resource.value = data
})
const sendverifycode = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000)
}
const login = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    router.push('/home')
  }, 1000)
}
</script>
<template>
  <div>
    <van-overlay :show="loading">
      <div class="overlay-wrapper">
        <van-loading size="50" />
      </div>
    </van-overlay>
    <div v-if="resource != null">
      <div class="w-100 bg">
        <div class="flex-row">
          <div class="flex-1"></div>
          <img class="logo" :src="uploadpath + 'resource/' + resource.logo" />
          <div class="flex-1"></div>
        </div>
      </div>
      <div class="flex-row">
        <div class="flex-1"></div>
        <div class="section-block">
          <div>
            <input
              class="input wp-100 f-18 fc-black input-mobile"
              v-model="mobile"
              placeholder="请输入手机号码"
            />
          </div>
          <Line></Line>
          <div class="flex-row flex-center margin-top-49 margin-bottom-18">
            <input
              class="input f-18 fc-black"
              maxlength="6"
              v-model="mobile"
              placeholder="请输入验证码"
            />
            <div class="flex-1"></div>
            <span class="fc-primary f-12" @click="sendverifycode">获取验证码</span>
          </div>
          <Line></Line>
          <div class="margin-top-49"></div>
          <van-button type="primary" block round :color="Config.PrimaryColor" @click="login"
            >登录</van-button
          >
        </div>
        <div class="flex-1"></div>
      </div>
    </div>
    <div class="bottom-block">
      <div class="flex-row flex-center">
        <div class="flex-1"></div>
        <van-checkbox v-model="checked" :checked-color="Config.PrimaryColor"></van-checkbox>
        <div class="f-12 margin-left-5">
          我已阅读<router-link to="/context/aboutus" class="fc-primary">《用户协议》</router-link
          >和<router-link class="fc-primary" to="/context/aboutus">《隐私政策》</router-link
          >并理解相关条款内容
        </div>
        <div class="flex-1"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.input-mobile {
  margin-top: 103px;
  margin-bottom: 18px;
}
.logo {
  margin-top: 141px;
  margin-bottom: 28px;
  width: 124px;
}
</style>
