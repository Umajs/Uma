import * as CryptoJS from 'crypto-js';
import Uma, { IContext, TPlugin } from '@umajs/core';

import { FormatOpts } from './model';

/**
 *  session参数options配置：
 *      key: 设置cookie中，保存session的字段名称，默认为connect.sid
 *      maxAge: 保存时长
 *      secret: 加密签名
 *      overWrite: 是否覆盖
 */

export default (uma: Uma, options: any): TPlugin => {
    const opts = new FormatOpts(options);
    const { key: sessionKey, secret, maxAge, overWrite: overwrite } = opts;
    const crypto = {
        encrypt(obj: any) {
            return CryptoJS.AES.encrypt(JSON.stringify(obj), secret).toString();
        },
        decrypt(str: string) {
            return CryptoJS.AES.decrypt(str, secret);
        },
    };
    const setCookie = (ctx: IContext, content: any) => {
        ctx.cookies.set(sessionKey, crypto.encrypt(content), {
            maxAge,
            overwrite,
        });
    };

    return {
        context: {
            get session() {
                const that: IContext = this;

                return {
                    set(key: string, value: any) {
                        const sessionCookies = that.cookies.get(sessionKey);
                        let sessionBody = {};

                        if (sessionCookies) {
                            sessionBody = crypto.decrypt(sessionCookies);
                        }

                        sessionBody[key] = value;

                        setCookie(that, sessionBody);
                    },
                    get(key: string) {
                        const sessionCookies = that.cookies.get(sessionKey);

                        if (sessionCookies) {
                            const sessionBody = crypto.decrypt(sessionCookies);

                            return sessionBody[key];
                        }

                        return null;
                    },
                    remove(key: string) {
                        const sessionCookies = that.cookies.get(sessionKey);

                        if (sessionCookies) {
                            const sessionBody = crypto.decrypt(sessionCookies);

                            delete sessionBody[key];

                            setCookie(that, sessionBody);
                        }
                    },
                };
            },
        },
        use: {
            handler(ctx: IContext, next: Function) {
                setCookie(ctx, {});

                return next();
            },
        },
    };
};
