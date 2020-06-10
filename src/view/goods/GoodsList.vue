<template>
    <el-card class="box-card">
        <!-- 1.面包屑 -->
        <my-bread level1="商品管理" level2="商品列表"></my-bread>
        
        <!-- 2.搜索 -->
        <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" v-model="query" class="inputSearch" @clear="loadGoodsList" clearable>
                <el-button slot="append" icon="el-icon-search" @click="searchGoods"></el-button>
            </el-input>
            <el-button type="success" @click="$router.push({name:'add'})">添加商品</el-button>
        </div>

        <!-- 3.表格 -->
        <el-table class="goodsTable"
            :data="goodsList"
            style="width: 100%"
            border>
            <el-table-column
                type="index"
                label=""
                width="40">
            </el-table-column>
            <el-table-column
                prop="goods_name"
                label="商品名称"
                width="420">
            </el-table-column>
            <el-table-column
                prop="goods_price"
                label="商品价格(元)"
                width="120">
            </el-table-column>
            <el-table-column
                prop="goods_weight"
                label="商品重量"
                width="80">
            </el-table-column>
            <el-table-column
                prop="goods_number"
                label="商品数量"
                width="80">
            </el-table-column>
            <el-table-column
                label="创建时间"
                width="140">
                <template slot-scope="scope" class="date">
                    {{scope.row.create_time | fmtDate}}
                </template>
            </el-table-column>

            <!-- 操作 -->
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" plain type="primary" icon="el-icon-edit" circle @click="showEidGoodsDia(scope.row)">
                    </el-button>
                    <el-button size="mini" plain type="danger" icon="el-icon-delete" circle @click="showDeleGoods(scope.row)">
                     </el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <!-- 4.分页 -->
        <el-pagination 
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagenum"
            :page-sizes="[4, 6, 8, 10]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination> 

        <!-- 6.编辑用户对话框 -->
        <el-dialog title="编辑用户" :visible.sync="dialogFormVisEit">
        <el-form :model="form">
            <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.goodname" autocomplete="off" disabled></el-input>
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
            <el-button type="primary" @click="editgood">确 定</el-button>
        </div>
        </el-dialog>    

    </el-card>
</template>
<script>
import {formateDate} from '@/common/utils'

export default {
    name: "goods",
    data() {
        return {
            query: '',
            /* 分页相关数据 */
            pagenum: 1,
            pagesize: 4,
            total: 1,
            goodsList: [],
            mg_state: true,
            dialogFormVisAdd: false,
            dialogFormVisEit: false,
            dialogFormVisCheck: false,
            form: {
                goodname:'',
                password: '',
                email: '',
                mobile: '',
            },
            formLabelWidth: '120px',
            //角色数据 index从0开始计数
            goodId: '',
            currgoodname: '',
            currgoodId: '',
            roles: []
        }
    },
    components: {},
    created() {
        this.getGoodsList()
    },
    methods: {
        //获取列表的请求
        async getGoodsList() {
            //query 查询参数，可以为空
            //pagenum 当前页码 不能为空
            //pagesize 每页显示条数 不能为空

            const res = await this.$http.get(
                `goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
            console.log(res)
            const {meta:{msg, status}, data: {goods, total}}= res.data
            if(status === 200) {
                //1. 给表格数据赋值
                this.goodsList = goods

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
            this.getGoodsList()
        },

        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pagenum = val
            this.getGoodsList()
        },

        //搜索用户
        searchGoods() {
            this.getGoodsList()
            console.log(query)
        },
        //清空搜索框，重新获取数据
        loadGoodsList() {
            this.getGoodsList()
        },

        //操作-删除
        showDeleGoods(good) {
            this.goodId = good.goods_id
            this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                //发送删除请求
                //1.把goodId从data中取出
                //2.把goodId以参数的形式传入showDelegoods
                const res = await this.$http.delete(`goods/${this.goodId}`)
                console.log(res)
                if(res.data.meta.status === 200) {
                    //更新视图
                    this.pagenum = 1
                    this.getGoodsList()
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
        showEidGoodsDia(good) {
            this.dialogFormVisEit = true 
            //获取用户信息
            this.goodId = good.goods_id
        },

        //编辑用户-确认发送请求
        async editgood() {
            // 关闭对话框
            this.dialogFormVisEit = false

            //将输入框数据存入接口数据库中
            const res = await this.$http.put(`goods/${this.goodId}`)    
            console.log(res) 

            const {meta:{msg,status},data} = res.data
            if(status == 200) {
                //1. 提示成功
                this.$message.success(msg)
                
                //2. 更新视图
                this.getGoodsList()
                
            } else this.$message.error(msg)
        },
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
    .goodsTable {
        margin-top: 20px;
        margin-bottom: 20px;
    }
</style>