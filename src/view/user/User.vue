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
            <el-input placeholder="请输入内容" v-model="query" class="inputSearch" @clear="loadUserList" clearable>
                <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
            </el-input>
            <el-button type="success">添加用户</el-button>
        </div>
        <!-- 表格 -->
        <el-table
            :data="userList"
            style="width: 100%"
            >
            <el-table-column
                type="index"
                label="#"
                width="40">
            </el-table-column>
            <el-table-column
                prop="role_name"
                label="姓名"
                width="120">
            </el-table-column>
            <el-table-column
                prop="email"
                label="邮箱"
                width="200">
            </el-table-column>
            <el-table-column
                prop="mobile"
                label="电话"
                width="140">
            </el-table-column>

            <el-table-column
                label="创建时间"
                width="140">
                <template slot-scope="scope" class="date">
                    {{scope.row.create_time | fmtDate}}
                </template>
            </el-table-column>

            <el-table-column
                prop="mg_state"
                label="用户状态"
                width="120">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.mg_state"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>

            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
                    <el-button size="mini" plain type="success" icon="el-icon-message" circle></el-button>
                    <el-button size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination 
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagenum"
            :page-sizes="[2, 4, 6, 8]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination> 
    </el-card>
    
        
</template>

<script>
import {formateDate} from '@/common/utils'

export default {
    name: "User",
    data() {
        return {
            query: '',
            /* 分页相关数据 */
            pagenum: 1,
            pagesize: 2,
            total: 1,
            /* 
            create_time: 1486720211
            email: "adsfad@qq.com"
            id: 500
            mg_state: true
            mobile: "12345678"
            role_name: "超级管理员"
            username: "admin" 
            */
            userList: [],
            mg_state: true
        }
    },
    components: {},
    created() {
        this.getUserList()
    },
    methods: {
        async getUserList() {
            //获取列表的请求
            //query 查询参数，可以为空
            //pagenum 当前页码 不能为空
            //pagesize 每页显示条数 不能为空

            //需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
            const AUTH_TOKEN = localStorage.getItem('token')
            this.$http.defaults.headers['Authorization'] = AUTH_TOKEN;

            const res = await this.$http.get(
                `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
            console.log(res)
            const {meta:{msg, status}, data: {users, total}}= res.data
            if(status === 200) {
                //1. 给表格数据赋值
                this.userList = users

                //2. 给total赋值
                this.total = total

                //3. 提示
                this.$message.success(msg)

                //this.pagenum = 1
            } else this.$message.warning(msg)
        },

        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pagesize = val
            this.getUserList()
        },

        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pagenum = val
            this.getUserList()
        },
        //搜索用户
        searchUser() {
            this.getUserList()
            console.log(query)
        },
        //
        loadUserList() {
            this.getUserList()
        }
    },
    filters: {
        showDate(value) {
            //1.将时间戳转成date对象
            const date = new Date(value*1000)

            //2.将date进行格式化
            return formateDate(date, 'yyyy-MM-dd')
        }
    }
}
</script>

<style  scoped>
    .inputSearch {
        width: 300px;
    }
</style>

 