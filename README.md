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
4. git commit -m "注释"
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

### 用户管理 用户列表 添加用户-显示对话框
1. 引入对话框el-form
2. 添加用户按钮-> 显示对话框
3. 配置对话框
3.1 :model = form (看接口文档，对应数据)
3.2 默认对话框不显示
3.3 el-form -> el-input="form.xxx"

### 用户管理 用户列表 添加用户-处理响应
1. 请求接口 添加数据 post this.form
2. 关闭对话框
3. 清空文本this.form={}
4. 更新视图 getUserList()
5. 提示信息

### 用户管理 用户列表 操作-删除 打开确认框
> this.$confirm().then.catch() 通过promise
1. 点击确认 -> .then参数
2. 点击取消 -> .catch的参数

### 用户管理 用户列表 操作-删除 处理响应
1. 点击确认 -> .then 发送 delete请求
1.1 获取userId,通过scope得到用户id，赋值userId
1.2 发送异步请求delete，获取结果
2. 判断是否正确删除 if(status === 200)
2.1 正确 更新视图 注意回到第一页 this.pagenum = 1
2.2 正确/错误 提示信息 

### 用户管理 用户列表 操作-编辑 打开编辑框-显示编辑数据
1. 复制添加用户文本框 el-form
2. 设置edit按钮 @click => 打开编辑框
3. 显示该用户数据 
3.1 点击edit 对click传参scope.row 用户数据
3.2 在showEditUserDia方法中 将用户数据赋值 this.form

### 用户管理 用户列表 操作-编辑 发送编辑请求
1. 确定 -> editUser() -> 发送异步请求
2. 请求接口 put(`user/${this.form.id}`,this.form) this.form里是当前用户的数据
3. 注意：在打开添加对话框之前清空文本框 this.form= {}

### 用户管理 用户列表 修改用户状态
1. switch开关添加事件@change
2. 传参用户数据 scope.row = user
3. 发送put异步请求 （视图双向绑定，不用修改视图）

### 用户管理 用户列表 分配角色-显示对话框
1. 点击操作中的按钮 -> 打开对话框
2. 引入对话框(有下拉框)
3. 下拉框特性： 如果select绑定的数据的值和option中的value一致,此时显示的是option的value值
4. data提供了el-select 的 v-model所绑定的数据currRoleId = -1

### 用户管理 用户列表 分配角色-显示对话框-显示当前角色
1. 通过请求获取所有角色 roles
2. v-for  :label="item.userName" :value="item.id"
3. 通过请求获取当前用户的角色rid
4.  给el-select 中的v-model绑定的数据赋值 this.currRoleId = res.data.data.rid
> rid接口文档的参数名是role_id

### 用户管理 用户列表 分配角色-修改用户角色
1. 通过视图操作 -> 修改了label -> value值变化 -> v-model绑定数值变化
2. currRoleId
3. 在 checkRole方法中要使用用户id 在data声明currUserId: -1
4. 赋值当前用户id this.currentId = user.id

### 用户管理 用户列表 合并分支-推送
1. git add . 
2. git commit -m "注释"
3. git branch 
4. git checkout master
5. git merge dev-user
6. git push

### 权限管理 权限列表 新建组件-配置路由
1. 新建right.vue
2. home.vue 修改index
3. 配置路由

### 权限管理 权限列表 封装自定义面包屑组件
1. 新建MyBread.vue文件 通过props提供数组level1 level2
2. 在main.js 文件引入自定义组件 Vue.component("my-bread", MyBread)

### 权限管理 权限列表 axios-拦截器统一设置表头
> 除了登录之外的所有请求 都需要设置头部信息
> 在请求发起之前 在axios文档添加头部
> 请求拦截器 对config.header 进行设置表头
> 响应拦截器(目前未使用)

### 权限管理 权限列表 获取表格数据 显示数据
1. created 获取数据 
2. 异步请求数据 rightList:[]
3. el-form 绑定 rightList 显示数据

### 权限管理 权限列表 获取表格数据 层级显示
> 根据level值进行判断层级 > 显示层级
1. template slot-scope="scope"
2. span 标签内进行 v-if 判断

### 权限管理 权限列表 表格样式 固定表头
> 设置table固定高 height="400"
> overflow: auto
> margin-top: 20px

### 权限管理 用户列表 表格展示 展开行功能分析
1. el-table type="expand"
2. template > 该角色权限（三级）
3. 页面布局如果是行列问题 -> for循环 -> v-for嵌套 el-tagrol

### 权限管理 用户列表 表格展示 展开行-各级权限添加
1. 分析roleList > 获取每个对象中的children中的 authName
2. 布局 一行el-row > (列A(el-tag) + 列B(一行el-row -> 两列(el-colA + el-colB))
3. 一级权限展示 v-for (item1, i) in 最外层的el-row scope.row.children 
4. 二级权限展示 v-for (item2, i) in item1.children
5. 三级权限展示 v-for (item3, i) in item2.children
6. 修改tag样式 添加图标 <i class="" />
7. 角色无权限时提示 添加 <span v-if="scope.row.children.length===0">未分配权限</span>

### 权限管理 用户列表 表格展示 展开行-取消权限
> 点击tag X按钮 取消该角色权限
1. 给el-tag @close="deleRight(scope.row, item.id)"
2. deleRight(role, rightId) 发送请求this.$http.delete(`roles/${role.id}/rights/${rightId}`)
3. 刷新当前角色展开行页面： 重新获取数据 role.children = res.data.data
4. 提示删除成功

### 权限管理 用户列表 表格展示 操作-修改权限-获取树形结构
> 点击显示对话框 -> 修改提交
1. 提供对话框 el-dialog 
2. 操作按钮添加@click="showSetRightDia(scope.row)"
3. 展示树形结构 el-tree 绑定 获取树形结构的所有权限rightTree 
3.1 el-tree 绑定 获取树形结构的所有权限chuanrightTree
3.2 node-key="id" 每个树节点用来作为唯一标识
3.3 :props="defaultProps" 节点标签 子树节点的 属性值

### 权限管理 用户列表 表格展示 操作-修改权限-显示当前用户的所选权限
> el-tree default-checked-keys="arrChecked"
1. 查看showSetRightDia(role) 传参role数据 进行分析
2. 将role.children中的各级id通过 forEach嵌套 逐级传递给临时数组arrtemp(通过push方法)
3. 将arrtemp值赋值给arrChecked
> 为什么不直接对arrChecked传参，因为当本次数据为空时，arrChecked值默认为上一次传参内容

### 权限管理 用户列表 表格展示 操作-修改权限-修改当前用户权限
1. 找到请求接口post roles/:roleId/rights 
> roleId rid
2. roleId 在打开的对话框的方法中添加 this.roleId = role.id
3. 在确定方法中 找到所有选择的节点id：
3.1 获取全选的节点id数组 getCheckedKeys
3.2 获取半选的节点id数组getHalfCheckedKeys
4. 在js中调用el-tree的js方法
4.1 给el-tree 设置ref
4.2 this.$refs.ref的值tree.js方法(3.1 3.2的方法名)
4.3 返回两个数组arr1和arr2
5. ES6展开运算符
> let arr = [...arr1, ...arr2]
6. this.$http.post(`roles/${this.currRoleId}/rights`, {rids : arr.join(',')})
7. 关闭对话框，更新视图

### 侧边栏 动态导航
> 获取菜单menus > 绑定数据 
1. order
2. path 标识
3. children
4. v-for
> 在写之后的路由配置时，path不能随便写

### 用户登录判断 显示对应权限 导航守卫
1. 在home.vue判断token 麻烦
2. 导航守卫直接在router进行设置
2.1 路由配置生效前 先来到路由守卫的cb
2.2 to 要去的路由配置 from当前的路由配置
2.3 next() 让to的路由配置继续进行
> 主要不能直接使用message,需要单独从element引入

