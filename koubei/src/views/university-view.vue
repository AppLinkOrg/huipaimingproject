<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch, defineProps,onMounted } from 'vue'
import Config from '../httphelper/Config'
import { HttpHelper } from '../httphelper/HttpHelper'
const route = useRoute();
const router = useRouter();
const uploadpath = Config.UploadPath
const resource = ref(null)
HttpHelper.Post('inst/resources').then((data) => {
  resource.value = data
})
const inst = ref(null)
HttpHelper.Post('inst/info').then((data) => {
    inst.value = data
})
var id = route.params.id;

var info={name:"麻省理工",name1:"Massachusetts Institute of Technology"}
const isrank=ref(true);
</script>
<template>
  <div>
    <div v-if="resource != null&&inst != null">
      <div class="min-wh100 bg-primary" >
        <div class="flex-row">
          <div class="flex-1"></div>
          <div class="section-block">
            <div class="white-block section-padding bg-white margin-top-49">
                <div class="flex-row flex-center">
                    <div>
                        <div class="fc-black fw-500 f-18">{{ info.name }}</div>
                        <div class="fc-gray fw-400 f-15 margin-top-11">{{ info.name1 }}</div>
                    </div>
                    <div class="margin-left-15">
                        <img class=" wh-20" :src="uploadpath + 'resource/' + resource.info" />
                    </div>
                </div>
            </div>
            <div class="c-block bg-white margin-top-14">
                <div class="flex-row flex-center tab f-18 fw-bold fc-black" :class="{'tab2':isrank==false}"  >
                    <div class="flex-1 text-center" @click="isrank=true">排名</div>
                    <div class="flex-1 text-center" @click="isrank=false">P K</div>
                </div>
                <div class=" section-padding" v-if="isrank==true">
                    <div class="margin-top-14 f-19 fw-bold fc-black">实时排名</div>
                </div >
                <div  class=" section-padding" v-if="isrank==false">

                </div>
            </div>
          </div>
          <div class="flex-1"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
    .white-block{
        border-radius: 18px;
    }
    .c-block{
        border-radius: 18px;
    }
    .tab{
        height:52px;
        background-size: 100% 100%;
        background-image: url(http://applinkupload.oss-cn-shenzhen.aliyuncs.com/alucard263096/huipaimingkoube/resource/da278e4b6059d29e03f30d04f8bb5ac1_231121031607_1119226077.png);
    }
    .tab2{
        background-image: url(http://applinkupload.oss-cn-shenzhen.aliyuncs.com/alucard263096/huipaimingkoube/resource/d4789b7f397c42f6b5754f5b4b4095c2_231121033155_302015784.png);
    }
</style>
