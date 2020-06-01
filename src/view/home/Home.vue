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
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-user-solid"></i>
                            <span>用户管理</span>
                        </template>
                        <el-menu-item index="user">
                            <span>用户列表</span>
                        </el-menu-item>
                    </el-submenu>

                    <!-- 2 -->
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>权限管理</span>
                        </template>
                        <el-menu-item index="2-1">角色列表</el-menu-item>
                        <el-menu-item index="2-2">权限列表</el-menu-item>
                    </el-submenu>

                    <!-- 3 -->
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>商品管理</span>
                        </template>
                        <el-menu-item index="3-1">商品列表</el-menu-item>
                        <el-menu-item index="3-2">分类参数</el-menu-item>
                        <el-menu-item index="3-3">商品分类</el-menu-item>
                    </el-submenu>

                    <!-- 4 -->
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>订单管理</span>
                        </template>
                        <el-menu-item index="4-1">订单列表</el-menu-item>
                    </el-submenu>
                    
                    <!-- 5 -->
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>数据统计</span>
                        </template>
                        <el-menu-item index="5-1">数据列表</el-menu-item>
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
            return {}
        },
        beforeCreate() {
            //获取token
            const token  = localStorage.getItem('token')
            //有token，继续渲染组件
            console.log(token)
            if (!token) {
                this.$router.push('/login')
                this.$message.error('请登录')
            } 
            //无token， 登录
        },
        components: {},
        methods: {
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
