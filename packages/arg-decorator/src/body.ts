import { createArgDecorator, IContext } from '@umajs/core';
import { Validate, Model } from '@umajs/class-validator';

import { TbodyDecorator } from './type';
import { DefualtReturn } from './Tips';
import Check from './check';

export const fn = (ctx: IContext, argKey?: string | Array<string> | Model | Function) => {
    console.assert(typeof ctx.request.body !== 'undefined',
        '@Body decorator only can be used by POST RequestMethod , Please make sure you use it correctly.');
    const body = ctx.request.body || {};

    if (typeof argKey === 'string') return body[argKey];

    if (Array.isArray(argKey)) {
        const bodyParms = {};

        argKey.forEach((key) => {
            bodyParms[key] = body[key] || '';
        });

        return bodyParms;
    }

    if (typeof argKey === 'function' && typeof argKey.constructor === 'function') {
        const ArgModel:any = argKey;
        const [valid, schemeInfo] = Validate(new ArgModel(body, false));

        if (!valid) {
            return schemeInfo;
        }

        return DefualtReturn({ validate: valid, parms: schemeInfo });
    }

    if (typeof argKey === 'function') {
        const model = Reflect.construct(argKey, []);

        Reflect.ownKeys(model).forEach((key) => {
            if (body[key] !== undefined) model[key] = body[key];
        });

        return model;
    }

    return body;
};

/**
 * body 装饰器
 * @body()  修饰完全body
 * @body('key') 修饰特定单个属性值
 * @body(['key1','key2']) 修饰多个属性，返回一个包含key1,key2属性的对象属性
 * @body(Model) 修饰多个属性，返回一个Model对象
 */
export const Body: TbodyDecorator = createArgDecorator(fn);

/**
 * @Body.isRequire(key,tip)
 * @Body.isRequire([key1,key2],tip)
 * @Body.isRequire(Model,tip)
 */
const isRequire : (key: string, tip?:string) =>
    ParameterDecorator = createArgDecorator((ctx: IContext, argKey: string, tip?:string) => {
        const val = fn(ctx, argKey);
        const ck = new Check(ctx, argKey, val);

        return ck.isRequire(tip);
    });

const toNumber : (key: string, tip?:string) =>
    ParameterDecorator = createArgDecorator((ctx: IContext, argKey: string, tip?:string) => {
        const val = fn(ctx, argKey);
        const ck = new Check(ctx, argKey, val);

        return ck.toNumber(tip);
    });

const notEmpty : (key: string, tip?:string) =>
    ParameterDecorator = createArgDecorator((ctx: IContext, argKey: string, tip?:string) => {
        const val = fn(ctx, argKey);
        const ck = new Check(ctx, argKey, val);

        return ck.notEmpty(tip);
    });

const equals : (key: string, comparison:string, tip?:string) =>
    ParameterDecorator = createArgDecorator((ctx: IContext, argKey: string, comparison:string, tip?:string) => {
        const val = fn(ctx, argKey);
        const ck = new Check(ctx, argKey, val);

        return ck.equals({ tip, comparison });
    });

const toArray : (key: string, split?:string, tip?:string) =>
ParameterDecorator = createArgDecorator((ctx: IContext, argKey: string, split?:string, tip?:string) => {
    const val = fn(ctx, argKey);
    const ck = new Check(ctx, argKey, val);

    return ck.toArray(tip, split);
});

const isBoolean : (key: string, tip?:string) =>
    ParameterDecorator = createArgDecorator((ctx: IContext, argKey: string, tip?:string) => {
        const val = fn(ctx, argKey);
        const ck = new Check(ctx, argKey, val);

        return ck.toBoolean(tip);
    });

const toDate : (key: string, tip?:string) =>
    ParameterDecorator = createArgDecorator((ctx: IContext, argKey: string, tip?:string) => {
        const val = fn(ctx, argKey);
        const ck = new Check(ctx, argKey, val);

        return ck.toDate(tip);
    });

const AssertFalse : (key: string, tip?:string) =>
    ParameterDecorator = createArgDecorator((ctx: IContext, argKey: string, tip?:string) => {
        const val = fn(ctx, argKey);
        const ck = new Check(ctx, argKey, val);

        return ck.assertFalse(tip);
    });

const AssertTrue : (key: string, tip?:string) =>
    ParameterDecorator = createArgDecorator((ctx: IContext, argKey: string, tip?:string) => {
        const val = fn(ctx, argKey);
        const ck = new Check(ctx, argKey, val);

        return ck.assertTrue(tip);
    });

const DecimalMax : (key: string, value:number, tip?:string) =>
    ParameterDecorator = createArgDecorator((ctx: IContext, argKey: string, value: number, tip?:string) => {
        const val = fn(ctx, argKey);
        const ck = new Check(ctx, argKey, val);

        return ck.decimalMax({ tip, value });
    });

const DecimalMin : (key: string, value:number, tip?:string) =>
    ParameterDecorator = createArgDecorator((ctx: IContext, argKey: string, value:number, tip?:string) => {
        const val = fn(ctx, argKey);
        const ck = new Check(ctx, argKey, val);

        return ck.decimalMin({ tip, value });
    });

const Max : (key: string, value:number, tip?:string) =>
    ParameterDecorator = createArgDecorator((ctx: IContext, argKey: string, value:number, tip?:string) => {
        const val = fn(ctx, argKey);
        const ck = new Check(ctx, argKey, val);

        return ck.max({ tip, value });
    });

const Min : (key: string, value:number, tip?:string) =>
    ParameterDecorator = createArgDecorator((ctx: IContext, argKey: string, value:number, tip?:string) => {
        const val = fn(ctx, argKey);
        const ck = new Check(ctx, argKey, val);

        return ck.min({ tip, value });
    });

const Future : (key: string, tip?:string) =>
    ParameterDecorator = createArgDecorator((ctx: IContext, argKey: string, tip?:string) => {
        const val = fn(ctx, argKey);
        const ck = new Check(ctx, argKey, val);

        return ck.future(tip);
    });

const Past : (key: string, tip?:string) =>
    ParameterDecorator = createArgDecorator((ctx: IContext, argKey: string, tip?:string) => {
        const val = fn(ctx, argKey);
        const ck = new Check(ctx, argKey, val);

        return ck.past(tip);
    });

const Pattern : (key: string, pattern:RegExp, tip?:string) =>
    ParameterDecorator = createArgDecorator((ctx: IContext, argKey: string, pattern:RegExp, tip?:string) => {
        const val = fn(ctx, argKey);
        const ck = new Check(ctx, argKey, val);

        return ck.pattern({ tip, pattern });
    });

const Size : (key: string, min:number, max:number, tip?:string) =>
    ParameterDecorator = createArgDecorator((ctx: IContext, argKey: string, min:number, max:number, tip?:string) => {
        const val = fn(ctx, argKey);
        const ck = new Check(ctx, argKey, val);

        return ck.size(tip, min, max);
    });

const NotBlank : (key: string, tip?:string) =>
    ParameterDecorator = createArgDecorator((ctx: IContext, argKey: string, tip?:string) => {
        const val = fn(ctx, argKey);
        const ck = new Check(ctx, argKey, val);

        return ck.notBlank(tip);
    });

const Email : (key: string, tip?:string) =>
    ParameterDecorator = createArgDecorator((ctx: IContext, argKey: string, tip?:string) => {
        const val = fn(ctx, argKey);
        const ck = new Check(ctx, argKey, val);

        return ck.isEmail(tip);
    });

const Phone : (key: string, tip?:string) =>
    ParameterDecorator = createArgDecorator((ctx: IContext, argKey: string, tip?:string) => {
        const val = fn(ctx, argKey);
        const ck = new Check(ctx, argKey, val);

        return ck.isPhone(tip);
    });

Body.Require = isRequire;
Body.isRequire = isRequire;
Body.ToNumber = toNumber;
Body.isNumber = toNumber;
Body.NotEmpty = notEmpty;
Body.Equals = equals;
Body.isBoolean = isBoolean;
Body.ToBoolean = isBoolean;
Body.ToArray = toArray;
Body.ToDate = toDate;
// @AssertFalse(id,message)
Body.AssertFalse = AssertFalse; //  限制必须为false
// @AssertTrue(id,message)限制必须为true
Body.AssertTrue = AssertTrue;
// @DecimalMax(id,value,message)限制必须为一个不大于指定值的数字
Body.DecimalMax = DecimalMax;
// @DecimalMin(id,value,message)限制必须为一个不小于指定值的数字
Body.DecimalMin = DecimalMin;
// @Max(id,value,message)限制必须为一个不大于指定值的数字
Body.Max = Max;
// @Min(id,value,message)限制必须为一个不小于指定值的数字
Body.Min = Min;
// @Future(id,message)限制必须是一个将来的日期
Body.Future = Future;
// @Past(id,message)限制必须是一个过去的日期
Body.Past = Past;
// @Pattern(id,value,message)限制必须符合指定的正则表达式
Body.Pattern = Pattern;
// @Size(id,max,min,message)限制字符长度必须在min到max之间
Body.Size = Size;
// @NotBlank(id,message)验证注解的元素值不为空（不为null、去除首位空格后长度为0），不同于@NotEmpty，@NotBlank只应用于字符串且在比较时会去除字符串的空格
Body.NotBlank = NotBlank;
// @Email(id,message)验证注解的元素值是Email，也可以通过正则表达式和flag指定自定义的email格式
Body.Email = Email;
// @Phone(id,message)验证元素值是手机号
Body.Phone = Phone;

// Body 实体JSON校验
// 参考1 https://github.com/eivindfjeldstad/validate
// 参考2 https://github.com/skaterdav85/validatorjs#readme
