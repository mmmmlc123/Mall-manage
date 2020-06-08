<template>
    <div class="home">
        <el-container class="container">
        <el-header class="header">
            <el-row>
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <img class="logo" src="~@/assets/logo.png" alt="">
                    </div>
                </el-col>
                <el-col :span="18">
                    <h3 class="middle">电商后台管理系统</h3>
                </el-col>
                <el-col :span="2">
                    <div class="grid-content bg-purple">
                        <a @click.prevent="handleOut" class="loginout">退出</a>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside class="aside" width="200px">
                <el-menu  
                :router="true"
                :unique-opened="true">
                    <el-submenu :index="item1.order" v-for="(item1, index) in menus" :key="index">  
                        <template slot="title">
                            <i class="el-icon-user-solid"></i>
                            <span>{{item1.authName}}</span>
                        </template>
                        <el-menu-item 
                        :index="item2.path"
                        v-for="(item2, index) in item1.children" :key="index">
                            <i class="el-icon-circle-check"></i>
                            <span>{{item2.authName}}</span>
                        </el-menu-item>
                    </el-submenu>
                    </el-menu>
            </el-aside>
            <el-main class="main">
                <router-view></router-view>
            </el-main>
        </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                menus: [],
                isCollapse: false,
            }
        },
        /* beforeCreate() {
            //获取token
            const token  = localStorage.getItem('token')
            //有token，继续渲染组件
            //console.log(token)
            if (!token) {
                this.$router.push('/login')
                this.$message.error('请登录')
            } 
            //无token， 登录
        }, */
        created() {
            this.getMenus()
        },
        methods: {
            //获取导航数据
            async getMenus() {
                const { data: res } = await this.$http.get('menus')
                if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
                this.menus = res.data
                console.log(res)
            },
            handleOut() {
                this.$confirm('是否退出？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //清除token
                    localStorage.clear()
                    //进入登录页面
                    this.$router.push('/login')
                    //提示退出成功
                    this.$message({
                        type: 'success',
                        message: '退出成功!'
                    });6
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退出'
                    });          
                });
            }
        }
    }
</script>

<style scoped>
    .container {
        height: 100vh;
    }
    .header {
        background-color: #b3c0d1;
    }
    .aside {
        background-color: #fff;
    }
    .main {
        background-color: #e9eef3;
    }
    .logo {
        width: 60px;
    }
    .middle {
        text-align: center;
    }
    .loginout {
        text-decoration: none;
        line-height: 60px;
        color: #fff
    }
    a:hover {
        color: blue;
    }
    a {
        cursor: pointer; 
    }
</style>
