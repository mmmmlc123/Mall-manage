# mallmanage

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


1.src/
2.build/ webpack
3.config/ 本地服务器配置


--------------
### 准备element ui模板
> element-ui 饿了么开发
> 适用于vue项目-PC端

### 准备 git 版本控制
> 工具：git/svn
1. git init -> .git
2. git status
3. git add .
4. git commit -m "zhushi"
5. 在代码托管平台新建远程仓库
6. git remote add origin https://github.com/mmmmlc123/Mall-manage.git
7. git hub -u origin master (之后再Push直接git push)

### 登录 新建分支 login 组件 配置路由
> 新建一个分支专门写登录功能
> git branch
> git checkout -b 分支名

### 登录 引入表单组件 调整样式
> el-form
1. 引入
2. 调整标签（h2 + el + button）
> label-position = "top"
3. .login-wrap .login-form .login-btn

### 登录 创建axios插件
> axios不是插件 创建MyHttpServer插件， 使用：this.$http.get()获取接口
    
    import axios from 'axios'

    const MyHttpServer = {}

    MyHttpServer.install = (Vue) => {
        
        //添加实例方法$http
        Vue.prototype.$http = axios
    }

    export default MyHttpServer

### 登录 请求登录 添加提示框
> 请求加token
1. 引入 MyHttpServer插件， 使用$http.post请求登录数据
2. 修改$http的header中的authorization,添加token
> 登录验证，添加el提示框
1. 异步请求res, 赋值到msg, status
2. if( status === 200) 登陆成功 跳转到home 提示成功this.$message.success(msg)
3. else this.$message.error(msg)

### 登录 登录成功 进入home页面
1. 进入home页面： this.$router.push('/home')
2. 新建Home.vue页面
3. 添加路由 '/home'

### 登录 简化登录请求代码 async和await 
> 让异步ajax请求代码看起来像同步
1. 异步请求方法前 添加async
2. 找到 异步请求获取有res结果的代码 前面加await 并提前赋值 到 const res
3. 就可以以同步的形式写方法内后续的代码

### 登录 保存登录成功 token 值
> 目的： 保存正确用户的token值，限制用户直接进入home页面
 localStorage.setItem('token', data.token) 