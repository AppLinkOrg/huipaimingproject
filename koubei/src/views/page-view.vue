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
import { Utils } from '../utils/Utils'

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

var pagesection = ref()
onMounted(() => {
  console.log('pagesection', pagesection.value)
  pagesection.value.style.height = Utils.getAdjustedPageHeight() + 'px'
})
</script>
<template>
  <div class="flex-column" ref="pagesection" >
    <div class="flex-1" >
      <div class="pk">this is pk</div>
    </div>
    <div  >
        second
    </div>
  </div>
</template>
<style scoped>
.bt {
  background-color: aqua;
  position: absolute;
  bottom: 0;
  width: 30px;
  height: 30px;
}
</style>
