/*
 * @Description:
 * @Version:
 * @Autor: zjf
 * @Date: 2021-01-31 11:35:47
 * @LastEditors: zjf
 * @LastEditTime: 2021-01-31 11:35:56
 */


 //getArgumentsList

 /**
 * 节流函数--规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。
 */
function throttle(fun, delay) {
    let last, deferTimer
    return function (args) {
        let that = this
        let _args = arguments
        let now = +new Date()
        if (last && now < last + delay) {
            clearTimeout(deferTimer)
            deferTimer = setTimeout(function () {
                last = now
                fun.apply(that, _args)
            }, delay)
        }else {
            last = now
            fun.apply(that,_args)
        }
    }
}

/**
 * 防抖函数--在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时
 */
 function debounce(fun, delay) {
    return function (args) {
        let that = this
        clearTimeout(fun.id)
        fun.id = setTimeout(function () {
            fun.call(that, args)
        }, delay)
    }
}

// 观察者模式
let Observer = (function(){
  let __messages = {};
  return {
    regist: function(type, fn) {
      if(typeof __messages[type] === 'undefined') {
        messages[type] = [fn];
      }else {
        __messages[type].push(fn);
      }
    },
    fire: function(type, args) {
      if(!__messages[type]){
        return
      }
      let events = {
        type: type,
        args: args || {}
      },
      i = 0,
      len = __messages[type].length;
      for(;i<len;i++){
        __messages[type][i].call(this, events);
      }
    },
    remove: function(type, fn) {
      if(__messages[type] instanceof Array){
        let i = __messages[type].length -1;
        for(;i>=0;i--){
          __messages[type][i] === fn && __messages[type].splice(i, 1)
        }
      }
    }
  }
})();





// 置换函数
function swap(arr, indexA, indexB) {
    [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];
}