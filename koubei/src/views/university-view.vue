<script setup>
import '../styles/index.css'; // 引入 Vant 样式
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
const onNavClickLeft=()=>{
  router.back();
}
onMounted(()=>{
});
HttpHelper.Post('inst/resources').then((data) => {
  resource.value = data
})
const inst = ref(null)
HttpHelper.Post('inst/info').then((data) => {
  inst.value = data
})

const member = ref(null)
HttpHelper.Post('member/info').then((data) => {
  if(data==null){
    router.push("/login")
    return;
  }
  member.value = data
})
var id = route.params.id
HttpHelper.Post('daxue/addremen',{name:id});


var info = ref({})
HttpHelper.Post('daxue/daxueinfo',{id}).then((data) => {
  route.meta.title=data.name;
  info.value = data
})
var option=ref(null);
HttpHelper.Post('daxue/daxueyear',{daxue_id:id,orderby:"year"}).then((data) => {
  var years=[];
  var ranks=[];
  for(var i=0;i<data.length;i++){
    years.push(data[i].op_time);
    ranks.push(data[i].rank);
  }
  option.value={
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
  };
});
var option2=ref(null);
HttpHelper.Post('daxue/top',{id:id}).then((list) => {
  option2.value={
        title: {},
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            type: "graph",
            layout: "none",
            symbolSize: 52,
            //设置缩放
            roam: false,
            label: {
              show: true,
            },
            edgeSymbol: ["circle", "arrow"],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              fontSize: 10,
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  if (params.name == "本校") {
                    return "#B1AE58";
                  } else if (
                    list[10].ranking != 0 &&
                    list[10].ranking == list[params.dataIndex - 1].id
                  ) {
                    // console.log(list);
                    return "#999999";
                  } else {
                    return "#3358fb";
                  }
                },
              },
            },
            // color:'#B1AE58',
            data: [
              {
                name: "本校",
                x: 0,
                y: 0,
              },
              {
                name: "TOP 1",
                x: 100,
                y: 0,
                duibi:list[0]
              },
              {
                name: "TOP 2",
                x: 80.9,
                y: 58.78,
                duibi:list[1]
              },
              {
                name: "TOP 3",
                x: 30.9,
                y: 95.11,
                duibi:list[2]
              },
              {
                name: "TOP 4",
                x: -30.9,
                y: 95.11,
                duibi:list[3]
              },
              {
                name: "TOP 5",
                x: -80.9,
                y: 58.78,
                duibi:list[4]
              },
              {
                name: "TOP 6",
                x: -100,
                y: 0,
                duibi:list[5]
              },
              {
                name: "TOP 7",
                x: -80.9,
                y: -58.78,
                duibi:list[6]
              },
              {
                name: "TOP 8",
                x: -30.9,
                y: -95.11,
                duibi:list[7]
              },
              {
                name: "TOP 9",
                x: 30.9,
                y: -95.11,
                duibi:list[8]
              },
              {
                name: "TOP 10",
                x: 80.9,
                y: -58.78,
                duibi:list[9]
              },
            ],
            links: [
              {
                source: "TOP 1",
                target: "本校",
                lineStyle: {
                  curveness: 0.15,
                  color: "#3358fb",
                  width: 4,
                },
                label: {
                  show: true,
                  formatter: list[0].ordershop,
                },
              },
              {
                source: "TOP 2",
                target: "本校",
                lineStyle: {
                  curveness: 0.15,
                  color: "#3358fb",
                  width: 4,
                },
                label: {
                  show: true,
                  formatter: list[1].ordershop,
                },
              },
              {
                source: "TOP 3",
                target: "本校",
                lineStyle: {
                  curveness: 0.15,
                  color: "#3358fb",
                  width: 4,
                },
                label: {
                  show: true,
                  formatter: list[2].ordershop,
                },
              },
              {
                source: "TOP 4",
                target: "本校",
                lineStyle: {
                  curveness: 0.15,
                  color: "#3358fb",
                  width: 4,
                },
                label: {
                  show: true,
                  formatter: list[3].ordershop,
                },
              },
              {
                source: "TOP 5",
                target: "本校",
                lineStyle: {
                  curveness: 0.15,
                  color: "#3358fb",
                  width: 4,
                },
                label: {
                  show: true,
                  formatter: list[4].ordershop,
                },
              },
              {
                source: "TOP 6",
                target: "本校",
                lineStyle: {
                  curveness: 0.15,
                  color: "#3358fb",
                  width: 4,
                },
                label: {
                  show: true,
                  formatter: list[5].ordershop,
                },
              },
              {
                source: "TOP 7",
                target: "本校",
                lineStyle: {
                  curveness: 0.15,
                  color: "#3358fb",
                  width: 4,
                },
                label: {
                  show: true,
                  formatter: list[6].ordershop,
                },
              },
              {
                source: "TOP 8",
                target: "本校",
                lineStyle: {
                  curveness: 0.15,
                  color: "#3358fb",
                  width: 4,
                },
                label: {
                  show: true,
                  formatter: list[7].ordershop,
                },
              },
              {
                source: "TOP 9",
                target: "本校",
                lineStyle: {
                  curveness: 0.15,
                  color: "#3358fb",
                  width: 4,
                },
                label: {
                  show: true,
                  formatter: list[8].ordershop,
                },
              },
              {
                source: "TOP 10",
                target: "本校",
                lineStyle: {
                  curveness: 0.15,
                  color: "#3358fb",
                  width: 4,
                },
                label: {
                  show: true,
                  formatter: list[9].ordershop,
                },
              },
              {
                source: "本校",
                target: "TOP 1",
                lineStyle: {
                  curveness: 0.15,
                  color: "#B1AE58",
                },
                label: {
                  show: true,
                  formatter: list[0].bendian,
                },
              },
              {
                source: "本校",
                target: "TOP 2",
                lineStyle: {
                  curveness: 0.15,
                  color: "#B1AE58",
                },
                label: {
                  show: true,
                  formatter: list[1].bendian,
                },
              },
              {
                source: "本校",
                target: "TOP 3",
                lineStyle: {
                  curveness: 0.15,
                  color: "#B1AE58",
                },
                label: {
                  show: true,
                  formatter: list[2].bendian,
                },
              },
              {
                source: "本校",
                target: "TOP 4",
                lineStyle: {
                  curveness: 0.15,
                  color: "#B1AE58",
                },
                label: {
                  show: true,
                  formatter: list[3].bendian,
                },
              },
              {
                source: "本校",
                target: "TOP 5",
                lineStyle: {
                  curveness: 0.15,
                  color: "#B1AE58",
                },
                label: {
                  show: true,
                  formatter: list[4].bendian,
                },
              },
              {
                source: "本校",
                target: "TOP 6",
                lineStyle: {
                  curveness: 0.15,
                  color: "#B1AE58",
                },
                label: {
                  show: true,
                  formatter: list[5].bendian,
                },
              },
              {
                source: "本校",
                target: "TOP 7",
                lineStyle: {
                  curveness: 0.15,
                  color: "#B1AE58",
                },
                label: {
                  show: true,
                  formatter: list[6].bendian,
                },
              },
              {
                source: "本校",
                target: "TOP 8",
                lineStyle: {
                  curveness: 0.15,
                  color: "#B1AE58",
                },
                label: {
                  show: true,
                  formatter: list[7].bendian,
                },
              },
              {
                source: "本校",
                target: "TOP 9",
                lineStyle: {
                  curveness: 0.15,
                  color: "#B1AE58",
                },
                label: {
                  show: true,
                  formatter: list[8].bendian,
                },
              },
              {
                source: "本校",
                target: "TOP 10",
                lineStyle: {
                  curveness: 0.15,
                  color: "#B1AE58",
                },
                label: {
                  show: true,
                  formatter: list[9].bendian,
                },
              },
            ],
            lineStyle: {
              // color:'#3358fb',
              opacity: 0.9,
              // width: 2,
              curveness: 0,
            },
          },
        ],
      };
});
const duibi=ref(null);
const bendiannum=ref(0);
const ordershopnum=ref(0);
const clickoption2=(aa)=>{
  console.log("clickoption2",aa);
  if(aa.data.duibi!=undefined){
    console.log("duibi",aa.data.duibi.duibi);
    duibi.value=aa.data.duibi.duibi;
    bendiannum.value=aa.data.duibi.bendian
    ordershopnum.value=aa.data.duibi.ordershop
  }
};
const isrank = ref(true)
const gotoinfo=()=>{
  router.push("/university-info/"+id)
}
</script>
<template>
  <div>
    <div v-if="resource != null && inst != null && info!=null">
      <van-nav-bar
      :title="info.name"
        left-arrow
        fixed
        @click-left="onNavClickLeft"
      />
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
                <div class="margin-left-15" @click="gotoinfo()">
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
                <div id="timerank" ref="echart" v-if="option!=null">
                  <vue-echarts :option="option" style="height: 500px" ref="chart" />
                </div>
              </div>
              <div class="section-padding" v-if="isrank == false">
                <div id="timerank" ref="echart" v-if="option2!=null">
                  <vue-echarts :option="option2" style="height: 270px" ref="chart2" @click="clickoption2" />
                </div>
              </div>
            </div>
            <div class="white-block section-padding bg-white margin-top-22" v-if="isrank == false && duibi!=null">
              <div class="flex-row flex-center">
                <div class="flex-1 f-18 fc-black fw-bold">{{ info.name }}</div>
                <div class="vs">VS</div>
                <div class="flex-1 f-18 fc-primary fw-bold text-right">{{duibi.name}}</div>
              </div>
              <div class="flex-row flex-center text-center">
                <div class="">
                  <img class="wh-88" :src="uploadpath + 'daxue/' + info.logo" />
                </div>
                <div class="flex-1 text-center">
                  <div>{{bendiannum}}</div>
                  <div class="arrow-container arrow-right">
                    <div class="arrow-line"></div>
                    <div class="arrow-head"></div>
                  </div>
                  <div>{{ordershopnum}}</div>
                  <div class="arrow-container arrow-left">
                    <div class="arrow-head"></div>
                    <div class="arrow-line arrow-line-left"></div>
                  </div>
                </div>
                <div class="">
                  <img class="wh-88" :src="uploadpath + 'daxue/' + duibi.logo" />
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