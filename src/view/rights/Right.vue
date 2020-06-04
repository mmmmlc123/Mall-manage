<template>
    <el-card>
        <!-- 1.面包屑 -->
        <my-bread level1="权限管理" level2="权限列表"></my-bread>
        
        <!-- 2.表格 -->
        <el-table border
            class="rightTable"
            :data="rightList"
            style="width: 100%"
            height="400"
            >
            <el-table-column
                type="index"
                label="#"
                width="40">
            </el-table-column>
            <el-table-column
                prop="authName"
                label="权限名称"
                width="200">
            </el-table-column>
            <el-table-column
                prop="path"
                label="路径"
                width="200">
            </el-table-column>
            <el-table-column
                prop="level"
                label="层级">
                <template slot-scope="scope">  
                    <span v-if="scope.row.level === '0'">一级</span>
                    <span v-if="scope.row.level === '1'">二级</span>
                    <span v-if="scope.row.level === '2'">三级</span>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
export default {
    name: "Right",
    data() {
        return {
            rightList: []
        }
    },
    created() {
        this.getRightList()
    },
    methods: {
        async getRightList() {
            const res = await this.$http.get(`rights/list`)
            this.rightList = res.data.data
            console.log(this.rightList)
        }
    }
}
</script>

<style scoped>
    .rightTable{
        overflow: auto;
        margin-top: 20px;
    }
</style>
