//插件模块

import axios from 'axios'

const MyHttpServer = {}

MyHttpServer.install = (Vue) => {
    axios.defaults.baseURL="http://127.0.0.1:8888/api/private/v1/"
    //axios.defaults.headers['token'] = localStorage['token'] 
    /* axios.interceptors.request.use(
        config => {
            const token = localStorage.getItem("token");
            if (token) {
                // 判断是否存在token，如果存在的话，则每个http header都加上token
                config.headers["token"] = token;
            }
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    ); */
    //添加实例方法$http
    Vue.prototype.$http = axios
}

export default MyHttpServer