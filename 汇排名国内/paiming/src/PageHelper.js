import Config from "./Config";
import {
    HttpHelper
} from "./HttpHelper";
import { Utils } from "./Utils";
import { useRoute, useRouter } from "vue-router";
import { Toast } from "vant";






export class PageHelper {
    static InWechat = false;
    static Res = null;
    static Inst = null;
    static Text = null;
    static Memberinfo = null;
    static kk = "";
    // static Copy = null;


    static kk(page) {

        PageHelper.kk = res;
    }

    static Init(page) {
        let route = useRoute();
        if (route.query.openid != undefined && route.query.openid != '') {
            window.localStorage.setItem("token", route.query.openid);
        }

        if (route.query.lng != undefined && route.query.lng != '') {
            window.localStorage.setItem("lng", route.query.lng);
        }
        if (route.query.lat != undefined && route.query.lat != '') {
            window.localStorage.setItem("lat", route.query.lat);
        }



        console.log(page, 'page---');

        page.value.api = Config.ApiUrl;
        page.value.uploadpath = Config.UploadPath;
        page.value.fileupload = Config.FileUploadAPI;
        page.value.domain = window.location.protocol + "//" + window.location.host
        if (PageHelper.Res == null) {
            HttpHelper.Post("inst/resources", {}).then((res) => {
                page.value.Res = res;
                PageHelper.Res = res;
            });
        } else {
            page.value.Res = PageHelper.Res;
        }

        if (PageHelper.Inst == null) {
            HttpHelper.Post("inst/info", {}).then((res) => {
                res.footerstate = Utils.HtmlDecode(res.footerstate);
                page.value.Inst = res;
                PageHelper.Inst = res;
            });
        } else {
            page.value.Inst = PageHelper.Inst;
        }
    }

    static LoginAuth(page, callback) {
        let router = useRouter();
        var token = window.localStorage.getItem("token");
        console.log(token == null, 'token', );

        if (token != null) {
            // alert(token+'token')

            HttpHelper.Post("member/info2", {}).then((res) => {
                if (res == null) {
                    page.value.Memberinfo = null;
                    router.push('/login');
                    callback(null);

                } else {
                    page.value.Memberinfo = res;
                    // if(callback!=undefined){
                    //   page.value.Memberinfo = res;


                    //   callback(memberinfo);
                    // }

                    // callback(memberinfo);
                    callback(null);
                }

            });



        } else {
            let router = useRouter();
            router.push('/login');
        }

    }
    static wechatconfig = null;
    static loadwechatconfig(wxcallback) {
        // console.log("进来？")
        // console.log('-----',location.href.split('#')[0],'----')
        HttpHelper.Post("wechat/gensign", {
            url: location.href.split('#')[0]
        }).then((config) => {
            console.log(config, '多少')
            var json = {
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: config.appid, // 必填，公众号的唯一标识
                timestamp: config.timestamp, // 必填，生成签名的时间戳
                nonceStr: config.nonceStr, // 必填，生成签名的随机串
                signature: config.signature, // 必填，签名，见附录1
                jsApiList: ['getLocation', 'openLocation', 'chooseImage', 'scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            };
            console.log("wxconfig", config, json);
            wx.config(json);
            PageHelper.wechatconfig = json;

            // console.log("走不走22222？")
            // alert("555555555")

            wx.ready(function() {
                // alert("999999")
                if (wxcallback != undefined) {

                    wxcallback();
                }
            });


        });
    }

    static getUrlKey(name) { //获取url 参数
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
    }
    static loadwechat(page) {
        let viewer = window.navigator.userAgent.toLowerCase();

        console.log(viewer, '内容是什么', name)

        if (viewer.match(/MicroMessenger/i) == "micromessenger") {
            Toast("这里走不走啊");
            page.inwechat = true;

            console.log("这里走不走啊啊嗷嗷啊a")
                //直接调用微信支付
            let code = PageHelper.getUrlKey("code"); //获取url参数code
            Toast(code + "进这里没");

            console.log(code, 'cccccccccccccc')
            if (code) { //拿到code， code传递给后台接口换取opend
                Toast("进这里没222");
                HttpHelper.Post("member/getwechatinfo", {
                    code
                }).then((res) => {
                    console.log(res, 'tttttttttttttttttttt')
                    if (res.errcode == undefined) {
                        localStorage.setItem("openid", res.openid);
                        PageHelper.loadwechatconfig(page);
                    }
                });
            } else {
                console.log(PageHelper.Inst);
                PageHelper.getCodeApi(PageHelper.Inst.appid);
            }
        }
    }

    static Copy(str) {
        var _input = document.createElement("input"); // 直接构建input
        _input.value = str; // 设置内容
        document.body.appendChild(_input); // 添加临时实例
        _input.select(); // 选择实例内容
        document.execCommand("Copy"); // 执行复制
        document.body.removeChild(_input); // 删除临时实例
        Toast("复制成功");
    }



}