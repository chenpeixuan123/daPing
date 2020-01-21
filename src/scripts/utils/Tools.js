import FetchHelper from './FetchHelper';
import moment from 'moment';
import LonLat from './LonLat';
import CodeRegion from './CodeRegion';

const Tools = {
    fetchData: (url, handleSuccess) => {
        fetch(url)
            .then(FetchHelper.checkStatus)
            .then(FetchHelper.parseJSON)
            .then(FetchHelper.parseData)
            .then(handleSuccess)
            .catch(FetchHelper.fetchDataFailed);
    },
    fetchPostData: (url, headData, bodyData, handleSuccess) => {
        fetch(url, {
                method: 'POST',
                headers: headData,
                body: JSON.stringify(bodyData)
            })
            .then(FetchHelper.checkStatus)
            .then(FetchHelper.parseJSON)
            .then(FetchHelper.parseData2)
            .then(handleSuccess)
            .catch(FetchHelper.fetchDataFailed);
    },
    fetchPost: (url, headData, bodyData, handleSuccess) => {
        fetch(url, {
                method: 'POST',
                headers: headData,
                body: JSON.stringify(bodyData)
            })
            .then(FetchHelper.checkStatus)
            .then(FetchHelper.parseJSON)
            .then(handleSuccess)
            .catch(FetchHelper.fetchDataFailed);
    },
    fetchGetData: (url, headData, handleSuccess) => {
        fetch(url, {
                method: 'GET',
                headers: headData
            })
            .then(FetchHelper.checkStatus)
            .then(FetchHelper.parseJSON)
            .then(FetchHelper.parseData2)
            .then(handleSuccess)
            .catch(FetchHelper.fetchDataFailed);
    },
    fetchGet: (url, headData, handleSuccess) => {
        fetch(url, {
                method: 'GET',
                headers: headData
            })
            .then(FetchHelper.checkStatus)
            .then(FetchHelper.parseJSON)
            .then(handleSuccess)
            .catch(FetchHelper.fetchDataFailed);
    },
    timeFormat: (milliseconds, format) => {
        let isHour = format.indexOf("h") != -1;
        let isDay = format.indexOf("D") != -1;

        let S = 0,
            s = 0,
            m = 0,
            h = 0,
            D = 0;

        let left = milliseconds;

        S = left % 1000;
        left = Math.floor(left / 1000);
        s = left % 60;
        left = Math.floor(left / 60);
        if (isHour) {
            m = left % 60;
            left = Math.floor(left / 60);
        } else {
            m = left;
            left = 0;
        }
        if (isDay) {
            h = left % 24;
            left = Math.floor(left / 24);
        } else {
            h = left;
            left = 0;
        }
        D = left;

        var o = {
            "D+": D, //天
            "h+": h, //小时
            "m+": m, //分
            "s+": s, //秒
            "S": S //毫秒
        };
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return format;
    },
    firstValue: (str) => {
        if (str != null && str != "") {
            let v = 0;
            if (str.indexOf(",") != -1) {
                v = Number(str.split(",")[0]);
            } else {
                v = Number(str);
            }
            if (isNaN(v)) {
                return 0;
            } else {
                return v;
            }
        } else {
            return 0;
        }
    },
    doDataForODS: (arr) => {
        let lastYearStr = moment().subtract(1, 'years').format("YYYY");
        let curYearStr = moment().format("YYYY");
        let yesterdayStr = moment().subtract(1, 'days').format("YYYY/MM/DD");
        let yesBefDayStr = moment().subtract(2, 'days').format("YYYY/MM/DD");

        let yesterdayV = 0,
            yesBefDayV = 0,
            lastYearV = 0,
            curYearData = [];

        for (let i = 0; i < arr.length; i++) {
            let time = moment(arr[i].time).subtract(1, 'days');
            let dayStr = time.format("YYYY/MM/DD");
            let yearStr = time.format("YYYY");
            if (dayStr == yesterdayStr) {
                yesterdayV = Tools.firstValue(arr[i].value);
            } else if (dayStr == yesBefDayStr) {
                yesBefDayV = Tools.firstValue(arr[i].value);
            }
            if (yearStr == lastYearStr) {
                lastYearV = Tools.firstValue(arr[i].value);
            } else if (yearStr == curYearStr) {
                curYearData.push(arr[i]);
            }
        }
        if (yesterdayV == 0) {
            yesterdayV = yesBefDayV;
        }
        return { yesterdayV, yesBefDayV, lastYearV, curYearData };
    },
    dataForMonthsForODS: (arr) => {
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            let m = moment(arr[i].time).subtract(1, 'days').month();
            let v = Tools.firstValue(arr[i].value);
            result[m] = v;
        }
        return result;
    },
    doHisDataForTD: (arr) => {
        let hisMax = 0,
            tenAvg = 0,
            yesterdayData = [];

        let day = {};
        let year = {};
        let yesterdayStr = moment().subtract(1, 'days').format("YYYY/MM/DD");
        for (let i = arr.length - 1; i >= 0; i--) {
            let time = moment(arr[i].time);
            let dayStr = time.format("YYYY/MM/DD");
            let yearStr = time.format("YYYY");
            let v = Tools.firstValue(arr[i].value);
            if (day[dayStr] != null) {
                day[dayStr] += v;
            } else {
                day[dayStr] = v;
            }
            if (year[yearStr] != null) {
                year[yearStr] += v;
            } else {
                year[yearStr] = v;
            }
            if (dayStr == yesterdayStr) {
                yesterdayData.push(arr[i]);
            }
        }
        //历史峰值
        for (let key in day) {
            if (hisMax < day[key]) {
                hisMax = day[key];
            }
        }
        //求10日同期
        let tenDayCount = 0;
        let tenDayAllValue = 0;
        for (let i = 1; i <= 10; i++) {
            let dayStr = moment().subtract(i, 'days').format("YYYY/MM/DD");
            if (day[dayStr] != null) {
                tenDayCount += 1;
                tenDayAllValue += day[dayStr];
            }
        }
        if (tenDayCount != 0) {
            tenAvg = Math.round(tenDayAllValue / tenDayCount);
        }
        return {
            hisMax,
            tenAvg,
            yesterdayData
        };
    },
    doCurDataForTD: (arr) => {
        let curAll = 0;
        if (arr) {
            for (var i = 0; i < arr.length; i++) {
                curAll += Tools.firstValue(arr[i].value);
            }
        }
        return {
            curAll
        };
    },
    doHisYearForTD: (arr) => {
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            let time = arr[i].time;
            let h = moment(time).hours();
            let v = Tools.firstValue(arr[i].value);
            if (result[h] != null) {
                result[h] += v;
            } else {
                result[h] = v;
            }
        }
        return result;
    },
    doTPSOrAMTHisForTD: (arrZFB, arrCFT, replaceFun) => {
        let r = {};
        let len = arrZFB.length > arrCFT.length ? arrZFB.length : arrCFT.length;
        for (let i = 0; i < len; i++) {
            let timeStr;
            if (arrZFB[i]) {
                timeStr = moment(arrZFB[i].time).format("YYYY/MM");
            } else if (arrCFT[i]) {
                timeStr = moment(arrCFT[i].time).format("YYYY/MM");
            } else {
                continue;
            }
            if (!r[timeStr]) {
                r[timeStr] = {
                    time: timeStr,
                    zfb: 0,
                    cft: 0,
                }
            }
            if (arrZFB[i]) {
                r[timeStr].zfb += Tools.firstValue(arrZFB[i].value);
            }
            if (arrCFT[i]) {
                r[timeStr].cft += Tools.firstValue(arrCFT[i].value);
            }

        }
        if (replaceFun) {
            replaceFun(r);
        }

        let rArr = [];
        for (let key in r) {
            rArr.push(r[key]);
        }
        rArr.sort((a, b) => a.time > b.time ? 1 : -1);
        return rArr;
    },
    doAMTHisForTD: (arrZFB, arrCFT) => {

    },
    historyAllBeforeTimeForTD: (arr, time) => {
        let result = 0;
        let timeV = moment(time).subtract(1, 'days').format("YYYY-MM-DD HH:mm:ss");
        for (let i = 0; i < arr.length; i++) {
            let t = moment(arr[i].time).format("YYYY-MM-DD HH:mm:ss");
            if (t <= timeV) {
                result += Tools.firstValue(arr[i].value);
            }
        }
        return result;
    },
    handleTongBi: (arr, time) => {
        let result = 0;
        let timeV = moment(time).subtract(1, 'days').format("YYYY-MM-DD HH:mm:ss");
        for (let i = 0; i < arr.length; i++) {
            let t = moment(arr[i].time).format("YYYY-MM-DD HH:mm:ss");
            if (t <= timeV && !isNaN(arr[i].sum)) {
                result += arr[i].sum;
            }
        }
        return result;
    },
    dataForHours: (arr) => {
        let result = [];
        // let alreadyexist = [];
        for (let i = 0; i < arr.length; i++) {
            let time = arr[i].time;
            // if (alreadyexist.indexOf(time) !== -1) {
            //   continue
            // }
            // alreadyexist.push(time);
            let h = moment(time).hours();
            let v = Tools.firstValue(arr[i].value);
            if (result[h] != null) {
                result[h] += v;
            } else {
                result[h] = v;
            }
        }
        for (let i = result.length - 1; i >= 0; i--) {
            if (result[i] == null) {
                result[i] = 0;
            }
        }
        return result;
    },
    dataForHours2: (arr) => {
        let result = [];
        // let alreadyexist = [];
        for (let i = 0; i < arr.length; i++) {
            let time = arr[i].time;
            // if (alreadyexist.indexOf(time) !== -1) {
            //   continue
            // }
            // alreadyexist.push(time);
            let h = moment(time).hours();
            let v = Tools.firstValue(String(arr[i].sum));
            if (result[h] != null) {
                result[h] += v;
            } else {
                result[h] = v;
            }
        }
        for (let i = result.length - 1; i >= 0; i--) {
            if (result[i] == null) {
                result[i] = 0;
            }
        }
        return result;
    },
    dataForHoursForHeXin: (arr) => {
        let result = [];
        if (arr) {
            for (let i = 0; i < arr.length; i++) {
                let time = arr[i].time;
                let h = moment(time).hours();
                let v = Number(arr[i].jiaoyi);
                if (result[h] != null) {
                    result[h] += v;
                } else {
                    result[h] = v;
                }
            }
        }
        for (let i = result.length - 1; i >= 0; i--) {
            if (result[i] == null) {
                result[i] = 0;
            }
        }
        return result;
    },
    //ip转地区
    ipToRegion: (ip) => {
        let numArr = ip.split(".");
        let num = Number(numArr[0]) * 1000000 + Number(numArr[1]) * 1000 + Number(numArr[2]);
        let region = "";
        for (let key in RegionIP) {
            let arr = RegionIP[key];
            for (let i = 0; i < arr.length; i++) {
                if (num >= arr[i][0] && num <= arr[i][1]) {
                    region = key;
                    break;
                }
            }
            if (region != "") {
                break;
            }
        }
        return region;
    },
    //ip和地区
    ipAndRegion: (arr) => {
        let r = [];
        let diqu = {
            "上海": "上海",
            "澳门": "澳门",
            "云南": "云南",
            "内蒙古": "内蒙古",
            "北京": "北京",
            "台湾": "台湾",
            "吉林": "吉林",
            "四川": "四川",
            "天津": "天津",
            "宁夏": "宁夏",
            "安徽": "安徽",
            "山东": "山东",
            "山西": "山西",
            "广东": "广东",
            "广西": "广西",
            "新疆": "新疆",
            "江苏": "江苏",
            "江西": "江西",
            "河北": "河北",
            "河南": "河南",
            "浙江": "浙江",
            "海南": "海南",
            "湖北": "湖北",
            "湖南": "湖南",
            "甘肃": "甘肃",
            "福建": "福建",
            "西藏": "西藏",
            "贵州": "贵州",
            "辽宁": "辽宁",
            "重庆": "重庆",
            "陕西": "陕西",
            "青海": "青海",
            "香港": "香港",
            "黑龙江": "黑龙江"
        };

        for (let i = 0; i < arr.length; i++) {
            let regionName = arr[i].address;
            if (diqu[regionName]) {
                r.push({
                    time: moment(arr[i].time),
                    name: diqu[regionName],
                    value: Number(arr[i].value)
                });
            } else {
                console.warn("ip没有对应地区：" + arr[i].value);
            }
        }
        return r;
    },
    ipAndRegion2: (arr) => {
        let r = [];
        let diqu = {
            "上海": "上海",
            "澳门": "澳门",
            "云南": "云南",
            "内蒙古": "内蒙古",
            "北京": "北京",
            "台湾": "台湾",
            "吉林": "吉林",
            "四川": "四川",
            "天津": "天津",
            "宁夏": "宁夏",
            "安徽": "安徽",
            "山东": "山东",
            "山西": "山西",
            "广东": "广东",
            "广西": "广西",
            "新疆": "新疆",
            "江苏": "江苏",
            "江西": "江西",
            "河北": "河北",
            "河南": "河南",
            "浙江": "浙江",
            "海南": "海南",
            "湖北": "湖北",
            "湖南": "湖南",
            "甘肃": "甘肃",
            "福建": "福建",
            "西藏": "西藏",
            "贵州": "贵州",
            "辽宁": "辽宁",
            "重庆": "重庆",
            "陕西": "陕西",
            "青海": "青海",
            "香港": "香港",
            "黑龙江": "黑龙江"
        };

        for (let i = 0; i < arr.length; i++) {
            let regionName = arr[i].name;
            if (diqu[regionName]) {
                r.push({
                    time: arr[i].time,
                    name: diqu[regionName],
                    value: Number(arr[i].value)
                });
            } else {
                console.warn("ip没有对应地区：" + arr[i].value);
            }
        }
        return r;
    },
    //今日网银统计数据
    todayWYData: (arr) => {
        let prov = {};
        for (let i = 0; i < arr.length; i++) {
            let n = arr[i].name;
            if (prov[n] != null) {
                prov[n] += arr[i].value;
            } else {
                prov[n] = arr[i].value;
            }
        }
        let r = [];
        for (let key in prov) {
            r.push({ name: key, value: prov[key] });
        }
        r.sort((a, b) => b.value - a.value);

        return r;
    },
    //网银对比，前三后三
    todYesWYData: (yesArr, todArr, endTime) => {
        let eT = moment(endTime);
        let r = {};
        for (let i = 0; i < yesArr.length; i++) {
            if (yesArr[i].time <= eT) {
                let n = yesArr[i].name;
                if (r[n] != null) {
                    r[n].his += yesArr[i].value;
                } else {
                    r[n] = { his: yesArr[i].value, cur: 0 };
                }
            }
        }
        for (let i = 0; i < todArr.length; i++) {
            if (r[todArr[i].name] == null) {
                r[todArr[i].name] = { his: 0, cur: 0 };
            }
            r[todArr[i].name].cur = todArr[i].value;
        }
        let arr = [];
        for (let key in r) {
            let o = r[key];
            arr.push({ name: key, cur: o.cur, his: o.his, off: o.cur - o.his });
        }
        arr.sort((a, b) => b.off - a.off);
        let top3 = arr.slice(0, 3);
        let bottom3 = arr.slice(arr.length - 3, arr.length);
        bottom3 = bottom3.map(o => { return { name: o.name, cur: -o.cur, his: -o.his, off: o.off } });

        let result = top3.concat(bottom3);

        return result;
    },

    //地区码转地区
    codeToRegion: (code) => {
        let area = CodeRegion[code];
        if (area) {
            return area;
        } else {
            console.warn("地区码没有对应地区：" + code);
            return code;
        }
    },
    //地区码和地区及境内外
    codeAndRegion: (arr) => {
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            let v = parseInt(arr[i].value);
            if (v > 0 && v < 1000) {
                result.push({
                    time: moment(arr[i].time),
                    code: arr[i].value,
                    name: Tools.codeToRegion(arr[i].value)
                });
            }
        }
        return result;
    },
    //今日境外交易统计数据
    todayJingWaiData: (arr) => {
        let jw = {};
        for (let i = 0; i < arr.length; i++) {
            let n = arr[i].name;
            if (jw[n] != null) {
                jw[n] += 1;
            } else {
                jw[n] = 1;
            }
        }
        let r = [];
        for (let key in jw) {
            r.push({ name: key, value: jw[key] });
        }
        r.sort((a, b) => b.value - a.value);

        return r;
    },
    addTwoFixed: (num) => {
        let s = num.toLocaleString();
        if (s.indexOf(".") != -1) {
            let arr = s.split(".");
            let ss = arr[arr.length - 1];
            if (ss.length <= 1) {
                s += "0";
            }
        } else {
            s += ".00";
        }
        return s;
    }
};
export default Tools;