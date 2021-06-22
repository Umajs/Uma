import { IContext } from '@umajs/core';
import { Model } from '@umajs/class-validator';

export type IArgErrorTip = {
    key:string, // 修饰参数属性名称
    val?:string, // 参数入参值
    ctx?:IContext, // 上下文
    tip?:string, // 自定义提示内容
    [key:string]:any
}

// type ClassModel<T> = new (...args: any[]) => T;

interface ClassModel extends Model{}

export type IBaseDecorator = (key?: string | Array<string> | ClassModel | Function) => ParameterDecorator;

export type IBaseCheck = (key: string, tip?:string) => ParameterDecorator

export type IEqualsCheck = (key: string, comparison:string|number|any, tip?:string) => ParameterDecorator

interface IBody {
    Require?: IBaseCheck,
    isRequire?: IBaseCheck,
    isBoolean?: IBaseCheck,
    isNumber?: IBaseCheck,
    ToNumber?: IBaseCheck,
    ToBoolean?: IBaseCheck,
    ToArray?: (key: string, split?:string, tip?: string) => ParameterDecorator;
    ToDate?: (key: string, tip?: string) => ParameterDecorator;
}

export interface TbodyDecorator extends IBody, IBaseDecorator {
    Equals?: IEqualsCheck,
    DecimalMax?: (key: string, value: number, tip?: string) => ParameterDecorator;
    DecimalMin?: (key: string, value: number, tip?: string) => ParameterDecorator;
    Max?: (key: string, value: number, tip?: string) => ParameterDecorator;
    Min?: (key: string, value: number, tip?: string) => ParameterDecorator;
    Future?: (key: string, tip?: string) => ParameterDecorator;
    Past?: (key: string, tip?: string) => ParameterDecorator;
    Pattern?: (key: string, pattern: RegExp, tip?: string) => ParameterDecorator;
    Size?: (key: string, min: number, max: number, tip?: string) => ParameterDecorator;
    NotEmpty?: IBaseCheck,
    NotBlank?: (key: string, tip?: string) => ParameterDecorator;
    Email?: (key: string, tip?: string) => ParameterDecorator;
    Phone?: (key: string, tip?: string) => ParameterDecorator;
    AssertTrue?: (key: string, tip?: string) => ParameterDecorator;
    AssertFalse?: IBaseCheck;
}
