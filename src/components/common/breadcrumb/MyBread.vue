<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: {name: 'home'}}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{level1}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script type="text/ecmascript-6">
export default {
    name: "MyBread",
    props: ['level1','level2'],
    data() {
        return {}
    },
    components: {},
    methods: {}
}
</script>

<style scoped>
</style>
