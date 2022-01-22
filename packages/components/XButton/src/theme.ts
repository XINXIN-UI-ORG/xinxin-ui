import { UnwrapNestedRefs } from "vue";

export const buttonSize = {
    mini: {
        buttonPadding: "5px",
        buttonHeight: "20px",
        buttonFont: "12px",
        buttonWidth: "auto",
    },
    small: {
        buttonPadding: "10px",
        buttonHeight: "30px",
        buttonFont: "14px",
        buttonWidth: "auto",
    },
    normal: {
        buttonPadding: "14px",
        buttonHeight: "34px",
        buttonFont: "14px",
        buttonWidth: "auto",
    },
    large: {
        buttonPadding: "20px",
        buttonHeight: "45px",
        buttonFont: "16px",
        buttonWidth: "auto",
    },
};

export const buttonOutter = {
    default: {
        borderRadius: "3px",
        iconMargin: "3px",
    },
    round: {
        borderRadius: "50px",
        iconMargin: "3px",
    },
    circle: {
        borderRadius: "255px",
        buttonWidth: "34px",
        buttonPadding: "0",
        iconMargin: "0",
    },
};

const baseColorMap: { [propsName: string]: string } = {
    info: "#0077fa",
    success: "#67c23a",
    warning: "#f0a020",
    error: "#d03050",
};

export function getButtonTypeStyle(
    type: string,
    customerColor: string | undefined,
    secondary: string | undefined,
    tertiary: string | undefined,
    quaternary: string | undefined,
    dashed: string | undefined,
    plain: string | undefined,
    ghost: string | undefined
): { [propsName: string]: string } | null {
    // 获取基础颜色
    let baseColor: string = customerColor ?? baseColorMap[type];
    if (
        baseColor === undefined ||
        !/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/g.test(baseColor)
    ) {
        return null;
    }
    if (baseColor.length === 4) {
        baseColor =
            "#" +
            baseColor[1] +
            baseColor[1] +
            baseColor[2] +
            baseColor[2] +
            baseColor[3] +
            baseColor[3];
    }
    const style = {
        display: "inline-block",
        bgColor: baseColor,
        border: "1px solid " + baseColor,
        textColor: "#fff",

        hoverTextColor: "#fff",
        hoverBorder: "1px solid " + modifyColor(baseColor, 10),
        hoverBgColor: modifyColor(baseColor, 10),

        visitedTextColor: "#fff",
        visitedBorder: "1px solid " + baseColor,
        visitedBgColor: baseColor,

        activeTextColor: "#fff",
        activeBorder: "1px solid " + modifyColor(baseColor, -10),
        activeBgColor: modifyColor(baseColor, -10),

        waveColor: baseColor,
    };
    // 设置了次要按钮
    if (secondary !== undefined) {
        style.textColor = baseColor;
        style.hoverTextColor = baseColor;
        style.activeTextColor = baseColor;
        style.visitedTextColor = baseColor;
        // 计算背景颜色
        style.bgColor = baseColor.slice(0, 7) + "26";
        style.border = "none";
        style.hoverBgColor = baseColor.slice(0, 7) + "33";
        style.hoverBorder = "none";
        style.activeBgColor = baseColor.slice(0, 7) + "4D";
        style.activeBorder = "none";
        style.visitedBorder = "none";
        style.visitedBgColor = style.bgColor;
        style.waveColor = "#0000";
    }
    // 设置次次级按钮
    if (tertiary !== undefined) {
        const tertiaryColor = "#2e3338";
        style.textColor = baseColor;
        style.hoverTextColor = baseColor;
        style.activeTextColor = baseColor;
        style.visitedTextColor = baseColor;
        // 计算背景颜色
        style.bgColor = tertiaryColor.slice(0, 7) + "0D";
        style.border = "none";
        style.hoverBgColor = tertiaryColor.slice(0, 7) + "1A";
        style.hoverBorder = "none";
        style.activeBgColor = tertiaryColor.slice(0, 7) + "26";
        style.activeBorder = "none";
        style.visitedBorder = "none";
        style.visitedBgColor = style.bgColor;
        style.waveColor = "#0000";
    }
    // 设置了最低级按钮
    if (quaternary !== undefined) {
        const quaternaryColor = "#2e3338";
        style.textColor = baseColor;
        style.hoverTextColor = baseColor;
        style.activeTextColor = baseColor;
        style.visitedTextColor = baseColor;
        // 计算背景颜色
        style.bgColor = "#0000";
        style.border = "none";
        style.hoverBgColor = quaternaryColor.slice(0, 7) + "14";
        style.hoverBorder = "none";
        style.activeBgColor = quaternaryColor.slice(0, 7) + "26";
        style.activeBorder = "none";
        style.visitedBorder = "none";
        style.visitedBgColor = style.bgColor;
        style.waveColor = "#0000";
    }
    // 设置了虚线或者背景透明
    if (dashed !== undefined || ghost !== undefined) {
        const dashedColor = baseColor;
        style.textColor = dashedColor;
        style.bgColor = "#0000";
        style.border = `1px ${
            dashed !== undefined ? "dashed" : "solid"
        } ${dashedColor}`;
        style.hoverTextColor = modifyColor(dashedColor, -5);
        style.hoverBgColor = "#0000";
        style.hoverBorder = `1px ${
            dashed !== undefined ? "dashed" : "solid"
        } ${modifyColor(dashedColor, -5)}`;
        style.activeTextColor = modifyColor(dashedColor, -10);
        style.activeBgColor = "#0000";
        style.activeBorder = `1px ${
            dashed !== undefined ? "dashed" : "solid"
        } ${modifyColor(dashedColor, -10)}`;
        style.visitedTextColor = dashedColor;
        style.visitedBorder = `1px ${
            dashed !== undefined ? "dashed" : "solid"
        } ${dashedColor}`;
        style.visitedBgColor = style.bgColor;
        style.waveColor = dashedColor;
    }
    // 设置背景透明
    if (plain !== undefined) {
        style.bgColor = baseColor.slice(0, 7) + "33";
        style.textColor = baseColor;
        style.visitedTextColor = "#fff";
        style.visitedBgColor = baseColor;
    }
    return style;
}

function modifyColor(hex: string, light: number): string {
    // 先将hex转为rgba
    const rgba: number[] | null = hex2rgb(hex);
    if (rgba === null) {
        return hex;
    }
    // 将rgb转换为hsl
    const hsl = rgb2hsl(rgba[0], rgba[1], rgba[2]);
    // 将亮度调整
    hsl[2] += light;
    // 将hsl转为rgba
    const lightRgb = hsl2rgb(hsl[0], hsl[1], hsl[2]);
    // 将提升亮度后的颜色值赋值给原来的颜色
    rgba[0] = lightRgb[0];
    rgba[1] = lightRgb[1];
    rgba[2] = lightRgb[2];
    // 将rgba还原为16进制颜色
    return rgba2hex(rgba);
}

/**
 * rgba转16进制
 * @param rgba rgba值
 * @returns 16进制值
 */
function rgba2hex(rgba: number[]): string {
    let hex: string = "";
    hex += formatHex(rgba[0]) + formatHex(rgba[1]) + formatHex(rgba[2]);
    if (rgba[3]) {
        hex += rgba[3].toString(16);
    }
    return "#" + hex;
}

/**
 * 将十进制转换为16进制 不足两位在前面补0
 * @param oct 待转换数据
 * @returns 转换后的16进制数据
 */
function formatHex(oct: number): string {
    return ("0" + oct.toString(16)).slice(-2);
}

/**
 * 16进制转rgba值
 * @param hex 16进制颜色字符串
 * @returns 返回rgba值
 */
function hex2rgb(hex: string): Array<number> | null {
    // 处理前后字符
    hex = hex.replace("#", "");
    if (hex.length !== 6 && hex.length !== 8) {
        // 字符串格式错误
        return null;
    }
    const rHex = hex.slice(0, 2);
    const r = parseInt("0x" + rHex, 16);
    if (isNaN(r)) {
        // 转换有误
        return null;
    }
    const gHex = hex.slice(2, 4);
    const g = parseInt("0x" + gHex, 16);
    if (isNaN(g)) {
        return null;
    }
    const bHex = hex.slice(4, 6);
    const b = parseInt("0x" + bHex, 16);
    if (isNaN(b)) {
        return null;
    }
    const aHex = hex.slice(6, 8);
    if (aHex) {
        // 如果有设置透明度
        const a = parseInt("0x" + aHex, 16);
        if (isNaN(a)) {
            return null;
        }
        return [r, g, b, a];
    }
    return [r, g, b];
}

function rgb2hsl(r: number, g: number, b: number): Array<number> {
    r = r / 255;
    g = g / 255;
    b = b / 255;

    let min: number = Math.min(r, g, b);
    let max: number = Math.max(r, g, b);
    let l: number = (min + max) / 2;
    let difference: number = max - min;
    let h: number = 0;
    let s: number = 0;
    if (max === min) {
        h = 0;
        s = 0;
    } else {
        s = l > 0.5 ? difference / (2.0 - max - min) : difference / (max + min);
        switch (max) {
            case r:
                h = (g - b) / difference + (g < b ? 6 : 0);
                break;
            case g:
                h = 2.0 + (b - r) / difference;
                break;
            case b:
                h = 4.0 + (r - g) / difference;
                break;
        }
        h = Math.round(h * 60);
    }
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    return [h, s, l];
}

function hsl2rgb(h: number, s: number, l: number): number[] {
    h /= 360;
    s /= 100;
    l /= 100;
    let rgb: number[] = [];

    if (s === 0) {
        rgb = [Math.round(l * 255), Math.round(l * 255), Math.round(l * 255)];
    } else {
        let q = l >= 0.5 ? l + s - l * s : l * (1 + s);
        let p = 2 * l - q;
        rgb[0] = h + 1 / 3;
        rgb[1] = h;
        rgb[2] = h - 1 / 3;
        for (let i = 0; i < rgb.length; i++) {
            let tc = rgb[i];
            if (tc < 0) {
                tc = tc + 1;
            } else if (tc > 1) {
                tc = tc - 1;
            }
            switch (true) {
                case tc < 1 / 6:
                    tc = p + (q - p) * 6 * tc;
                    break;
                case 1 / 6 <= tc && tc < 0.5:
                    tc = q;
                    break;
                case 0.5 <= tc && tc < 2 / 3:
                    tc = p + (q - p) * (4 - 6 * tc);
                    break;
                default:
                    tc = p;
                    break;
            }
            rgb[i] = Math.round(tc * 255);
        }
    }
    return rgb;
}

export class PersistenceStyle {
    private style: object;

    constructor() {
        this.style = {};
    }

    /**
     * 持久化对象
     * @param storeObj 待持久化的对象
     */
    public store(storeObj: UnwrapNestedRefs<object>): void {
        if (Object.keys(storeObj).length > 0) {
            Object.keys(storeObj).forEach(
                (key) => (this.style[key] = storeObj[key])
            );
        }
    }

    /**
     * 将对象状态恢复到持久化之前
     * @param restoreObj 待恢复对象
     */
    public restore(restoreObj: UnwrapNestedRefs<object>): void {
        if (Object.keys(this.style).length > 0) {
            Object.keys(this.style).forEach(
                (key) => (restoreObj[key] = this.style[key])
            );
        }
    }

    /**
     * 禁用hover active focus等样式
     * @param disableObj 待禁用的对象
     */
    public disable(
        disableObj: UnwrapNestedRefs<{ [propsName: string]: string }>
    ): void {
        disableObj.hoverBgColor = disableObj.bgColor;
        disableObj.hoverTextColor = disableObj.textColor;
        disableObj.hoverBorder = disableObj.border;
        disableObj.activeBgColor = disableObj.bgColor;
        disableObj.activeTextColor = disableObj.textColor;
        disableObj.activeBorder = disableObj.border;
        disableObj.visitedBgColor = disableObj.bgColor;
        disableObj.visitedTextColor = disableObj.textColor;
        disableObj.visitedBorder = disableObj.border;
    }
}
