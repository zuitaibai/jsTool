/*
 * @Description:
 * @Version:
 * @Autor: zjf
 * @Date: 2020-12-25 10:14:14
 * @LastEditors: zjf
 * @LastEditTime: 2021-01-31 10:00:03
 */
import {num2cn} from './num.js';
import {getType, cns} from './base.js';



class Dater extends Date{
    constructor(...args){
        if(args.length === 1){
            let arg0 = args[0];
            if(arg0 === undefined || arg0 === null || arg0 === ''){
                args[0] = Date.now();
            }
            else if(typeof arg0 === 'string'){
                args[0] = arg0.replace(/-/g, '/');
            }
            else if(getType(arg0) === 'array'){
                args = [...arg0];
            }
            else if(getType(arg0) === 'object'){
                if(Object.keys(arg0).length === 0){
                    args[0] = Date.now();
                }else{
                    args = [];
                    args.push(('year' in arg0) ? arg0.year : (new Date().getFullYear()));
                    args.push(('month' in arg0) ? arg0.month : 0);
                    args.push(('date' in arg0) ? arg0.date : 1);
                    args.push(('hour' in arg0) ? arg0.hour : 0);
                    args.push(('minute' in arg0) ? arg0.minute : 0);
                    args.push(('second' in arg0) ? arg0.second : 0);
                    args.push(('mSecond' in arg0) ? arg0.mSecond : 0);
                }
            }
        }
        super(...args);
    }

    //目前还没有查到实现静态属性的ecmascript版本, @2021.1.30
    static map = {year: 'FullYear', month: 'Month', date: 'Date', hour: 'Hours', minute: 'Minutes', second: 'Seconds', mSecond: 'Milliseconds'};
    static orderArr = ['year', 'month', 'date', 'hour', 'minute', 'second', 'mSecond'];

    fmt(fmt = 'yyyy-MM-dd'){
        return Dater.fmt(this, fmt);
    }
    //出参: 月为1-12，星期为1-7
    get(type=''){
        let year = this.getFullYear();
        let month = this.getMonth() + 1;
        let date = this.getDate();
        let day = this.getDay() === 0 ? 7 : this.getDay();
        let hour = this.getHours();
        let minute = this.getMinutes();
        let second = this.getSeconds();
        let quarter = Math.floor((this.getMonth() + 3) / 3);
        let mSecond = this.getMilliseconds();

        /**
         * 星期顺位：1,2,3,4,5,6,7
         * 月顺位：1,2,3,4,5,6,7,8,9,10,11,12
        */
        const obj = {
            arr: [year, month, date, hour, minute, second, mSecond],
            x: this.getTime(),
            year,
            month,
            date,
            day,
            hour,
            minute,
            second,
            quarter,
            mSecond,
            _year: [year, year + cns.nian, (''+year).split('').map(v=>cns[v]).join(''), (''+year).split('').map(v=>cns[v]).join('') + cns.nian],
            _month: [month, month+cns.yue, num2cn(month, true), num2cn(month, true) + cns.yue],
            _date: [date, date+cns.ri, num2cn(date, true), num2cn(date, true) + cns.ri],
            _day: [day, cns.zhou+day, cns[day===7?'ri':day], cns.zhou+cns[day===7?'ri':day], cns.xingqi+cns[day===7?'ri':day]],
            _hour: [hour, hour+cns.shi, num2cn(hour, true), num2cn(hour, true)+cns.shi],
            _minute: [minute, minute+cns.fen, num2cn(minute, true), num2cn(minute, true)+cns.fen],
            _second: [second, second+cns.miao, num2cn(second, true), num2cn(second, true)+cns.miao],
            _quarter: [quarter, quarter+cns.ji, num2cn(quarter), num2cn(quarter)+cns.ji, num2cn(quarter)+cns.ji+cns.du, quarter+cns.ji+cns.du],
            _mSecond: [mSecond, mSecond+cns.hao+cns.miao, num2cn(mSecond), num2cn(mSecond)+cns.hao+cns.miao]
        };
        return type ? obj[type] : obj;
    }

    //set(26, 'date')
    //set({date: 26, month: 10, second: 59, mSecond: 200})
    set(numOrObj, type='mSecond'){
        let once = (type, num) => {
            if(!Object.keys(Dater.map).includes(type)){
                throw '参数不对';
            }
            this['set' + Dater.map[type]](num);
        };
        if(typeof numOrObj === 'object'){
            let keysArr = Object.keys(numOrObj);
            keysArr.forEach(item => numOrObj[item] = Number(numOrObj[item]));
            keysArr.sort((a, b) => Dater.orderArr.indexOf(a) - Dater.orderArr.indexOf(b)).forEach(item => {
                once(item, numOrObj[item]);
            });
        }else{
            once(type, Number(numOrObj));
        }
        return this;
    }

    add(numOrObj, type='mSecond'){
        if(typeof numOrObj === 'object'){
            Object.keys(numOrObj).forEach(item => numOrObj[item] = Math.abs(Number(numOrObj[item])));
            Dater.doCrease(this, numOrObj);
        }else{
            numOrObj = Math.abs(Number(numOrObj));
            Dater.doCrease(this, numOrObj, type);
        }
        return this;
    }
    sub(numOrObj, type='mSecond'){
        if(typeof numOrObj === 'object'){
            Object.keys(numOrObj).forEach(item => numOrObj[item] = -Math.abs(Number(numOrObj[item])));
            Dater.doCrease(this, numOrObj);
        }else{
            numOrObj = -Math.abs(Number(numOrObj));
            Dater.doCrease(this, numOrObj, type);
        }
        return this;
    }
    isBetween(date1, date2){
        let d1 = Dater.go(date1).getTime();
        let d2 = Dater.go(date2).getTime();
        let d0 = this.getTime();
        return d0 >= d1 && d0 <= d2;
    }
    isSameWith(date, step='mSecond'){
        return Dater.isSame(this, date, step);
    }
    isSameWithNow(step='mSecond'){
        return Dater.isSame(this, Date.now(), step);
    }
    isSameDayWith(date){
        return this.isSameWith(date, 'date');
    }
    isToday(){
        return this.isSameWithNow('date');
    }
    howDiffWith(date, type=''){
        return Dater.howDiff(this, date, type);
    }
    howDiffWithNow(type=''){
        return Dater.howDiff(this, Date.now(), type);
    }
    getDatesOfMonth(){
        return Dater.getDatesOfMonth(this.getFullYear(), this.getMonth());
    }


    static go(...args){
        return Dater.isDater(args[0]) ? args[0] : new Dater(...args);
    }
    //step: 比较到哪一级
    static compare(date1, date2, type='==', step = 'mSecond'){
        let stepArr = ['year', 'month', 'date', 'hour', 'minute', 'second', 'mSecond'];
        let typeArr = ['>', '<', '>=', '<=', '==', '===', '!='];
        if(!stepArr.includes(step) || !typeArr.includes(type)){
            throw '参数不对';
        }
        date1 = Dater.go(date1);
        date2 = Dater.go(date2);
        switch (step){
            case 'year':
                date1.setMonth(0,1);
                date1.setHours(0,0,0,0);
                date2.setMonth(0,1);
                date2.setHours(0,0,0,0);
                break;
            case 'month':
                date1.setDate(1);
                date1.setHours(0,0,0,0);
                date2.setDate(1);
                date2.setHours(0,0,0,0);
                break;
            case 'date':
                date1.setHours(0,0,0,0);
                date2.setHours(0,0,0,0);
                break;
            case 'hour':
                date1.setMinutes(0,0,0);
                date2.setMinutes(0,0,0);
                break;
            case 'minute':
                date1.setSeconds(0,0);
                date2.setSeconds(0,0);
                break;
            case 'second':
                date1.setMilliseconds(0);
                date2.setMilliseconds(0);
                break;
        }
        date1 = date1.getTime();
        date2 = date2.getTime();
        if(type === '>'){
            return date1 > date2;
        }else if(type === '<'){
            return date1 < date2;
        }else if(type === '>='){
            return date1 >= date2;
        }else if(type === '<='){
            return date1 <= date2;
        }else if(type === '!='){
            return date1 != date2;
        }else if(type === '===' || type === '=='){
            return date1 === date2;
        }
    }
    //step: 比较到哪一级
    static isSame(date1, date2, step = 'mSecond'){
        return Dater.compare(date1, date2, '==', step);
    }
    static howDiff(date1, date2, type=''){
        date1 = Dater.go(date1);
        date2 = Dater.go(date2);
        return Dater.getDurationObj(date1 - date2, type);
    }
    static isDate(arg){
        return getType(arg) === 'date';
    }
    static isDater(arg){
        return Dater.isDate(arg) && (arg instanceof Dater);
    }
    static getDurationObj(ms, type='') {
        ms = Math.abs(ms);
        const time = {
            day: Math.floor(ms / 86400000),
            hour: Math.floor(ms / 3600000) % 24,
            minute: Math.floor(ms / 60000) % 60,
            second: Math.floor(ms / 1000) % 60,
            mSecond: Math.floor(ms) % 1000
        };
        return type ? ms[type] : time;
    }
    /**
     * doCrease('2020-03-04', -2, 'date'); 2020-03-04减2天
     * doCrease('2020-03-04', {date: -1, month: 1, second: 40, mSecond: 1}); 比2020-03-04：减1天，多1月，多40秒，多1豪秒
     */
    static doCrease(date, numOrObj, type='mSecond'){
        date = Dater.go(date);
        let once = (type, num) => {
            if(!Object.keys(Dater.map).includes(type)){
                throw '参数不对';
            }
            let n = date['get' + Dater.map[type]]() + Number(num);
            date['set' + Dater.map[type]](n);
        };
        if(typeof numOrObj === 'object'){
            Object.keys(numOrObj).sort((a, b) => Dater.orderArr.indexOf(a) - Dater.orderArr.indexOf(b)).forEach(item => {
                once(item, numOrObj[item]);
            });
        }else{
            once(type, numOrObj);
        }
        return date;
    }
    /**
     * 毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
     * yyyy-MM-dd E HH:mm:ss   ==>  2009-03-10 二 20:09:04
     * yyyy-MM-dd EE hh:mm:ss  ==>  2009-03-10 周二 08:09:04
     * yyyy-MM-dd EEE hh:mm:ss ==>  2009-03-10 星期二 08:09:04
     * yyyy-M-d h:m:s.S        ==>  2006-7-2 8:9:4.18
    */
    static fmt(date, fmt = 'yyyy-MM-dd'){
        const obj = Dater.go(date).get();
        let o = {
            'M+': obj.month,
            'd+': obj.date,
            'h+': obj.hour % 12 == 0 ? 12 : obj.hour % 12,
            'H+': obj.hour,
            'm+': obj.minute,
            's+': obj.second,
            'q+': Math.floor((obj.month + 3) / 3),
            'S': obj.mSecond
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (obj.year + '').substr(4 - RegExp.$1.length));
        }
        let weekDayNumCn = cns[obj.day === 7 ? 'ri' : obj.day];
        if (/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? cns.xingqi : cns.zhou) : '') + weekDayNumCn);
        }
        for (let k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }
        return fmt;
    }

    //获取一个月的天数(与其他方法入参统一：month以0开始)
    static getDatesOfMonth(year, month){
        //由于Js中day的范围为1~31中的值，所以当设为0时，会向前 一天，也即表示上个月的最后一天
        let d = new Date(year, month + 1, 0);
        return d.getDate();
    }

    // 倒计时时间格式化：请使用getDurationObj
    //todo: 平年，闰年，农历...

}

export {Dater};
