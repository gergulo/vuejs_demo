import instance from './index';
const preUrlPath = '';
//查询药品
const request = {
  p: ['get,/goods'],
  r: params => {
    return instance.get(`${preUrlPath}/goods`, {params})
  }
};
//新增药品
const add = {
  p: ['post,/goods'],
  r: params => {
    return instance.post(`${preUrlPath}/goods`, params)
  }
};
//修改药品
const edit = {
  p: ['put,/goods/**'],
  r: params => {
    return instance.put(`${preUrlPath}/goods/${params.id}`, params)
  }
};

//批量删除药品
const remove = {
  p: ['delete,/goods/**'],
  r: params => {
    return instance.delete(`${preUrlPath}/goods/${params.id}`)
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
  add,
  edit,
  notAllowed
}
