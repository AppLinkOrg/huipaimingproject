<template>
  <!-- 国际版 -->
  <div v-if="page.Res != null && page.Inst != null">
    <div class="">
      <div class="flex-row flex-column">
        <div class="height-50"></div>
        <van-image
          :src="page.uploadpath + 'resource/' + page.Res.category"
          class="logoimg margin-bottom-40"
        ></van-image>
      </div>
    </div>
    <div
      class="flex-row type"
      v-for="list in verionlist"
      :key="list.id"
      @click="toVersion(list)"
    >
      <div style="margin-bottom: 5px; font-size: 20px">
        {{ list.version_name }}
      </div>
      <div style="">{{ list.tran_version_name }}</div>
    </div>
    <div class="h-22"></div>
    <div class="pobottom">
      <div class="center f-11 c-7 margin-top-14">
        {{ page.Inst.banquan2 }}
      </div>
      <div class="center f-11 margin-top-7" style="color: #048693">
        {{ page.Inst.banquan }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from "vant";

let page = ref({});
let router = useRouter();
let route = useRoute();
let verionlist = ref([]);
PageHelper.Init(page, () => {});
HttpHelper.Post("inst/versionlist", {}).then((verion) => {
  verionlist.value = verion;
});
let toVersion = (vale) => {
  if (vale.back == "") {
    Toast.fail("暂无该版本，期待下次更新");
    return;
  }
  window.location.href = vale.back;
};
</script>

<style scoped>
.type {
  flex-direction: column;
  background-color: #048695;
  border-radius: 20px;
  margin: 15px 30px;
  padding: 40px;
  color: #fff;
  white-space: nowrap;
  font-weight: 500;
  font-size: 16px;
}
.logoimg {
  width: 250px;
  height: 55px;
}
</style>