<template>
    <div>    
        <el-card class="box-card">
            <!-- 1.面包屑 -->
            <my-bread level1="商品管理" level2="商品添加"></my-bread>
            <el-alert
                title="添加商品信息"
                type="success"
                :closable="false"
                center
                class="title">
            </el-alert>
            <el-steps :active="activeIndex*1" finish-status="success" class="steps" align-center>
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品属性"></el-step>
            <el-step title="商品图片"></el-step>
            <el-step title="商品内容"></el-step>
            <el-step title="完成"></el-step>
            </el-steps>
            <el-form label-width="80px" 
                :model="addForm"
                style="height:300px; overflow:auto;margin-top:20px"
                >
                <el-tabs tab-position="left"  
                v-model="activeIndex"
                @tab-click="tabClick">
                    <el-tab-pane label="基本信息" prop="goods_name" name="0">
                        <el-form-item label="商品名称">
                            <el-input v-model="addForm.goods_name"></el-input>
                        </el-form-item>
                        <el-form-item label="商品价格" prop="goods_price" >
                            <el-input v-model="addForm.goods_price"></el-input>
                        </el-form-item>
                        <el-form-item label="商品重量" prop="goods_weight">
                            <el-input v-model="addForm.goods_weight"></el-input>
                        </el-form-item>
                        <el-form-item label="商品数量" prop="goods_number">
                            <el-input v-model="addForm.goods_number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品分类" prop="goods_cat">
                            <!-- 级联选择器 -->
                            <el-cascader
                            v-model="addForm.goods_cat"
                            :options="cateList"
                            :props="cateListProps"
                            @change="handleChange"
                            clearable>
                            </el-cascader>
                        </el-form-item>
                        <el-form-item >
                            <el-button type="primary" @click="next">下一步</el-button>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品参数">                       
                        <el-form-item v-for="(item1,index) in arrDyparams" 
                        :key="index" label-width="0">
                            <div>{{item1.attr_name}}</div>
                            <el-checkbox-group v-model="checkedEquipments">
                                <el-checkbox style="margin-left: 0;
                                margin-right: 10px;
                                margin-top: 10px;"  
                                v-for="(item2, index) in item1.attr_vals"
                                :key="index"
                                :label="item2" 
                                border
                                @change="clickChange">{{item2}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        
                    </el-tab-pane>
                    <el-tab-pane label="商品属性">
                        <!-- 静态参数的数据 -->
                        <el-form-item v-for="(item, index) in arrStaticparams" 
                        :key="index"
                        :label="item.attr_name"
                        label-width="140px"
                        >
                            <el-input :v-model="item.attr_vals"></el-input>
                        </el-form-item>
                        
                    </el-tab-pane>
                    <el-tab-pane label="商品图片">商品图片</el-tab-pane>
                    <el-tab-pane label="商品内容">商品内容</el-tab-pane>
                </el-tabs>
            </el-form>
        </el-card>
    </div>
    
</template>

<script type="text/ecmascript-6">
export default {
    name: "GoodsAdd",
    data() {
        return {
            //步骤条默认启动，与左侧tab进行联动
            activeIndex: "",
            addForm: {
                goods_name: '',
                goods_price: 0,
                goods_weight: 0,
                goods_number: 0,
                // 商品所属分类数组
                goods_cat: [],
                // 图片的数组
                pics: [],
                // 商品详情描述
                goods_introduce: '',
                attrs: []
            },
            //商品分类表
            cateList: [],
            //当前商品的分类id
            cateId: '',
            //联级选择器配置
            cateListProps: {
                expandTrigger: 'hover',
                label: 'cat_name',
                value: 'cat_id',
                children: 'children'
            },
            //获取的动态参数
            arrDyparams: [],
            //修改后的参数(默认全选)
            checkedEquipments: [],
            //获取的静态参数(商品属性)
            arrStaticparams: [],

        }
    },
    created() {
        this.getCategoryList()
    },
    components: {},
    methods: {
        next() {
            this.activeIndex += 1
        },
        goBack() {
            this.$router.back(-1)
        },
        //获取商品分类数据
        async getCategoryList() {
            const res = await this.$http.get(`categories`)
            if (res.data.meta.status != 200){
                this.$message.error(res.data.meta.msg)
            }
            this.cateList = res.data.data
            //console.log(this.cateId)
        },
        //级联选择器的选择结果
        handleChange(value) {
            console.log(value);
            //获取分类id
            //this.cateId = value
        },
        async tabClick() {
            //获取表单中所选的分类id
            this.cateId = this.addForm.goods_cat
            //如果选择的tab是第二个
            if(this.activeIndex === '1'){
                //当分类id的长度为0时
                if (this.cateId.length === 0) {
                    this.$message.warning('请先选择商品分类')
                    return 
                }
                //获取动态数据
                const res = await this.$http.get(`categories/${this.cateId[2]}/attributes?sel=many`)
                //attr_name: "版式" attr_vals: "49吋4K超薄曲面"
                this.arrDyparams = res.data.data
                console.log(this.arrDyparams)
                //arrDyparams中的每个对象attr.vals字符串转换成数组 -> v-for
                this.arrDyparams.forEach(item => {
                    //trim()去掉字符串的头尾空格 split(",")从逗号把字符串分割成字符串数组。
                    //console.log(item.attr_vals)
                    //并不是所有的动态参数都有商品参数 若为空返回空数组
                    item.attr_vals = 
                    item.attr_vals.length === 0
                    ?[]:item.attr_vals = item.attr_vals.trim().split(',')
                    
                    //将所选参数导入checkedEquipments
                    this.checkedEquipments = item.attr_vals
                    //console.log(this.checkedEquipments);
                })                
            } 
            //如果选择的tab是第三个
            else if(this.activeIndex === '2') {
                if (this.cateId.length === 0) {
                    this.$message.warning('请先选择商品分类')
                    return 
                } 
                //获取静态数据
                const res = await this.$http.get(`categories/${this.cateId[2]}/attributes?sel=only`)
                this.arrStaticparams = res.data.data
                console.log(this.arrStaticparams)
            }
        },

        //所选框是否选中
        clickChange(val) {
            //console.log(val)
        }
    }
}
</script>

<style scoped>
    .title{
        margin: 20px 0px ;
    }

    /* .el-checkbox.is-bordered+.el-checkbox.is-bordered {
        margin:0px
    } */

</style>
