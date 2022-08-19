<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Dialog, Image as VanImage, Toast } from "vant";
import { Utils } from "../Utils";

import * as echarts from "echarts";

let page = ref({});
let router = useRouter();
let route = useRoute();

PageHelper.Init(page, () => {});
let backPage = () => {
  router.back();
};

console.log("route", route.query);
let id = route.query.id;
let dxid = route.query.dxid;
let info = ref({});
let type = ref("A");
HttpHelper.Post("daxue/bangminginfo", { id }).then((bangminginfo) => {
  info.value = bangminginfo;
});
let dxinfo = ref({});
HttpHelper.Post("daxue/daxueinfo", { id: dxid }).then((daxueinfo) => {
  dxinfo.value = daxueinfo;
});
let columns = ref([]);
let showPicker = ref(false);
columns.value = [{ text: 111 }, { text: 111 }, { text: 111 }];

let yearid = ref("");
let yearname = ref("");

let onConfirm = (value) => {
  console.log(value);

  yearid.value = value.id;
  yearname.value = value.name;
  getlist();
  showPicker.value = false;
};
let showPicker2 = ref(false);
let yearid2 = ref("");
let yearname2 = ref("终止");
let onConfirm2 = (value) => {
  if (Number(yearname.value) > Number(value.name)) {
    yearid2.value = yearid.value;
    yearname2.value = yearname.value;
    yearid.value = value.id;
    yearname.value = value.name;
  } else {
    yearid2.value = value.id;
    yearname2.value = value.name;
  }
  showPicker2.value = false;
  getlist();
};
let xaris = ref([]);
let getyear = () => {
  let date = new Date();
  let nowYear = date.getFullYear();
  HttpHelper.Post("inst/yearlist", {}).then((yearlist) => {
    for (let item of yearlist) {
      item.text = item.name;
      if (nowYear == item.name) {
        yearid2.value = item.id;
      }
    }
    yearname.value = yearlist[yearlist.length - 1].name;
    yearid.value = yearlist[yearlist.length - 1].id;

    xaris.value = yearlist.map((item) => {
      return item.name;
    });
    columns.value = yearlist;
    getlist();
  });
};
getyear();
let linedata = ref([]);
let pointdata = ref([]);
let getlist = () => {
  let json = {
    name: dxid,
    start_to: yearid2.value,
    start_from: yearid.value,
    bangming: id,
  };

  HttpHelper.Post("daxue/paiminglist", json).then((paiminglist) => {
    linedata.value = paiminglist.map((item) => {
      return type.value == "A"
        ? item.quanqiupaiming
        : type.value == "B"
        ? item.guojiapaiming
        : type.value == "C"
        ? item.diqupaiming
        : "";
    });
    pointdata.value = paiminglist.map((item, idx) => {
      let json = {
        value:
          type.value == "A"
            ? item.quanqiupaiming
            : type.value == "B"
            ? item.guojiapaiming
            : type.value == "C"
            ? item.diqupaiming
            : "",
        coord: [
          idx,
          type.value == "A"
            ? item.quanqiupaiming
            : type.value == "B"
            ? item.guojiapaiming
            : type.value == "C"
            ? item.diqupaiming
            : "",
        ],
      };
      return json;
    });
    xaris.value = paiminglist.map((item) => {
      return item.nianfen_name;
    });
    chartFn();
  });
};

let tiaozhuan = (path, param = {}) => {
  router.push({ path, query: param });
};

let chartFn = () => {
  let num =Math.max(...linedata.value).toString().length
  console.log(num,'mmm')
  num = num<2?2:num
  let lc = document.getElementById("linecanvas");
  lc.removeAttribute("_echarts_instance_");

  let ec = echarts.init(lc);
  let option = {
    title: {
      text: "",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {},
    grid: {
      left: '40',
      top: '50',
      right: '10%',
      bottom: '50',
      containLabel: true,
    },
    xAxis: {
      type: "category",
      name: "年份",
      nameLocation: "middle",
      data: xaris.value,
      nameGap: 30,
    },
    yAxis: {
      type: "value",
      name: "排名",
      nameLocation: "middle",
      nameRotate: 0,
      axisTick: {},
      minInterval: 1,
      nameGap: 10*num,
      axisLabel : {
        formatter : '{value}'
      },
    },
    series: [
      {
        name: "",
        type: "line",
        clip: false,
        data: linedata.value,
        markPoint: {
          symbolSize: 30,
          label: {
            fontSize: 12,
          },
          data: pointdata.value,
        },
      },
    ],
  };
  ec.setOption(option);
  window.addEventListener("resize", () => {
    ec.resize();
  });
};

let showdetail = ref(false);
let gohome = () => {
  router.push("/");
};
</script>

<template>
  <div class="h100bg">
    <van-nav-bar
      title="历史排名数据"
      left-arrow
      @click-left="backPage"
      :fixed="true"
    />
    <div v-if="page.Res != null && page.Inst != null">
      <div class="height-46"></div>
      <div class="h-4"></div>
      <div class="infobox flex-row flex-center" @click="showdetail = true">
        <div class="flex-1">
          <div class="c-2 f-16 f-bold">{{ dxinfo.name }}</div>
          <div class="c-1 f-13">{{ dxinfo.name1 }}</div>
        </div>
        <van-image
          :src="page.uploadpath + 'resource/' + page.Res.warnicon"
          class="warnicon"
        ></van-image>
      </div>
      <van-overlay :show="showdetail" @click="showdetail = false" z-index="101">
        <div class="wrapper">
          <div class="infoblock">
            <div class="c-2 f-16 f-bold">{{ dxinfo.name }}</div>
            <div class="c-1 f-13 margin-top-10">{{ dxinfo.name1 }}</div>
            <div class="f-13 c-2 margin-top-13">
              区域：{{ dxinfo.diqu_name }}
            </div>
            <div class="f-13 c-2 margin-top-13">
              省/市/区：{{ dxinfo.guojia_name }}
            </div>
          </div>
        </div>
      </van-overlay>
      <div
        class="infobox flex-row flex-center"
        @click="tiaozhuan('/explain', { id: info.id })"
      >
        <div class="c-2 f-16 f-bold">{{ info.name }}</div>
        <div class="flex-1"></div>
        <van-image
          :src="page.uploadpath + 'resource/' + page.Res.warnicon"
          class="warnicon"
        ></van-image>
      </div>
      <div class="flex-row flex-center topbox">
        <div class="flex-row flex-center flex-1">
          <div class="flex-1"></div>
          <van-image
            :src="page.uploadpath + 'resource/' + page.Res.quanqiu"
            class="quanqiu"
          ></van-image>
          <div
            class="f-15 margin-left-10"
            :class="type == 'A' ? 'txt-07' : 'c-7'"
            @click="
              type = 'A';
              getlist();
            "
          >
            全国
          </div>
          <div class="flex-1"></div>
        </div>
        <div
          @click="
            type = 'B';
            getlist();
          "
          class="flex-1 center f-15"
          :class="type == 'B' ? 'txt-07' : 'c-7'"
        >
          省/市/区
        </div>
        <div
          @click="
            type = 'C';
            getlist();
          "
          class="flex-1 center f-15"
          :class="type == 'C' ? 'txt-07' : 'c-7'"
        >
          区域
        </div>
      </div>
      <van-popup v-model:show="showPicker" round position="bottom">
        <van-picker
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>
      <van-popup v-model:show="showPicker2" round position="bottom">
        <van-picker
          :columns="columns"
          @cancel="showPicker2 = false"
          @confirm="onConfirm2"
        />
      </van-popup>

      <div class="chartbox">
        <div class="flex-row flex-center">
          <div class="flex-row flex-center flex-1" @click="showPicker = true">
            <div class="flex-1"></div>
            <div class="c-2 f-16">{{ yearname }}</div>
            <van-image
              :src="page.uploadpath + 'resource/' + page.Res.arrowbottom"
              class="arrowbottom"
            ></van-image>
            <div class="flex-1"></div>
          </div>
          <div class="flex-row flex-center flex-1" @click="showPicker2 = true">
            <div class="flex-1"></div>
            <div class="c-2 f-16">{{ yearname2 }}</div>
            <van-image
              :src="page.uploadpath + 'resource/' + page.Res.arrowbottom"
              class="arrowbottom"
            ></van-image>
            <div class="flex-1"></div>
          </div>
        </div>

        <div class="flex-row flex-column">
          <div class="h-20"></div>
          <div class="echart" id="linecanvas"></div>
          <div class="h-20"></div>
        </div>
      </div>
      <div class="h-68"></div>
      <div class="pobottom">
        <div class="flex-row flex-center">
          <div class="flex-1"></div>
          <div class="c-w f-12" @click="tiaozhuan('/aboutus')">关于我们</div>
          <div class="c-w">丨</div>
          <div class="c-w f-12" @click="tiaozhuan('/feedback')">意见反馈</div>
          <div class="flex-1"></div>
        </div>
        <div class="center f-11 c-w margin-top-14">
          {{ page.Inst.banquan }}
        </div>
      </div>
      <van-image
        :src="page.uploadpath + 'resource/' + page.Res.homeicon"
        @click="gohome"
        class="homeicon"
      ></van-image>
    </div>
  </div>
</template>
<style scoped>
.h100bg {
  min-height: 100vh;
  background: #048693;
}
.van-nav-bar {
  background: #048693 !important;
}
/deep/.van-nav-bar .van-icon {
  color: white !important;
}
.van-hairline--bottom::after {
  border-bottom-width: 0;
}
/deep/.van-nav-bar__title {
  color: white !important;
  font-size: 16px;
}
.quanqiu {
  width: 21px;
  height: 21px;
}
.topbox {
  margin: 13px 27px;
  height: 47px;
  background: #ffffff;
  border-radius: 23px;
}
.txt-07 {
  color: #07656d;
}
.van-dropdown-item {
  width: 322px;
  margin: 0 27px;
}
/deep/.van-dropdown-menu__bar {
  border-radius: 23px;
}
.infobox {
  margin: 0 27px 13px;
  padding: 16px 20px;
  background: #ffffff;
  border-radius: 17px;
}
.margin-top-13 {
  margin-top: 13px;
}
.margin-top-7 {
  margin-top: 7px;
}
.chartbox {
  margin: 13px 27px;
  padding: 19px 0;
  background: #ffffff;
  border-radius: 17px;
}
.rili {
  width: 21px;
  height: 21px;
  margin-right: 6px;
}
.arrowbottom {
  width: 11px;
  height: 11px;
  margin-left: 10px;
}
.echart {
  width: 100%;
  height: 211px;
}
/deep/ .echart div:nth-child(1) {
  width: 100% !important;
  height: 100% !important;
}
/deep/ .echart div canvas {
  width: 100% !important;
  height: 100% !important;
}

.arrowtop {
  width: 17px;
  height: 17px;
}
.txt-05 {
  color: #058594;
}
.pobottom {
  width: 100vw;
  padding: 13px 0;
  background: #048693;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
}

.warnicon {
  width: 17px;
  height: 17px;
}
.infoblock {
  min-width: 237px;
  padding: 27px 15px;
  background: #ffffff;
  border-radius: 17px;
}
</style>
