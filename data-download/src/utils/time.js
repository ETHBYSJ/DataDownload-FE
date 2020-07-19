import moment from 'moment'


function format(fmt, date) {
  var o = {
    "M+" : date.getMonth()+1,                 //月份
    "d+" : date.getDate(),                    //日
    "h+" : date.getHours(),                   //小时
    "m+" : date.getMinutes(),                 //分
    "s+" : date.getSeconds(),                 //秒
    "q+" : Math.floor((date.getMonth()+3)/3), //季度
    "S"  : date.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  // console.log("fmt = " + fmt)
  return fmt;
}

function utcToLocal(utcDt, format = 'YYYY-M-D HH:mm:ss') {
  return moment.utc(utcDt).local().format(format)
}

function unixFormat(fmt, unix) {
  let d = new Date(unix * 1000)
  return format(fmt, d)
}

export default {
  unixFormat: unixFormat,
  utcToLocal: utcToLocal
}

