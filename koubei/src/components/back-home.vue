<template>
    <van-image v-if="resource != null && inst != null"
        :src="uploadpath + 'resource/' + resource.fanhuishouye"
        @click="gohome"
        class="homeicon"
      ></van-image>
</template>
<script setup>
import { ref } from "@vue/reactivity";
import { HttpHelper } from '../httphelper/HttpHelper'
import { useRouter, useRoute } from "vue-router";
import { Utils } from '../utils/Utils'
import Config from '../httphelper/Config'

let page = ref({});
let router = useRouter();
let route = useRoute();
const uploadpath = Config.UploadPath
const resource = ref(null)
const gohome = () => {
    router.push('/home')
}
HttpHelper.Post('inst/resources').then((data) => {
  resource.value = data
})
const inst = ref(null)
HttpHelper.Post('inst/info').then((data) => {
  inst.value = data
})

</script>
<style scoped>

.homeicon {
  width: 77px;
  height: 78px;
  position: fixed !important;
  right: 0;
  bottom: 80px;
  z-index: 100;
}
</style>