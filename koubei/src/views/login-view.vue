<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import Config from '../httphelper/Config'
import { HttpHelper } from '../httphelper/HttpHelper'
import Line from '../components/line.vue'
import DragVerify from '../components/drag-verify.vue'
import { showToast } from 'vant'
import { onMounted } from 'vue'

const route = useRoute()
const router = useRouter()
const uploadpath = Config.UploadPath
const resource = ref(null)
const mobile = ref(localStorage.getItem('lastmobile'))
const verifycode = ref('')
const loading = ref(false)
const checked = ref(false)
const verifycodereminder = ref(0)
HttpHelper.Post('inst/resources').then((data) => {
  resource.value = data
})
const inst = ref(null)
HttpHelper.Post('inst/info').then((data) => {
  inst.value = data
})
const showverify = ref(false)
const sendverifycode = () => {
  const regex = /^1\d{10}$/
  if (regex.test(mobile.value) == false) {
    showToast('手机号码不正确，请重新输入')
    return
  }
  showverify.value = true
}
onMounted(() => {
  route.meta.title = '用户登录'
  const timestamp = Date.now() / 1000
  const lastsent = parseInt(localStorage.getItem('lastsent'))
  console.log('lastsent', timestamp, lastsent, timestamp - lastsent)
  if (timestamp - lastsent < 60) {
    verifycodereminder.value = 60 - parseInt(timestamp - lastsent)
  }
  setInterval(() => {
    if (verifycodereminder.value > 0) {
      verifycodereminder.value = verifycodereminder.value - 1
    }
  }, 1000)
})
const handlePassed = () => {
  showverify.value = false

  loading.value = true
  setTimeout(() => {
    loading.value = false
    HttpHelper.Post('member/sendregverifycode', { mobile: mobile.value }).then((data) => {
      verifycodereminder.value = 60
      showToast('验证码已发送')
    })
  }, 1000)
  localStorage.setItem('lastsent', Date.now() / 1000)
}
const handleFailed = () => {
  showverify.value = false
}
const login = () => {
  if (checked.value == false) {
    showToast('请勾选统一用户协议和隐私政策')
    return
  }
  loading.value = true
  setTimeout(() => {
    loading.value = false
    HttpHelper.Post('member/login', { mobile: mobile.value, verifycode: verifycode.value }).then(
      (data) => {
        if (data.code == 0) {
          showToast('登录成功，立刻跳转')
          localStorage.setItem('lastmobile', mobile.value)
          localStorage.setItem('token', data.return)
          
          if(window.location.href.indexOf("guoneiurl")>0){
            //alert(inst.value.guoneiurl);
            window.location.href=inst.value.guoneiurl+"/settoken.html?token="+data.return
          }else if(window.location.href.indexOf("guoneiurl")>0){
            window.location.href=inst.value.guoneiurl+"/settoken.html?token="+data.return
          }else{
            router.push('/home')
          }
          
        } else {
          showToast(data.return)
        }
      }
    )
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
    <van-overlay :show="showverify">
      <div class="overlay-wrapper">
        <DragVerify v-if="showverify" @success="handlePassed" @fail="handleFailed"></DragVerify>
      </div>
    </van-overlay>
    <div v-if="resource != null">
      <div class="pk">
        <div class="w-100 bg " >
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
                v-model="verifycode"
                placeholder="请输入验证码"
              />
              <div class="flex-1"></div>
              <span v-if="verifycodereminder > 0" class="fc-primary fc-gray f-12"
                >({{ verifycodereminder }}s)</span
              >
              <span v-if="verifycodereminder <= 0" class="fc-primary f-12" @click="sendverifycode"
                >获取验证码</span
              >
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
    </div>
    <div class="bottom-block">
      <div class="flex-row flex-center">
        <div class="flex-1"></div>
        <van-checkbox v-model="checked" :checked-color="Config.PrimaryColor"></van-checkbox>
        <div class="f-12 margin-left-5">
          我已阅读<router-link to="/context/useragreement" class="fc-primary"
            >《用户协议》</router-link
          >和<router-link class="fc-primary" to="/context/privacy">《隐私政策》</router-link
          >并理解相关条款内容
        </div>
        <div class="flex-1"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.input-mobile {
  margin-top: 63px;
  margin-bottom: 18px;
}
.logo {
  margin-top: 100px;
  margin-bottom: 28px;
  width: 124px;
}
.pdd{
  height: 200px;
}
.pk {
  min-height: calc( 100vh - 48px );
}
</style>
