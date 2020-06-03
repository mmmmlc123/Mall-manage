<template>
    <el-card class="box-card">
        <!-- 1.面包屑 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 2.搜索 -->
        <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" v-model="query" class="inputSearch" @clear="loadUserList" clearable>
                <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
            </el-input>
            <el-button type="success" @click="showAddUserDia">添加用户</el-button>
        </div>

        <!-- 3.表格 -->
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
                prop="username"
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
            <!-- 状态 -->
            <el-table-column
                prop="mg_state"
                label="用户状态"
                width="120">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.mg_state"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        @change="changeMgState(scope.row)">
                    </el-switch>
                </template>
            </el-table-column>

            <!-- 操作 -->
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" plain type="primary" icon="el-icon-edit" circle @click="showEidUserDia(scope.row)"></el-button>
                    <el-button size="mini" plain type="success" icon="el-icon-check"  circle @click="showCheckUserDia(scope.row)"></el-button>
                    <el-button size="mini" plain type="danger" icon="el-icon-delete" circle @click="showDeleUserMsgBox(scope.row.id)" >
                     </el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <!-- 4.分页 -->
        <el-pagination 
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagenum"
            :page-sizes="[2, 4, 6, 8]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination> 

        <!-- 5.添加用户对话框 -->
        <el-dialog title="添加用户" :visible.sync="dialogFormVisAdd">
        <el-form :model="form">
            <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="form.mobile" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisAdd = false">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
        </div>
        </el-dialog>    

        <!-- 6.编辑用户对话框 -->
        <el-dialog title="编辑用户" :visible.sync="dialogFormVisEit">
        <el-form :model="form">
            <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.username" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="form.mobile" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisEit = false">取 消</el-button>
            <el-button type="primary" @click="editUser">确 定</el-button>
        </div>
        </el-dialog>    

        <!-- 7.分配角色对话框 -->
        <el-dialog title="分配角色" :visible.sync="dialogFormVisCheck">
        <el-form :model="form">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                {{currUsername}}
            </el-form-item>
            <el-form-item label="角色" :label-width="formLabelWidth">
            
            <el-select v-model="currRoledId" placeholder="请选择角色">
                <el-option label="请选择角色" :value="-1"></el-option>
                <el-option :label="item.roleName" :value="item.id"
                v-for="(item, i) in roles" :key="i"></el-option>
                
            </el-select>
            </el-form-item> 
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisCheck = false">取 消</el-button>
            <el-button type="primary" @click="CheckUser">确 定</el-button>
        </div>
        </el-dialog>  
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
            mg_state: true,
            dialogFormVisAdd: false,
            dialogFormVisEit: false,
            dialogFormVisCheck: false,
            form: {
                username:'',
                password: '',
                email: '',
                mobile: '',
            },
            formLabelWidth: '120px',
            //角色数据 index从0开始计数
            currRoledId: '',
            currUsername: '',
            currUserId: '',
            roles: []
        }
    },
    components: {},
    created() {
        this.getUserList()
    },
    methods: {
        //获取列表的请求
        async getUserList() {
            //query 查询参数，可以为空
            //pagenum 当前页码 不能为空
            //pagesize 每页显示条数 不能为空
            console.log('开始请求')

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

        //页码分页
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
        //清空搜索框，重新获取数据
        loadUserList() {
            this.getUserList()
        },
        
        //打开添加用户文本框
        showAddUserDia() {
            //清空文本框
            this.form = {}
            this.dialogFormVisAdd = true
        },
        //添加用户-发送请求post
        async addUser() {
            // 关闭对话框
            this.dialogFormVisAdd = false

            //将输入框数据存入接口数据库中
            const res = await this.$http.post('users', this.form)    
            console.log(res) 

            const {meta:{msg,status},data} = res.data
            if(status == 201) {
                //1. 提示成功
                this.$message.success(msg)
                
                //2. 更新视图
                this.getUserList()

                //3. 清空文本框
                this.form = {}
                /* 遍历
                for(const key in this.form ) {
                    if(this.form.hasOwnProperty(key)){
                        this.form[key] = ""
                    }
                } */
                //

            } else this.$message.error(msg)
        },
        
        //改变用户状态
        async changeMgState(user) {
            //发送修改状态请求
            const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
            console.log(res)
            if(res.data.meta.status === 200) {
                //提示修改成功
                this.$message.success(res.data.meta.msg)
            }
        },

        //操作-删除
        showDeleUserMsgBox(userId) {
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                //发送删除请求
                //1.把userId从data中取出
                //2.把userId以参数的形式传入showDeleUserMsgBox
                const res = await this.$http.delete(`users/${userId}`, this.form)
                console.log(res)
                if(res.data.meta.status === 200) {
                    //更新视图
                    this.pagenum = 1
                    this.getUserList()
                    //提示成功消息
                    this.$message.success(res.data.meta.msg)
                } else this.$message.error(res.data.meta.msg)
                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },

        //打开编辑页面
        showEidUserDia(user) {
            this.dialogFormVisEit = true 
            //获取用户信息
            this.form = user
        },

        //编辑用户-确认发送请求
        async editUser() {
            // 关闭对话框
            this.dialogFormVisEit = false

            //将输入框数据存入接口数据库中
            const res = await this.$http.put(`users/${this.form.id}`, this.form)    
            console.log(res) 

            const {meta:{msg,status},data} = res.data
            if(status == 200) {
                //1. 提示成功
                this.$message.success(msg)
                
                //2. 更新视图
                this.getUserList()
                
            } else this.$message.error(msg)
        },

        //打开角色选择页面
        async showCheckUserDia(user) {
            this.dialogFormVisCheck = true
            //获取用户名
            this.currUsername = user.username
            //给currUserId赋值用户ID
            this.currUserId = user.id
            //获取所有角色id
            const res = await this.$http.get(`roles`)
            this.roles = res.data.data
            console.log(res)
            const res1 = await this.$http.get(`users/${user.id}`)
            //获取当前用户的角色
            this.currRoledId = res1.data.data.rid
        },
        //分配角色-发送请求
        async CheckUser() {
            this.dialogFormVisCheck = false

            //1.请求数据
            const res = await this.$http.put(`users/${this.currUserId}/role`, {rid:this.currRoledId})
            console.log(res)
            if(res.data.meta.status === 200) {
                this.$message.success(res.data.meta.msg)
            } else this.$message.error(res.data.meta.msg)
        }
    },

    filters: {
        showDate(value) {
            //1.将时间戳转成this.formdate对象
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

 