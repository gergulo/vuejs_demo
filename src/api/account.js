import instance from './index';
const preUrlPath = '';
//获取用户列表
const request = {
  p: ['get,/accounts'],
  r: params => {
    return instance.get(`${preUrlPath}/accounts`, {params})
  }
}
//删除用户
const remove = {
  p: ['delete,/accounts/**'],
  r: params => {
    return instance.delete(`${preUrlPath}/accounts/${params.id}`)
  }
};

//修改用户
const edit = {
  p: ['put,/accounts/**'],
  r: params => {
    let words = CryptoJS.enc.Utf8.parse(params.password);
    let base64 = CryptoJS.enc.Base64.stringify(words);
    params.password = base64;
    return instance.put(`${preUrlPath}/accounts/${params.id}`, params)
  }
};

//越权请求
const notAllowed = {
  p: ['get,/notAllowed/**'],
  r: params => {
    return instance.get(`${preUrlPath}/notAllowed`, {params})
  }
}

export {
  request,
  remove,
  edit,
  notAllowed
}
