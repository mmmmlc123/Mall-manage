<template>
    <el-card>
        <!-- 1.面包屑 -->
        <my-bread level1="权限管理" level2="用户管理"></my-bread>
        
        <!-- 2.添加按钮 -->
        <el-button class="addBtn">添加角色</el-button>

        <!-- 3.用户表格 -->
        <el-table
            height="400"
            :data="roleList"
            style="width: 100%">
            <el-table-column type="expand">
            <template slot-scope="scope">
                <el-row v-for="(item1, i) in scope.row.children" :key="i">
                    <el-col :span="4">
                        <!-- 传角色Id 和 权限Id -->
                        <el-tag closable @close="deleRight(scope.row, item1.id)">{{item1.authName}}</el-tag>
                        <i class="el-icon-arrow-right"></i>
                    </el-col>
                    <el-col :span="20" >
                        <el-row v-for="(item2, i) in item1.children" :key="i">
                            <el-col :span="4" >
                                <el-tag type="success" closable 
                                @close="deleRight(scope.row, item2.id)">
                                    {{item2.authName}}
                                </el-tag>
                                <i class="el-icon-arrow-right"></i>
                            </el-col >
                            <el-col :span="20" > 
                                <el-tag closable 
                                type="warning"
                                v-for="(item3, i) in item2.children" :key="i"
                                @close="deleRight(scope.row, item3.id)">
                                    {{item3.authName}}
                                </el-tag>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <span v-if="scope.row.children.length === 0">未分配权限</span>
            </template>
            </el-table-column>
            <el-table-column
                label="#"
                type="index">
            </el-table-column>
            <el-table-column
                label="角色名称"
                prop="roleName">
            </el-table-column>
            <el-table-column
                label="角色描述"
                prop="roleDesc">
            </el-table-column>
            <el-table-column
                label="操作"
                prop="desc">
                <template slot-scope="scope">
                    <el-button size="mini" plain type="primary" icon="el-icon-edit" circle @click="showEidUserDia(scope.row)"></el-button>
                    <el-button size="mini" plain type="danger" icon="el-icon-delete" circle @click="showDeleUserMsgBox(scope.row.id)" ></el-button>
                    <el-button size="mini" plain type="success" icon="el-icon-check"  circle @click="showSetRightDia(scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分配权限对话框 -->
        <el-dialog
        title="分配权限"
        :visible.sync="dialogVisibleRight">
            <el-tree
            :data="rightTree"
            show-checkbox
            default-expand-all
            :default-checked-keys="arrChecked"
            node-key="id"
            :props="defaultProps">
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleRight = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisibleRight = false">确 定</el-button>
            </span>
        </el-dialog>

    </el-card>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            roleList: [],
            dialogVisibleRight: false,
            //树形结构数据
            rightTree: [],
            defaultProps: {
                children: 'children',
                label: 'authName'  
            },
            arrChecked: []
        }
    },
    created() {
        this.getRoleList()
    },
    methods: {
        async getRoleList() {
            const res = await this.$http.get(`roles`)
            this.roleList = res.data.data
            console.log(this.roleList)
        },
        //取消权限
        async deleRight(role, rightId) {
            //console.log(rightId)
            //console.log(roleId)
            const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
            //console.log(res)
            //刷新展开的页面，重新获取当前页面的剩余权限
            role.children = res.data.data

            if(res.data.meta.status === 200) {
                this.$message.success(res.data.meta.msg)
            }
        },
        async showSetRightDia(role) {
            //打开权限列表
            this.dialogVisibleRight = true
            //获取树形结构的所有权限
            const res = await this.$http.get(`rights/tree`)
            this.rightTree = res.data.data
            //console.log(this.rightTree)

            //获取当前用户所选权限 
            //console.log(role)
            //通过arrtemp来进行传参，若直接对arrchecked传参，当这次数据为空时，为上一次传参内容
            var arrtemp = []
            role.children.forEach(item1 => {
                //arrtemp.push(item1.id)
                item1.children.forEach(item2 => {
                    //arrtemp.push(item2.id)
                    item2.children.forEach(item3 => {
                        arrtemp.push(item3.id)
                    })
                })
            });
            this.arrChecked = arrtemp
            console.log(this.arrChecked)
        },
        //获取全部权限
        
     }
}
</script>

<style scoped>
    .addBtn{
        margin-top: 20px;
    }

</style>
//布局是行列布局 -> for嵌套

//请在控制台输出以下图形
//v-for嵌套渲染 el-tag=""
    *
  *   *
*   *   * 
//for 
