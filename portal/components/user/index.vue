<!--代码生成工具移动端代码-->
<!--template-->
<template>
    <div class="user">
        <div class="content">
            <div class="zw">
                <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" :label-width="getWidth()" size="small">
                    <el-form-item :label="$t('user.input[0]')" prop="loginName">
                        <el-input class="readonly" v-model="ruleForm.loginName" prefix-icon="el-icon-service" :readonly="true" :placeholder="$t('user.input[0]')"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('user.input[1]')" prop="userName">
                        <el-input class="readonly" v-model="ruleForm.userName" prefix-icon="el-icon-service" :readonly="true" :placeholder="$t('user.input[1]')"></el-input>
                    </el-form-item><br>
                    <el-form-item :label="$t('user.input[2]')" prop="phone">
                        <el-input v-model="ruleForm.phone" maxlength='11' prefix-icon="el-icon-mobile-phone" :placeholder="$t('user.input[2]')"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('user.input[3]')" prop="email">
                        <el-input v-model="ruleForm.email" prefix-icon="el-icon-message" :placeholder="$t('user.input[3]')"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="line"></div>
            <el-button :type="dialogo.isChange == true ? 'primary' : ''" @click="submitForm('ruleForm')" class="submit">{{$t('user.btn[0]')}}</el-button>
            <el-button @click="cancelFunc('ruleForm')" class="submit">{{$t('user.btn[1]')}}</el-button>
            <div class="c"></div>
        </div>
    </div>
</template>
<!--script-->
<script src="./index.js"></script>
<!--less-->
<style lang="less" scoped>
    .user {
        text-align: center;
        .content {
            .zw {
                padding: 5px 0 10px;
            }
            .my-head {
                line-height: 20px;
                margin-bottom: 20px;
            }
            .line {
                border-bottom: solid 1px #dddddd;
            }
            .submit {
                float: right;
                margin: 10px;
                font-size: 16px;
            }
            .c {
                clear: both;
            }
        }
    }
</style>