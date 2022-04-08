export const format = (originStr: string): string => {
    // 解析字符串 如果有英文则添加span包裹
    let result: string = '';
    let swapStr: string = '';
    for (let i = 0; i < originStr.length; i++) {
        let currentWord = originStr[i];
        if (/[a-zA-Z-@]/g.test(currentWord)) {
            swapStr += currentWord;
        } else {
            if (swapStr !== '') {
                // 先处理缓存中的英文
                result += `<span class="site-tag">${swapStr}</span>`;
                swapStr = '';
            }
            result += currentWord;
        }
    }
    return result;
};
