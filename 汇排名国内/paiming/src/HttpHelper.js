import Config from "./Config";
import Axios from "axios";
export class HttpHelper {
    static Sign = "";
    static Token = "";
    static TokenKey = "";
    static Unicode = "huipaimingchina";
    static Post(url, data) {
        var fullurl = Config.ApiUrl + url;
        var token = window.localStorage.getItem("token");
        var tokenkey = window.sessionStorage.getItem("v");
        return Axios.post(fullurl, HttpHelper.ParamUrlencoded(data), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Sign': HttpHelper.Sign,
                'Token': token,
                'TokenKey': tokenkey,
                'UNICODE': HttpHelper.Unicode
            }
        }).then((res) => {
            console.log(url, data, res.data);
            return res.data;
        });
    }
    static PostKoubei(url, data) {
        var fullurl = Config.ApiUrlKoubei + url;
        var token = window.localStorage.getItem("koubeitoken");
        return Axios.post(fullurl, HttpHelper.ParamUrlencoded(data), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Token': token,
                'UNICODE': "koubei"
            }
        }).then((res) => {
            console.log(url, data, res.data);
            return res.data;
        });
    }

    static UploadImage(module, completecallback) {

        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
                var localIds = res.localIds;
                // alert(JSON.stringify(res))

                // syncUpload(localIds,0)

                // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                //  imglist.value.push(localIds)


                wx.getLocalImgData({
                    localId: localIds.toString(),
                    success: function(res) {
                        // alert(JSON.stringify(res))
                        const localData = res.localData;
                        let imageBase64 = '';
                        if (localData.indexOf('data:image') == 0) {
                            //苹果的直接赋值，默认生成'data:image/jpeg;base64,'的头部拼接
                            imageBase64 = localData;
                        } else {
                            //此处是安卓中的唯一得坑！在拼接前需要对localData进行换行符的全局替换
                            //此时一个正常的base64图片路径就完美生成赋值到img的src中了
                            imageBase64 = 'data:image/jpeg;base64,' + localData.replace(/\n/g, '');
                        }
                        // imglist.value.push(imageBase64)
                        // alert(JSON.stringify('进来了'))
                        // var data =HttpHelper.UploadBase64(module,imageBase64)



                        HttpHelper.UploadBase64(module, imageBase64).then((ret) => {


                            completecallback(ret)

                            return ret

                        });


                    },
                    fail: function(res) {
                        alert(JSON.stringify(res))
                        return res

                    }

                });


            },
            fail: function(res) {
                alert(JSON.stringify(res))
            }
        });

    }

    static Getimage(module, completecallback) {

        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
                var localIds = res.localIds;
                // alert(JSON.stringify(res))

                // syncUpload(localIds,0)

                // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                //  imglist.value.push(localIds)


                wx.getLocalImgData({
                    localId: localIds.toString(),
                    success: function(res) {
                        // alert(JSON.stringify(res))
                        const localData = res.localData;
                        let imageBase64 = '';
                        if (localData.indexOf('data:image') == 0) {
                            //苹果的直接赋值，默认生成'data:image/jpeg;base64,'的头部拼接
                            imageBase64 = localData;
                        } else {
                            //此处是安卓中的唯一得坑！在拼接前需要对localData进行换行符的全局替换
                            //此时一个正常的base64图片路径就完美生成赋值到img的src中了
                            imageBase64 = 'data:image/jpeg;base64,' + localData.replace(/\n/g, '');
                        }
                        // imglist.value.push(imageBase64)
                        // alert(JSON.stringify('进来了'))
                        // var data =HttpHelper.UploadBase64(module,imageBase64)

                        completecallback(imageBase64)

                        //  HttpHelper.UploadBase64(module, imageBase64).then((ret) => {


                        //    completecallback(ret)

                        //    return ret 

                        //  });


                    },
                    fail: function(res) {
                        alert(JSON.stringify(res))
                        return res

                    }

                });


            },
            fail: function(res) {
                alert(JSON.stringify(res))
            }
        });

    }

    static UploadBase64(module, base64content) {

        // alert("进来了吗")
        var data = {
            module: module,
            base64: base64content,
            rettype: "json",
        };
        // alert(JSON.stringify(data))




        var fullurl = Config.FileUploadAPI;

        // alert(JSON.stringify(fullurl))
        // alert("进来了吗111")
        var token = window.localStorage.getItem("token");

        // var headers= {
        //   'Content-Type': 'application/x-www-form-urlencoded',
        //   'Sign': HttpHelper.Sign,
        //   'Token': token,
        //   'TokenKey': HttpHelper.TokenKey,
        //   'UNICODE': HttpHelper.Unicode
        // }
        // alert(JSON.stringify(headers))

        // alert("进来了吗111")
        return Axios.post(fullurl, HttpHelper.ParamUrlencoded(data), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Sign': HttpHelper.Sign,
                'Token': token,
                'TokenKey': HttpHelper.TokenKey,
                'UNICODE': HttpHelper.Unicode
            }
        }).then((res) => {
            //console.log(url, data, res.data);
            console.log("UploadBase64", res);
            //   alert(JSON.stringify('UploadBase64'))
            //  alert(JSON.stringify(res.data))
            return res.data;
        });

    }

    static datedifference(sDate1, sDate2) {
        var dateSpan,
            iDays;
        sDate1 = Date.parse(sDate1);
        sDate2 = Date.parse(sDate2);
        dateSpan = sDate2 - sDate1;
        //dateSpan = Math.abs(dateSpan);
        iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
        return iDays
    }

    static getNowDate() {
        var date = new Date();
        var sign1 = "-";
        var sign2 = ":";
        var year = date.getFullYear() // 年
        var month = date.getMonth() + 1; // 月
        var day = date.getDate(); // 日
        var hour = date.getHours(); // 时
        var minutes = date.getMinutes(); // 分
        var seconds = date.getSeconds() //秒
            //var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
            // var week = weekArr[date.getDay()];
            // 给一位数数据前面加 “0”
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (day >= 0 && day <= 9) {
            day = "0" + day;
        }
        if (hour >= 0 && hour <= 9) {
            hour = "0" + hour;
        }
        if (minutes >= 0 && minutes <= 9) {
            minutes = "0" + minutes;
        }
        if (seconds >= 0 && seconds <= 9) {
            seconds = "0" + seconds;
        }
        var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds;
        return currentdate;
    }

    static ParamUrlencoded(json) {
        var arr = new Array();
        for (let i in json) {
            arr.push(i + "=" + encodeURIComponent(json[i]));
        }
        return arr.join("&");
    }
}