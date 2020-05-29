<template>
    <div class="home">
        <el-container class="container">
        <el-header class="header">Header</el-header>
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
</style>
