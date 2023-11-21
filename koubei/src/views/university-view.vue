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
var option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
}
var option2 = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]
}
var info = { name: '麻省理工', name1: 'Massachusetts Institute of Technology' }
const isrank = ref(true)
</script>
<template>
  <div>
    <div v-if="resource != null && inst != null">
      <div class="min-wh100 bg-primary">
        <div class="flex-row">
          <div class="flex-1"></div>
          <div class="section-block">
            <div class="white-block section-padding bg-white margin-top-49">
              <div class="flex-row flex-center">
                <div>
                  <div class="fc-black fw-500 f-18">{{ info.name }}</div>
                  <div class="fc-gray fw-400 f-15 margin-top-11">{{ info.name1 }}</div>
                </div>
                <div class="margin-left-15">
                  <img class="wh-20" :src="uploadpath + 'resource/' + resource.info" />
                </div>
              </div>
            </div>
            <div class="c-block bg-white margin-top-14">
              <div
                class="flex-row flex-center tab f-18 fw-bold fc-black"
                :class="{ tab2: isrank == false }"
              >
                <div class="flex-1 text-center" @click="isrank = true">排名</div>
                <div class="flex-1 text-center" @click="isrank = false">P K</div>
              </div>
              <div class="section-padding" v-if="isrank == true">
                <div id="timerank" ref="echart">
                  <vue-echarts :option="option" style="height: 500px" ref="chart" />
                </div>
              </div>
              <div class="section-padding" v-if="isrank == false">
                <div id="timerank" ref="echart">
                  <vue-echarts :option="option2" style="height: 250px" ref="chart2" />
                </div>
              </div>
            </div>
            <div class="white-block section-padding bg-white margin-top-22" v-if="isrank == false">
              <div class="flex-row flex-center">
                <div class="flex-1 f-18 fc-black fw-bold">{{ info.name }}</div>
                <div class="vs">VS</div>
                <div class="flex-1 f-18 fc-primary fw-bold text-right">请选择学校PK</div>
              </div>
              <div class="flex-row flex-center text-center">
                <div class="">
                  <img class="wh-88" :src="uploadpath + 'resource/' + resource.masheng" />
                </div>
                <div class="flex-1 text-center">
                  <div>2039</div>
                  <div class="arrow-container arrow-right">
                    <div class="arrow-line"></div>
                    <div class="arrow-head"></div>
                  </div>
                  <div>378</div>
                  <div class="arrow-container arrow-left">
                    <div class="arrow-head"></div>
                    <div class="arrow-line arrow-line-left"></div>
                  </div>
                </div>
                <div class="">
                  <img class="wh-88" :src="uploadpath + 'resource/' + resource.masheng" />
                </div>
              </div>
            </div>
          </div>
          <div class="flex-1"></div>
        </div>
      </div>
      <div class="last-space"></div>
      <div class="bottom-block fc-white">
        <div class="flex-row flex-center">
          <div class="flex-1"></div>
          <div class="text-center">
            <div>
              <RouterLink class="fc-white" to="/content/aboutus">关于我们</RouterLink> 丨
              <RouterLink class="fc-white" to="/content/feedback">意见反馈</RouterLink>
            </div>
            <div class="margin-top-5">
              <span class="f-12">{{ inst.banquan2 }}</span>
            </div>
          </div>
          <div class="flex-1"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.white-block {
  border-radius: 18px;
}
.c-block {
  border-radius: 18px;
}
.tab {
  height: 52px;
  background-size: 100% 100%;
  background-image: url(http://applinkupload.oss-cn-shenzhen.aliyuncs.com/alucard263096/huipaimingkoube/resource/da278e4b6059d29e03f30d04f8bb5ac1_231121031607_1119226077.png);
}
.tab2 {
  background-image: url(http://applinkupload.oss-cn-shenzhen.aliyuncs.com/alucard263096/huipaimingkoube/resource/d4789b7f397c42f6b5754f5b4b4095c2_231121033155_302015784.png);
}
.vs {
  font-size: 26px;
  font-weight: bold;
  color: #f7af12;
}
.wh-88 {
  width: 88px;
  height: 88px;
}
.arrow-container {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 20px; /* 调整箭头和横线之间的间距 */
}

.arrow-line {
  margin-left: 20px;
  width: 80px;
  height: 2px; /* 调整横线的高度 */
  background-color: black; /* 横线颜色 */
}

.arrow-head {
  width: 0;
  height: 0;
  border-style: solid;
  position: relative;
}
.arrow-line-left {
  margin-left: 0px;
}

.arrow-right .arrow-head {
  border-width: 5px 0 5px 10px; /* 调整右箭头的三角形大小 */
  border-color: transparent transparent transparent black; /* 透明部分是三角形 */
  margin-right: 10px; /* 调整箭头和横线之间的间距 */
}

.arrow-left .arrow-head {
  border-width: 5px 10px 5px 0; /* 调整左箭头的三角形大小 */
  border-color: transparent black transparent transparent; /* 透明部分是三角形 */
  margin-left: 15px;
}
</style>
