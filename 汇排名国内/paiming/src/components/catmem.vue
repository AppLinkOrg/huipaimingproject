<script setup>
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import Config from "../Config";
var inst=ref(null)
HttpHelper.PostKoubei("inst/info", {}).then(data=>{
    inst.value=data;
});
var resource=ref(null)
HttpHelper.PostKoubei("inst/resources", {}).then(data=>{
    resource.value=data;
});
const uploadpath=Config.UploadPathKoubei

const gotoMember = () => {
  if(window.location.href.indexOf("localhost")>-1){
    window.location.href="http://localhost:5173/member";
  }else{
    window.location.href=inst.value.koubeiurl+"/member";
  }
}
const gotoCategory = () => {
  if(window.location.href.indexOf("localhost")>-1){
    window.location.href="http://localhost:5173";
  }else{
    window.location.href=inst.value.koubeiurl;
  }
}

</script>
<template>
    <div  v-if="resource!=null">
    <div class="category flex-row flex-center" @click="gotoCategory">
        <div class="flex-1"></div>
        <div class="text-center">
          <div class="flex-row">
            <div class="flex-1"></div>
            <img class="wh-20" :src="uploadpath + 'resource/' + resource.home" />
            <div class="flex-1"></div>
          </div>
          <div class="fc-primary fw-500 f-12 mp">首页</div>
        </div>
        <div class="flex-1"></div>
      </div>
      <div class="member  flex-row flex-center" @click="gotoMember">
        <div class="flex-1"></div>
        <div>
          <div class="flex-row">
            <div class="flex-1"></div>
            <img class="wh-20" :src="uploadpath + 'resource/' + resource.member" />
            <div class="flex-1"></div>
          </div>
          <div class="fc-primary text-center fw-500 f-12 mp">我的</div>
        </div>
        <div class="flex-1"></div>
      </div>    
    </div>
</template>
<style scoped>

.category {
  width: 59px;
  height: 59px;
  background: #04869333;
  border-radius: 50%;
  position: fixed;
  bottom: 170px; /* 距离底部的距离 */
  right: 15px; /* 距离右侧的距离 */
}

.member {
  width: 59px;
  height: 59px;
  background: #04869333;
  border-radius: 50%;
  position: fixed;
  bottom: 100px; /* 距离底部的距离 */
  right: 15px; /* 距离右侧的距离 */
}

.wh-20 {
  width: 20px;
  height: 20px;
}

.fw-500 {
  font-weight: 500;
}

.f-12 {
  font-size: 12px;
  line-height: 12px;
}
.fc-primary{
  color:#048693;
}
.mp{
  margin-top: 5px;
}
</style>