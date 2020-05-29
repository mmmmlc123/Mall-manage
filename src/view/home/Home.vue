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
                        <a href="" class="loginout">退出</a>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside class="aside" width="200px">Aside</el-aside>
            <el-main class="main">Main</el-main>
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
    components: {},
    methods: {}
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
        background-color: #d3dce6;
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
</style>
