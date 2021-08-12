/*
 * @Description:
 * @Version:
 * @Autor: zjf
 * @Date: 2021-01-11 06:21:49
 * @LastEditors: zjf
 * @LastEditTime: 2021-08-08 11:00:07
 */

class Treer{
    constructor(data = [], {id = 'id', pId = 'parentId', cId = 'children', ifFlat} = {}){
        this._idField = id;
        this._pIdField = pId;
        this._childFild = cId;
        let isFlat = typeof ifFlat === 'undefined' ? (data.some(item => parentIdField in item) && data.every(item => !(childrenFild in item))) : ifFlat;
        this.data = isFlat ? this.toTree(data) : data;
    }

    get dataFlat() {
        //todo: toList目前实现还有问题
        return this.toList2();
    }
    set dataFlat(data) {
        this.data = this.toTree(data);
    }

    //遍历: 广度优先
    readByWide(func) {
        let node, list = [...this.data];
        while (node = list.shift()) {
            func(node);
            node[this._childFild] && list.push(...node[this._childFild]);
        }
    }

    //遍历: 深度优先-先序 (递归实现)
    readByDeepAsc(func) {
        this.data.forEach(data => {
            func(data);
            data[this._childFild] && this.readByDeepAsc(data[this._childFild], func);
        })
    }
    ////遍历: 深度优先-先序 (循环实现)
    readByDeepAsc2(func) {
        let node, list = [...this.data]
        while (node = list.shift()) {
            func(node)
            node[this._childFild] && list.unshift(...node[this._childFild])
        }
    }

    //遍历: 深度优先-后序 (递归实现)
    readByDeepDesc(func) {
        this.data.forEach(data => {
            data[this._childFild] && this.readByDeepDesc(data[this._childFild], func);
            func(data);
        })
    }
    ////遍历: 深度优先-后序 (循环实现)
    readByDeepDesc2(func) {
        let node, list = [...this.data],
            i = 0
        while (node = list[i]) {
            let childCount = node[this._childFild] ? node[this._childFild].length : 0
            if (!childCount || node[this._childFild][childCount - 1] === list[i - 1]) {
                func(node)
                i++
            } else {
                list.splice(i, 0, ...node[this._childFild])
            }
        }
    }

    //列表转树
    toTree(list) {
        let info = list.reduce((map, node) => (map[node[this._idField]] = node, map), {})
        return list.filter(node => {
            let f = info[node[this._pIdField]];
            if(f){
                f[this._childFild] = f[this._childFild] || [];
                f[this._childFild].push(node);
            }
            return !node[this._pIdField]
        })
    }

    //树转列表 (递归实现)
    toList(result = [], _level = 0) {
        this.data.forEach(node => {
            result.push(node)
            node._level = _level + 1
            node[this._childFild] && this.toList(node[this._childFild], result, _level + 1)
        })
        return result
    }
    ////树转列表 (循环实现)
    toList2() {
        let result = this.data.map(node => (node._level = 1, node))
        for (let i = 0; i < result.length; i++) {
            if (!result[i][this._childFild]) continue
            let list = result[i][this._childFild].map(node => (node._level = result[i]._level + 1, node))
            result.splice(i + 1, 0, ...list)
            delete result[i][this._childFild]
        }
        return result
    }

    //查找节点
    findNode(func) {
        for (const data of this.data) {
            if (func(data)) return data
            if (data[this._childFild]) {
                const res = this.findNode(data[this._childFild], func)
                if (res) return res
            }
        }
        return null
    }

    //查找节点路径
    findPath(func, path = []) {
        for (const data of this.data) {
            path.push(data[this._idField])
            if (func(data)) return path
            if (data[this._childFild]) {
                const findChildren = this.findPath(data[this._childFild], func, path)
                if (findChildren.length) return findChildren
            }
            path.pop()
        }
        return []
    }

    //2叉树


    static go(...args){
        return new Treer(...args);
    }

}

export {Treer};