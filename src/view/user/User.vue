<template>
    <el-card class="box-card">
        <!-- 1.面包屑 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索 -->
        <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" v-model="query" class="inputSearch">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="success">添加用户</el-button>
        </div>
        
    </el-card>
        
</template>

<script>
export default {
    name: "User",
    data() {
        return {
            query: ''
        }
    },
    components: {},
    methods: {}
}
</script>

<style  scoped>
    .inputSearch {
        width: 300px;
    }
</style>

