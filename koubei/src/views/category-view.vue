<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import Config from '../httphelper/Config'
import { HttpHelper } from '../httphelper/HttpHelper'
import { onMounted } from 'vue'
import { Utils } from '../utils/Utils'

const route = useRoute()
const router = useRouter()
const uploadpath = Config.UploadPath
const resource = ref(null)
HttpHelper.Post('inst/resources').then((data) => {
  resource.value = data
})
const inst = ref(null)
HttpHelper.Post('inst/info').then((data) => {
  inst.value = data
})
const member = ref(null)
HttpHelper.Post('member/info').then((data) => {
  member.value = data
})
const gotoKoubei = () => {
  HttpHelper.Post('member/info').then((data) => {
    if (data != null) {
      router.push('/home')
    } else {
      router.push('/login')
    }
  })
}
var pagesection = ref()
onMounted(() => {
  console.log('pagesection', pagesection.value)
  pagesection.value.style.height = Utils.getAdjustedPageHeight() + 'px'
  route.meta.title = '汇排名'
})
const gotoGuonei = () => {
  HttpHelper.Post('member/info').then((data) => {
    if (data != null) {
      window.location.href = inst.value.guoneiurl + '/settoken.html?token=' + data.token
    } else {
      router.push('/login?type=guoneiurl')
    }
  })
}
const gotoGuoji = () => {
  HttpHelper.Post('member/info').then((data) => {
    if (data != null) {
      window.location.href = inst.value.guojiurl + '/settoken.html?token=' + data.token
    } else {
      router.push('/login?type=guojiurl')
    }
  })
}
</script>
<template>
  <div></div>
  <div class="flex-column" ref="pagesection">
    <div class="flex-1">
      <div v-if="resource != null && inst != null">
        <div class="flex-row">
          <div class="flex-1"></div>
          <img class="logo margin-top-49" :src="uploadpath + 'resource/' + resource.logo" />
          <div class="flex-1"></div>
        </div>
        <div class="flex-row">
          <div class="flex-1"></div>
          <div>
            <div class="card-section margin-top-49" @click="gotoGuonei()">
              <div class="fw-500 f-29 fc-white">{{ inst.guoneizh }}</div>
              <div class="fw-400 f-22 fc-white margin-top-14">{{inst.guoneien}}</div>
            </div>
            <div class="card-section margin-top-22" @click="gotoGuoji()">
              <div class="fw-500 f-29 fc-white">{{ inst.guojizh }}</div>
              <div class="fw-400 f-22 fc-white margin-top-14">{{inst.guojien}}</div>
            </div>
            <div class="card-section margin-top-22" @click="gotoKoubei()">
              <div class="fw-500 f-29 fc-white">{{ inst.koubeizh }}</div>
              <div class="fw-400 f-22 fc-white margin-top-14">{{inst.koubeien}}</div>
            </div>
          </div>
          <div class="flex-1"></div>
        </div>
      </div>
    </div>
    <div class="bottom-block"  v-if="inst!=null">
      <div class="flex-row">
        <div class="flex-1"></div>
        <div>
          <div class="margin-top-49">
            <span class="fc-gray f-12">{{ inst.banquan2 }}</span>
          </div>
        </div>
        <div class="flex-1"></div>
      </div>
      <div class="flex-row">
        <div class="flex-1"></div>
        <div>
          <div>
            <a :href="inst.icp_link" target="_blank" class="margin-top-11 fc-primary f-12">{{
              inst.banquan
            }}</a>
          </div>
        </div>
        <div class="flex-1"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.logo {
  width: 124px;
}
.card-section {
  width: 355px;
  height: 130px;
  background: #048695;
  border-radius: 15px;
  padding-top: 30px;
  padding-left: 30px;
}
</style>
