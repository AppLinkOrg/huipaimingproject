<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import Config from '../httphelper/Config'
import { HttpHelper } from '../httphelper/HttpHelper'
import { showToast, showDialog } from 'vant'
import { onMounted } from 'vue'
import { Utils } from '../utils/Utils'

const route = useRoute()
const router = useRouter()
const uploadpath = Config.UploadPath
const resource = ref(null)
HttpHelper.Post('inst/resources').then((data) => {
  resource.value = data
})
const inst = ref(null)
HttpHelper.Post('inst/info').then((data) => {
  inst.value = data
})
const member = ref(null)
HttpHelper.Post('member/info').then((data) => {
  if (data == null) {
    router.push('/login')
    return
  }
  member.value = data
})
const iszh = ref(true)
const list = ref([])
HttpHelper.Post('daxue/top10').then((data) => {
  list.value = data
})

var pagesection = ref()
onMounted(() => {
  console.log('pagesection', pagesection.value)
  pagesection.value.style.height = Utils.getAdjustedPageHeight() + 'px'
  route.meta.title = '汇排名'
})
const gotoMember = () => {
  if (window.location.href.indexOf('localhost') > -1) {
    window.location.href = 'http://localhost:5173/member'
  } else {
    window.location.href = inst.value.koubeiurl + '/member'
  }
}
const gotoCategory = () => {
  if (window.location.href.indexOf('localhost') > -1) {
    window.location.href = 'http://localhost:5173'
  } else {
    window.location.href = inst.value.koubeiurl
  }
}
const gotoDianping = () => {
  router.push('/dianping')
}
const keyword = ref('')
const searchlist = ref([])
var insearch = false
var showresultbox = ref(false)
var inclick=false;
const searchButtonClick=()=>{
  if(inclick==true){
    return
  }
  inclick=true;
  if(keyword.value.trim()==''){
    return
  }
  HttpHelper.Post("daxue/daxuelist", {
    needfullname:"Y",
    searchname: keyword.value,
    limit: '0,1'
  }).then((daxuelist) => {
    inclick=false;
    if(daxuelist.length>0){
      tiaozhuan(daxuelist[0].id);
    }else{
      showDialog({
        title: '提示',
        message: inst.value.nosearchschool,
        theme: 'round-button',
        confirmButtonColor:"#048694 "
      });
    }
  });
}
const search = () => {
  if (insearch == true) {
    return
  }
  showresultbox.value = true
  if (keyword.value.trim() == '') {
    keyword.value = ''
    searchlist.value = []
    return
  }
  insearch = true
  HttpHelper.Post('daxue/daxuelist', {
    keywords: keyword.value
  }).then((daxuelist) => {
    insearch = false
    searchlist.value = daxuelist
    // if (daxuelist.length == 0) {
    //   showToast("搜索结果不存在，请检查关键字")
    //   showDialog({
    //     title: '提示',
    //     message: '搜索结果不存在，请检查关键字',
    //     confirmButtonText:"确认"
    //   })
    // }
  })
}
var aaa=false;
const tiaozhuan=(daxue_id)=>{
  if(aaa==true){
    return
  }
  aaa=true;
  HttpHelper.Post("member/info", {}).then((info) => {
    aaa=false;
    if(info==null||parseInt(info.jifen)<=0){
      showDialog({
        title: '提示',
        message: inst.value.tips,
        theme: 'round-button',
        confirmButtonColor:"#048694 "
      });
      return
    }
    HttpHelper.Post("member/usejifen", {});
    HttpHelper.Post('member/searchrecord', { daxue_id })
    
    router.push({ path:"/university/"+daxue_id });
  });
}
</script>
<template>
  <div>
    <div class="hw100" v-if="showresultbox" @click="showresultbox = false"></div>
  </div>

  <div class="flex-column" ref="pagesection">
    <div class="flex-1">
      <div v-if="resource != null && inst != null">
        <div class="pk">
          <div class="flex-row">
            <div class="flex-1"></div>
            <img class="banner" :src="uploadpath + 'resource/' + resource.banner" />
            <div class="flex-1"></div>
          </div>
          <div class="flex-row">
            <div class="flex-1"></div>
            <div class="section-block">
              <div class="searchbox flex-row flex-center" id="searchid">
                <div class="flex-1">
                  <div class="flex-row flex-center">
                    <img
                      class="search-icon wh-16 margin-left-15 margin-right-15"
                      :src="uploadpath + 'resource/' + resource.search"
                    />
                    <input
                      class="flex-1 margin-right-5 input"
                      :placeholder="inst.searchtips2"
                      v-model="keyword"
                      @update:model-value="search"
                    />
                  </div>
                </div>
                <div
                  class="searchboxbtn hp-100 flex-row flex-center bg-primary f-15 fc-white fw-500"
                  style="z-index: 65535;"
                  id="searchid4"
                  @click="searchButtonClick"
                >
                  <div class="hp-100 flex-1"></div>
                  <div>搜索</div>
                  <div class="hp-100 flex-1"></div>
                </div>
              </div>

              <div
                class="searchtipbox"
                v-if="showresultbox == true && searchlist.length > 0"
                id="searchid2"
              >
                <block v-for="(item, index) in searchlist" :key="index">
                  <div @click="tiaozhuan(item.id,true)">
                    <div class="padding-s" >{{ item.name }}</div>
                  </div>
                </block>
              </div>
              <div
                class="searchtipbox"
                v-if="showresultbox == true && searchlist.length == 0"
                id="searchid3"
              >
                <div class="padding-s">没有找到相关大学数据</div>
              </div>

              <div
                class="memberdianping bg-primary margin-top-14 flex-row flex-center"
                @click="gotoDianping"
              >
                <img
                  class="wh-24 margin-left-15 margin-right-15"
                  :src="uploadpath + 'resource/' + resource.thumb"
                />
                <div class="f-18 fw-bold fc-white margin-left-10">我要投票</div>
                <div class="flex-1"></div>
                <div class="f-16 fc-white fw-500 opacity">Vote</div>
                <img
                  class="wh-20 margin-left-5 margin-right-15"
                  :src="uploadpath + 'resource/' + resource.right"
                />
              </div>
              <!-- <block v-if="searchlist.length">
              <div class="hotsearch margin-top-14 flex-row flex-center">
                <div class="f-18 fw-bold fc-black">搜索结果</div>
                <img
                  @click="iszh = !iszh"
                  class="wh-30 margin-left-10"
                  :src="uploadpath + 'resource/' + (iszh ? resource.zh : resource.en)"
                />
              </div>
              <div class="margin-top-22">
                <block v-for="(item, index) in searchlist" :key="index">
                  <block v-if="index<30">
                  <RouterLink :to="'/university/' + item.id" class="flex-row flex-center result-item">
                    <div class="f-15 fw-500 fc-black" @click="addsearchresult(item.id)">{{ iszh ? item.name : item.name1 }}</div>
                  </RouterLink>
                </block>
                </block>
              </div>
              <div class="margin-top-22 f-12 fw-500 fc-gray" v-if="searchlist.length>30">搜索结果仅显示前30条，请增加关键字以缩小搜索结果</div>
            </block> -->
              <div class="hotsearch margin-top-14 flex-row flex-center">
                <div class="f-18 fw-bold fc-black">Top 10</div>
                <img
                  @click="iszh = !iszh"
                  class="wh-30 margin-left-10"
                  :src="uploadpath + 'resource/' + (iszh ? resource.zh : resource.en)"
                />
              </div>
              <div class="margin-top-22">
                <block v-for="(item, index) in list" :key="index">
                  <div @click="tiaozhuan(item.id,true)"
                    class="flex-row flex-center result-item"
                  >
                    <div class="f-13 no" :class="{ is123: index < 3 ? true : false }">
                      {{ item.seq }}
                    </div>
                    <div class="f-13 fc-black">
                      {{ iszh ? item.name : item.name1 }}
                    </div>
                  </div>
                </block>
              </div>
            </div>
            <div class="flex-1"></div>
          </div>
        </div>
        <div class="category flex-row flex-center" @click="gotoCategory">
          <div class="flex-1"></div>
          <div class="text-center">
            <img class="wh-20" :src="uploadpath + 'resource/' + resource.home" />
            <div class="fc-primary fw-500 f-12">首页</div>
          </div>
          <div class="flex-1"></div>
        </div>
        <div class="member flex-row flex-center" @click="gotoMember">
          <div class="flex-1"></div>
          <div class="text-center">
            <img class="wh-20" :src="uploadpath + 'resource/' + resource.member" />
            <div class="fc-primary fw-500 f-12">我的</div>
          </div>
          <div class="flex-1"></div>
        </div>
        <div class="last-space"></div>
        <div class="bottom-block bg-white"></div>
      </div>
    </div>
    <div class="bottom-block">
      <div class="flex-row flex-center"  v-if="inst!=null">
        <div class="flex-1"></div>
        <div class="text-center">
          <div>
            <RouterLink class="fc-primary" to="/aboutus">关于我们</RouterLink> 丨
            <RouterLink class="fc-primary" to="/feedback">意见反馈</RouterLink>
          </div>
          <div class="margin-top-5">
            <span class="fc-gray f-12">{{ inst.banquan2 }}</span>
          </div>
        </div>
        <div class="flex-1"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.banner {
  margin-top: 26px;
  width: 294px;
}
.searchbox {
  margin-top: 20px;
  width: 100%;
  height: 52px;
  border: 1px solid #048693;
  border-radius: 7px;
}
.searchboxbtn {
  width: 66px;
  height: 100%;
  border-radius: 0px 7px 7px 0px;
}
.memberdianping {
  border-radius: 7px;
  height: 52px;
}
.hotsearch {
  margin-top: 10px;
}
.no {
  width: 20px;
  color: #f19d00;
}
.no.is123 {
  color: #e54758;
}
.result-item {
  margin-bottom: 20px;
}

.searchtipbox {
  position: absolute;
  width: 350px;
  border-radius: 0 0 10px 10px;
  border: 1px solid #048693;
  border-top: none;
  overflow: scroll;
  background: #ffffff;
  z-index: 2;
  padding-bottom: 10px;
  z-index: 101;
  max-height: 250px;
}
.padding-s {
  color: black;
  padding: 5px 10px;
  font-size: 16px;
}
.hw100 {
  width: 100vw;
  height: 100vh;
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
}

.category {
  width: 59px;
  height: 59px;
  background: #04869333;
  border-radius: 50%;
  position: fixed;
  bottom: 150px; /* 距离底部的距离 */
  right: 15px; /* 距离右侧的距离 */
}

.member {
  width: 59px;
  height: 59px;
  background: #04869333;
  border-radius: 50%;
  position: fixed;
  bottom: 80px; /* 距离底部的距离 */
  right: 15px; /* 距离右侧的距离 */
}
</style>
