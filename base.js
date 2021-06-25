const cns = {
    '0x': '\u96f6', //零
    0: '\u3007', //〇
    1: '\u4e00', //一
    2: '\u4e8c', //二
    3: '\u4e09', //三
    4: '\u56db', //四
    5: '\u4e94', //五
    6: '\u516d', //六
    7: '\u4e03', //七
    8: '\u516b', //八
    9: '\u4e5d', //九
    10: '\u5341', //十
    'bai': '\u767e', //百
    'qian': '\u5343', //千
    'wan': '\u4e07', //万
    'yi': '\u4ebf', //亿
    'dian': '\u70b9', //点
    'nian': '\u5e74', //年
    'yue': '\u6708', //月
    'ri': '\u65e5', //日
    'zhou': '\u5468', //周
    'shi': '\u65f6', //时
    'fen': '\u5206', //分
    'miao': '\u79d2', //秒
    'hao': '\u6beb', //毫
    'ji': '\u5b63', //季
    'du': '\u5ea6', //度
    'xingqi': '\u661f\u671f', //星期
    'yuan': '', //元
    //甲乙丙丁戊己庚辛壬癸 子丑寅卯辰巳午未申酉戌亥 正冬腊 鼠牛虎兔龙蛇马羊猴鸡狗猪
};

function getType(obj) {
    var type = Object.prototype.toString.call(obj).match(/^\[object (.*)\]$/)[1].toLowerCase();
    if(type === 'string' && typeof obj === 'object') return 'object'; // Let "new String('')" return 'object'
    if (obj === null) return 'null'; // PhantomJS has type "DOMWindow" for null
    if (obj === undefined) return 'undefined'; // PhantomJS has type "DOMWindow" for undefined
    return type;
}

export {getType, cns}

