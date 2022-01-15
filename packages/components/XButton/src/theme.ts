// 按钮主题
const infoColor = '#0077fa';
const successColor = '#18a058';
const warningColor = '#f0a020';
const errorColor = '#d03050';
export const buttonTheme = {
    default: {
        bgColor: "#0000",
        border: "1px solid #dcdfe6",
        textColor: "#606266",
        borderRadius: "3px",
        hoverTextColor: "#f8aa00",
        hoverBorder: "1px solid #f8aa00",
        visitedTextColor: "#f8aa00",
        visitedBorder: "1px solid #f8aa00",
        activeTextColor: "#db9b11",
        activeBorder: "1px solid #db9b11",
        waveColor: "#ffa000",
    },
    info: {
        bgColor: infoColor,
        border: "1px solid " + infoColor,
        textColor: "#fff",
        borderRadius: "3px",

        hoverTextColor: "#fff",
        hoverBorder: "1px solid " + modifyColor(infoColor, 10),
        hoverBgColor: modifyColor(infoColor, 10),

        visitedTextColor: "#fff",
        visitedBorder: "1px solid " + infoColor,

        activeTextColor: "#fff",
        activeBorder: "1px solid " + modifyColor(infoColor, -10),
        activeBgColor: modifyColor(infoColor, -10),

        waveColor: infoColor,
    },
    success: {
        bgColor: successColor,
        border: "1px solid " + successColor,
        textColor: "#fff",
        borderRadius: "3px",

        hoverTextColor: "#fff",
        hoverBorder: "1px solid " + modifyColor(successColor, 5),
        hoverBgColor: modifyColor(successColor, 5),

        visitedTextColor: "#fff",
        visitedBorder: "1px solid " + successColor,

        activeTextColor: "#fff",
        activeBorder: "1px solid " + modifyColor(successColor, -10),
        activeBgColor: modifyColor(successColor, -10),

        waveColor: successColor,
    },
    warning: {
        bgColor: warningColor,
        border: "1px solid " + warningColor,
        textColor: "#fff",
        borderRadius: "3px",

        hoverTextColor: "#fff",
        hoverBorder: "1px solid " + modifyColor(warningColor, 10),
        hoverBgColor: modifyColor(warningColor, 10),

        visitedTextColor: "#fff",
        visitedBorder: "1px solid " + warningColor,

        activeTextColor: "#fff",
        activeBorder: "1px solid " + modifyColor(warningColor, -10),
        activeBgColor: modifyColor(warningColor, -10),

        waveColor: warningColor,
    },
    error: {
        bgColor: errorColor,
        border: "1px solid " + errorColor,
        textColor: "#fff",
        borderRadius: "3px",

        hoverTextColor: "#fff",
        hoverBorder: "1px solid " + modifyColor(errorColor, 10),
        hoverBgColor: modifyColor(errorColor, 10),

        visitedTextColor: "#fff",
        visitedBorder: "1px solid " + errorColor,

        activeTextColor: "#fff",
        activeBorder: "1px solid " + modifyColor(errorColor, -10),
        activeBgColor: modifyColor(errorColor, -10),

        waveColor: errorColor,
    },
};

export const buttonSize = {
    normal: {
        buttonPadding: "14px",
        buttonHeight: "34px",
        buttonFont: "14px"
    },
};

export function modifyColor(hex: string, light: number): string {
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


function rgb2hsl(r: number, g: number, b: number): Array<number>{
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
			case r: h = (g - b) / difference + (g < b ? 6 : 0); break;
			case g: h = 2.0 + (b - r) / difference; break;
			case b: h = 4.0 + (r - g) / difference; break;
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
		let q = l >= 0.5 ? (l + s - l * s) : (l * (1 + s));
		let p = 2 * l - q;
        rgb[0] = h + 1 / 3;
		rgb[1] = h;
		rgb[2] = h - 1 / 3;
		for(let i = 0; i < rgb.length; i++){
			let tc = rgb[i];
			if(tc < 0) {
				tc = tc + 1;
			} else if (tc > 1) {
				tc = tc - 1;
			}
			switch (true) {
				case (tc < (1 / 6)):
					tc = p + (q - p) * 6 * tc;
					break;
				case ((1 / 6) <= tc && tc < 0.5):
					tc = q;
					break;
				case (0.5 <= tc && tc < (2 / 3)):
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
