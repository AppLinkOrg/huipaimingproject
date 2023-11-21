<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch, defineProps, onMounted } from 'vue'
import Config from '../httphelper/Config'
import { HttpHelper } from '../httphelper/HttpHelper'
import { VueEcharts } from 'vue3-echarts'

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
var id = route.params.id

var info = { name: '麻省理工', name1: 'Massachusetts Institute of Technology' }
</script>
<template>
  <div>
    <div v-if="resource != null && inst != null">
      <div class="min-wh100 bg-primary">
        <div class="flex-row">
          <div class="flex-1"></div>
          <div class="section-block"></div>
          <div class="flex-1"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
