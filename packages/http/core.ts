import { AxeOption } from './types.axe';

/**
 * http请求方法 支持文件
 * 
 * @param options 请求数据
 * @returns 
 */
export function axe(options: AxeOption | string): Promise<string> {
  if (typeof options === 'string') {
    options = {
      url: options,
      method: 'GET'
    };
  }

  const headers = new Headers(options.headers || {});
  let axeData: FormData | { [propName: string]: any } = options.data || {};
  
  // 选择是否用FormData请求数据
  if (options.files) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(axeData)) {
      formData.append(key, value);
    }

    for (const [prop, files] of Object.entries(options.files)) {
      if (files instanceof File) {
        formData.append(prop, files);
      } else {
        Array.from(files).forEach(file => formData.append(prop, file));
      }
    }

    axeData = formData;
  }

  const requestInit = {
    method: options.method,
    headers,
    body: axeData instanceof FormData ? axeData : JSON.stringify(axeData),
    ...options.init,
  };

  if (options.method === 'GET') {
    Reflect.deleteProperty(requestInit, 'body');
  }

  const request = new Request(options.url, requestInit);
  return new Promise<string>((resolve, reject) => {
    fetch(request)
    .then(response => {
      if (!response.ok) {
        reject({
          reason: 'response code exceed 299',
          response: response.text(),
        });
      }

      resolve(response.text());
    })
    .catch(error => reject(error));
  });
}

/**
 * post方式请求数据 支持文件
 * 
 * @param options 请求数据
 * @returns 
 */
export function axePost(options: Omit<AxeOption, 'method'> | string): Promise<string> {
  if (typeof options === 'string') {
    return axe({
      url: options,
      method: 'POST',
    });
  }

  return axe({
    ...options,
    method: 'POST',
  });
}

/**
 * get方式请求数据
 * 
 * @param options 请求参数
 * @returns 
 */
export function axeGet(options: Omit<AxeOption, 'method' | 'files'>): Promise<string> {
  if (typeof options === 'string') {
    return axe({
      url: options,
      method: 'GET',
    });
  }

  return axe({
    ...options,
    method: 'GET',
  });
}