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
const memberinfo = { mobile: 13751082562, score: 0.5, credit: 345 }
const isdianping = ref(true)
</script>
<template>
  <div>
    <div v-if="resource != null && inst != null">
      <div class="bg-gray min-wh100">
        <div class="bg-primary">
          <div class="flex-row">
            <div class="flex-1"></div>
            <div class="section-block">
              <div class="flex-row flex-center memberinfo">
                <div class="memberphoto"></div>
                <div class="flex-1 margin-left-15 margin-right-15">
                  <div class="f-18 fw-bold fc-white">{{ memberinfo.mobile }}</div>
                  <div class="flex-row margin-top-11">
                    <div class="databox fc-white fw-400 f-13 flex-row flex-center margin-right-15">
                      实力: {{ memberinfo.score }}
                    </div>
                    <div class="databox fc-white fw-400 f-13 flex-row flex-center">
                      信用: {{ memberinfo.credit }}
                    </div>
                  </div>
                </div>
                <div class="logout">
                  <img class="wh-30" :src="uploadpath + 'resource/' + resource.logout" />
                </div>
              </div>
            </div>
            <div class="flex-1"></div>
          </div>
        </div>
        <div class="flex-row flex-center">
          <div class="flex-1 text-center f-18 fw-cold fc-black tabitem" @click="isdianping = true">
            <div>点评记录</div>
            <div class="flex-row margin-top-7">
              <div class="flex-1"></div>
              <div class="bx" :class="{ active: isdianping == true }"></div>
              <div class="flex-1"></div>
            </div>
          </div>
          <div class="flex-1 text-center f-18 fw-cold fc-black tabitem" @click="isdianping = false">
            <div>搜索记录</div>
            <div class="flex-row margin-top-7">
              <div class="flex-1"></div>
              <div class="bx" :class="{ active: isdianping == false }"></div>
              <div class="flex-1"></div>
            </div>
          </div>
        </div>
        <div class="flex-row">
          <div class="flex-1"></div>
          <div class="section-block">
            <div v-if="isdianping == true"></div>
            <div v-if="isdianping == false"></div>
          </div>
          <div class="flex-1"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.memberinfo {
  margin-top: 44px;
  margin-bottom: 55px;
}
.memberphoto {
  width: 66px;
  height: 66px;
  background: #ffffff;
  border-radius: 50%;
}
.databox {
  height: 22px;
  background: linear-gradient(-57deg, #00474f 0%, #006874 100%);
  border-radius: 0px 7px 7px 7px;
  padding-left: 10px;
  padding-right: 10px;
}
.bx {
  width: 22px;
  height: 2px;
  border-radius: 1px;
}
.bx.active {
  background: #068594;
}
.tabitem {
  padding-top: 18px;
  padding-bottom: 18px;
}
</style>
