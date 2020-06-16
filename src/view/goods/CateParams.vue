<template>
    <div class="params">
        <el-card>
            <!-- 1.警告 -->
            <el-alert
                title="注意：只允许为第三级分类设置相关参数！"
                type="warning"
                show-icon>
            </el-alert>
            <!-- 2.选择分类 -->
            <div class="check">
                <span>选择商品分类：</span>
                <el-cascader
                v-model="cateId"
                :props="cateListProps"
                :options="cateList"
                @change="handleChange"
                clearable></el-cascader>
            </div>
            <!-- 3.参数标签页 -->
            <el-tabs @tab-click="handleClick" v-model="activeTabName">
                <el-tab-pane label="动态参数" name="many">
                    <el-button type="primary" size="small">添加参数</el-button>
                    <el-table
                    :data="arrParams"
                    style="width: 100%"
                    border>
                        <!-- 展开列标签 -->
                        <el-table-column type="expand">
                            <template slot-scope="scope">
                                <el-tag
                                v-for="(item, i) in scope.row.attr_vals"
                                :key="i"
                                closable
                                @close="handleClose(i, scope.row.attr_vals, scope.row)">
                                {{item}}
                                </el-tag>
                                <!-- 新增标签-->
                                <el-input
                                class="input-new-tag"
                                v-if="inputVisible"
                                v-model="tagItem"
                                ref="saveTagInput"
                                size="small"
                                @keyup.enter.native="handleInputConfirm(scope.row.attr_vals, scope.row)"
                                @blur="handleInputConfirm(scope.row.attr_vals, scope.row)"
                                >
                                </el-input>
                                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新增</el-button>
                            </template>
                        </el-table-column>
                        <!-- 索引列 -->
                        <el-table-column type="index" width="40px"></el-table-column>
                        <el-table-column label="参数名称" prop="attr_name" width="500px"></el-table-column>
                        <el-table-column
                        label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" plain type="primary" icon="el-icon-edit" circle ></el-button>
                                <el-button size="mini" plain circle type="danger" icon="el-icon-delete" ></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>

                <el-tab-pane label="静态属性" name="only">
                    <el-button type="primary" size="small">添加属性</el-button>
                    <el-table
                    :data="arrParams"
                    style="width: 100%"
                    border>
                        <el-table-column type="index" width="40px"/>
                        <el-table-column label="属性名称" prop="attr_name" width="200px"></el-table-column>
                        <el-table-column label="属性值" prop="attr_vals" width="300px"></el-table-column>
                        <el-table-column
                        label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" plain type="primary" icon="el-icon-edit" circle ></el-button>
                                <el-button size="mini" plain circle type="danger" icon="el-icon-delete" ></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: "Params",
    data() {
        return {
            //商品分类表
            cateList: [],
            //联级选择器配置
            cateListProps: {
                expandTrigger: "hover",
                label: 'cat_name',
                value: 'cat_id',
                children: 'children'
            },   
            //级联选择器绑定的分类id    
            cateId: [],
            //默认激活页签名称
            activeTabName: 'many',
            //参数列表
            arrParams: [],
            //动态参数列表
            arrMany: [],
            //静态参数列表
            arrOnly: [],
            inputVisible: false,
            //输入框绑定的tag项
            tagItem: '',
        }
    },
    components: {},
    created() {
        this.getCateList()
    },
    methods: {
        handleChange(value) {
            //如果获取三级分类
            if(value.length !== 0){
                //获取动态参数
                this.getArrparams()
            }
        },
        handleClick(){
            this.arrParams = []
            this.getArrparams()
        },
        //获取商品分类数据
        async getCateList() {
            const res = await this.$http.get(`categories`)

            if (res.data.meta.status != 200){
                this.$message.error(res.data.meta.msg)
            }
            this.cateList = res.data.data
            console.log(this.cateList)
        },

        //获取动态/静态数据
        async getArrparams() {
            //console.log(this.cateId)
            const res = await this.$http.get(`categories/${this.cateId[2]}/attributes`,{
                params: {sel: this.activeTabName}
            })
            //attr_name: "版式" attr_vals: "49吋4K超薄曲面"
            this.arrParams = res.data.data
            //arrParams中的每个对象attr.vals字符串转换成数组 -> v-for
            this.arrParams.forEach(item => {
                //trim()去掉字符串的头尾空格 split(",")从逗号把字符串分割成字符串数组。
                //console.log(item.attr_vals)
                //并不是所有的动态参数都有商品参数 若为空返回空数组
                item.attr_vals = 
                item.attr_vals.length === 0
                ?[]:item.attr_vals = item.attr_vals.trim().split(',')
            })
            //console.log(this.arrParams)
            if(this.activeTabName === 'many'){
                this.arrMany = this.arrParams
            } else {
                this.arrOnly = this.arrOnly
            }
        },

        //删除对应的参数
        handleClose(i,attr_vals,row) {
            console.log(i,attr_vals,row)
            //splice(index, 几个)切除
            attr_vals.splice(i, 1)
            //console.log(res)
            //将状态存入attr_vals
            this.saveAttrVals(row)
        },
        
        //点击newTag按钮显示输入框
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        // 输入框回车/失去焦点
        handleInputConfirm(attr_vals,row) {
            //console.log(attr_vals)
            let tagItem = this.tagItem;
            if (tagItem) {
            attr_vals.push(tagItem);
            }
            this.inputVisible = false;
            this.tagItem = '';
            this.saveAttrVals(row)
        },

        // 将对attr_vals（Tag） 的操作 保存到数据库
        async saveAttrVals(row) {
            //1. 编辑提交参数 三级分类id 参数id
            const res = await this.$http.put(`categories/${this.cateId[2]}/attributes/${row.attr_id}`, {
                attr_name: row.attr_name,
                attr_sel: row.attr_sel,
                attr_vals: row.attr_vals.join(',')
            })
            console.log(res)
            //2. 添加动态/静态参数
            /* :id	分类 ID	不能为空携带在url中
            attr_name	参数名称	不能为空
            attr_sel	[only,many]	不能为空
            attr_vals	如果是 many 就需要填写值的选项，以逗号分隔 */
            //this.$http.post(`categories/:id/attributes`)
        },
    }
}
</script>
    
<style scoped>
    .check {
        margin-top: 15px;
    }

    .el-tabs {
        margin-top: 15px;
    }

    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
</style>
