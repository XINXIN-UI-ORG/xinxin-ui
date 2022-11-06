export class Log {
    constructor() {}

    public static standardLogout(msg: string) {
        console.warn('[XINXIN-UI warn]: %s', msg);
    }

    public static error(msg: string) {
        console.error('[XINXIN-UI error]: %s', msg);
    }
}