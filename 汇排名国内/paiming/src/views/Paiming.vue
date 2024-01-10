<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Dialog, Image as VanImage, Toast, Overlay } from "vant";
import { Utils } from "../Utils";
import * as echarts from "echarts";
import { nextTick } from "@vue/runtime-core";

let page = ref({});
let router = useRouter();
let route = useRoute();

PageHelper.Init(page, () => {});
let backPage = () => {
  router.back();
};

let id = route.query.id;
let info = ref({});
let type = ref("A");
HttpHelper.Post("daxue/daxueinfo", { id }).then((daxueinfo) => {
  info.value = daxueinfo;
});
let columns = ref([]);
let showPicker = ref(false);
columns.value = [{ text: 111 }, { text: 111 }, { text: 111 }];
let qiquid = ref("");
let countryid = ref("");
let yearid = ref("");
let yearname = ref("");

let onConfirm = (value) => {
  yearid.value = value.id;
  yearname.value = value.name;
  getlist();
  showPicker.value = false;
};

let getyear = () => {
  let date = new Date();
  let nowYear = date.getFullYear();
  HttpHelper.Post("inst/yearlist", {}).then((yearlist) => {
    var kva=false;
    for (let item of yearlist) {
      if (nowYear == item.name) {
        yearname.value = item.name;
        yearid.value = item.id;
        kva=true;
      }
      item.text = item.name;
    }
    if(kva==false){
      if(yearlist.length>0){
        yearname.value = yearlist[0].name;
        yearid.value = yearlist[0].id;
      }
    }

    columns.value = yearlist;
    getlist();
  });
};
getyear();
let datalist = ref([]);
let data = ref([]);
let datatitle = ref("");
let getlist = () => {
  let json = {
    name: id,
    nianfen: yearid.value,
  };
  HttpHelper.Post("daxue/paiminglist", json).then((paiminglist) => {
    let firstarr = [];
    let secarr = [];
    let tharr = [];

    // var paiminglist=[{"id":"239","updated_date":"2022-06-10 20:32:37","created_date":"2022-06-10 20:32:37","name":"6","name_name":"牛津大学","r_name_name":"牛津大学","nianfen":"6","nianfen_name":"2022","r_nianfen_name":"2022","bangming":"1","bangming_name":"U.S.News","r_bangming_name":"U.S.News","quanqiupaiming":"3","diqupaiming":"1","guojiapaiming":"1","status_name":"启用","status":"A"},{"id":"238","updated_date":"2022-06-10 20:31:48","created_date":"2022-06-10 20:31:48","name":"1","name_name":"牛津大学","r_name_name":"牛津大学","nianfen":"6","nianfen_name":"2022","r_nianfen_name":"2022","bangming":"1","bangming_name":"WURA","r_bangming_name":"WURA","quanqiupaiming":"2","diqupaiming":"1","guojiapaiming":"1","status_name":"启用","status":"A"}];
    
    datalist.value = paiminglist.map((item) => {
      let val =
        type.value == "A"
          ? item.quanqiupaiming
          : type.value == "B"
          ? item.guojiapaiming
          : type.value == "C"
          ? item.diqupaiming
          : "";
      let prencent = (100 / Number(paiminglist.length - 1)).toFixed(2);
      if (item.r_bangming_iscenter != "Y") {
        console.log("bangming",item.bangming)
        secarr.push({
          name: val,
          value: Number(prencent),
          children: [
            {
              name: item.bangming_name,
              value: Number(prencent),
              id: item.bangming,
              dxid: item.name,
            },
          ],
          id: item.bangming,
          dxid: item.name,
        });
        tharr.push({
          name: item.bangming_name,
          value: Number(prencent),
        });
        let json = {
          value: val,
          name: item.bangming_name,
          id: item.bangming,
          dxid: item.name,
          label: {
            show: true,
            position: "inside",
            formatter: "{b}({c})",
            color: "#333",
          },
        };
        return json;



      } else {
        
        firstarr[0] = {
          name: item.bangming_name + "\n" + val + "\n\n",
          value: 100,
          id: item.bangming,
          dxid: item.name,
        };
        datatitle.value = item.bangming_name + "\n\n" + val;

         console.log(firstarr)



      }
    });
    
    if(firstarr.length>0){
      firstarr[0].children = secarr;
    }
    data.value = firstarr;
    console.log(data.value)
    piechart2();
  });
};

let tiaozhuan = (path, param = {}) => {
  router.push({ path, query: param });
};


let piechart2 = () => {
  let lc = document.getElementById("piechart");
  lc.removeAttribute("_echarts_instance_");
  console.log("removeAttribute",data.value);
  let ec = echarts.init(lc);
  let option = {
    series: [
      {
        radius: ["0%", "100%"],
        type: "sunburst",
        sort: null,
        emphasis: {
          focus: "none",
        },
        nodeClick: "false",
        data: data.value,
        levels: [
          {},
          {
            itemStyle: {
              color: "#F09C07",
            },
            label: {
              rotate: "tangential",
            },
          },
          {
            itemStyle: {
              color: "#087E8B",
            },
            label: {
              rotate: "tangential",
            },
          },
          {
            itemStyle: {
              color: "#B5DDA3",
            },
            label: {
              rotate: "tangential",
            },
          },
        ],
      },
    ],
  };

  ec.setOption(option);
  ec.on("click", clickechart);
  window.addEventListener("resize", () => {
    ec.resize();
  });
};
let clickechart = (params) => {
  let data = {};
  if (params.componentType == "title") {
    data.id = 1;
    data.dxid = id;
  } else {
    data = params.data;
  }

  tiaozhuan("/history", { id: data.id, dxid: data.dxid });
};
let showdetail = ref(false);
let gohome = () => {
  router.push("/");
};
</script>

<template>
  <div class="h100bg">
    <van-nav-bar
      v-if="page.Inst!=null"
      :title="page.Inst.pmtitle"
      left-arrow
      @click-left="backPage"
      :fixed="true"
    />
    <div v-if="page.Res != null && info.name != '' && page.Inst != null">
      <div class="height-46"></div>
      <div class="infobox flex-row flex-center" @click="showdetail = true">
        <div class="flex-1">
          <div class="c-2 f-16 f-bold">{{ info.name }}</div>
          <div class="c-1 f-13">{{ info.name1 }}</div>
        </div>
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
            class="f-14 margin-left-10"
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
          class="flex-1 center f-14"
          :class="type == 'B' ? 'txt-07' : 'c-7'"
        >
          省/市/区
        </div>
        <div
          @click="
            type = 'C';
            getlist();
          "
          class="flex-1 center f-14"
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

      <van-overlay :show="showdetail" @click="showdetail = false" z-index="101">
        <div class="wrapper">
          <div class="infoblock">
            <div class="c-2 f-16 f-bold">{{ info.name }}</div>
            <div class="c-1 f-13 margin-top-10">{{ info.name1 }}</div>
            <div class="f-13 c-2 margin-top-13">
              区域：{{ info.diqu_name }}
            </div>
            <div class="f-13 c-2 margin-top-13">
              省/市/区：{{ info.guojia_name }}
            </div>
          </div>
        </div>
      </van-overlay>
      <div class="chartbox">
        <div class="flex-row flex-center" @click="showPicker = true">
          <van-image
            :src="page.uploadpath + 'resource/' + page.Res.rili"
            class="rili"
          ></van-image>
          <div class="c-2 f-16">{{ yearname }}</div>
          <van-image
            :src="page.uploadpath + 'resource/' + page.Res.arrowbottom"
            class="arrowbottom"
          ></van-image>
        </div>

        <div class="flex-row flex-column">
          <div class="echarts flex-row flex-column" id="piechart"></div>
          <van-image
            :src="page.uploadpath + 'resource/' + page.Res.arrowtop"
            class="arrowtop"
          ></van-image>
          <div class="f-13 txt-05 margin-top-10">
            点击榜名可查看历史排名数据
          </div>
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
  margin: 0 27px;
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
  margin: 13px 27px ;
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
  margin: 13px 27px 0;
  padding: 19px 19px 10px;
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
.echarts {
  width: 230px;
  height: 230px;
}
/deep/ .echarts div:nth-child(1){
  width: 100% !important;
  height: 100% !important;
  
}
/deep/ .echarts div canvas {
    width: 100% !important;
    height: 100% !important;
  }
.arrowtop {
  width: 17px;
  height: 17px;
  margin-top: 5px;
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
