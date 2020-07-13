import { MessageBox as mintMB } from 'mint-ui'
import { MessageBox as eleMB } from 'element-ui';
import router from '@router/index'
const Raven = require('raven-js');

const IS_MOBILE = /iPhone|Android/i.test(window.navigator.userAgent.toLowerCase());
const IS_NODE = (typeof window === 'undefined');

var donot_show_again = false;
function showMB (msg, type, callback) {
    if(donot_show_again) return;

    callback = callback || function () { }
    if(IS_NODE) {
        console.error(msg);
    } else {
        if(IS_MOBILE){
            mintMB.alert(msg, '提示').then(function(a) {
                callback();
                donot_show_again = false;
            });
        }else {
            eleMB.alert(msg, {
                type: type || "warning",
                callback() {
                    callback();
                    donot_show_again = false;
                },
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

            Raven.captureException(new Error('ajaxResCheck code: value-error'), {
                tags: 'ajax',
                extra: {
                    req: settings,
                    res: obj
                }
            });

            return [obj];
        },
        'login-index': function() {
            showMB(obj.msg, 'error', function(){
                sessionStorage.clear();

                if(IS_MOBILE) {
                    router.push('/login');
                } else {
                    router.push('/login');
                };
            });
            donot_show_again = true;
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

            Raven.captureException(new Error('ajaxResCheck code: error'), {
                tags: 'ajax',
                extra: {
                    req: settings,
                    res: obj
                }
            });

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
                Raven.captureException(new Error('unexpeted ajaxResCheck code'), {
                    tags: 'ajax',
                    extra: {
                        req: settings,
                        res: obj
                    }
                });
                throw new Error('unexpeted ajaxResCheck code\nsettings:'+JSON.stringify(settings) + '\nresponse:' + JSON.stringify(obj));
            }));
}
