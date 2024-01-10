<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Image as VanImage } from "vant";
import { Dialog } from 'vant';
import  catmem  from '../components/catmem.vue';

let page = ref({});
let router = useRouter();
let route = useRoute();

let keyword = ref("");

let list = ref([]);

PageHelper.Init(page, () => {});
// PageHelper.LoginAuth(page, () => {});
let column = ref([]);
HttpHelper.Post("daxue/remenlist", {}).then((remenlist) => {
  list.value = remenlist;
});
let errormsg = ref("");
let showEn = ref(false);
let onClickButton = (flag = false) => {
  showEn.value = false;
  var pattern2 = new RegExp("[A-Za-z]+");
  if(pattern2.test(keyword._value)){
    showEn.value = true;
  }
  if(keyword._value==''){
    column.value = [];
    errormsg.value = "";
    return
  }
  HttpHelper.Post("daxue/daxuelist", {
    keywords: keyword._value,
  }).then((daxuelist) => {
    column.value = daxuelist;
    if (flag && daxuelist.length == 0) {
      errormsg.value = page._value.Inst.homesearchtip;
    } else {
      errormsg.value = "";
    }
  });
};
var instinfokoubei=null;
HttpHelper.PostKoubei("inst/info", {}).then((data) => {
  instinfokoubei=data;
});
var aaa=false;
let tiaozhuan = (path, param = {}) => {
  if(aaa==true){
    return
  }
  aaa=true;
  HttpHelper.PostKoubei("member/info", {}).then((info) => {
    aaa=false;
    if(info==null||parseInt(info.jifen)<=0){
      Dialog({
        title: '提示',
        message: instinfokoubei.tips,
        theme: 'round-button',
        confirmButtonColor:"#048694 "
      });
      return
    }
    HttpHelper.PostKoubei("member/usejifen", {});

    if (path == "/paiming") {
      HttpHelper.Post(
        "daxue/addremen",
        {
          name: param.id,
        },
        (ret) => {}
      );
    }
    router.push({ path, query: param });
  });
};
document.addEventListener("click", (e) => {
  let searchid = document.getElementById("searchid");
  if (searchid != e.target) {
    column.value = [];
  }
});
let lang = ref('ch');
if(window.localStorage.getItem('lang')!=undefined){
  lang.value = window.localStorage.getItem('lang');
}
let changelang = (val)=>{
    val = val == 'en'?'ch':'en';
    window.localStorage.setItem('lang',val);
    lang.value = val;
}
let switchgn = () =>{
  console.log("hhhhhhh",page._value.Inst.navigationaddress)
  window.location.href=`${page._value.Inst.navigationaddress}`;
}
</script>

<template>


  <!-- 国际版 -->

  <div v-if="page.Res != null && page.Inst!=null">
    <div class="">
      <div class="flex-row flex-column">
        <div class="height-50"></div>
        <van-image
          :src="page.uploadpath + 'resource/' + page.Res.logo"
          class="logoimg margin-bottom-20"
        ></van-image>
      </div>
      <div class="pore">
        <van-search
          v-model="keyword"
          class="searchbox"
          show-action
          left-icon=""
          shape="round"
          :clearable="false"
          @update:model-value="onClickButton"
          id="searchid"
          @search="onClickButton"
          :placeholder="page.Inst.searchTips"
        >
          <template #action>
            <div class="langzy">
              <div @click="onClickButton(true)" class="sousuobtn">搜索</div>
              <!-- <div @click="changelang(lang)" class="langzy_h">{{lang=='en'?  "中": "En" }}</div> -->
            </div>
          </template>
        </van-search>
        <div class="searchtipbox" v-if="column.length > 0">
          <div
            class="h30 c-2"
            v-for="(item, idx) of column"
            :key="idx"
            @click="tiaozhuan('/paiming', { id: item.id })"
          >
            {{ lang=='en'?item.name1: (showEn?item.name1:item.name) }}
          </div>
        </div>
        <div class="searchtipbox" v-if="errormsg != ''">
          <div class="padding-10 c-4 f-13">{{ errormsg }}</div>
        </div>
      </div>
    </div>
    <div class="resoubox">
            <div class="langzy">
           <div class="c-2 margin-bottom-20 f-16">热门搜索</div>

           <van-image @click="changelang(lang)" :src="page.uploadpath+'resource/'+(lang=='en'?page.Res.yingicon:page.Res.zhongicon)" class="langzy_h"></van-image>
          <!-- <div @click="changelang(lang)" class="langzy_h">{{lang=='en'?  "中": "En" }}</div> -->
      </div>
      <ul>
        <ol
          class="flex-row flex-center"
          v-for="(item, idx) of list"
          :key="idx"
          @click="tiaozhuan('/paiming', { id: item.name })"
        >
          <div class="f-15 w30" :class="idx < 3 ? 'txt-e5' : 'txt-f1'">
            {{ idx + 1 }}
          </div>
          <div class="f-13 c-2 ">{{ lang=='en'?item.r_name_name1:item.name_name }}</div>
        </ol>
      </ul>
    </div>
    <div class="h-50"></div>
    <div class="pobottom">
      <div class="flex-row flex-center">
        <div class="flex-1"></div>
        <div class="txt-04 f-12" @click="tiaozhuan('/aboutus')">关于我们</div>
        <div class="txt-04">丨</div>
        <div class="txt-04 f-12" @click="tiaozhuan('/feedback')">意见反馈</div>
        <div class="flex-1"></div>
      </div>
      <div class="center f-11 c-7 margin-top-14">
        {{page.Inst.banquan}}
      </div>
    </div>
    <!-- <van-image @click="changelang(lang)" :src="page.uploadpath+'resource/'+(lang=='en'?page.Res.yingicon:page.Res.zhongicon)" class="langicon"></van-image> -->
    <!-- <van-image @click="switchgn()" :src="page.uploadpath+'resource/'+(page.Res.switchgn)" class="islangicon"></van-image> -->
    <catmem></catmem>
  </div>
</template>
<style scoped>
.logoimg {
  width: 250px;
  height: 40px;
}
.searchbox {
  border: 1px solid #048693;
  padding: 0;
  border-radius: 7px;
  
}
/deep/ .van-search__action {
  padding: 0 !important;
  border-radius: 7px;
}
/deep/ .van-field__value, .van-field__body {
  background: transparent !important;
}
/deep/ .van-search__content {
  background: transparent !important;
}
.sousuobtn {
  width: 70px;
  height: 40px;
  background: #048693;
  border-radius: 7px 0px 0px 7px;
  line-height: 40px;
  text-align: center;
  font-weight: 400;
  color: #ffffff;
  font-size: 16px;
  /* border: 1px solid #ffffff; */
  border-radius: 7px;
}
.langzy{
  display: flex;
  align-content:center;
}
.langzy_h{
  width: 30px;
  height: 30px;
  /* border: 1px solid #ffffff; */
  margin-top:-5px;
  margin-left: 10px;
}
.resoubox {
  margin: 33px 23px;
}
.txt-e5 {
  color: #e54758;
}
.txt-f1 {
  color: #f19d00;
}
ul ol {
  margin-bottom: 11px;
}
.txt-04 {
  color: #048693;
}
.pobottom {
  width: 100vw;
  padding: 13px 0;
  background: #ffffff;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
}
.pore {
  position: relative;
  margin: 0 23px;
}
.searchtipbox {
  position: absolute;
  width: 99%;
  border-radius: 0 0 10px 10px;
  border: 1px solid #048693;
  border-top: none;
  max-height: 200px;
  overflow: scroll;
  background: #ffffff;
  z-index: 2;
  padding-bottom: 10px;
}
.h30 {
  padding: 0 20px;
  height: 30px;
  line-height: 30px;
  font-size: 13px;
}
.langicon {
  width: 77px;
  height: 78px;
  position: fixed;
  right: 0;
   top: 180px;
  /* bottom: 80px; */
  z-index: 100;
}
.islangicon{
    width: 77px;
  height: 78px;
  position: fixed;
  right: 0;
   /* top: 180px; */
  bottom: 80px;
  z-index: 100;
}
.w30 {
  width: 30px;
}
</style>