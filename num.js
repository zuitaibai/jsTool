import {cns} from './base.js';

function num2cn(num, ifShort10){
    // ifShort10 == true：当10<=num<=19时，显示“十”而不是“一十”，比如12显示十二，当比如512时，显示五百一十二
    // ifShort10 != true: 512中的12 和 12 全部显示“一十二”
    // 另外关于0的： 100=>一百    101=>一百零一   0=>〇
    if (!/^\d*(\.\d*)?$/.test(num)) {
        alert("Number is wrong!");
        return "Number is wrong!";
    }
    if(num == 0) return cns['0'];
    var AA = new Array(cns['0x'], cns['1'], cns['2'], cns['3'], cns['4'], cns['5'], cns['6'], cns['7'], cns['8'], cns['9']);
    var BB = new Array('', cns['10'], cns.bai, cns.qian, cns.wan, cns.yi, cns.dian, '');
    var a = ("" + num).replace(/(^0*)/g, "").split("."),
        k = 0,
        re = "";
    for (var i = a[0].length - 1; i >= 0; i--) {
        switch (k) {
            case 0:
                re = BB[7] + re;
                break;
            case 4:
                if (!new RegExp("0{4}\\d{" + (a[0].length - i - 1) + "}$").test(a[0]))
                    re = BB[4] + re;
                break;
            case 8:
                re = BB[5] + re;
                BB[7] = BB[5];
                k = 0;
                break;
        }
        if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re;
        if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re;
        k++;
    }
    if (a.length > 1) //加上小数部分(如果有小数部分)
    {
        re += BB[6];
        for (var i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
    }
    if(ifShort10) re = re.replace(/^一十/, '十');
    return re;
}

//浮点数计算问题 加，减，乘，除

//是否真数字或字符串形式数字

/**
 *  获取指定范围内的随机数
 */
const getRandom = (min = 0, max = 100) => {
    if (typeof min !== 'number' || typeof max !== 'number') {
        throw new Error('Argument(s) is illegal !')
    }
    if (min > max) {
        [min, max] = [max, min]
    }
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// e.g.
// getRandom(1, 100) // 89
// getRandom(1, 100) // 5

export {num2cn};