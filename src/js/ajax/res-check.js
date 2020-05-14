import { MessageBox as mintMB } from 'mint-ui'
import { MessageBox as eleMB } from 'element-ui';
import router from '@router/index'

const IS_MOBILE = /iPhone|Android/i.test(window.navigator.userAgent.toLowerCase());
const IS_NODE = (typeof window === 'undefined');

function showMB (msg, type, callback) {
    callback = callback || function () { }
    if(IS_NODE) {
        console.error(msg);
    } else {
        if(IS_MOBILE){
            mintMB.alert(msg, '提示').then(function(a) {
                callback()
            });
        }else {
            eleMB.alert(msg, {
                type: type || "warning",
                callback: callback,
                dangerouslyUseHTMLString: true
            });
        };
    };
}

export default function(obj, settings, callback){
   var callback = callback;
   if(arguments.length == 2){
       callback = settings;
   }

   var switchObj = {
       'v': function() {
           !!callback && callback(obj.tdata, obj);
           return [obj.tdata, obj];
       },
       'pglist': function() {
           !!callback && callback(obj);
           return [obj];
       },
       'valerror': function() {
           if (!IsNullOrEmpty(obj.msg)) {
               showMB(obj.msg, "success");
           };
           return [obj];
       },
       'login-index': function() {
           showMB(obj.msg, 'error', function(){
               sessionStorage.clear();
               router.push('/login');
           });
           return [obj];
       },
       'jump-url': function () {
           showMB(obj.msg, 'info', function () {
               router.push(obj.url);
           });
           return [obj];
       },
       'wechat': function() {
           var url = obj.url;
           if(obj.url) {
               if(/http/.test(url)) {
                   window.location.href = obj.url;
               } else {
                   if(!new RegExp(url).test(window.location.hash))
                      router.push(url);
               }
           }
           return [obj];
       },
       'error': function() {
           if(/(40163)|(40029)/.test(obj.msg)) {
               var href = window.location.href,
                   search = window.location.search;
               window.location.replace(href.replace(search, ''));
           } else {
               showMB(obj.msg, 'error', function(){
                   throw new Error(JSON.stringify(settings));
               });
           };
           return [obj];
       }
   }

   return !!switchObj[obj.code]
       ? switchObj[obj.code]()
       : (/^(throw-)/.test(obj.code)
           ? (function(){
               obj.code = obj.code.split('throw-')[1];
               callback && callback(obj);
           }())
           : showMB.call(this, obj.msg, 'error', function () {
               throw new Error('unexpeted ajaxResCheck code\nsettings:'+JSON.stringify(settings) + '\nresponse:' + JSON.stringify(obj));
           }));
}
