import instance from './index';
const preUrlPath = '';
//登录
const request = {
  p: ['get,/login'],
  r: params => {
    return instance.get(`${preUrlPath}/login`, {params})
  }
}

export {
    request,
}
