"use strict";

(function () {
    $.ajax({
        url: "http://106.14.135.243:8082/index/coupon/activtyContent",
        type: "POST",
        data: {},
        async: true,
        dataType: "json",
        success: function success(data) {
            /* 微信监控 */
            var title = data.data.share.title,
                link = data.data.share.url,
                imgurl = data.data.share.img,
                desc = data.data.share.content;
            $.ajax({
                url: "https://www.zujiekeji.cn/index/wechat/getSignature",
                type: "GET",
                data: {
                    "url": link
                },
                async: true,
                dataType: "json",
                success: function success(data) {
                    wx.config({
                        debug: false,
                        appId: data.data.appId,
                        timestamp: data.data.timestamp,
                        nonceStr: data.data.nonceStr,
                        signature: data.data.signature,
                        jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ"]
                    });
                    wx.error(function (res) {
                        /*  alert(JSON.stringify(res)); */
                    });
                },
                error: function error(_error) {
                    /*  alert(JSON.stringify(error)); */
                }
            });

            wx.ready(function (res) {
                //分享给朋友
                wx.onMenuShareAppMessage({
                    title: title,
                    desc: desc,
                    link: link,
                    imgUrl: imgurl,
                    trigger: function trigger(res) {},
                    success: function success(res) {},
                    cancel: function cancel(res) {},
                    fail: function fail(res) {}
                });
                //分享到朋友圈
                wx.onMenuShareTimeline({
                    title: title,
                    link: link,
                    imgUrl: imgurl,
                    success: function success(res) {},
                    cancel: function cancel(res) {}
                });
                wx.onMenuShareQQ({
                    title: title,
                    desc: desc,
                    link: link,
                    imgUrl: imgurl,
                    success: function success(res) {},
                    cancel: function cancel(res) {}
                });
            });
        },
        error: function error(_error2) {}
    });
})();

/* 分享出去领取优惠券 */
function getCard(data) {
    $.ajax({
        url: "http://106.14.135.243:8082/index/coupon/receiveShareCoupon",
        type: "POST",
        async: true,
        data: data,
        dataType: "json",
        success: function success(data) {
            /* 领取优惠券成功 */
            confrim.style.display = 'flex';
        },
        error: function error(_error3) {
            /*  alert(JSON.stringify(error)); */
        }
    });
}
/* 提示框 */
var confrim = document.querySelector('.share_main_chose');

var shareConfrim = document.querySelector('.share_main_openLink');

document.querySelector(".share_main_getCard--click").addEventListener('click', function () {
    var val = document.querySelector(".share_main_mobile").value;
    if (!/^1[3|4|5|8][0-9]\d{4,8}$/.test(val)) {
        alert("请输入正确的手机号码");
        document.querySelector(".share_main_mobile").focus();
        return false;
    }
    getCard();
});

document.querySelector(".share_main_use").addEventListener('click', function () {
    window.location.href = "/";
});

document.querySelector(".share_main_share").addEventListener('click', function () {
    shareConfrim.style.display = 'block';
});

var link = window.location.href;
var imgurl = "https://s.zujiekeji.cn/img/zuling.png";
var desc = "租介：让共享成为一种新的生活方式，让社会资源不再无序浪费";
$.ajax({
    url: "{:url('wechat/getSignature')}",
    type: "GET",
    data: {
        "url": link
    },
    async: true,
    dataType: "json",
    success: function success(data) {
        wx.config({
            debug: false,
            appId: data.data.appId,
            timestamp: data.data.timestamp,
            nonceStr: data.data.nonceStr,
            signature: data.data.signature,
            jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ"]
        });
        wx.error(function (res) {
            /*  alert(JSON.stringify(res)); */
        });
    },
    error: function error(_error4) {
        /*  alert(JSON.stringify(error)); */
    }
});

wx.ready(function (res) {
    //分享给朋友
    wx.onMenuShareAppMessage({
        title: document.title,
        desc: desc,
        link: link,
        imgUrl: imgurl,
        trigger: function trigger(res) {},
        success: function success(res) {},
        cancel: function cancel(res) {},
        fail: function fail(res) {}
    });
    //分享到朋友圈
    wx.onMenuShareTimeline({
        title: document.title,
        link: link,
        imgUrl: imgurl,
        success: function success(res) {},
        cancel: function cancel(res) {}
    });
    wx.onMenuShareQQ({
        title: document.title,
        desc: desc,
        link: link,
        imgUrl: imgurl,
        success: function success(res) {},
        cancel: function cancel(res) {}
    });
});