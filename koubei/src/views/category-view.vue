<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import Config from '../httphelper/Config'
import { HttpHelper } from '../httphelper/HttpHelper'
import { onMounted } from 'vue'
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
  if (member.value == null) {
    router.push('/login')
  } else {
    router.push('/home')
  }
}
onMounted(() => {
  route.meta.title = '汇排名'
})
const gotoGuonei=()=>{
  if (member.value == null) {
    router.push('/login?type=guoneiurl')
  } else {
    window.location.href=inst.value.guoneiurl
  }
}
const gotoGuoji=()=>{
  if (member.value == null) {
    router.push('/login?type=guojiurl')
  } else {
    window.location.href=inst.value.guojiurl
  }
}
</script>
<template>
  <div>
    <div v-if="resource != null && inst != null">
      <div class="flex-row">
        <div class="flex-1"></div>
        <img class="logo margin-top-49" :src="uploadpath + 'resource/' + resource.logo" />
        <div class="flex-1"></div>
      </div>
      <div class="flex-row">
        <div class="flex-1"></div>
        <div>
          <div class="card-section margin-top-49"   @click="gotoGuonei()">
            <div class="fw-500 f-29 fc-white">国内版</div>
            <div class="fw-400 f-22 fc-white margin-top-14">Domestic Version</div>
          </div>
          <div class="card-section margin-top-22"  @click="gotoGuoji()">
            <div class="fw-500 f-29 fc-white">国际版</div>
            <div class="fw-400 f-22 fc-white margin-top-14">International Version</div>
          </div>
          <div class="card-section margin-top-22" @click="gotoKoubei()">
            <div class="fw-500 f-29 fc-white">口碑版</div>
            <div class="fw-400 f-22 fc-white margin-top-14">Word-of-mouth Version</div>
          </div>
        </div>
        <div class="flex-1"></div>
      </div>
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
  height: 169px;
  background: #048695;
  border-radius: 15px;
  padding-top: 56px;
  padding-left: 30px;
}
</style>
