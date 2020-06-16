<template>
    <div>    
        <el-card class="box-card">
            <!-- 1.页头 -->
            <el-page-header @back="goBack">
            </el-page-header>
            <!-- 2. 标题 -->
            <el-alert
                title="添加商品信息"
                type="info"
                :closable="false"
                center
                class="title">
            </el-alert>
            <!-- 3.步骤条 -->
            <el-steps :active="activeIndex-0" finish-status="success" class="steps" align-center>
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品属性"></el-step>
            <el-step title="商品图片"></el-step>
            <el-step title="商品内容"></el-step>
            <el-step title="完成"></el-step>
            </el-steps>
            <!-- 4.表单 -->
            <el-form label-position="top"
            :model="addForm"
            size="small">
                <el-tabs tab-position="left"  
                v-model="activeIndex"
                @tab-click="tabClick()">
                    <el-tab-pane label="基本信息" prop="goods_name" name="0" >
                        <el-form-item label="商品名称">
                            <el-input v-model="addForm.goods_name"></el-input>
                        </el-form-item >
                        <el-form-item label="商品价格" prop="goods_price">
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
                        <!-- 动态参数  -->                     
                        <el-form-item v-for="(item1,index) in arrDyparams" 
                        :key="index" label-width="0">
                            <div>{{item1.attr_name}}</div>
                            <el-checkbox-group v-model="checkedEquipments"
                            @change="clickChange">
                                <el-checkbox style="margin:10px 10px 0 0;"  
                                v-for="(item2, index) in item1.attr_vals"
                                :key="index"
                                :label="item2" 
                                border
                                >{{item2}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item >
                            <el-button type="primary" @click="before">上一步</el-button>
                            <el-button type="primary" @click="next">下一步</el-button>
                        </el-form-item>
                    </el-tab-pane>

                    <el-tab-pane label="商品属性">
                        <!-- 静态参数的数据 -->
                        <el-form-item v-for="(item, index) in arrStaticparams" 
                        :key="index"
                        :label="item.attr_name"
                        label-width="150px">
                            <el-input v-model="item.attr_vals"></el-input>
                        </el-form-item>
                        <el-form-item >
                            <el-button type="primary" @click="before">上一步</el-button>
                            <el-button type="primary" @click="next">下一步</el-button>
                        </el-form-item>
                    </el-tab-pane>

                    <el-tab-pane label="商品图片">
                        <el-form-item>
                            <el-upload 
                            class="upload-demo"
                            action="http://127.0.0.1:8888/api/private/v1/upload"
                            :headers="header"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :on-success="handleSuccess"
                            list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                        </el-form-item>
                        <el-form-item >
                            <el-button type="primary" @click="before">上一步</el-button>
                            <el-button type="primary" @click="next">下一步</el-button>
                        </el-form-item>
                    </el-tab-pane>

                    <el-tab-pane label="商品内容">
                        <!-- 表单元素 -->
                        <el-form-item>
                            <!-- 富文本 -->
                            <quill-editor v-model="addForm.goods_introduce"></quill-editor>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="before">上一步</el-button>
                            <el-button type="primary" @click="addGoods">添加商品</el-button>
                        </el-form-item>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
        </el-card>
    </div>
    
</template>

<script type="text/ecmascript-6">
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    
    import { quillEditor } from 'vue-quill-editor'
 
    import _ from 'lodash'

    export default {
        name: "GoodsAdd",
        data() {
            return {
                //步骤条默认启动，与左侧tab进行联动
                activeIndex: 0,
                addForm: {
                    goods_name: '',
                    goods_price: 0,
                    goods_weight: 0,
                    goods_number: 0,
                    goods_introduce: '',
                    //未处理的数据
                    //1.商品所属分类数组,以为','分割的分类列表
                    goods_cat: [],
                    //2.上传的图片临时路径（对象）pics:[{http://...}]
                    pics: [],
                    //3.商品的参数（动态和静态的数组）
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
                //提交数据时的动态数组和静态数组
                arr1: [],
                //上传的商品图片
                fileList: [],
                header:{
                    Authorization: localStorage.getItem('token')
                }
            }
        },
        created() {
            this.getCategoryList()
        },
        components: {
            quillEditor
        },
        methods: {
            before() {
                this.activeIndex--
                this.activeIndex = this.activeIndex + ''

                console.log(this.activeIndex)
                this.tabClick()
            },
            next() {
                this.activeIndex++
                this.activeIndex = this.activeIndex + ''

                console.log(this.activeIndex)
                this.tabClick()
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
                //console.log(this.cateList)
            },
            //级联选择器的选择结果
            handleChange(value) {
                console.log(value);
                //获取分类id
                //this.cateId = value
            },
            async tabClick() {
                //获取表单中所选的分类id [1,3,6]
                //console.log(this.activeIndex)
                this.cateId = this.addForm.goods_cat
                //如果选择的tab是第二个
                if(this.activeIndex === '1'){
                    //当分类id的长度为0时
                    if (this.cateId.length === 0) {
                        this.$message.warning('请先选择商品分类')
                        return 
                    }
                    //获取动态数据this.cardId[2] = 三级分类id
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
                        console.log(this.checkedEquipments);
                    })   
                    //如何保存页面？
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
                    //如何保存页面？
                }
                //如果选择的tab是第四个
                else if(this.activeIndex === '3') {
                    if (this.cateId.length === 0) {
                        this.$message.warning('请先选择商品分类')
                        return 
                    }   
                }
            },

            //多选框选后获取的值
            clickChange(val) {
                console.log(val)
                this.arr1 = this.arrDyparams.map(item => {
                    return {attr_id: item.attr_id, attr_value: val}
                })
            },
            //图片上传时的相关方法
            //file形参里是当时操作的图片相关信息(图片名称和图片路径)
            //file.responsedata.tmp_path:图片临时上传的路径
            handleRemove(file) {
                console.log("移除")
                console.log(file);
                //先获取图片的索引findIndex()，将表单内的图片信息符合的返回索引
                //findIndex() 方法返回传入一个测试条件（函数）符合条件的数组第一个元素位置。
                let index = this.addForm.pics.findIndex((item) => {
                    return item.pic === file.response.data.tmp_path
                })
                //.splice(index,howmany,item1,.....,itemX)
                //splice() 方法用于添加或删除数组中的元素 index为从何处开始，howmany删除几个
                this.addForm.pics.splice(index, 1)
                console.log(this.addForm.pics)
            },
            handlePreview(file) {
                console.log(file);
            },
            handleSuccess(file) {
                console.log("成功")
                console.log(file)
                this.addForm.pics.push({pic:file.data.tmp_path})
                console.log(this.addForm.pics)
            },

            //提交商品
            async addGoods(){
                //在发送请求前处理this.addForm中未处理的数据
                // 1.需对提交的表单进行处理goods_cat attrs
                // this.addForm.goods_cat = this.addForm.goods_cat.join(',')
                // 以上写法不对：级联选择器绑定的对象goods_cat要求是数组对象
                // 解决办法: 包：lodash 方法（深拷贝）：cloneDeep(boj)

                //const form = _.cloneDeep(this.addForm)
                //form.goods_cat = form.goods_cat.join(',')
                this.addForm.goods_cat = this.addForm.goods_cat.toString()
                console.log(this.addForm.goods_cat)

                //2.pics 在上传和移除图像时进行赋值和删除[].findIndex()
                //3.获取动态和静态的数组
                //attr:[{attr_id:?,attr:value:?},{}] map映射
                //console.log(this.arr1)
                let arr2 = this.arrStaticparams.map(item => {
                    return {attr_id: item.attr_id, attr_value: item.attr_vals}
                })
                let arr1 = this.arr1
                this.addForm.attrs = [...arr1, ...arr2]
                const res = await this.$http.post(`goods`,this.addForm)
                console.log(res)
                if(res.data.meta.status === 201) {
                    this.$message.success(res.data.meta.msg)
                    this.$router.push('/goods')
                } else this.$message.error(res.data.meta.msg)
            }
        }
    }
</script>

<style scoped>
    .title{
        margin: 20px 0px ;
    }
</style>
