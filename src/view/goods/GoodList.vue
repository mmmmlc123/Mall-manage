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
        <el-table class="userTable"
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
export default {
    name: "GoodList"
}
</script>

<style>
    
</style>