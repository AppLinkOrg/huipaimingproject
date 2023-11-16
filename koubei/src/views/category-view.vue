<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import Config from '../httphelper/Config'
import { HttpHelper } from '../httphelper/HttpHelper'
const route = useRoute();
const router = useRouter();
const uploadpath = Config.UploadPath
const resource = ref(null)
HttpHelper.Post('inst/resources').then((data) => {
  resource.value = data
})
const inst = ref(null)
HttpHelper.Post('inst/info').then((data) => {
    inst.value = data
})
const gotoKoubei=()=>{
    router.push('/login');
};
</script>
<template>
  <div>
    <div v-if="resource != null&&inst != null">
      <div class="flex-row">
        <div class="flex-1"></div>
        <img class="logo margin-49" :src="uploadpath + 'resource/' + resource.logo" />
        <div class="flex-1"></div>
      </div>
      <div class="flex-row">
        <div class="flex-1"></div>
        <div>
          <div class="card-section margin-49">
            <div class="fw-500 f-29 fc-white">国内版</div>
            <div class="fw-400 f-22 fc-white margin-14">Domestic Version</div>
          </div>
          <div class="card-section margin-22">
            <div class="fw-500 f-29 fc-white">国际版</div>
            <div class="fw-400 f-22 fc-white margin-14">International Version</div>
          </div>
          <div class="card-section margin-22" @click="gotoKoubei()">
            <div class="fw-500 f-29 fc-white">口碑版</div>
            <div class="fw-400 f-22 fc-white margin-14">Word-of-mouth Version</div>
          </div>
        </div>
        <div class="flex-1"></div>
      </div>
      <div class="flex-row">
        <div class="flex-1"></div>
        <div>
            <div class="margin-49 "><span class="fc-gray f-12">{{ inst.banquan2 }}</span></div>
        </div>
        <div class="flex-1"></div>
      </div>
      <div class="flex-row">
        <div class="flex-1"></div>
        <div>
            <div><a :href="inst.icp_link" target="_blank" class="margin-11 fc-primary f-12">{{ inst.banquan }}</a></div>
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
