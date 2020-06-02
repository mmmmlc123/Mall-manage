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

### 首页 布局容器 样式调整
> 引入布局容器

### 首页 头部 样式调整
> layout 布局
> 行 el-row
> 列 el-col
> 注意： 24栏

### 首页 侧边栏 引入导航组件
> el-menu index不能一样

### 首页 进入首页的权限认证
> 若未登录(获取token为空)，则进入登录界面

### 首页 头部 退出功能
> 退出request 

### 用户管理 用户列表 路由配置
1. home.vue 开启路由模式 index值-> path值
2. home.vue mai -> router-view
3. 新建user.vue
4. router/index.js 在Home中children配置users的的路由

### 用户管理 用户列表 面包屑 搜索框
1. el-card 卡片小容器
2. 面包屑 el-breadcrumb
3. 搜索框el-input el-button

### 用户管理-用户列表 引入表格组件
> el-table(data数据[]) > el-table-column(label表头/prop="数据") > 字符串数据

### 用户管理-用户别表 表头处理
> type="index" ->单元格的内容从1开始的序号
> 调整表头label和宽度

### 用户管理-用户列表 请求数据 设置请求头
1. created()this.getUserList()
2. methods:getUserList(){发送请求}
3. 接口文档 -> 设置请求头
4. 找axios中关于请求头设置的代码
```js
const token  = localStorage.getItem('token')
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
```
5. 发送请求 

### 用户管理 用户列表 解构赋值 渲染数据
1. 解构赋值 给this.userList = res.data.users
2. props="" 渲染数据

### 用户管理 用户列表 处理表格时间
1. npm i moment
2. 全局过滤器 main.js 
```js
Vue.filter('fmtDate', (v) => {
  return moment(v).format('YYYY-MM-DD')
})
```
3. 使用全局过滤器 {{create_time | fmtDate}} 
   只能在数组的形式中使用，template创建一个数组，并通过slot-scope进行传参，
   scope相当于一行的数据， scope.row相当于当前行的数据对象，scope = userList
```js
    <el-table-column
        label="创建时间">
        <template slot-scope="scope" class="date">
            {{scope.row.create_time | fmtDate}}
        </template>
    </el-table-column>
```

### 用户管理 用户列表 表格-用户状态开关
> el-switch v-model="bool"
```js
<el-table-column prop="mg_state" label="用户状态">
    <template slot-scope="scope">
        <el-switch v-model="scope.row.mg_state"    
            active-color="#13ce66"
            inactive-color="#ff4949">
        </el-switch>
    </template>
</el-table-column>
```
1. 插入开关样式，新建template 传参scope , 绑定scope.row.mg_state

### 用户管理 用户列表 表格-操作
> 操作里面不是字符串
1. template 容器 slot-scope="scope"
2. 添加操作按钮 el-button
3. 调整样式size = "mini" plain

### 用户管理 用户列表 分页组件 引入文档
> 该接口支持分页 url参数中有 pagenum pagesize
1. @size-change 每页显示条数变化时 触发
2. @current-change 当前页面改变时 触发
3. :current-page设置当前页是第几页
4. :page-sizes="[2,4,6,8]"每页多少条数据
5. :page-size 设置显示多少条
6. :total 数据总数

### 用户管理 用户列表 搜索用户
1. 搜索框绑定query v-model="query"
2. 点击搜索按钮发送请求 @click="" 
3. 一键清除 clearable 
4. 对clear绑定,点击清除按钮重新搜索query=""
