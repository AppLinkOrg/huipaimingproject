<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch, defineProps, onMounted } from 'vue'
import Config from '../httphelper/Config'
import { HttpHelper } from '../httphelper/HttpHelper'
import { VueEcharts } from 'vue3-echarts'
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
var keycode = route.params.keycode
var info = ref({})
HttpHelper.Post('content/get', { keycode }).then((data) => {
  route.meta.title = data.name
  data.content = Utils.HtmlDecode(data.content)
  info.value = data
})
var pagesection = ref()
onMounted(() => {
  console.log('pagesection', pagesection.value)
  pagesection.value.style.height = Utils.getAdjustedPageHeight() + 'px'
})
</script>
<template>
  <div>
    <div>
      <van-nav-bar :title="info.name" left-arrow fixed @click-left="onNavClickLeft" />
      <div class="flex-column  bg-primary" ref="pagesection" >
        <div class="flex-1" >
          <div class="min-wh100"  v-if="resource != null && inst != null && info != null">
            <div class="flex-row">
              <div class="flex-1"></div>
              <div class="section-block margin-top-22">
                <div
                  class="white-block section-padding bg-white margin-top-49"
                  v-html="info.content"
                ></div>
              </div>
              <div class="flex-1"></div>
            </div>
          </div>
        </div>
        <div  > 
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.white-block {
  border-radius: 18px;
  min-height: 400px;
}
</style>
