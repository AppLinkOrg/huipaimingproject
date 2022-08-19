<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Dialog, Image as VanImage, Toast } from "vant";
import { Utils } from "../Utils";

let page = ref({});
let router = useRouter();
let route = useRoute();

PageHelper.Init(page, () => {});
let backPage = () => {
  router.back();
};

let name = ref("");
let summary = ref("");
let onSubmit = (value) => {
  console.log(value);
  if(value.name==''){
      Toast('请输入您的联系方式');
      return
  }
  if(value.summary==''){
      Toast('请输入您的问题和意见');
      return
  }
  HttpHelper.Post('member/addfeedback',value).then((info)=>{
      if(info.code==0){
          Dialog({message:'提交成功'}).then(()=>{
              router.push('/');
          })
      }else {
          Toast(info.result);
      }
  })
};
</script>

<template>
  <van-nav-bar
    title="意见反馈"
    left-arrow
    @click-left="backPage"
    :fixed="true"
  />
  <div v-if="page.Res != null && page.Inst !=null">
    <div>
      <div class="height-46"></div>
      <van-form @submit="onSubmit" class="formbox">
        <div class="c-2 f-14">联系方式</div>
        <van-field
          v-model="name"
          name="name"
          type="number"
          placeholder="留下联系方式，更可能解决问题～"
          class="h53 f-13"
        />
        <div class="flex-row flex-center">
          <div class="c-2 f-14">问题和意见</div>
          <div class="flex-1"></div>
          <div class="c-1 f-14">{{summary.length}}/100</div>
        </div>

        <van-field
          v-model="summary"
          placeholder="在此处输入您想要的反馈内容"
          maxlength="100"
          name="summary"
          type="textarea"
          class="h200 f-13"
          rows="8"
        />
        <div class="pobottom flex-row flex-column">
          <van-button class="btns" native-type="submit"> 提交 </van-button>
        </div>
      </van-form>
    </div>
    <div class="center c-7 f-11 potextbottom">
      {{page.Inst.banquan}}
    </div>
  </div>
</template>
<style scoped>
.formbox {
  margin: 13px 27px;
}
.h53 {
  height: 53px;
  margin-top: 13px;
  margin-bottom: 26px;
}
.h200 {
  margin-top: 13px;
}

.pobottom {
  width: 100vw;
  position: fixed;
  left: 0;
  bottom: 50px;
  z-index: 10;
}
.btns {
  width: 322px;
  height: 40px;
  background: #048694;
  border-radius: 20px;
  line-height: 40px;
  text-align: center;
  color: #ffffff;
  font-weight: 500;
}
</style>
