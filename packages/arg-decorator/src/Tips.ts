import Uma, { Result, mixin } from '@umajs/core';

import { IArgErrorTip } from './type';
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * 统一返回校验提示方法 按需使用Result.json 或者 Result.send
 * @param msg 校验提示信息
 */
export const DefualtReturn = (msg:string|{[key: string]:any}) => Result.json({
    code: 0,
    msg,
});

const Tips = {
    Require: {
        err({ key, val, tip }:IArgErrorTip) {
            return DefualtReturn(tip || `${key} 参数必填。入参值${val}`);
        },
    },
    NotEmpty: {
        err({ key, val, tip }:IArgErrorTip) {
            return DefualtReturn(tip || `${key} 参数不能为空。入参值${val}`);
        },
    },
    NotBlank: {
        err({ key, val, tip }:IArgErrorTip) {
            return DefualtReturn(tip || `${key} 参数必须为空（包括空字符串）。入参值${val}`);
        },
    },
    Equals: {
        err({ key, val, tip, comparison }:IArgErrorTip) {
            return DefualtReturn(tip || `${key} 参数必须等于${comparison}。入参值${val}`);
        },
    },
    toDate: {
        err({ key, val, tip }:IArgErrorTip) {
            return DefualtReturn(tip || `${key} 参数必须为时间格式字符串。入参值${val}`);
        },
    },
    ToNumber: {
        err({ key, val, tip }:IArgErrorTip) {
            return DefualtReturn(tip || `${key} 参数必须为数据类型。入参值${val}`);
        },
    },
    ToBoolean: {
        err({ key, val, tip }:IArgErrorTip) {
            return DefualtReturn(tip || `${key} 参数必须为true或者false。入参值${val}`);
        },
    },
    ToArray: {
        err({ key, val, tip }:IArgErrorTip) {
            return DefualtReturn(tip || `${key} 参数必须为数组或者字符串类型数组。入参值${val}`);
        },
    },
    AssertFalse: {
        err({ key, val, tip }:IArgErrorTip) {
            return DefualtReturn(tip || `${key} 参数必须为false。入参值${val}`);
        },
    },
    AssertTrue: {
        err({ key, val, tip }:IArgErrorTip) {
            return DefualtReturn(tip || `${key} 参数必须为true。入参值${val}`);
        },
    },
    DecimalMax: {
        err({ key, val, max, tip }:IArgErrorTip) {
            return DefualtReturn(tip || `${key} 参数不能超过最大数字${max}。入参值${val}`);
        },
    },
    DecimalMin: {
        err({ key, val, min, tip }:IArgErrorTip) {
            return DefualtReturn(tip || `${key} 参数不能小于最小数字${min}。入参值${val}`);
        },
    },
    Max: {
        err({ key, val, max, tip }:IArgErrorTip) {
            return DefualtReturn(tip || `${key} 参数不能超过最大数字${max}。入参值${val}`);
        },
    },
    Min: {
        err({ key, val, min, tip }:IArgErrorTip) {
            return DefualtReturn(tip || `${key} 参数不能小于最小数字${min}。入参值${val}`);
        },
    },
    Future: {
        err({ key, val, tip }:IArgErrorTip) {
            return DefualtReturn(tip || `${key} 参数必须为未来的时间格式。入参值${val}`);
        },
    },
    Past: {
        err({ key, val, tip }:IArgErrorTip) {
            return DefualtReturn(tip || `${key} 参数必须为过去的时间格式。入参值${val}`);
        },
    },
    Pattern: {
        err({ key, val, tip, pattern }:IArgErrorTip) {
            return DefualtReturn(tip || `${key} 参数必须符合正则${pattern}。入参值${val}`);
        },
    },
    Size: {
        err({ key, val, tip, min, max }:IArgErrorTip) {
            return DefualtReturn(tip || `${key} 参数必须大于${min}小于${max}。入参值${val}`);
        },
    },
    isEmail: {
        err({ key, val, tip }:IArgErrorTip) {
            return DefualtReturn(tip || `${key} 参数必须为邮件格式。入参值${val}`);
        },
    },
    isPhone: {
        err({ key, val, tip }:IArgErrorTip) {
            return DefualtReturn(tip || `${key} 参数必须为电话号码类型，入参值${val}。
            具体格式参考https://github.com/validatorjs/validator.js/blob/master/src/lib/isMobilePhone.js。`);
        },
    },

};

// 可以通过 argDecorator.config.ts 配置提示
mixin(true, Tips, Uma.config.argDecorator || {});

export default Tips;
