# 内置参数装饰器（ArgDecorator）

`Umajs` 提供了 `createArgDecorator` 可以很方便的创建参数装饰器，并且框架还提供了如下装饰器直接使用。

## 使用

> 安装 `npm install -S @umajs/arg-decorator`

## 示例

```ts
import { ToNumber, Body } from '@umajs/arg-decorator';

// url参数类型修饰校验
@Path('/saveUser')
saveUser(@ToNumber('age') age :number) {
    return Result.send(`This router queryParms is ${userId} ${age}`);
}

// POST参数类型修饰校验
@Path({value:'/post',method:RequestMethod.POST})
saveUser(@Body.ToNumber('age') age: number){
    return Result.send(`This Post body info is ${JSON.stringify(userInfo)}`);
}
```
当接口访问`localhost:port//saveUser?age=str`时，controller方法将终止执行，并默认返回客户端提示信息
```js
{
    "code": 0,
    "msg": "age 参数必须为数据类型。入参值str"
}
```

## Body参数装饰器接受并支持校验类型为class类型
> 当Body传递为class类时，会将请求参数中获取到的数据作为参数调用类构造函数，同时也会进行属性类型校验，校验成功则返回实例化对象。更多class的使用请参考[`@umajs/class-validator`](https://github.com/Umajs/class-validator)
```ts
// 定义class
import { Type, Required, Min, Model } from '@umajs/class-validator';
export default class UserInfo extends Model {
    constructor({ id, name, age }: UserInfo, isValid: boolean) {
        super(isValid);
        this.id = id;
        this.name = name;
        this.age = age;
    }

    @Type('number')
    id: number = 123;

    @Required()
    name?: string;

    @Min(0)
    age?: number;
}

// 参数装饰器使用
@Path({ value: '/post', method: RequestMethod.POST })
model(@Body(UserInfo) userInfo: user) {
    return Result.send(`This Post body info is ${JSON.stringify(userInfo)}`);

    // >> {"code":0,"msg":{"validate":{"id":["id must be of type number."],"name":["name is required."],"age":["age must be greater than 0."]},"parms":{"id":"1","age":-10}}}
}

```

## API

|修饰器| 使用说明 | 
---|---
@Query(id:string) | url参数修饰器
@Body(id?:string or Function or string[] or class) | POST请求参数修饰器 `@Body() body:object `  or `@Body('id') id:any` or  `@Body(['name','age']) user: {name:any,age:any}` 
@Require(id: string,message?:string) | url参数修饰并做必填校验
@ToNumber(id: string,message?: string) | 参数修饰并类型转换为number类型  类型转换失败则会终止函数执行并返回提示内容
@ToBoolean(id: string,message?: string) |参数修饰并类型转换布尔类型 类型转换失败则会终止函数执行并返回提示内容
@ToArray(id: string, split?:string ,message?: string) |参数修饰并类型转换数组 类型转换失败则会终止函数执行并返回提示内容
@ToDate(id: string,message?: string) | 参数修饰并类型转换为date类型  类型转换失败则会终止函数执行并返回提示内容 备注：参数接受如果为数字也会按照时间强制转换为时间格式。
@Equals(id: string,comparison?: any) | 参数修饰并做值对比校验
@NotNull(id: string,message?: string) |	限制必须不为null 
@AssertFalse(id: string,message?: string) |		限制必须为false
@AssertTrue(id: string,message?: string)	 |	限制必须为true
@DecimalMax(id: string,value: number,message?: string) |		限制必须为一个不大于指定值的数字
@DecimalMin(id: string,value: number,message?: string) |		限制必须为一个不小于指定值的数字
@Future(id: string,message?: string)	 |	限制必须是一个将来的日期
@Max(id: string,value: number,message?: string)	 |	限制必须为一个不大于指定值的数字
@Min(id: string,value: number,message?: string)	 |	限制必须为一个不小于指定值的数字
@Past(id: string,message?: string)	 |	限制必须是一个过去的日期
@Pattern(id: string,pattern: RegExp,message?: string)	 |	限制必须符合指定的正则表达式
@Size(id: string,max: number,min: number,message?: string)	 |	限制字符长度必须在min到max之间
@NotEmpty(id: string,message?: string) 	 |		验证注解的元素值不为null且不为空（字符串长度不为0、集合大小不为0）
@NotBlank(id: string,message?: string)	 |	验证注解的元素值不为空（不为null、去除首位空格后长度为0），不同于@NotEmpty，@NotBlank只应用于字符串且在比较时会去除字符串的空格
@Email(id: string,message?: string) |		验证注解的元素值是Email
@Phone(id: string,message?: string) | 验证元素值是手机号 具体格式参考`https://github.com/validatorjs/validator.js/blob/master/src/lib/isMobilePhone.js`

## 自定义校验提示内容
框架默认修饰器提示信息可以通过配置文件`src/config/argDecorator.config.ts`进行覆盖。通过`Result`模块用户可以自定义校验失败时返回的数据格式或者方式，比如json,或者状态码。
```ts
import { Result } from '@umajs/core';

export default {
    Require: {
        err({key, ctx, tip, val}) {
            return Result.send(tip || `请求${key} 参数不能为空。入参值为${val}`,403);
        },
    },
    ToNumber: {
        err({key, ctx, tip, val}) {
            return Result.json({
                code: 0,
                msg: tip || `请求${key} 参数必须为数字类型。入参值为${val}`,
            });
        },
    },
};

```