type resultType = {
  base: () => string,
  is: (block: string, flag: boolean) => string,
  bm: (content: string) => string,
  middle: (...args: string[]) => {
    is: (block: string, flag: boolean) => string,
    base: () => string,
    bm: (content: string) => string,
  },
  e: (...args: string[]) => string,
};

export function generateClassName(tag: string): resultType {
  // 前缀
  let prefixTagName: string = `x-${tag}`;
  // 基础名称
  const base = (blockName: string) => {
    return () => {
      return blockName;
    };
  };
  // 生成选中标签
  const is = (prefix: string) => {
    return (block: string, flag: boolean) => {
      return flag ? `${prefix}-${block}` : "";
    };
  };
  // 根据传入的内容生成标签
  const bm = (prefix: string) => {
    return (content: string) => {
      return `${prefix}-${content}`;
    };
  }
  // 生成中间tag
  const middle = (...middleName: string[]) => {
    let middle: string = prefixTagName;
    middleName.forEach(itemTag => middle = `${middle}__${itemTag}`);
    return {
      is: is(middle),
      base: base(middle),
      bm: bm(middle),
    };
  };
  // 生成多级标签
  const e = (...tags: string[]) => {
    return middle(...tags).base();
  };

  return {
    base: base(prefixTagName),
    is: is(prefixTagName),
    bm: bm(prefixTagName),
    middle,
    e,
  };
}
