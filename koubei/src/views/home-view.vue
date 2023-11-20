<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'
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
const iszh=ref(true);
const list=ref([
  { "id": 1, "name": "清华大学", "name1": "qinghua" },
  { "id": 2, "name": "北京大学", "name1": "beijingdaxue" },
  { "id": 3, "name": "复旦大学", "name1": "fudandaxue" },
  { "id": 4, "name": "上海交通大学", "name1": "shanghaijiaotongdaxue" },
  { "id": 5, "name": "武汉大学", "name1": "wuhandaxue" },
  { "id": 6, "name": "南京大学", "name1": "nanjingdaxue" },
  { "id": 7, "name": "中山大学", "name1": "zhongshandaxue" },
  { "id": 8, "name": "同济大学", "name1": "tongjidaxue" },
  { "id": 9, "name": "华中科技大学", "name1": "huazhongkejidaxue" },
  { "id": 10, "name": "浙江大学", "name1": "zhejiangdaxue" },
  { "id": 11, "name": "四川大学", "name1": "sichuandaxue" },
  { "id": 12, "name": "电子科技大学", "name1": "dianzikejidaxue" },
  { "id": 13, "name": "西安交通大学", "name1": "xianjiaotongdaxue" },
  { "id": 14, "name": "哈尔滨工业大学", "name1": "haerbangongyedaxue" }
]
);
</script>
<template>
  <div>
    <div v-if="resource != null&&inst != null">
      <div class="flex-row">
        <div class="flex-1"></div>
        <img class="banner" :src="uploadpath + 'resource/' + resource.banner" />
        <div class="flex-1"></div>
      </div>
      <div class="flex-row">
          <div class="flex-1"></div>
          <div class="section-block">
            <div class="searchbox flex-row flex-center">
                <div class="flex-1">
                    <div class="flex-row flex-center">
                        <img class="search-icon wh-16 margin-left-15 margin-right-15" :src="uploadpath + 'resource/' + resource.search" />
                        <input class="flex-1 margin-right-5 input" placeholder="请输入大学中文或英文名称" />
                    </div>
                </div>
                <div class="searchboxbtn hp-100 flex-row flex-center bg-primary f-15 fc-white fw-500">
                    <div  class="hp-100 flex-1"></div>
                    <div>搜索</div>
                    <div  class="hp-100 flex-1"></div>
                </div>
            </div>
            <div class="memberdianping bg-primary margin-top-14 flex-row flex-center">
                <img class=" wh-24 margin-left-15 margin-right-15" :src="uploadpath + 'resource/' + resource.thumb" />
                <div class="f-18 fw-bold fc-white margin-left-10">我要点评</div>
                <div class="flex-1"></div>
                <div class="f-11 fc-white fw-500 opacity">I want a review</div>
                <img class=" wh-10 margin-left-5 margin-right-15" :src="uploadpath + 'resource/' + resource.right" />
            </div>
            <div class="hotsearch margin-top-14 flex-row flex-center">
                <div class="f-18 fw-bold fc-black">热门搜索</div>
                <img @click="iszh=!iszh" class=" wh-30 margin-left-10" :src="uploadpath + 'resource/' + (iszh?resource.zh:resource.en)" />
            </div>
            <div class="margin-top-22">
                <block v-for="(item, index) in list" :key="index">
                    <RouterLink  :to="'/university/'+item.id" class="flex-row flex-center result-item">
                        <div class="f-16 fw-bold no" :class="{ is123: index<3?true:false}">{{index+1}}</div>
                        <div class="f-15 fw-500 fc-black">{{iszh?item.name:item.name1}}</div>
                    </RouterLink>
                </block>
            </div>
          </div>
          <div class="flex-1"></div>
      </div>
      <div class="member flex-row flex-center">
        <div class="flex-1"></div>
        <div class="text-center">
            <img class=" wh-20 " :src="uploadpath + 'resource/' + resource.member" />
            <div  class="fc-primary fw-500 f-12">我的</div>
        </div>
        <div class="flex-1"></div>
      </div>
      <div class="last-space"></div>
      <div class="bottom-block">
        <div class="flex-row flex-center">
          <div class="flex-1"></div>
            <div class="text-center">
                <div>
                    <RouterLink class="fc-primary" to="/content?code=aboutus">关于我们</RouterLink> 丨 <RouterLink class="fc-primary" to="/content?code=feedback">意见反馈</RouterLink>
                </div>
                <div class="margin-top-5 "><span class="fc-gray f-12">{{ inst.banquan2 }}</span></div>
            </div>
          <div class="flex-1"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.banner{
    margin-top:86px;
    width:294px;
}
.searchbox{
    margin-top: 40px;
    width: 100%;
    height: 52px;
    border: 1px solid #048693;
    border-radius: 7px;
}
.searchboxbtn{
    width: 66px;
    height: 100%;
    border-radius: 0px 7px 7px 0px;
}
.memberdianping{
    border-radius: 7px;
    height: 52px;
}
.hotsearch{
    margin-top: 37px;
}
.no{
    width:20px;
    color:#F19D00;
}
.no.is123{
    color:#E54758;
}
.result-item{
    margin-bottom: 30px;
}
.member{
    width: 59px;
height: 59px;
background: #04869333;
border-radius: 50%;
position: fixed;
      bottom: 80px; /* 距离底部的距离 */
      right: 15px; /* 距离右侧的距离 */
}
.last-space{
    height: 100px;
}
</style>
