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
  data.operator = Utils.HtmlDecode(data.operator)
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
const isdianping = ref(true)
const dianpinglist = ref([])
HttpHelper.Post('member/dianpinglist').then((data) => {
  dianpinglist.value = data
})

const searchlist = ref([])
HttpHelper.Post('member/searchrecordlist').then((data) => {
  searchlist.value = data
})

const logout = () => {
  localStorage.removeItem('token')
  router.push('/')
}
const showInfo=ref(false)
const closeShowInfo=()=>{
  showInfo.value=false;
}
</script>
<template>
  <div>
    <van-nav-bar title="个人中心" left-arrow fixed @click-left="onNavClickLeft" />
    <van-overlay :show="showInfo" @click="closeShowInfo()">
        <div class="wrapper">
          <div class="infoblock">
            <div v-html="inst.operator"></div>
          </div>
        </div>
      </van-overlay>
    <div v-if="resource != null && inst != null">
      <div class="bg-gray min-wh100">
        <div class="pk">
          <div class="bg-primary">
            <div class="flex-row">
              <div class="flex-1"></div>
              <div class="section-block margin-top-49">
                <div class="flex-row flex-center memberinfo">
                  <img class="memberphoto"  :src="uploadpath + 'inst/' + inst.logo" />
                  <div class="flex-1 margin-left-15 margin-right-15">
                    <div class="flex-row flex-center">
                      <div class="f-18 fw-bold fc-white">{{ member.mobile }}</div>
                      <img @click="showInfo=true" class="margin-left-15 wh-20" :src="uploadpath + 'resource/' + resource.info2" />
                    </div>
                    <div class="flex-row margin-top-11">
                      <div class="databox fc-white fw-400 f-13 flex-row flex-center margin-right-15">
                        积分: {{ member.jifen }}
                      </div>
                      <div class="member fc-white fw-400 f-13 flex-row flex-center">
                        信用: {{ member.credit }}
                      </div>
                    </div>
                  </div>
                  <div class="logout" @click="logout">
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
              <div v-if="isdianping == true">
                <block v-for="(item, index) in dianpinglist" :key="index">
                  <div class="dianpingbox bg-white margin-bottom-18">
                    <div class="flex-row flex-center fc-black">
                      <div class="flex-1 margin-right-15">
                        <div class="f-13 fw-500">{{ item.time_formatting }}</div>
                        <div
                          class="f-15 fw-bold margin-top-18"
                          :class="{ 'fc-primary': item.num1 == 1 }"
                        >
                          {{ item.r_daxue1_name }} 
                          <img v-if="item.num1 == 1" class="wh-20" :src="uploadpath + 'resource/' + resource.thumb" />
                        </div>
                        <div
                          class="f-15 fw-bold margin-top-18"
                          :class="{ 'fc-primary': item.num2 == 1 }"
                        >
                          {{ item.r_daxue_name }}
                          <img v-if="item.num2 == 1" class="wh-20" :src="uploadpath + 'resource/' + resource.thumb" />
                        </div>
                      </div>
                      <div>
                        <img class="wh-50" :src="uploadpath + 'resource/' + resource.vs" />
                      </div>
                    </div>
                  </div>
                </block>
              </div>
              <div v-if="isdianping == false">
                <div class="searchbox bg-white">
                  <block v-for="(item, index) in searchlist" :key="index">
                    <div
                      class="flex-row flex-center"
                      :class="{ item: index + 1 < searchlist.length }"
                    >
                      <div class="flex-1 margin-right-15 fc-black f-15 fw-bold">
                        {{ item.r_daxue_name }}
                      </div>
                      <div class="fc-black f-13 fw-400">{{ item.op_time_formatting }}</div>
                    </div>
                  </block>
                </div>
              </div>
            </div>
            <div class="flex-1"></div>
          </div>
        </div>
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
.dianpingbox {
  border-radius: 7px;
  padding: 18px 15px;
}
.dianpingbox .vslogo {
  width: 50px;
  height: 50px;
}
.searchbox {
  border-radius: 7px;
  padding: 29px 22px;
}
.searchbox .item {
  margin-bottom: 29px;
}
.pk {
  min-height: calc( 100vh - 62px );
}
</style>
