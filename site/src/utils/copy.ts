import { XMessage } from "xinxin-ui";

export async function copyToClipBoard(text: string, successTips?: string) {
    if (navigator.clipboard) {
        try {
            await navigator.clipboard.writeText(text);
            XMessage({
                message: successTips || "复制成功",
                type: 'success'
            });
        } catch (e) {
            XMessage({
                message: "啊哦，复制出错了~",
                type: "error"
            });
        }
    } else {
        XMessage({
            message: "当前浏览器版本过低不支持复制，建议使用高版本浏览器或手动复制",
            type: "warning"
        });
    }
}