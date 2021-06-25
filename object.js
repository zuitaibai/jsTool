/*
 * @Description:
 * @Version:
 * @Autor: zjf
 * @Date: 2021-01-31 11:15:04
 * @LastEditors: zjf
 * @LastEditTime: 2021-01-31 11:37:16
 */

//get set obj, 'a.b.c.d.e'

//是否空对象


//URLSearchParams
//对象转为a=1&b=3&b=4
//a=1&b=3&b=4转为对象(迭代器)


function getUrlParam(url = location.href){

    /*
    //此方法不能查出空值
    const q = {};
    url.replace(/([^?&=]+)=([^&]+)/g,(_,k,v)=>q[k]=v);
    return q;
    */

    let arrObj = url.split("?");
    let params = Object.create(null)
    if (arrObj.length > 1){
        arrObj = arrObj[1].split("&");
        arrObj.forEach(item=>{
            item = item.split("=");
            params[item[0]] = item[1]
        })
    }
    return params;

    //todo:
    //还有es6新方法特实现
}