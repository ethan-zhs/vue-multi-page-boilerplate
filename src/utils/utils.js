const ua = navigator.userAgent;
const isWeixin = ua.match(/micromessenger/gi);
const isWeibo = ua.match(/WeiBo/i);
const isQQ = ua.match(/QQ/i);
const isAndroid = ua.toLowerCase().match(/android/i);
const isIOS = ua.match(/(iPhone|iPod|iPad);?/i);
const isWindowsWexin = ua.match(/windowswechat/gi);
const isMobile = !!ua.match(/AppleWebKit.*Mobile.*/);

/**
 *  [分享触发]
 *  @param [type] name [description] 
 */
const onNativeMenuShare = (options) => {
    const _trigger = options.trigger;
    const _success = options.success;
    const _cancel = options.cancel;
    return {
        trigger: (opts) => {
            const _opts = typeof opts == 'string' ? JSON.parse(opts) : opts;
            _trigger && _trigger(_opts);
        },
        success: (opts) => {
            const _opts = typeof opts == 'string' ? JSON.parse(opts) : opts;
            _success && _success(_opts);
        },
        cancel: (opts) => {
            const _opts = typeof opts == 'string' ? JSON.parse(opts) : opts;
            _cancel && _cancel(_opts);
        }
    };
};


/**
 *  [全局获取URL参数方法]
 *  @param [string] testParam [测试参数字符串]
 *  @param [bool] preview [是否预览]
*/
const urlParams = () => {
    const paramObj = {};
    const url = window.location.href;
    if (url.split('?')[1]) {
        const paramsStr = url.split('?')[1];
        const paramList = paramsStr.split('&');
        paramList.forEach(item => {
            const [name, value] = item.split('=');
            paramObj[name] = value;
        });
    }
    let userInfo = sessionStorage.getItem('userInfo');
    try {
        userInfo = userInfo && userInfo != '' ? JSON.parse(userInfo) : {};
    } catch (error) {
        userInfo = {};
    }

    return {
        ...paramObj,
        ...userInfo
    };
};


// 存储COOKIE
const setCookie = (cname, value, expiredays) => {
    const exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = cname + '=' + escape(value)
        + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString());
};


// 获取COOKIE
const getCookie = (cname) => {
    if (document.cookie.length > 0) {
        let cStart = document.cookie.indexOf(cname + '=');
        if (cStart != -1) {
            cStart = cStart + cname.length + 1;
            let cEnd = document.cookie.indexOf(';', cStart);
            if (cEnd == -1) cEnd = document.cookie.length;
            return unescape(document.cookie.substring(cStart, cEnd));
        }
    }
    return false;
};

/**
 * 获取app用户登陆信息
 * 低版本不支持getUserInfo()
 * 则sessionStorage无userinfo
 */
const getAppUserInfo = () => {
    const userInfo = sessionStorage.getItem('userinfo');
    try {
        if (userInfo) {
            return JSON.parse(userInfo).data;
        }
    } catch (error) {
        console.log(error);
    }
    return {};
};


/**
 * 计算视频时长
 */
const videoTimer = (secondTotal, type) => {
    const hour = parseInt(secondTotal / 3600, 10);
    const minute = parseInt((secondTotal % 3600) / 60, 10);
    const minuteTotal = parseInt(secondTotal / 60, 10);
    const second = secondTotal % 60;

    if (type === 'hour') {
        return (hour < 10 ? `0${hour}` : hour) + ':' + (minute < 10 ? `0${minute}` : minute) + ':' + (second < 10 ? `0${second}` : second);
    }

    return (minuteTotal < 10 ? `0${minuteTotal}` : minuteTotal) + ':' + (second < 10 ? `0${second}` : second);
};

/**
 * 格式化时间
 */
const timeFormat = (dateInfo, type) => {
    const fmtObj = {
        year: dateInfo.getFullYear(),
        month: dateInfo.getMonth() + 1,
        date: dateInfo.getDate(),
        hour: dateInfo.getHours(),
        minute: dateInfo.getMinutes(),
        second: dateInfo.getSeconds()
    };

    const keys = Object.keys(fmtObj);

    keys.forEach(key => {
        fmtObj[key] = fmtObj[key] < 10 ? '0' + fmtObj[key] : fmtObj[key];
    });

    const {
        year, month, date, hour, minute, second
    } = fmtObj;
    let dateData = [year, month, date].join('-');
    const timeData = [hour, minute, second].join(':');

    switch (type) {
        case 'yyyy-MM-dd':
            dateData = [year, month, date].join('-');
            return dateData;
        case 'yyyy/MM/dd':
            dateData = [year, month, date].join('/');
            return dateData;
        case 'yyyyMMdd':
            dateData = [year, month, date].join('');
            return dateData;
        case 'yyyy-MM-dd hh:mm:ss':
            dateData = [year, month, date].join('-');
            return dateData + ' ' + timeData;
        case 'yyyy/MM/dd hh:mm:ss':
            dateData = [year, month, date].join('/');
            return dateData + ' ' + timeData;
        default: return dateData + ' ' + timeData;
    }
};


export default {
    isWeixin,
    isWeibo,
    isQQ,
    isAndroid,
    isIOS,
    isMobile,
    isWindowsWexin,
    onNativeMenuShare,
    urlParams,
    setCookie,
    getCookie,
    getAppUserInfo,
    videoTimer,
    timeFormat
};
