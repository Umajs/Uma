import typeHelper from '../utils/typeHelper';
import { BaseContext } from '../types/IContext';

export const Context: BaseContext = {
    send(val: string | Buffer, status?: number) {
        if (status) this.status = status;
        this.body = val;
    },

    json(data: Object) {
        this.type = 'application/json';
        this.body = data;
    },

    jsonp(data: Object, callbackField: string = 'callback') {
        const field = (this.query[callbackField] || '').replace(/[^\w.]/g, '');

        if (field) {
            this.type = 'application/javascript';
            this.body = `${field}(${JSON.stringify(data)})`;
        } else {
            this.json(data);
        }
    },

    view(viewPath: string, locals: any = {}) {
        locals.ctx = this;

        return this.render(viewPath, locals);
    },

    get userAgent() {
        return this.header['user-agent'];
    },

    param: {},

    setHeader(name: string | any, value: string | string[]): void {
        if (this.ctx.res.headersSent) {
            console.error(new Error(`Cannot set headers after they are sent to the client, url: ${this.ctx.url}`));

            return;
        }

        if (value !== undefined) {
            this.ctx.set(name, value);
        }

        if (typeHelper.isObject(name)) {
            this.ctx.set(name);
        }
    },

    getHeader(name: string | any): any {
        return this.ctx.header[name];
    },
};
