import { start, stop, send, post } from '../__fixtures__/app/app';

describe('test @Body', () => {
    beforeAll(async () => {
        await start();
    });

    afterAll(async () => {
        await stop();
    });

    it('@Body(string)', async () => {
        const userid = 1;
        const index = await post('/Body', { userid });

        expect(index.text).toEqual(`This Post body parms userid is ${userid}`);
    });

    it('@Body([string])', async () => {
        const userid = 1;
        const age = 18;
        const index = await post('/Bodys', { userid, age });

        expect(index.text).toEqual(`${userid}-${age}`);
    });

    it('@Body.isRequire(string,message)', async () => {
        const index = await post('/isRequire');

        expect(JSON.parse(index.text)).toMatchObject({ code: 0, msg: '年龄为空' });
    });
    it('@Body.isRequire(string,message)', async () => {
        const index = await post('/isRequire', { age: 18 });

        expect(index.text).toEqual('18');
    });

    it('@Body.Equals(string,value,message) throw error', async () => {
        const index = await post('/Equals', { age: 12 });

        expect(JSON.parse(index.text)).toMatchObject({ code: 0, msg: '不是18岁！' });
    });
    it('@Body.Equals(string,value,message) sucecss', async () => {
        const index = await post('/Equals', { age: '18' });

        expect(index.text).toEqual('18');
    });

    it('@Body.AssertFalse(string,message) throw error', async () => {
        const index = await post('/AssertFalse', { AssertFalse: true });

        expect(JSON.parse(index.text)).toMatchObject({ code: 0, msg: '参数必须是布尔类型false' });
    });
    it('@Body.AssertFalse(string,message)  sucecss', async () => {
        const index = await post('/AssertFalse', { AssertFalse: false });

        expect(index.text).toEqual('false');
    });

    it('@Body.AssertTrue(string,message)', async () => {
        const index = await post('/AssertTrue', { AssertTrue: false });

        expect(JSON.parse(index.text)).toMatchObject({ code: 0, msg: '参数必须是布尔类型true' });
    });
    it('@Body.AssertTrue(string,message)', async () => {
        const index = await post('/AssertTrue', { AssertTrue: true });

        expect(index.text).toEqual('true');
    });

    it('@Body.DecimalMax(string,value,message)', async () => {
        const index = await post('/DecimalMax', { DecimalMax: 20.43 });

        expect(JSON.parse(index.text)).toMatchObject({ code: 0, msg: '入参值不能大于10.0' });
    });
    it('@Body.DecimalMax(string,value,message)', async () => {
        const index = await post('/DecimalMax', { DecimalMax: 8 });

        expect(index.text).toEqual('8');
    });

    it('@Body.DecimalMin(string,value,message)', async () => {
        const index = await post('/DecimalMin', { DecimalMin: 2.332 });

        expect(JSON.parse(index.text)).toMatchObject({ code: 0, msg: '入参值不能小于10.0' });
    });
    it('@Body.DecimalMin(string,value,message)', async () => {
        const index = await post('/DecimalMin', { DecimalMin: 12.08 });

        expect(index.text).toEqual('12.08');
    });

    it('@Body.Max(string,value,message)', async () => {
        const index = await post('/Max', { Max: 12 });

        expect(JSON.parse(index.text)).toMatchObject({ code: 0, msg: '入参值不能大于10' });
    });
    it('@Body.Max(string,value,message)', async () => {
        const index = await post('/Max', { Max: 9 });

        expect(index.text).toEqual('9');
    });

    it('@Body.Min(string,value,message)', async () => {
        const index = await post('/Min', { Min: 2 });

        expect(JSON.parse(index.text)).toMatchObject({ code: 0, msg: '入参值不能小于10' });
    });
    it('@Body.Min(string,value,message)', async () => {
        const index = await post('/Min', { Min: 20 });

        expect(index.text).toEqual('20');
    });

    it('@Body.Future(string,message)', async () => {
        const index = await post('/Future', { Future: `${new Date().getTime()}` });

        expect(JSON.parse(index.text)).toMatchObject({ code: 0, msg: 'Future 参数必须为未来的时间格式' });
    });
    it('@Body.Future(string,message)', async () => {
        const index = await post('/Future', { Future: '2221-07-08' });

        expect(index.text).toEqual('2221-07-08');
    });

    it('@Body.Past(string,message)', async () => {
        const index = await post('/Past', { Past: new Date() });

        expect(JSON.parse(index.text)).toMatchObject({ code: 0, msg: 'Past 参数必须为过去的时间格式' });
    });
    it('@Body.Past(string,message)', async () => {
        const index = await post('/Past', { Past: '1221-07-08' });

        expect(index.text).toEqual('1221-07-08');
    });

    it('@Body.Pattern(string,pattern,message)', async () => {
        const index = await post('/Pattern', { Pattern: 1123232 });

        expect(JSON.parse(index.text)).toMatchObject({ code: 0, msg: 'Pattern必须为111开头' });
    });
    it('@Body.Pattern(string,pattern,message)', async () => {
        const index = await post('/Pattern', { Pattern: 11123232 });

        expect(index.text).toEqual('11123232');
    });

    it('@Body.Size(string,min,max,message)', async () => {
        const index = await post('/Size', { Size: 45 });

        expect(JSON.parse(index.text)).toMatchObject({ code: 0, msg: 'Size 参数必须大于10小于20。入参值45' });
    });
    it('@Body.Size(string,min,max,message)', async () => {
        const index = await post('/Size', { Size: 15 });

        expect(index.text).toEqual('15');
    });

    it('@Body.NotEmpty(string,message)', async () => {
        const index = await post('/NotEmpty');

        expect(JSON.parse(index.text)).toMatchObject({ code: 0, msg: 'id 参数不能为空。入参值undefined' });
    });
    it('@Body.NotEmpty(string,message)', async () => {
        const index = await post('/NotEmpty', { id: 'id' });

        expect(index.text).toEqual('id');
    });

    it('@Body.NotBlank(string,message)', async () => {
        const index = await post('/NotBlank', { id: ' ' });

        expect(JSON.parse(index.text)).toMatchObject({ code: 0, msg: 'id 参数不能为空。入参值 ' });
    });
    it('@Body.NotBlank(string,message)', async () => {
        const index = await post('/NotBlank', { id: 'id' });

        expect(index.text).toEqual('id');
    });

    it('@Body.Email(string,message)', async () => {
        const index = await post('/Email', { Email: ' ' });

        expect(JSON.parse(index.text)).toMatchObject({ code: 0, msg: 'Email 参数必须为邮件格式。入参值 ' });
    });
    it('@Body.Email(string,message)', async () => {
        const index = await post('/Email', { Email: 'zunyi_zjj@163.com' });

        expect(index.text).toEqual('zunyi_zjj@163.com');
    });
    it('@Body.Phone(string,message)', async () => {
        const index = await post('/Phone', { Phone: '123' });

        expect(JSON.parse(index.text)).toMatchObject({ code: 0, msg: '参数必须是电话号码格式' });
    });
    it('@Body.Phone(string,message)', async () => {
        const index = await post('/Phone', { Phone: '08618612987750' });

        expect(index.text).toEqual('08618612987750');
    });

    it('@Body.ToDate(string,message)', async () => {
        const index = await post('/ToDate', { date: new Date().getTime() });

        expect(JSON.parse(index.text)).toMatchObject({ code: 0, msg: '参数必须为时间格式字符串' });
    });
    it('@Body.ToDate(string,message)', async () => {
        const index = await post('/ToDate', { date: '2020-08-06' });

        expect(index.text).toEqual('2020-08-06');
    });

    it('@Body.ToBoolean(string,message)', async () => {
        const index = await post('/ToBoolean', { is: new Date().getTime() });

        expect(JSON.parse(index.text)).toMatchObject({ code: 0, msg: '参数必须是布尔类型' });
    });
    it('@Body.ToBoolean(string,ToBoolean)', async () => {
        const index = await post('/ToBoolean', { is: 0 });

        expect(index.text).toEqual('false');
    });

    it('@Body.ToNumber(string,message)', async () => {
        const index = await post('/ToNumber', { number: 'n' });

        expect(JSON.parse(index.text)).toMatchObject({ code: 0, msg: 'number 参数必须为数据类型。入参值n' });
    });
    it('@Body.ToNumber(string,ToBoolean)', async () => {
        const index = await post('/ToNumber', { number: 0 });

        expect(index.text).toEqual('0');
    });

    it('@Body.ToArray(string,message)', async () => {
        const index = await post('/ToArray', { arr: '123' });

        expect(index.text).toEqual('123');
    });
    it('@Body.ToArray(string,message)', async () => {
        const index = await post('/ToArray', { arr: '1|2|3' });

        expect(index.text).toEqual('1,2,3');
    });
    it('@Body.ToArray(string,ToBoolean)', async () => {
        const index = await post('/ToArray', { arr: [1, 2, 3] });

        expect(index.text).toEqual('1,2,3');
    });
    it('@RequestParam(string)', async () => {
        const index = await post('/RequestParam', { param: '1' });

        expect(index.text).toEqual('1');
    });
    it('@Body(classModel) to be err', async () => {
        const index = await post('/classValidator', { id: '1', age: -10 });

        expect(index.text).toEqual('{"code":0,"msg":{"validate":{"id":["id must be of type number."],"name":["name is required."],"age":["age must be greater than 0."]},"parms":{"id":"1","age":-10}}}');
    });
    it('@Body(classModel) to be success', async () => {
        const index = await post('/classValidator', { id: 1, name: 'umajs', age: 18 });

        expect(index.text).toEqual('This Post body info is {\"id\":1,\"name\":\"umajs\",\"age\":18}');
    });
});
