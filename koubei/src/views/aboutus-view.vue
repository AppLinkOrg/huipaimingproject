<script setup>
import { ref } from "@vue/reactivity";
import { HttpHelper } from '../httphelper/HttpHelper'
import { useRouter, useRoute } from "vue-router";
import { Utils } from '../utils/Utils'
import Config from '../httphelper/Config'

let page = ref({});
let router = useRouter();
let route = useRoute();
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
  inst.value = data
})

let aboutus = ref({});
HttpHelper.Post("inst/aboutus", {}).then((aboutuslist) => {
  aboutus.value = aboutuslist;
});
</script>

<template>
  <van-nav-bar
  @click-left="onNavClickLeft"
    title="关于我们"
    left-arrow
    :fixed="true"
  />
  <div v-if="inst!=null&&aboutus != null">
    <div class="flex-row flex-column">
      <div class="height-46"></div>
      <div class="height-60"></div>
      <div class="flex-row">
        <div class="flex-1"></div>
        <van-image
          :src="uploadpath + 'aboutus/' + aboutus.cover"
          class="logoimg margin-bottom-20"
        ></van-image>
        <div class="flex-1"></div>
      </div>
      <div class=""></div>
    </div>
    <div class="margin-28 c-2" v-html="Utils.HtmlDecode(aboutus.content)"></div>
    <div class="margin-26">
      <div class="flex-row flex-center">
        <div class="f-13 c-2">客服热线</div>
        <div class="flex-1"></div>
        <div class="f-13 c-2">{{ aboutus.rexian }}</div>
      </div>
      <div class="lines"></div>
      <div class="flex-row flex-center">
        <div class="f-13 c-2">微信客服</div>
        <div class="flex-1"></div>
        <div class="f-13 c-2">{{ aboutus.kefu }}</div>
      </div>
      <div class="lines"></div>
      <div class="flex-row flex-center">
        <div class="f-13 c-2">微信公众号</div>
        <div class="flex-1"></div>
        <div class="f-13 c-2">{{ aboutus.gongzh }}</div>
      </div>
    </div>
    <div class="center c-7 f-11 potextbottom">{{inst.banquan}}</div>
  </div>
</template>
<style scoped>
.logoimg {
  width: 250px;
}
.height-60 {
  height: 60px;
}
.margin-28 {
  margin: 0 28px 37px;
}
.margin-26 {
  margin: 0 26px;
}
.lines {
  width: 100%;
  height: 1px;
  background: #eeeeee;
  margin: 20px 0;
}

.height-46 {
  height: 46px;
}
.margin-bottom-20 {
  margin-bottom: 20px;
}
.c-2 {
  color: #333333;
}

.f-13 {
  font-size: 13px;
}
.c-7 {
  color: #999999;
}

.f-11 {
  font-size: 11px;
}
.center {
  text-align: center;
}
.potextbottom {
    width: 100vw;
    position: fixed;
    left: 0;
    bottom: 13px;
    z-index:2;
}
</style>
