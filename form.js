/*
 * @Description:
 * @Version:
 * @Autor: zjf
 * @Date: 2021-01-31 11:24:25
 * @LastEditors: zjf
 * @LastEditTime: 2021-01-31 11:37:07
 */


 //select没有readonly
/*
select[readonly] {
    background: #eee;
    cursor: no-drop;
    pointer-events: none
}
*/

//check empty

function serialize(form) {
    var formData = new FormData(form),
        getValue = formData.entries(),
        parts = [];
    for (var pair of getValue) {
        parts.push(pair[0] + "=" + pair[1]);
    }
    return parts.join("&");
}

