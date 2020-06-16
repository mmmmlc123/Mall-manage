<template>
    <div class="cate">
        <el-card>
            <!-- 1.添加分类 -->
            <el-button type="primary" @click="showAddCateDialog ">添加分类</el-button>

            <!-- 2.分类表格 -->
            <el-table
            style="width:100%"
            size="small"
            :data="categories"
            node-key="index"
            row-key="cat_id"
            border
            :tree-props="cateTreeProps">
                <el-table-column label="分类名称" prop="cat_name" width="200px"/>
                <el-table-column label="是否有效" prop="cat_deleted" width="180px">
                    <template slot-scope="scope">
                        <i v-if="scope.row.cat_deleted == false"
                        class="el-icon-success"
                        style="color: lightgreen"></i>
                    </template>
                </el-table-column>
                <el-table-column label="排序" prop="cat_level" width="200px">
                    <template slot-scope="scope">
                        <el-tag size="mini" v-if="scope.row.cat_level===0">一级</el-tag>
                        <el-tag size="mini" type="success" v-else-if="scope.row.cat_level===1">二级</el-tag>
                        <el-tag size="mini" type="warning" v-else>三级</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
                        <el-button size="mini" plain circle type="danger" icon="el-icon-delete" ></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 3.分页 -->
            <el-pagination 
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-sizes="[3, 5, 10, 15]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>             
        </el-card>

        <!-- 4.添加分类对话框 -->
        <el-dialog title="添加分类" :visible.sync="dialogFormVisAdd">
        <el-form :model="addCatForm">
            <el-form-item label="分类名称" label-width="120px">
            <el-input v-model="addCatForm.cat_name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="父级分类" label-width="120px">
                <el-cascader
                v-model="selectValue"
                :options="parentCate"
                :props="parentCateProps"
                @change="handleChange"
                clearable>
                </el-cascader>
            </el-form-item>
            
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisAdd = false">取 消</el-button>
            <el-button type="primary" @click="addCate">确 定</el-button>
        </div>
        </el-dialog>    
    </div>
</template>

<script>
    export default {
        name: "categories",
        data() {
            return {
                categories: [],
                cateTreeProps: {
                    value: 'cat_name',
                    children: 'children', 
                    hasChildren: 'hasChildren',
                },
                cateIndex: [],
                //查询页码信息
                queryInfo: {
                    pagenum: 1,
                    pagesize: 5,
                    type: 3
                },
                total: 0,

                dialogFormVisAdd: false,
                //请求添加分类数据
                addCatForm: {
                    cat_pid: 0,
                    cat_name: '',
                    cat_level: 0
                },
                //获取的父级分类
                parentCate: [],
                parentCateProps: {
                    expandTrigger: 'hover',
                    label: 'cat_name',
                    value: 'cat_id',
                    children: 'children'
                },
                selectValue: []
            }
        },
        created() {
            this.getCategories()
        },
        methods: {
            async getCategories() {
                const res = await this.$http.get(`categories`,{params: this.queryInfo})
                this.categories = res.data.data.result
                console.log(this.categories)
                this.total = res.data.data.total
                /* for(var i=0;i<this.categories.length;i++){
                    this.categories[i].index = i; //赋予每个li索引值,这是难点，比较难理
                    this.cateIndex.push(i+1)
                } */
            },
            
            //页码分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.queryInfo.pagesize = val
                this.getCategories()
            },

            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.queryInfo.pagenum = val
                this.getCategories()
            },

            //打开添加分类对话框
            showAddCateDialog () {
                this.dialogFormVisAdd = true
                this.getParentCate()
            },
            //获取父级分类
            async getParentCate() {
                const res = await this.$http.get(`categories`,{params: {type:2}})
                this.parentCate = res.data.data
                console.log(this.parentCate)

            },
            //选择父级分类id cat_pid 和 cat_level分类当前层级
            handleChange(val) {
                console.log(val)
                if(val.length>0){
                    this.addCatForm.cat_pid = val[val.length-1]
                    this.addCatForm.cat_level = val.length
                }
            },
            //提交添加分类
            async addCate() {
                const res = await this.$http.post(`categories`, this.addCatForm)
                console.log(res)
                if(res.data.meta.status === 201){
                    this.$message.success(res.data.meta.msg)
                } else this.$message.warning(res.data.meta.msg)
                //关闭对话框
                this.dialogFormVisAdd = false
                //清空数据
                this.addCatForm = {}
                this.selectValue = []
                //更新视图
                this.getCategories()
            }
        }
    }
</script>

<style scoped>
</style>
