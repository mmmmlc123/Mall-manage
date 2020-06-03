export function formateDate(date, fmt) {
    //1.获取年份
    //查询有几个y， y+ 一个或多个y,   y* 零个或多个y,   y? 零个或一个y
    if(/(y+)/.test(fmt)) { 
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        //RegExp获取到的数据yyyy, (获取的年份).substr为截取器：4-截取所获字符串的长度
    }
    
    //2.获取
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),  //h和H
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};
//04:04:04单数的时候前面加0
function padLeftZero (str) {
    return ('00' + str).substr(str.length);
}