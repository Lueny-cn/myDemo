/* 
 * 数组去重
 * @Author: Lueny
 * @Date:  2016-03-16 21:15:52
 * @Last Modified by:   Lueny
 * @Last Modified time: 2016-03-16 21:23:52
 */

var arr = [];
if (!Array.prototype.uniqueArr) {
    Array.prototype.uniqueArr = function() {
        var m = [], //去重后的数组
            n = []; //标记m中是否存在重复值, 不存在则添加到m中, 并则值为true
        for (var i = this.length; i--;) {
            // 通过JSON.stringify()把变量转换为字符串, 避免类似 1 == '1' ===> true 出现错误
            if (n[JSON.stringify(this[i])] !== true) {
                m.push(this[i]);
                n[JSON.stringify(this[i])] = true;
            }
        }
        return m;
    };
}
//测试
arr = ["1", 2, "4", 4, 6, 5, 8, "8", "10", 55, 44, 1, "2", 3, 1, "44", 2];
console.log(arr.uniqueArr()); //[ 2, '44', 1, 3, '2', 44, 55, '10', '8', 8, 5, 6, 4, '4', '1' ]