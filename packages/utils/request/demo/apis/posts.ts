import request from '../instance';
export function getPosts() {
  return request({
    url: '/posts/get',
    method: 'post',
    data: {}
  });
}
