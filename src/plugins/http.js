//插件模块

import axios from 'axios'

const MyHttpServer = {}

MyHttpServer.install = (Vue) => {
    axios.defaults.baseURL="http://127.0.0.1:8888/api/private/v1/"
    /* 
    //需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
    const AUTH_TOKEN = localStorage.getItem('token')
    axios.defaults.headers['Authorization'] = AUTH_TOKEN; */
    
    //在请求或响应被 then 或 catch 处理前拦截它们。
    // 添加请求拦截器
    axios.interceptors.request.use(config => {
        // 在发送请求之前做些什么
        //console.log('拦截器被触发')
        
        //console.log(config)
    
        const AUTH_TOKEN = localStorage.getItem('token')
        config.headers['Authorization'] = AUTH_TOKEN;
        
        return config;
    }/* , function(error) {
        // 对请求错误做些什么
        return Promise.reject(error);
        console.log(error)
    } */);

    // 添加响应拦截器
    axios.interceptors.response.use(function (response) {
        // 对响应数据做点什么
        return response;
    }, function(error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    });

    //添加实例方法$http
    Vue.prototype.$http = axios
}

export default MyHttpServer