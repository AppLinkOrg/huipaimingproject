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
</style>
