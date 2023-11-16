<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import Config from '../httphelper/Config'
import { HttpHelper } from '../httphelper/HttpHelper'
import Line from '../components/line.vue'
const uploadpath = Config.UploadPath
const resource = ref(null)
const mobile = ref("")
HttpHelper.Post('inst/resources').then((data) => {
  resource.value = data
})
</script>
<template>
  <div>
    <div v-if="resource != null">
      <div class="w-100 bg">
        <div class="flex-row">
          <div class="flex-1"></div>
          <img class="logo " :src="uploadpath + 'resource/' + resource.logo" />
          <div class="flex-1"></div>
        </div>
      </div>
      <div class="flex-row">
          <div class="flex-1"></div>
          <div class="section-block">
            <div>
              <input class="input f-18 fc-black input-mobile" v-model="mobile" placeholder="请输入手机号码" />
            </div>
            <Line></Line>
            <div class="flex-row flex-center">
              <input class="input f-18 fc-black input-mobile" maxlength="6" v-model="mobile" placeholder="请输入手机号码" />
              <div class="flex-1"></div>
              <span class="fc-primary f-12">获取验证码</span>
            </div>
          </div>
          <div class="flex-1"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.input-mobile{
  margin-top: 103px;
  margin-bottom: 18px;
}
.logo {
  margin-top: 141px;
  margin-bottom: 28px;
  width: 124px;
}
</style>
