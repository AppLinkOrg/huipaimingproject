<script setup>
import { PageHelper } from "./PageHelper";
import { ref, watch, createApp } from "vue";

import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";

import store from "./State";

let page = ref({});
let pathname = ref("");
let title = ref("");
PageHelper.Init(page, () => {});
PageHelper.kk = pathname;

const route = useRoute();

// createApp({}).component("nav-bar", {
//   props:{
//     propA:{
//       type:String,
//       default:''
//     },
//   }
// });
</script>

<template>
  <div id="app">
    <router-view />

    <van-number-keyboard safe-area-inset-bottom />
  </div>
</template>

<style>
#app {
}
body {
  -webkit-text-size-adjust: none !important;
}
.mainbody {
  width: 100vw;
  max-width: 1920px;
  background: white;
}
.big-bg {
  background: white;
  width: 100vw;
  min-height: 100vh;
}
.padding-ph {
  padding: 5px 10px 5px 5px;
}
.biao {
  width: 31px;
  height: 90px;
  background: #ecf5ff;
  border-radius: 5px;
}
.juanbao {
  width: 125px;
  height: 68px;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  height: 100%;
  will-change: transform;
  transition: all 500ms cubic-bezier(0.55, 0, 0.1, 1);
  position: absolute;
  backface-visibility: hidden;
}
.slide-right-enter-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.bg-w {
  background: white;
}
.bg-1 {
  background: #f6f6f6;
}
.bg-2 {
  background: #e4e4e4;
}
.bg-3 {
  background: #fc574f;
}
.bg-4 {
  background: #ecf5ff;
}
.bg-5 {
  background: linear-gradient(264deg, #409eff 0%, #67b0fd 100%);
}
.bg-6 {
  background: #409eff;
}
.bg-7 {
  background: linear-gradient(0deg, rgba(171, 207, 250, 0) 0%, #4497f7 100%);
}
.bg-8 {
  background: #cccccc;
}
.bg-9 {
  background: rgba(64, 158, 255, 0.1);
}

.w-100 {
  width: 100vw;
}
.w-100p {
  width: 100px;
}
.w-14 {
  width: 14px;
}
.w-110 {
  width: 110px;
}
.w-100f {
  width: 100%;
}
.wf-100 {
  width: 100%;
}
.w-90 {
  width: 90px;
}
.w-127 {
  width: 127px;
}
.h-m100 {
  min-height: 100vh;
}
.h-100b {
  height: 100%;
}
.h-1 {
  height: 1px;
}
.h-4 {
  height: 4px;
}
.h-13 {
  height: 13px;
}
.h-14 {
  height: 14px;
}
.h-17 {
  height: 17px;
}
.h-19 {
  height: 19px;
}
.h-22 {
  height: 22px;
}
.h-24 {
  height: 24px;
}
.h-25 {
  height: 25px;
}
.h-26 {
  height: 26px;
}
.h-30 {
  height: 30px;
}
.h-35 {
  height: 35px;
}
.h-38 {
  height: 38px;
}
.h-40 {
  height: 40px;
}
.h-44 {
  height: 44px;
}
.h-50 {
  height: 50px;
}
.h-53 {
  height: 53px;
}
.h-56 {
  height: 56px;
}
.h-60 {
  height: 60px;
}
.h-64 {
  height: 64px;
}
.h-68 {
  height: 68px;
}
.h-90 {
  height: 90px;
}
.h-93 {
  height: 93px;
}
.h-95 {
  height: 95px;
}
.h-100 {
  height: 100px;
}
.h-120 {
  height: 120px;
}
.h-130 {
  height: 130px;
}
.h-160 {
  height: 160px;
}
.h-200 {
  height: 200px;
}
.h-210 {
  height: 210px;
}
.h-215 {
  height: 215px;
}
.h-260 {
  height: 260px;
}
.h-270 {
  height: 270px;
}
.h-240 {
  height: 240px;
}
.h-300 {
  height: 300px;
}
.h-450 {
  height: 450px;
}
.h-518 {
  height: 518px;
}
.flex-none {
  flex: none;
}
.flex-row {
  display: flex;
}
.flex-1 {
  flex: 1;
}
.flex-2 {
  flex: 2;
}

.flex-wrap {
  flex-wrap: wrap;
}

.flex-center {
  align-content: center;
  align-items: center;
}
.flex-bottom {
  align-content: baseline;
  align-items: baseline;
}
.flex-column {
  align-content: center;
  align-items: center;
  flex-direction: column;
}
.minheight {
  min-height: 100vh;
}
.center {
  text-align: center;
}
.chaochu {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
.right {
  text-align: right;
}
.imgbox {
  display: flex;
}
.h100p {
  height: 100%;
}
.c-w {
  color: white;
}
.c-b {
  color: black;
}
.c-1 {
  color: #666666;
}
.c-2 {
  color: #333333;
}
.c-3 {
  color: #1890fe;
}
.c-4 {
  color: #fa625f;
}
.c-5 {
  color: #fb6260;
}
.c-6 {
  color: #409eff;
}
.c-7 {
  color: #999999;
}
.c-8 {
  color: #afb5c1;
}
.f-1 {
  font-size: 9px;
}
.f-2 {
  font-size: 11px;
}
.f-7 {
  font-size: 7px;
}
.f-8 {
  font-size: 8px;
}
.f-9 {
  font-size: 9px;
}
.f-10 {
  font-size: 10px;
}
.f-11 {
  font-size: 11px;
}
.f-12 {
  font-size: 12px;
}
.f-13 {
  font-size: 13px;
}
.f-14 {
  font-size: 14px;
}
.f-15 {
  font-size: 15px;
}
.f-16 {
  font-size: 16px;
}
.f-17 {
  font-size: 17px;
}
.f-18 {
  font-size: 18px;
}
.f-20 {
  font-size: 20px;
}
.f-24 {
  font-size: 24px;
}
.f-30 {
  font-size: 30px;
}
.f-32 {
  font-size: 32px;
}
.f-36 {
  font-size: 36px;
}
.f-40 {
  font-size: 40px;
}
.border-radius-2 {
  border-radius: 2px;
}
.border-radius-5 {
  border-radius: 5px;
}
.border-radius-9 {
  border-radius: 9px;
}
.border-radius-10 {
  border-radius: 10px;
}
.border-radius-11 {
  border-radius: 11px;
}
.border-radius-12 {
  border-radius: 12px;
}
.border-radius-13 {
  border-radius: 13px;
}
.border-radius-14 {
  border-radius: 14px;
}
.border-radius-15 {
  border-radius: 15px;
}
.border-radius-19 {
  border-radius: 19px;
}
.border-radius-20 {
  border-radius: 20px;
}
.border-radius-50 {
  border-radius: 50%;
}
.line-height-17 {
  line-height: 17px;
}
.line-height-18 {
  line-height: 18px;
}
.line-height-19 {
  line-height: 19px;
}
.line-height-22 {
  line-height: 22px;
}
.line-height-24 {
  line-height: 24px;
}
.line-height-25 {
  line-height: 25px;
}
.line-height-26 {
  line-height: 26px;
}
.line-height-30 {
  line-height: 30px;
}
.line-height-35 {
  line-height: 35px;
}
.line-height-38 {
  line-height: 38px;
}
.line-height-40 {
  line-height: 40px;
}
.line-height-44 {
  line-height: 44px;
}
.bd-1 {
  border: 1px solid #fa625f;
}
.bd-2 {
  border-bottom: 1px solid #1890fe;
  border-top: 1px solid #1890fe;
  border-left: 1px solid #1890fe;
}
.bd-3 {
  border: 1px solid #e4e4e4;
}
.bd-4 {
  border: 1px solid #cccccc;
}
.bd-5 {
  border: 1px solid #409eff;
}
.bd-6 {
  border-bottom: 1px solid #cccccc;
}

.btn-1 {
  width: 90px;
  height: 26px;
}
.bd-7 {
  border-bottom: 1px solid #409eff;
}
.bd-8 {
  border: 1px solid #fff;
}
.bd-9 {
  border: 1px solid #edeef2;
}

.button,
.button svg,
.button svg path {
  transition: all 0.2s linear;
}
.button:hover {
  background: #444;
  border-color: transparent;
  color: #fff;
}
.button {
  align-content: stretch;
  align-items: center;
  background-color: transparent;
  border: 2px solid #444;
  border-radius: 36px;
  color: #444;
  cursor: pointer;
  display: inline-flex;
  font-size: 18px;
  font-weight: 400;
  letter-spacing: normal;
  line-height: 1;
  margin: 16px 0;
  outline: none;
  padding: 10px 16px 6px;
  pointer-events: all;
  position: relative;
  text-align: center;
  transition: box-shadow 0.3s;
  white-space: nowrap;
  width: auto;
  z-index: 2;
}
[type="button"],
[type="reset"],
[type="submit"],
button {
  -webkit-appearance: button;
}
.button--slim-ghost-white {
  background: #fff;
  border-color: #fff;
  color: #444;
}
.solar-partners__title {
  color: #fff;
  font-size: 22px;
  font-weight: 400;
  letter-spacing: -0.44px;
  line-height: 1.27;
  margin: 0 auto 1.1rem;
  max-width: 74.8792vw;
  text-align: left;
}

.NewsroomContentFeatured__Date {
  color: #555;
  font-size: 32px;
  letter-spacing: -0.56px;
  line-height: 42px;
  transition: all 0.2s linear;
}
.padding-10 {
  padding: 10px;
}
.padding-15 {
  padding: 15px;
}
.padding-20 {
  padding: 20px;
}

.padding-left-4 {
  padding-left: 4px;
}
.padding-left-7 {
  padding-left: 7px;
}
.padding-left-10 {
  padding-left: 10px;
}
.padding-left-12 {
  padding-left: 12px;
}
.padding-left-14 {
  padding-left: 14px;
}
.padding-left-36 {
  padding-left: 36px;
}
.padding-left-30 {
  padding-left: 30px;
}
.padding-right-4 {
  padding-right: 4px;
}
.padding-right-7 {
  padding-right: 7px;
}
.padding-right-10 {
  padding-right: 10px;
}
.padding-right-12 {
  padding-right: 12px;
}
.padding-right-14 {
  padding-right: 14px;
}
.padding-right-30 {
  padding-right: 30px;
}
.padding-right-36 {
  padding-right: 36px;
}
.padding-top-10 {
  padding-top: 10px;
}
.padding-top-15 {
  padding-top: 15px;
}
.padding-top-20 {
  padding-top: 20px;
}
.padding-top-25 {
  padding-top: 25px;
}
.padding-top-5 {
  padding-top: 5px;
}
.padding-top-40 {
  padding-top: 40px;
}
.padding-L-R-15 {
  padding: 0 15px;
}
.padding-bottom-10 {
  padding-bottom: 10px;
}
.padding-bottom-15 {
  padding-bottom: 15px;
}
.padding-bottom-25 {
  padding-bottom: 25px;
}

.bold {
  font-weight: bold;
}
.f-bold {
  font-weight: 500;
}
.margin-auto {
  margin: auto;
}
.margin-top-4 {
  margin-top: 4px;
}
.margin-top-5 {
  margin-top: 5px;
}
.margin-top-6 {
  margin-top: 6px;
}
.margin-top-7 {
  margin-top: 7px;
}
.margin-top-8 {
  margin-top: 8px;
}
.margin-top-9 {
  margin-top: 9px;
}
.margin-top-10 {
  margin-top: 10px;
}
.margin-top-14 {
  margin-top: 14px;
}
.margin-top-15 {
  margin-top: 15px;
}
.margin-top-16 {
  margin-top: 16px;
}
.margin-top-20 {
  margin-top: 20px;
}
.margin-top-23 {
  margin-top: 23px;
}
.margin-top-25 {
  margin-top: 25px;
}
.margin-top-26 {
  margin-top: 26px;
}
.margin-top-30 {
  margin-top: 30px;
}
.margin-top-36 {
  margin-top: 36px;
}
.margin-top-40 {
  margin-top: 40px;
}
.margin-top-50 {
  margin-top: 50px;
}
.margin-top-60 {
  margin-top: 60px;
}
.margin-top-64 {
  margin-top: 64px;
}
.margin-top-74 {
  margin-top: 74px;
}
.margin-top-f78 {
  margin-top: -78px;
}
.margin-top-f120 {
  margin-top: -120px;
}
.margin-top-f160 {
  margin-top: -160px;
}
.margin-top-f200 {
  margin-top: -200px;
}
.margin-top-f260 {
  margin-top: -260px;
}
.margin-top-f300 {
  margin-top: -300px;
}
.margin-top-f518 {
  margin-top: -518px;
}
.margin-bottom-10 {
  margin-bottom: 10px;
}
.margin-bottom-14 {
  margin-bottom: 14px;
}
.margin-bottom-15 {
  margin-bottom: 15px;
}
.margin-bottom-18 {
  margin-bottom: 18px;
}
.margin-bottom-20 {
  margin-bottom: 20px;
}
.margin-left-4 {
  margin-left: 4px;
}
.margin-left-6 {
  margin-left: 6px;
}
.margin-left-10 {
  margin-left: 10px;
}
.margin-left-14 {
  margin-left: 14px;
}
.margin-left-18 {
  margin-left: 18px;
}
.margin-left-20 {
  margin-left: 20px;
}
.margin-left-26 {
  margin-left: 26px;
}
.margin-left-23 {
  margin-left: 23px;
}
.margin-left-30 {
  margin-left: 30px;
}
.margin-left-32 {
  margin-left: 32px;
}
.margin-left-40 {
  margin-left: 40px;
}
.margin-left-50 {
  margin-left: 50px;
}
.margin-right-5 {
  margin-right: 5px;
}
.margin-right-10 {
  margin-right: 10px;
}
.margin-right-12 {
  margin-right: 12px;
}
.margin-right-14 {
  margin-right: 14px;
}
.margin-right-16 {
  margin-right: 16px;
}
.margin-right-18 {
  margin-right: 18px;
}
.margin-right-20 {
  margin-right: 20px;
}
.margin-right-23 {
  margin-right: 26px;
}
.margin-right-26 {
  margin-right: 26px;
}
.margin-right-30 {
  margin-right: 30px;
}
.margin-right-32 {
  margin-right: 32px;
}
.margin-right-40 {
  margin-right: 40px;
}
.margin-L-R-15 {
  margin: 0 15px;
}
.icon-8 {
  width: 8px;
  height: 8px;
}
.icon-10 {
  width: 10px;
  height: 10px;
}
.icon-11 {
  width: 11px;
  height: 11px;
}
.icon-12 {
  width: 12px;
  height: 12px;
}
.icon-13 {
  width: 13px;
  height: 13px;
}
.icon-14 {
  width: 14px;
  height: 14px;
}
.icon-15 {
  width: 15px;
  height: 15px;
}
.icon-16 {
  width: 16px;
  height: 16px;
}
.icon-17 {
  width: 17px;
  height: 17px;
}
.icon-18 {
  width: 18px;
  height: 18px;
}
.icon-19 {
  width: 19px;
  height: 19px;
}
.icon-20 {
  width: 20px;
  height: 20px;
}
.icon-21 {
  width: 21px;
  height: 21px;
}
.icon-23 {
  width: 23px;
  height: 23px;
}
.icon-25 {
  width: 25px;
  height: 25px;
}
.icon-26 {
  width: 26px;
  height: 26px;
}
.icon-28 {
  width: 28px;
  height: 28px;
}
.icon-30 {
  width: 30px;
  height: 30px;
}
.icon-33 {
  width: 33px;
  height: 33px;
}
.icon-35 {
  width: 35px;
  height: 35px;
}
.icon-40 {
  width: 40px;
  height: 40px;
}
.icon-42 {
  width: 42px;
  height: 42px;
}
.icon-50 {
  width: 50px;
  height: 50px;
}
.icon-55 {
  width: 55px;
  height: 55px;
}
.icon-60 {
  width: 60px;
  height: 60px;
}
.icon-70 {
  width: 70px;
  height: 70px;
}
.icon-78 {
  width: 78px;
  height: 78px;
}
.icon-80 {
  width: 80px;
  height: 80px;
}
.icon-84 {
  width: 84px;
  height: 84px;
}
.icon-90 {
  width: 90px;
  height: 90px;
}
.icon-110 {
  width: 110px;
  height: 110px;
}
.icon-150 {
  width: 150px;
  height: 150px;
}
.icon-190 {
  width: 190px;
  height: 190px;
}
.icon-220 {
  width: 220px;
  height: 220px;
}
.displat-block {
  display: block;
}
/* .{
  overflow: scroll;
  overflow: hidden;
} */
.position-bottom {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
.position-top {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
}
.position-top2 {
  position: absolute;

  right: 0;
  top: 0;
}
input {
  /* text-align: right; */
  outline: none;
  border: none;
  width: 100%;
  background: none;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
}
::-webkit-scrollbar {
  display: none;
}
.moren {
  width: 30px;
  height: 18px;
  background: #ecf5ff;
  border-radius: 4px;
}
.htmlimg p > img {
  width: 100% !important;
}
.height-50 {
  height: 50px;
}
.height-46 {
  height: 46px;
}
.van-nav-bar .van-icon{
  color: black !important;
}
.potextbottom {
    width: 100vw;
    position: fixed;
    left: 0;
    bottom: 13px;
    z-index:2;
}
/deep/.van-nav-bar__title  {
  font-size: 16px;
}
.homeicon {
  width: 77px;
  height: 78px;
  position: fixed !important;
  right: 0;
  bottom: 80px;
  z-index: 100;
}


.van-search__field .van-field__left-icon .van-icon-search{
  color:#048693 !important;
}
</style>
