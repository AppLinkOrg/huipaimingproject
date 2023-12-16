<script setup>
import '../styles/index.css' // 引入 Vant 样式
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
onMounted(() => {})
HttpHelper.Post('inst/resources').then((data) => {
  resource.value = data
})
const inst = ref(null)
HttpHelper.Post('inst/info').then((data) => {
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
var id = route.params.id
HttpHelper.Post('daxue/addremen', { name: id })

const formatDate = (date) => {
  // Implement your own date formatting logic here
  return `${date[0]}-${date[1]}-${date[2]}`
}
var info = ref({})
const minop = ref(['2021', '01', '01'])
const maxop = ref(['2021', '01', '01'])
HttpHelper.Post('daxue/daxueinfo', { id }).then((data) => {
  route.meta.title = data.name
  data.content = Utils.HtmlDecode(data.content)
  var vmin = new Date(data.minop)
  var vmax = new Date(data.maxop)
  data.minop = new Date(data.minop)
  data.maxop = new Date(data.maxop)
  info.value = data

  minop.value = [vmin.getFullYear(), vmin.getMonth() + 1, vmin.getDate()]
  maxop.value = [vmax.getFullYear(), vmax.getMonth() + 1, vmax.getDate()]

  loaddaxueyear()
})
const loaddaxueyear = () => {
  var startdate = formatDate(minop.value)
  var enddate = formatDate(maxop.value)
  HttpHelper.Post('daxue/daxueyear', { daxue_id: id, startdate, enddate, orderby: 'year' }).then(
    (data) => {
      var years = []
      var ranks = []
      for (var i = 0; i < data.length; i++) {
        years.push(data[i].op_time)
        ranks.push(data[i].rank)
      }
      option.value = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        xAxis: {
          type: 'category',
          data: years
        },
        yAxis: {
          axisLabel: {
            margin: 30,
            fontSize: 16,
            formatter: '#{value}'
          },
          type: 'value'
        },
        series: [
          {
            data: ranks,
            type: 'line'
          }
        ]
      }
    }
  )
}
var option = ref(null)
var option2 = ref(null)

HttpHelper.Post('daxue/top', { id: id }).then((list) => {
  //pklist.value=list;
  if (list.length == 0) {
    return
  }
  var data = Utils.GetPKData(list)
  var links = Utils.GetPKLinks(list)
  option2.value = {
    title: {},
    tooltip: {
      formatter: function(params) {
        console.log("formatter",params)
        return (
          params.data.duibi.duibi.name
          +"<div style='width:100px;white-space:normal !important;'><p style='width:100px;word-wrap: break-word;overflow-wrap: break-word;'>"+params.data.duibi.duibi.name1+"</p>"
          +"<p style='width:100px;word-wrap: break-word;overflow-wrap: break-word;'>当前排名："+params.data.duibi.duibi.ranking+"</p>"
          +"<p style='word-wrap: break-word;overflow-wrap: break-word;'>投票数："+params.data.duibi.ordershop+"</p>"
          +"<p style='word-wrap: break-word;overflow-wrap: break-word;'>本校："+params.data.duibi.bendian+"</p></div>"
        );
      }
    },
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        type: 'graph',
        layout: 'none',
        symbolSize: 52,
        //设置缩放
        roam: false,
        label: {
          show: true
        },
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 10],
        edgeLabel: {
          fontSize: 10
        },
        itemStyle: {
          normal: {
            color: function (params) {
              if (params.name == '本校') {
                return '#F7AF12'
              } else if (
                list[10].ranking != 0 &&
                list[10].ranking == list[params.dataIndex - 1].id
              ) {
                // console.log(list);
                return '#999999'
              } else {
                return '#048695'
              }
            }
          }
        },
        // color:'#B1AE58',
        data: data,
        links: links,
        lineStyle: {
          // color:'#3358fb',
          opacity: 0.9,
          // width: 2,
          curveness: 0
        }
      }
    ]
  }
})
const duibi = ref(null)
const bendiannum = ref(0)
const ordershopnum = ref(0)
const clickoption2 = (aa) => {
  console.log('clickoption2', aa)
  if (aa.data.duibi != undefined) {
    console.log('duibi', aa.data.duibi.duibi)
    duibi.value = aa.data.duibi.duibi
    bendiannum.value = aa.data.duibi.bendian
    ordershopnum.value = aa.data.duibi.ordershop
  }
}
const isrank = ref(true)
const gotoinfo = () => {
  router.push('/university-info/' + id)
}
const showMinPicker = ref(false)
const showMaxPicker = ref(false)

const onConfirmMin = (date) => {
  checkpk()
  showMinPicker.value = false
}

const onConfirmMax = (date) => {
  checkpk()
  showMaxPicker.value = false
}
const checkpk = () => {
  var v1 =
    parseInt(minop.value[0]) * 10000 + parseInt(minop.value[1]) * 100 + parseInt(minop.value[2])
  var v2 =
    parseInt(maxop.value[0]) * 10000 + parseInt(maxop.value[1]) * 100 + parseInt(maxop.value[2])
  console.log('checkpk', v1, v2)
  if (v1 > v2) {
    var t = minop.value
    var t2 = maxop.value
    minop.value = t2
    maxop.value = t
  }
  loaddaxueyear()
}
const showInfo = ref(false)
const closeShowInfo = () => {
  showInfo.value = false
}

const keyword = ref('')
const searchlist = ref([])
var insearch = false
var showresultbox = ref(false)
const search = () => {
  if (insearch == true) {
    return
  }
  showresultbox.value = true
  if (keyword.value.trim() == '') {
    keyword.value = ''
    searchlist.value = []
    return
  }
  insearch = true
  HttpHelper.Post('daxue/daxuelist', {
    keywords: keyword.value,
    limit: '0,5'
  }).then((daxuelist) => {
    insearch = false
    searchlist.value = daxuelist
    // if (daxuelist.length == 0) {
    //   showToast("搜索结果不存在，请检查关键字")
    //   showDialog({
    //     title: '提示',
    //     message: '搜索结果不存在，请检查关键字',
    //     confirmButtonText:"确认"
    //   })
    // }
  })
}
const addsearchresult = (duibi_id) => {
  showresultbox.value = false
  HttpHelper.Post('daxue/duibi', {
    id,
    duibi_id
  }).then((dd) => {
    duibi.value = dd
    keyword.value = dd.name
  })
}
</script>
<template>
  <div>
    <div class="hw100" v-if="showresultbox" @click="showresultbox = false"></div>
    <div v-if="resource != null && inst != null && info != null">
      <van-nav-bar :title="info.name" left-arrow fixed @click-left="onNavClickLeft" />
      <van-popup v-if="showMinPicker" v-model:show="showMinPicker" position="bottom">
        <van-date-picker
          v-model="minop"
          :min-date="info.minop"
          :max-date="info.maxop"
          @confirm="onConfirmMin"
          @cancel="showMinPicker = false"
        />
      </van-popup>
      <van-popup v-if="showMaxPicker" v-model:show="showMaxPicker" position="bottom">
        <van-date-picker
          v-model="maxop"
          :min-date="info.minop"
          :max-date="info.maxop"
          @confirm="onConfirmMax"
          @cancel="showMaxPicker = false"
        />
      </van-popup>
      <van-overlay :show="showInfo" @click="closeShowInfo()">
        <div class="wrapper">
          <div class="infoblock">
            <div class="f-19 fw-bold">{{ info.name }}</div>
            <div class="f-19 margin-top-14">{{ info.name1 }}</div>
            <div class="f-13 margin-top-14">
              区域/大洲：{{ info.diqu_name }}
            </div>
            <div class="f-13 margin-top-14">
              国家/地区：{{ info.guojia_name }}
            </div>
          </div>
        </div>
      </van-overlay>
      <div class="min-wh100 bg-primary">
        <div class="flex-row">
          <div class="flex-1"></div>
          <div class="section-block">
            <div class="white-block section-padding bg-white margin-top-49">
              <div class="flex-row flex-center">
                <div class="flex-1">
                  <div class="fc-black fw-500 f-18">{{ info.name }}</div>
                  <div class="fc-gray fw-400 f-15 margin-top-11">{{ info.name1 }}</div>
                </div>
                <div class="margin-left-15" @click="showInfo = true">
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
                <div id="timerank" ref="echart" v-if="option != null">
                  <div class="text-center flex-row flex-center">
                    <div class="flex-1"></div>
                    <div class="margin-right-15 margin-left-15">从</div>
                    <van-button
                      type="primary"
                      size="mini"
                      :color="Config.PrimaryColor"
                      @click="showMinPicker = true"
                      >{{ formatDate(minop) }}</van-button
                    >
                    <div class="margin-right-15 margin-left-15">到</div>
                    <van-button
                      type="primary"
                      size="mini"
                      :color="Config.PrimaryColor"
                      @click="showMaxPicker = true"
                      >{{ formatDate(maxop) }}</van-button
                    >
                    <div class="flex-1"></div>
                  </div>
                  <vue-echarts :option="option" style="height: 500px" ref="chart" />
                </div>
              </div>
              <div class="section-padding" v-if="isrank == false">
                <div id="timerank" ref="echart" v-if="option2 != null">
                  <vue-echarts :option="option2" style="height: 300px" ref="chart2" />
                </div>
                <div id="timerank" ref="echart" v-if="option2 == null">暂无PK数据</div>
              </div>
            </div>
            <div
              class="white-block section-padding bg-white margin-top-22"
              v-if="isrank == false && option2 != null"
            >
              <div class="flex-row flex-center">
                <div class="flex-1 f-18 fc-black fw-bold">{{ info.name }}</div>
                <div class="vs">VS</div>
                <div class="flex-1 f-18 fc-primary fw-bold text-right">
                  <input
                    placeholder="请输入学校名字"
                    v-model="keyword"
                    @update:model-value="search"
                  />
                </div>
              </div>
              <div
                class="searchtipbox"
                v-if="showresultbox == true && searchlist.length > 0"
                id="searchid2"
              >
                <block v-for="(item, index) in searchlist" :key="index">
                  <div
                    v-if="item.name != info.name"
                    class="padding-s"
                    @click="addsearchresult(item.id)"
                  >
                    {{ item.name }}
                  </div>
                </block>
              </div>
              <div
                class="searchtipbox"
                v-if="showresultbox == true && searchlist.length == 0"
                id="searchid3"
              >
                <div class="padding-s">没有相关数据</div>
              </div>
              <div class="flex-row flex-center text-center">
                <div class="">
                  <img class="wh-88" :src="uploadpath + 'daxue/' + info.logo" />
                </div>
                <div class="flex-1 text-center">
                  <div>{{ duibi == null ? '' : duibi.benxiao }}</div>
                  <div class="arrow-container arrow-right">
                    <div class="arrow-line"></div>
                    <div class="arrow-head"></div>
                  </div>
                  <div>{{ duibi == null ? '' : duibi.duibi }}</div>
                  <div class="arrow-container arrow-left">
                    <div class="arrow-head"></div>
                    <div class="arrow-line arrow-line-left"></div>
                  </div>
                </div>
                <div class="">
                  <img
                    v-if="duibi != null"
                    class="wh-88"
                    :src="uploadpath + 'daxue/' + duibi.logo"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="flex-1"></div>
        </div>
        <div class="last-space"></div>
        <div class="bottom-block fc-white bg-primary">
          <div class="flex-row flex-center">
            <div class="flex-1"></div>
            <div class="text-center">
              <div>
                <RouterLink class="fc-white" to="/content/aboutus">关于我们</RouterLink> 丨
                <RouterLink class="fc-white" to="/feedback">意见反馈</RouterLink>
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
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  padding: 20px;
  width: 320px;
  min-height: 450px;
  background-color: #fff;
  border-radius: 20px;
}

.searchtipbox {
  text-align: right;
  left: 150px;
  position: absolute;
  width: 220px;
  border-radius: 0 0 10px 10px;
  border: 1px solid #048693;
  border-top: none;
  overflow: scroll;
  background: #ffffff;
  z-index: 2;
  padding-bottom: 10px;
  z-index: 101;
}
.padding-s {
  color: black;
  padding: 5px 10px;
  font-size: 16px;
}
.hw100 {
  width: 100vw;
  height: 100vh;
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
}
input {
  width: 100%;
  text-align: right;
  text-align: right;
  border: none; /* 移除边框样式 */
  outline: none; /* 移除默认的轮廓样式 */
}
input::placeholder {
  font-size: 14px; /* 可以根据需要调整字体大小 */
}
.infoblock {
  min-width: 237px;
  padding: 27px 15px;
  background: #ffffff;
  border-radius: 17px;
}
</style>
