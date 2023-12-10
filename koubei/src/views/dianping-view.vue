<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch, defineProps, onMounted } from 'vue'
import Config from '../httphelper/Config'
import { HttpHelper } from '../httphelper/HttpHelper'
import { VueEcharts } from 'vue3-echarts'
import { showDialog } from 'vant'

const route = useRoute()
const router = useRouter()
const uploadpath = Config.UploadPath
const resource = ref(null)
const loading = ref(false)
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

const uinfo1 = ref(null)
const uinfo2 = ref(null)
const ux = ref(1)
const clickUx = (x) => {
  ux.value = x
}

const goBack = () => {
  router.back()
}
var insearch = false
const randomChange = () => {
  if (loading.value == true) {
    return
  }
  loading.value = true
  setTimeout(() => {
    HttpHelper.Post('daxue/daxuelist', {
      limit: '2',
      needrandom: '1'
    }).then((daxuelist) => {
      loading.value = false
      uinfo1.value = daxuelist[0]
      uinfo2.value = daxuelist[1]
    })
  }, 1000)
}
randomChange()
const show = ref(false)
const toupiao = (uid) => {
  if (loading.value == true) {
    return
  }
  var daxue1_id = uinfo1.value.id > uinfo2.value.id ? uinfo1.value.id : uinfo2.value.id
  var daxue2_id = uinfo1.value.id > uinfo2.value.id ? uinfo2.value.id : uinfo1.value.id
  loading.value = true
  HttpHelper.Post('daxue/toupiao', {
    daxue1_id,
    daxue2_id,
    uid
  }).then(() => {
    loading.value = false
    show.value = true
  })
}
</script>
<template>
  <div>
    <van-nav-bar title="点评" left-arrow fixed @click-left="onNavClickLeft" />
    <van-overlay :show="loading">
      <div class="overlay-wrapper">
        <van-loading size="50" />
      </div>
    </van-overlay>
    <div v-if="resource != null && inst != null" class="text-center margin-top-49">
      <van-dialog
        v-model:show="show"
        title=""
        confirm-button-text="更换下一组"
        theme="round-button"
        @confirm="randomChange"
      >
        <div class="text-center margin-top-49">
          <img class="success" :src="uploadpath + 'resource/' + resource.success" />
        </div>
        <div class="text-center margin-top-22">点评成功</div>
      </van-dialog>
      <div class="min-wh100 bg-gray">
        <div class="flex-row">
          <div class="flex-1"></div>
          <div class="section-block">
            <div class="flex-row">
              <div class="flex-1"></div>
              <img class="logo" :src="uploadpath + 'resource/' + resource.logo" />
              <div class="flex-1"></div>
            </div>
            <div class="flex-row flex-center">
              <div
                class="universitybox bg-white"
                :class="{ universitybox2: ux == 1 }"
                @click="clickUx(1)"
                @dblclick="toupiao(uinfo1.id)"
              >
                <div class="flex-column flex-center" v-if="uinfo1 != null">
                  <div class="flex-1">
                    <img class="uni-logo" :src="uploadpath + 'daxue/' + uinfo1.logo" />
                  </div>
                  <div class="flex-1 margin-left-15">
                    <div class="f-18 fw-bold fc-black">{{ uinfo1.name }}</div>
                    <div class="f-15 fw-40 margin-top-22 fc-black">{{ uinfo1.name1 }}</div>
                  </div>
                </div>
              </div>
              <div class="flex-row">
                <div class="flex-1"></div>
                <img class="vslogo" :src="uploadpath + 'resource/' + resource.vs" />
                <div class="flex-1"></div>
              </div>
              <div
                class="universitybox bg-white"
                :class="{ universitybox2: ux == 2 }"
                @click="clickUx(2)"
                @dblclick="toupiao(uinfo2.id)"
              >
                <div class="flex-column flex-center" v-if="uinfo2 != null">
                  <div class="flex-1">
                    <img class="uni-logo" :src="uploadpath + 'daxue/' + uinfo2.logo" />
                  </div>
                  <div class="flex-1 margin-right-15">
                    <div class="f-18 fw-bold fc-black">{{ uinfo2.name }}</div>
                    <div class="f-15 fw-40 margin-top-22 fc-black">{{ uinfo2.name1 }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center fc-primary f-15 fw-500 margin-top-49">双击学校即可点赞</div>
            <div class="flex-row flex-center margin-top-49">
              <div class="flex-1">
                <van-button type="primary" block round :color="Config.PrimaryColor" @click="goBack"
                  >返回</van-button
                >
              </div>
              <div class="jiange"></div>
              <div class="flex-1">
                <van-button
                  type="primary"
                  block
                  round
                  :color="Config.WarningColor"
                  @click="randomChange"
                  >换一组</van-button
                >
              </div>
            </div>
          </div>
          <div class="flex-1"></div>
        </div>
        <div class="last-space"></div>
        <div class="bottom-block fc-gray">
          <div class="flex-row flex-center">
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
    </div>
  </div>
</template>
<style scoped>
.logo {
  width: 167px;
  margin-top: 37px;
  margin-bottom: 50px;
}
.universitybox {
  width: 150px;
  height: 305px;
  padding: 12px 16px;
  box-shadow: 0px 0px 14px 1px rgba(3, 134, 148, 0.04);
  border-radius: 15px;
}

.universitybox2 {
  box-shadow: 0px 0px 14px 1px #048695;
}
.universitybox .uni-logo {
  width: 120px;
  height: 120px;
  margin: 27px;
}
.vslogo {
  margin-top: 16px;
  margin-bottom: 16px;
  width: 60px;
  height: 60px;
}
.jiange {
  width: 60px;
}
.success {
  width: 200px;
}
</style>
