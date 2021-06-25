/*
 * @Description:
 * @Version:
 * @Autor: zjf
 * @Date: 2021-01-31 11:22:14
 * @LastEditors: zjf
 * @LastEditTime: 2021-01-31 11:30:24
 */

 // 冒泡排序
function bubbleSort(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      for (let j = 0; j < i; j++) {
        if (arr[j] > arr[j + 1]) {
          swap(arr, j, j + 1);
        }
      }
    }
    return arr;
}


// 数组去重
function distinct(arr) {
    return arr.filter((v, i, array) => array.indexOf(v) === i)
}
//[...new Set(arr)];

//打乱数组
const arrayShuffle = array => {
    if (!Array.isArray(array)) {
        throw new Error('Argument must be an array')
    }
    let end = array.length
    if (!end) {
        return array
    }
    while (end) {
        let start = Math.floor(Math.random() * end--)
        ;[array[start], array[end]] = [array[end], array[start]]
    }
    return array
}
