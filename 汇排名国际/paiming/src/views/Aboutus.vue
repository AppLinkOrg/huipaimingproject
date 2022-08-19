<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Image as VanImage } from "vant";
import { Utils } from "../Utils";

let page = ref({});
let router = useRouter();
let route = useRoute();

PageHelper.Init(page, () => {});
let backPage = () => {
  router.back();
};
let aboutus = ref({});
HttpHelper.Post("inst/aboutuslist", {}).then((aboutuslist) => {
  aboutus.value = aboutuslist;
});
</script>

<template>
  <van-nav-bar
    title="关于我们"
    left-arrow
    @click-left="backPage"
    :fixed="true"
  />
  <div v-if="page.Res != null && aboutus.cover != undefined && page.Inst !=null ">
    <div class="flex-row flex-column">
      <div class="height-46"></div>
      <div class="height-60"></div>
      <van-image
        :src="page.uploadpath + 'aboutus/' + aboutus.cover"
        class="logoimg margin-bottom-20"
      ></van-image>
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
    <div class="center c-7 f-11 potextbottom">{{page.Inst.banquan}}</div>
  </div>
</template>
<style scoped>
.logoimg {
  width: 151px;
  height: 46px;
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

</style>
