/*
 * @Description:
 * @Version:
 * @Autor: zjf
 * @Date: 2021-01-31 11:03:21
 * @LastEditors: zjf
 * @LastEditTime: 2021-01-31 11:03:22
 */


 /**
 *  文件尺寸格式化
 */
const formatSize = size => {
    if (typeof +size !== 'number') {
        throw new Error('Argument(s) is illegal !')
    }
    const unitsHash = 'B,KB,MB,GB'.split(',')
    let index = 0
    while (size > 1024 && index < unitsHash.length) {
        size /= 1024
        index++
    }
    return Math.round(size * 100) / 100 + unitsHash[index]
}
// formatSize('10240') // 10KB
// formatSize('10240000'); // 9.77MB