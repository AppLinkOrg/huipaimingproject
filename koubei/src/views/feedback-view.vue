<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch, defineProps, onMounted } from 'vue'
import Config from '../httphelper/Config'
import { HttpHelper } from '../httphelper/HttpHelper'
import { VueEcharts } from 'vue3-echarts'

import { showToast, showDialog } from 'vant'
import { Utils } from '../utils/Utils'

const route = useRoute()
const router = useRouter()
const uploadpath = Config.UploadPath
const resource = ref(null)
const onNavClickLeft = () => {
  router.back()
}
HttpHelper.Post('inst/resources').then((data) => {
  resource.value = data
})
const inst = ref(null)
HttpHelper.Post('inst/info').then((data) => {
  inst.value = data
})
const member = ref(null)
HttpHelper.Post('member/info').then((data) => {
  if (data == null) {
    router.push('/login')
    return
  }
  member.value = data
})

let name = ref('')
let summary = ref('')
let onSubmit = () => {
  if (name.value == '') {
    showToast('请输入您的联系方式')
    return
  }
  if (summary.value == '') {
    showToast('请输入您的问题和意见')
    return
  }
  HttpHelper.Post('member/addfeedback', {name:name.value,summary:summary.value}).then((info) => {
    if (info.code == 0) {
      showDialog({ message: '提交成功' }).then(() => {
        router.push('/home')
      })
    } else {
      showToast(info.result)
    }
  })
}

var pagesection = ref()
onMounted(() => {
  console.log('pagesection', pagesection.value)
  pagesection.value.style.height = Utils.getAdjustedPageHeight() + 'px'
})
</script>
<template>
  <van-nav-bar title="意见反馈" left-arrow fixed @click-left="onNavClickLeft" />

  <div class="flex-column" ref="pagesection">
    <div class="flex-1">
      <div v-if="resource != null && inst != null">
        <div>
          <div class="height-46"></div>
          <van-form  class="formbox">
            <div class="c-2 f-14 margin-top-22">联系方式</div>
            <van-field
              v-model="name"
              name="name"
              type="number"
              placeholder="留下联系方式，更可能解决问题～"
              class="h53 f-13"
            />
            <div class="flex-row flex-center">
              <div class="c-2 f-14">问题和意见</div>
              <div class="flex-1"></div>
              <div class="c-1 f-14">{{ summary.length }}/100</div>
            </div>

            <van-field
              v-model="summary"
              placeholder="在此处输入您想要的反馈内容"
              maxlength="100"
              name="summary"
              type="textarea"
              class="h200 f-13"
              rows="8"
            />
          </van-form>
        </div>
      </div>
    </div>
    <div class="bottom-block">
      <div class="pobottom flex-row">
        <div class="flex-1"></div>
        <van-button class="btns" @click="onSubmit"> 提交 </van-button>
        <div class="flex-1"></div>
      </div>
      <div class="flex-row flex-center" v-if="inst!=null">
        <div class="flex-1"></div>
        <div class="text-center">
          <div class="margin-top-5">
            <span class="f-12">{{ inst.banquan2 }}</span>
          </div>
        </div>
        <div class="flex-1"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.formbox {
  margin: 13px 27px;
}
.h53 {
  height: 53px;
  margin-top: 13px;
  margin-bottom: 26px;
}
.h200 {
  margin-top: 13px;
}

.pobottom {
  margin-bottom: 20px;
}
.btns {
  width: 322px;
  height: 40px;
  background: #048694;
  border-radius: 20px;
  line-height: 40px;
  text-align: center;
  color: #ffffff;
  font-weight: 500;
}
.height-46 {
  height: 46px;
}
</style>
