<template>
    <div class="pass">
        <div class="header">
            <div class="txt">{{$t('login.pass.title')}}</div>
        </div>
        <div class="content">
            <div class="input person">
                <div class="icon"></div>
                <input type="text" class="txt user" :placeholder="$t('login.pass.input[0]')" v-model="userName" />
            </div>
            <div class="input pass">
                <div class="icon"></div>
                <input type="password" class="txt" :placeholder="$t('login.pass.input[1]')" v-model="pass" />
            </div>
        </div>
        <authCode :showCode="!loginBtnShow" @logingo = "logingo" @passcode="passcode"> </authCode> 
        <div class="btns">
            <el-button type="primary" @click="passLoginBtn" class="login_btn">{{$t('login.pass.btn[0]')}}</el-button>
            <!-- <div class="txt" @click="config.type='sms'">{{$t('login.pass.btn[1]')}}</div> -->
        </div>
    </div>
</template>
<script src="./index.js"></script>
<style scoped lang="less">
    .pass {
        .header {
            height: 60px;
            box-sizing: border-box;
            padding: 20px 0 0 20px;

            .txt {
                font-size: 18px;
                font-weight: bold;
                width: 150px;
            }
        }

        .content {
            text-align: center;

            .input {
                border: solid 1px #dddddd;
                width: 325px;
                height: 45px;
                margin: 0 auto 30px;
                display: flex;
                flex-direction: row;

                .txt {
                    flex: 1;
                    outline: 0;
                    border: 0;
                    padding: 0 5px;
                    font-size: 14px;
                    color: #5f5f5f;
                }

                &.person {
                    .icon {
                        background: url(../../../../assets/images/user.png) center center #f3f3f3 no-repeat;
                        background-size: 24px;
                        width: 43px;
                        height: 43px;
                    }
                }

                &.pass {
                    .icon {
                        background: url(../../../../assets/images/pwd.png) center center #f3f3f3 no-repeat;
                        background-size: 24px 24px;
                        width: 43px;
                        height: 43px;
                    }
                }
            }
        }

        .btns {
            text-align: center;

            .el-button {
                width: 325px;
                font-size: 16px;
            }

            .txt {
                margin-top: 10px;
                color: #ae8351;
                font-size: 14px;
                cursor: pointer;
            }
        }
    }
</style>