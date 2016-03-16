/* 
 * @Author: Lueny
 * @Date:   2016-03-05 11:39:37
 * @Last Modified by:   Lueny
 * @Last Modified time: 2016-03-15 22:29:27
 */

//基本变量、函数声明
var a = [];
var printf = function() {
    console.log(arguments[1] + ": ");
    console.log(arguments[0]);
};

//原型方法封装
if (!Function.prototype.sortMethod) {
    Function.prototype.sortMethod = function(name, func) {
        this.prototype[name] = func;
        return this;
    };
}
/**
 * 插入排序
 * 思路: 从 无序区 的第一个元素开始和它前面有序区的元素进行比较，
 * 如果比前面的元素小，那么前面的元素向后移动，否则就将此元素插入到相应的位置。
 * 平均复杂度: O(n^2)
 */

Array.sortMethod('insertSort', function() {
    var len = this.length,
        i, j, temp;
    for (i = 1; i < len; i++) {
        temp = this[i];
        j = i - 1;
        while (j >= 0 && temp < this[j]) {
            this[j + 1] = this[j];
            j--;
        }
        this[j + 1] = temp;
    }
    return this;
});



/**
 * 选择排序
 * 思路: 在无序区中选出最小的元素，然后将它和无序区的第一个元素交换位置，数组逐渐变为有序区。
 * 平均复杂度: O(n^2)
 */
Array.sortMethod('selectSort', function() {
    var i, j, k, temp,
        len = this.length;
    for (i = 0; i < len - 1; i++) {
        k = i;
        for (j = i + 1; j < len; j++) {
            if (this[k] > this[j]) k = j;
        }
        if (k != i) {
            temp = this[i];
            this[i] = this[k];
            this[k] = temp;
        }
    }
    return this;
});



/**
 * 冒泡排序
 * 思路: 通过在无序区的相邻元素的比较和替换，使较小的元素浮到最上面
 * 平均复杂度: O(n^2)
 */

Array.sortMethod('bubbleSort', function() {
    var len = this.length,
        i, j, temp;
    for (i = 0; i < len - 1; i++) {
        for (j = 0; j < len - 1 - i; j++) {
            if (this[j] > this[j + 1]) {
                temp = this[j];
                this[j] = this[j + 1];
                this[j + 1] = temp;
            }
        }
    }
    return this;
});

/**
 *  改进的冒泡排序
 *  思路: 如果在某次的排序中没有出现交换的情况，那么说明在无序的元素现在已经是有序了，就可以直接返回了。
 *  平均复杂度: O(n^2)
 */
Array.sortMethod('rBubbleSort', function() {
    var len = this.length,
        i, j, temp,
        exchange; //标记是否在冒泡过程中是否交换过
    for (i = 0; i < len - 1; i++) {
        exchange = 0;
        for (j = 0; j < len - 1 - i; j++) {
            if (this[j] > this[j + 1]) {
                temp = this[j];
                this[j] = this[j + 1];
                this[j + 1] = temp;
                exchange = 1;
            }
        }
        if (!exchange) return this;
    }
    return this;
});

/**
 * 快速排序
 * 思路: 找一个数为基准元素, 把比基准元素大的放在其后面, 比基准元素小的放在其前面, 然后递归调用
 * 平均复杂度: O(nlog n)
 *
 */
Array.sortMethod('quickSort', function() {
    if (this.length <= 1) {
        return this; //如果数组只有一个数，就直接返回；
    }
    var num = Math.floor(this.length / 2); //找到中间数的索引值，如果是浮点数，则向下取整
    var numValue = this.splice(num, 1); //找到中间数的值

    var left = [];
    var right = [];

    for (var i = this.length; i--;) {
        if (this[i] < numValue) {
            left.push(this[i]); //比基准元素小的数传到左边数组
        } else {
            right.push(this[i]); //比基准元素大的数传到右边数组
        }
    }

    return left.quickSort().concat(numValue, right.quickSort()); //递归不断重复比较
});


/**
 * 堆排序
 * 思路:
 * 1) 初始堆：
 * 将原始数组调整成大顶堆的方法——筛选算法：
 * 比较R[2i]、R[2i+1]和R[i]，将最大者放在R[i]的位置上(递归调用此方法到结束)
 * 2) 堆排序：
 * 每次将堆顶元素与数组最后面的且没有被置换的元素互换。
 * 平均复杂度: O(nlog n)
 */
Array.sortMethod('createHeap', function(low, high) {
    var i = low,
        j = 2 * i,
        temp = this[i];
    while (j <= high) {
        if (j < high && this[j] < this[j + 1]) j++; //从左右子节点中选出较大的节点
        if (temp < this[j]) { //根节点(temp) < 较大的节点
            this[i] = this[j];
            i = j;
            j = 2 * i;
        } else break;
    }
    this[i] = temp; //被筛选的元素放在最终的位置上
    return this;
});

Array.sortMethod('heapSort', function() {
    var i, temp, len = this.length - 1;
    for (i = parseInt(len / 2); i >= 1; i--) this.createHeap(i, len);
    for (i = len; i >= 2; i--) {
        temp = this[1];
        this[1] = this[i];
        this[i] = temp;
        this.createHeap(1, i - 1);
    }
    return this;
});



/**
 * 二分插入排序, 在直接插入排序的基础上改进,其与直接插入排序算法最大的区别在于查找插入位置时使用的是二
 * 分查找的方式，在速度上有一定提升。
 * 思路:先在 有序区 通过二分查找的方法找到移动元素的起始位置，然后通过这个起始位置将后面所有的元素后移。
 * 平均复杂度: O(nlog n)
 */
Array.sortMethod('bInsertSort', function() {
    var len = this.length,
        i, j, temp, low, high, mid;
    for (i = 1; i < len; i++) {
        temp = this[i];


        low = 0;
        high = i - 1;
        while (low <= high) {
            mid = parseInt((low + high) / 2);
            if (temp < this[mid]) high = mid - 1;
            else low = mid + 1;
        }
        for (j = i - 1; j >= high + 1; j--) {
            this[j + 1] = this[j];
        }
        this[j + 1] = temp;
    }
    return this;
});

/**
 * 希尔排序
 * 思路: 在第 i 次时取gap = n/(2的i次方)，然后将数组分为gap组(从下标0开始，每相邻的gap个元素为一组)，接下来我们对每一组进行直接插入排序。
 * 平均复杂度: O(nlog n) ~ O(n^2)
 */

Array.sortMethod('shellSort', function() {
    var len = this.length,
        gap = parseInt(len / 2),
        i, j, tmp;
    while (gap > 0) {
        for (i = gap; i < len; i++) {
            tmp = this[i];
            j = i - gap;
            while (j >= 0 && tmp < this[j]) {
                this[j + gap] = this[j];
                j = j - gap;
            }
            this[j + gap] = tmp;
        }
        gap = parseInt(gap / 2);
    }
    return this;
});

/**
 * 归并排序
 * 思路:
 * 从两个有序表R[low...mid]和R[mid+1...high]，每次从左边依次取出一个数进行比较，将较小者放入temp数组中,
 * 最后将两段中剩下的部分直接复制到temp中。这样temp是一个有序表, 递归(考虑最后一个子表的长度不足length的情况)
 * 平均复杂度: O(nlog n)
 */

Array.sortMethod('mergeSort', function() {
    var merge = function(left, right) {
        var temp = [];
        while (left.length && right.length)
            temp.push(left[0] <= right[0] ? left.shift() : right.shift()); //队列
        return temp.concat(left.concat(right));
    };
    var len = this.length;
    if (len < 2) return this;
    var mid = len / 2;
    return merge(this.slice(0, parseInt(mid)).mergeSort(), this.slice(parseInt(mid)).mergeSort());
});


//测试用例

a = [1, 5, 4, 8, 1, 6, 10, 23, 11, 53, 100, 2, 9];
printf(a.insertSort(), 'insertSort');
a = [1, 5, 4, 8, 1, 6, 10, 23, 11, 53, 100, 2, 9];
printf(a.selectSort(), 'selectSort');
a = [1, 5, 4, 8, 1, 6, 10, 23, 11, 53, 100, 2, 9];
printf(a.bubbleSort(), 'bubbleSort');
a = [1, 5, 4, 8, 1, 6, 10, 23, 11, 53, 100, 2, 9];
printf(a.rBubbleSort(), 'rBubbleSort');
a = [1, 5, 4, 8, 1, 6, 10, 23, 11, 53, 100, 2, 9];
printf(a.quickSort(), 'quickSort');
a = [1, 5, 4, 8, 1, 6, 10, 23, 11, 53, 100, 2, 9];
printf(a.heapSort(), 'heapSort');
a = [1, 5, 4, 8, 1, 6, 10, 23, 11, 53, 100, 2, 9];
printf(a.bInsertSort(), 'bInsertSort');
a = [1, 5, 4, 8, 1, 6, 10, 23, 11, 53, 100, 2, 9];
printf(a.shellSort(), 'shellSort');
a = [1, 5, 4, 8, 1, 2, 6, 10, 23, 11, 53, 100, 2, 9];
printf(a.mergeSort(), 'mergeSort');