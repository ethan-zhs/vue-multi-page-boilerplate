import Utils from '../../utils/utils';

const APP_ID = {
    1: 'appid1',
    3: 'appid2'
};
const APP_TYPE = 3;

/**
 * [微信接口参数]
 * @param [type] name [description]
*/
export function weChatData() {
    const params = Utils.urlParams();
    const href = window.location.href.split('#')[0];
    const body = {
        url: href,
        type: APP_TYPE
    };
    return {
        bodyStream: JSON.stringify(body),
        header: {
            userId: params.userId || 0,
            deviceId: params.deviveId || 'IMEI_0',
            newsApp: 'NEWS_APP',
        }
    };
}

/**
 * [微信接口参数]
 * @param [data] 请求参数
 */
export function weChatRequestData() {
    const params = Utils.urlParams();
    return {
        appType: APP_TYPE,
        header: {
            userId: params.userId || 0,
            deviceId: params.deviveId || 'IMEI_0',
            newsApp: 'NEWS_APP',
        }
    };
}

export function weChatConfig(res) {
    const wx = window.wx || {};
    wx.error((error) => {
        console.log(error);
    });
    wx.config({
        debug: false,
        appId: APP_ID[APP_TYPE],
        timestamp: res.timestamp,
        nonceStr: res.nonceStr,
        signature: res.signature,
        jsApiList: [
            'updateAppMessageShareData',
            'updateTimelineShareData',

            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'getNetworkType',

            'startRecord',
            'stopRecord',
            'onVoiceRecordEnd',
            'playVoice',
            'pauseVoice',
            'stopVoice',
            'onVoicePlayEnd',
            'uploadVoice',
            'downloadVoice',
        ]
    });
}


/**
 * 版本1.0.0
 * [微信分享初始化]
 * @param [object] data [title: 标题, imgUrl: 封面, desc: 描述, link: 分享url]
*/
export function weChatShare(data) {
    const wx = window.wx || {};
    wx.ready(function () {
        wx.onMenuShareAppMessage({
            title: data.title,
            desc: data.desc,
            link: data.link || window.location.href,
            imgUrl: data.imgUrl,
        });

        wx.onMenuShareTimeline({
            title: data.title,
            link: data.link || window.location.href,
            imgUrl: data.imgUrl,
        });

        wx.onMenuShareQQ({
            title: data.title,
            desc: data.desc,
            link: data.link || window.location.href,
            imgUrl: data.imgUrl,
        });

        wx.onMenuShareWeibo({
            title: data.title,
            desc: data.desc,
            link: data.link || window.location.href,
            imgUrl: data.imgUrl,
        });

        wx.onMenuShareQZone({
            title: data.title,
            desc: data.desc,
            link: data.link || window.location.href,
            imgUrl: data.imgUrl,
        });
    });
}


/**
 * 版本1.4.0
 * [微信分享初始化]
 * @param [object] data [title: 标题, imgUrl: 封面, desc: 描述, link: 分享url]
*/
export function weChatShareNew(data) {
    const wx = window.wx || {};
    wx.ready(function () {
        /**
         * 获取“分享到朋友”按钮点击状态及自定义分享内容接口（即将废弃）
         */
        wx.onMenuShareAppMessage({
            title: data.title,
            desc: data.desc,
            link: data.link || window.location.href,
            imgUrl: data.imgUrl,
            success: function () {
                // 用户点击了分享后执行的回调函数
                if (data.success && typeof data.success == 'function') {
                    data.success();
                }
            }
        });

        /**
         * 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口（即将废弃）
         */
        wx.onMenuShareTimeline({
            title: data.title,
            link: data.link || window.location.href,
            imgUrl: data.imgUrl,
            success: function () {
                // 用户点击了分享后执行的回调函数
                if (data.success && typeof data.success == 'function') {
                    data.success();
                }
            }
        });

        /**
         * 获取“分享到QQ”按钮点击状态及自定义分享内容接口（即将废弃）
         */
        wx.onMenuShareQQ({
            title: data.title,
            desc: data.desc,
            link: data.link || window.location.href,
            imgUrl: data.imgUrl,
            success: function () {
                // 用户确认分享后执行的回调函数
                if (data.success && typeof data.success == 'function') {
                    data.success();
                }
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                if (data.cancel && typeof data.cancel == 'function') {
                    data.cancel();
                }
            }
        });

        /**
         * 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
         */
        wx.onMenuShareWeibo({
            title: data.title,
            desc: data.desc,
            link: data.link || window.location.href,
            imgUrl: data.imgUrl,
            success: function () {
                // 用户确认分享后执行的回调函数
                if (data.success && typeof data.success == 'function') {
                    data.success();
                }
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                if (data.cancel && typeof data.cancel == 'function') {
                    data.cancel();
                }
            }
        });

        /**
         * 获取“分享到QQ空间”按钮点击状态及自定义分享内容接口（即将废弃）
         */
        wx.onMenuShareQZone({
            title: data.title,
            desc: data.desc,
            link: data.link || window.location.href,
            imgUrl: data.imgUrl,
            success: function () {
                // 用户确认分享后执行的回调函数
                if (data.success && typeof data.success == 'function') {
                    data.success();
                }
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                if (data.cancel && typeof data.cancel == 'function') {
                    data.cancel();
                }
            }
        });
    });
}

export function wechatNetstatus() {
    let network = 'wifi';
    const wx = window.wx || {};

    wx.ready(function () {
        wx.getNetworkType({
            success: function (res) {
                network = res.networkType; // 返回网络类型2g，3g，4g，wifi
            }
        });
    });
    return network;
}
