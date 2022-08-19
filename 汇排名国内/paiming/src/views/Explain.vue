<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Dialog, Image as VanImage, Toast } from "vant";
import { Utils } from "../Utils";
import { list } from "postcss";

let page = ref({});
let router = useRouter();
let route = useRoute();

PageHelper.Init(page, () => {});
let backPage = () => {
  router.back();
};

console.log("route", route.query);
let id = route.query.id;
let info = ref({});

HttpHelper.Post("daxue/bangminginfo", { id }).then((bangminginfo) => {
  info.value = bangminginfo;
});


let tiaozhuan = (path, param = {}) => {
  router.push({ path, query: param });
};
</script>

<template>
  <div class="h100bg">
    <van-nav-bar
      v-if="page.Inst!=null"
      :title="page.Inst.bangdan"
      left-arrow
      @click-left="backPage"
      :fixed="true"
    />
    <div v-if="page.Res != null && page.Inst !=null">
      <div class="height-46"></div>
      <div class="infobox " >
        <div class="c-2 f-16 f-bold">{{ info.name }}</div>
        <div class="c-1 f-13 margin-top-18 line-height-20" v-html="Utils.HtmlDecode(info.jianjie)"></div>
      </div>
      <div class="pobottom">
        <div class="flex-row flex-center">
          <div class="flex-1"></div>
          <div class="c-w f-12" @click="tiaozhuan('/aboutus')">关于我们</div>
          <div class="c-w">丨</div>
          <div class="c-w f-12" @click="tiaozhuan('/feedback')">意见反馈</div>
          <div class="flex-1"></div>
        </div>
        <div class="center f-11 c-w margin-top-14">
         {{page.Inst.banquan}}
        </div>
      </div>
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
}
.quanqiu {
  width: 21px;
  height: 21px;
}
.topbox {
  margin: 27px 27px 13px;
  width: 322px;
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
  margin: 27px 27px;
  padding: 19px 20px;
  background: #ffffff;
  border-radius: 17px;
  min-height: 300px;
}
.margin-top-18 {
    margin-top: 18px;
}
.line-height-20 {
    line-height: 20px;
}
.margin-top-13 {
  margin-top: 13px;
}
.margin-top-7 {
  margin-top: 7px;
}
.chartbox {
  margin: 13px 27px;
  padding: 19px;
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
  width: 282px;
  height: 211px;
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
  position: fixed;
  bottom: 0;
  left: 0;
  z-index:2;
}

.warnicon {
  width: 17px;
  height: 17px;
}
</style>
