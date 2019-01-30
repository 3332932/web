<template>
    <div class="pass" v-show="showCode">
        <div class="content">

            <div class="input person">
                <div class="icon"></div>
                <input type="text" class="txt" :placeholder="$t('login.authCode.input[0]')" v-model="codeInput" @blur="passCode"/>
                <div class="sms"  style="width: 100px;height: 40px;"  id="v_container" @click="createCode">{{Code}}</div>
            </div> 
        </div>
    </div>
</template>
<script src="./index.js"></script>
<style scoped lang="less">
    .pass {
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
                        background: url(../../../../assets/images/code.png) center center #f3f3f3 no-repeat;
                        background-size: 24px;
                        width: 43px;
                        height: 43px;
                    }
                    .sms {
                        width: 63px;
                        height: 43px;
                        font-size: 14px;
                        border-left: solid 1px #dddddd;
                        color: #5f5f5f;
                        padding: 2px 0 0;
                        cursor: pointer;
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