<template>
    <div class="login-wrap">
        <el-form class="login-form"
            label-position="top" 
            label-width="80px" 
            :model="formData">
            <h2>用户登录</h2>
            <el-form-item label="用户名">
                <el-input v-model="formData.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formData.password"></el-input>
            </el-form-item>
            <el-button class="login-btn" @click.prevent="handleLogin" type="primary">登录
            </el-button>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            formData: {
                username: '',
                password: ''
            }
        }
    },
    components: {},
    methods: {
        //async await 将异步操作转换成像同步请求
        async handleLogin() {
            const res = await this.$http.post('login', this.formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
            console.log(res.data)
            const {
                data, 
                meta: {msg, status}
            } = res.data

            if (status === 200) {
                //登录成功
                //1.保存token
                localStorage.setItem('token', data.token)
                //2.跳转home
                this.$router.push({name: 'home'})
                //3.提示登录成功信息
                //console.log(msg)
                this.$message.success(msg)
            } else this.$message.error(msg)
        },

        /* //登录请求
        handleLogin() {
            const token = localStorage.token;

            this.$http.post('login', this.formData, {
                headers: {
                   authorization: `Bearer ${token}`
                },
            }).then(res => {
                //console.log(res)
                const {
                    data,
                    meta: {msg, status}
                } = res.data
                
                if (status === 200) {
                    //登录成功
                    console.log(msg)
                    //1.跳转home
                    this.$router.push('/home')
                    //2.提示成功
                    this.$message.success(msg)
                } else  this.$message.error(msg)
                    //不成功
                    //1.提示消息
           })
        }, */
    }
}
</script>

<style scoped>
    .login-wrap {
        height: 100%;
        background-color: #324152;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .login-wrap .login-form {
        width: 30%;
        background-color: #fff;
        border-radius: 5px;
        padding: 30px;
    }
    .login-wrap .login-btn {
        width: 100%;
    }
</style>
