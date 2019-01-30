<!--代码生成工具移动端代码-->
<!--template-->
<template>
    <div class="user">
        <div class="content">
            <div class="center">
                <el-form :inline="false" :model="ruleForm" :rules="rules" ref="ruleForm" :label-width="getWidth()" size="small">
                    <el-form-item :label="$t('pass.input[0]')" prop="oldPass">
                        <el-input type="password" v-model.trim="ruleForm.oldPass" prefix-icon="el-icon-view" :placeholder="$t('pass.input[0]')"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('pass.input[1]')" prop="newPass">
                        <el-input type="password" v-model.trim="ruleForm.newPass" prefix-icon="el-icon-view" :placeholder="$t('pass.input[1]')"></el-input>
                    </el-form-item>
                    <div :class="getClass()">{{$t('pass.des[0]')}}</div>
                    <el-form-item :label="$t('pass.input[2]')" prop="confirmPass">
                        <el-input type="password" v-model.trim="ruleForm.confirmPass" prefix-icon="el-icon-view" :placeholder="$t('pass.input[2]')"></el-input>
                    </el-form-item>
                    <div :class="getClass()">
                        {{$t('pass.des[1]')}}
                    </div>
                </el-form>
            </div>
            <div class="line"></div>
            <el-button type="primary" @click="submitForm('ruleForm')" class="submit">{{$t('pass.btn[0]')}}</el-button>
            <el-button @click="resetForm('ruleForm')" class="submit">{{$t('pass.btn[1]')}}</el-button>
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
            .txt {
                color: #8c8c8c;
                width: 300px;
                line-height: 22px;
                text-align: left;
                font-size: 14px;
                margin: -15px 0 0 100px;
            }
            .txt-en {
                color: #8c8c8c;
                width: 250px;
                line-height: 22px;
                text-align: left;
                font-size: 14px;
                margin: -15px 0 0 150px;
            }
            .center {
                width: 75%;
                margin: 0 auto;
                padding-bottom: 30px;
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