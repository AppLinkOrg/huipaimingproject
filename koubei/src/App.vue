<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <RouterView />
</template>
<style>
.van-nav-bar {
  background-color: #048695 !important;
}
.van-nav-bar__title {
  font-size: 24px !important;
  color: white !important;
}
.van-nav-bar{
  line-height: unset !important;
}
.van-nav-bar__arrow{
  font-size: 24px !important;
}
.van-nav-bar__content {
  height: 50px !important;
  border-color: #048695;
}
.van-hairline--bottom:after {
  border-bottom-width: 0px !important;
}
.van-nav-bar .van-icon {
  color: white !important;
}


.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  padding: 20px;
  width: 320px;
  min-height: 450px;
  background-color: #fff;
  border-radius: 20px;
}

.infoblock {
  min-width: 237px;
  padding: 27px 15px;
  background: #ffffff;
  border-radius: 17px;
}
</style>
