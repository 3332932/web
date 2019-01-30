<template>
    <div class="login">
        <div class="lang">
            <select v-model="lang" placeholder="请选择" size="mini" class="lang">
                <option value="cn">{{$t('main.lang[0]')}}</option>
                <option value="zh">{{$t('main.lang[1]')}}</option>
                <option value="en">{{$t('main.lang[2]')}}</option>
            </select>
        </div>
        <div class="container">
            <div class="left">
            </div>
            <div class="right">
                <pass :config="config" v-if="config.type==='pass'" />
                <sms :config="config" v-if="config.type==='sms'" />
            </div>
        </div>
        <div class="copyright">{{$t('login.copyright')}}</div>
    </div>
</template>
<script src="./index.js"></script>
<style scoped lang="less">
    .login {
        background: url(../../assets/images/login_background.jpg) center center #fff no-repeat;
        height: 100vh;
        background-size: 100% 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        .container {
            width: 750px;
            height: 360px;
            display: flex;
            flex-direction: row;
            .left {
                width: 50%;
                background: url(../../assets/images/logo-simple.png) center center #5e5953b3 no-repeat;
            }
            .right {
                background: #fff;
                flex: 1;
            }
        }
        .copyright {
            position: absolute;
            bottom: 12px;
            color: #fff;
            font-size: 14px;
            font-family: 'Arial Normal', 'Arial';
        }
        .lang {
            position: absolute;
            right: 5px;
            top: 5px;
        }
    }
</style>