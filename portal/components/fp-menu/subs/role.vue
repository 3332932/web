<template>
    <span class="role">
        <!-- <el-popover placement="bottom-start" width="200" trigger="hover">
            <img :src="getQR()" class="ewm-show" style="width: 180px;height: 180px;" />
            <el-button class="tz" slot="reference"> </el-button>
        </el-popover> -->
        <!-- <select v-model="lang" placeholder="请选择" size="mini" class="lang">
            <option value="cn">{{$t('main.lang[0]')}}</option>
            <option value="zh">{{$t('main.lang[1]')}}</option>
            <option value="en">{{$t('main.lang[2]')}}</option>
        </select> -->
        <div class="lang">
            <p :title='userInfo.name'>{{userInfo.name}}</p>
            <p :title='userInfo.dept'>{{userInfo.dept}}</p>
        </div>
        <div class="touxiang">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    <div :style="resetImg" class="el-icon-arrow-down img"></div>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="grzx">
                        <img src="~/assets/images/geren.jpg" class="icon"> {{$t('main.list[0]')}}
                    </el-dropdown-item>
                    <el-dropdown-item command="xgmm">
                        <img src="~/assets/images/shezhi.jpg" class="icon"> {{$t('main.list[1]')}}
                    </el-dropdown-item>
                    <!-- <el-dropdown-item command="sz">
                        <img src="~/assets/images/shezhi.jpg" class="icon"> {{$t('main.list[2]')}}
                    </el-dropdown-item> -->

                    <el-dropdown-item command="sp">
                        <img src="~/assets/images/geren.jpg" class="icon"> {{$t('main.list[4]')}}
                    </el-dropdown-item>
                    <el-dropdown-item command="tc">
                        <img src="~/assets/images/tuichu.jpg" class="icon"> {{$t('main.list[3]')}}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <el-dialog width='60%' :close-on-click-modal="false" :close-on-press-escape="false" :title="$t('user.title')"
            :visible.sync="dialogUser.isDialogo" v-if="dialogUser.isDialogo" :before-close="handleClose">
            <user :dialogo="dialogUser" />
        </el-dialog>
        <el-dialog width='60%' :close-on-click-modal="false" :close-on-press-escape="false" :title="$t('pass.title')"
            :visible.sync="dialogPass.isDialogo" v-if="dialogPass.isDialogo">
            <pass :dialogo="dialogPass" />
        </el-dialog>
        <el-dialog width='50%' :close-on-click-modal="false" :close-on-press-escape="false" :title="$t('user.input[4]')"
            :visible.sync="dialogImage.isDialogo" v-if="dialogImage.isDialogo">
            <image-icon :dialogo="dialogImage" />
        </el-dialog>
    </span>
</template>
<script>
    import message from './message.vue'
    import user from '../../user/index.vue'
    import pass from '../../pass/index.vue'
    import imageIcon from '../../imageIcon/index.vue'
    import fp from '~/util'
    export default {
        props: ['config'],
        data() {
            return {
                lang: localStorage.lang || 'cn',
                userInfo: {
                    name: 'null',
                    dept: 'null'
                },
                dialogUser: {
                    isDialogo: false,
                    isChange: false
                },
                dialogPass: {
                    isDialogo: false
                },
                dialogImage: {
                    isDialogo: false
                }
            }
        },
        created() {
            try {
                let obj = this.$store.state.data
                if (obj) {
                    this.userInfo.name = obj.loginName
                    this.userInfo.dept = obj.userName
                }
            } catch (e) {
                console.error(e)
            }
        },
        components: {
            message,
            user,
            pass,
            imageIcon
        },
        computed: {
            resetImg() {
                try {
                    if (process.env.NODE_ENV === 'development' || !this.$store.state.userImage) {
                        return ''
                    } else {
                        return `background-image: url(${this.$store.state.userImage});`
                    }
                } catch (e) {
                    console.error(e)
                }
                return ''
            }
        },
        watch: {
            lang(val, oVal) {
                if (val && val !== oVal) {
                    localStorage.setItem('lang', val)
                    window.location.reload()
                }
            }
        },
        methods: {
            handleClose(done) {
                if (this.dialogUser.isChange) {
                    this.$confirm(this.$t('pass.msg'))
                        .then(_ => {
                            this.dialogUser.isChange = false
                            done()
                        })
                        .catch(_ => { })
                } else {
                    this.dialogUser.isChange = false
                    done()
                }
            },
            handleCommand(command) {
                const that = this
                if (command === 'grzx') {
                    that.dialogUser.isDialogo = true
                } else if (command === 'xgmm') {
                    that.dialogPass.isDialogo = true
                } else if (command === 'tc') {
                    that.loginOut()
                } else if (command === 'sp') {
                    that.dialogImage.isDialogo = true
                }
            },
            loginOut() {
                this.$confirm(this.$t('main.loginout[0]'), this.$t('main.loginout[1]'), {
                    confirmButtonText: this.$t('main.loginout[2]'),
                    cancelButtonText: this.$t('main.loginout[3]'),
                    type: 'warning'
                }).then(() => {
                    fp.loginOut()
                }).catch(() => { })
            },
            getQR() {
                return require('~/assets/images/app_inline.png')
            },
            handleClick(tab, event) {
                // console.log(tab, event)
            }
        }
    }

</script>
<style lang="less" scoped>
    .lang {
        margin: 0;
        margin-left: 10px;
        padding: 0;
        background: transparent;
        outline: none;
        border: 0;
        color: #fff;
        font-size: 12px;

        p {
            display: block;
            width: 80px;
            height: 18px;
            line-height: 18px;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: right;
        }
    }

    .icon {
        width: 12px;
        height: 12px;
        border-radius: 14px;
    }

    .role {
        width: 170px;
        float: right;
        height: 25px;
        margin-top: 19px;
        padding-left: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;

        .ewm-show {
            width: 50px;
            height: 50px;
        }

        .ewm {
            width: 15px;
            height: 15px;
            margin-left: 25px;
            cursor: pointer;
        }

        .tz,
        .ew {
            width: 15px;
            height: 15px;
            margin-left: 25px;
            padding: 0;
            border: 0;
            border-radius: 0;
            outline: 0;
            background: transparent;
            background: url(../../../assets/images/ewm.png) center center;
            background-size: 100% 100%;
        }

        .ew {
            background: url(../../../assets/images/tz.png) center center;
            background-size: 100% 100%;
            position: relative;
        }

        .touxiang {
            cursor: pointer;
            line-height: 36px;
            border-radius: 50%;
            width: 36px;
            height: 36px;
            font-size: 18px;
            margin-left: 18px;
            background-color: #f5f7fa;

            .img {
                width: 36px;
                height: 36px;
                padding: 0;
                margin: 0;
                border-radius: 50%;
                background-image: url(../../../assets/images/user.png);
                background-size: 36px 36px;
                background-repeat: no-repeat;
                vertical-align: 13px;
            }
            .el-icon-arrow-down:before{
                opacity: 0;
            }
        }

        .role-name {
            .txt {
                margin-left: 5px;
                font-weight: bold;
            }

            margin: 15px 0 0 10px;
            color: #fff;
            font-size: 14px;
            float: left;
            display: block;
            font-family: Helvetica Neue,
            Helvetica,
            PingFang SC,
            Hiragino Sans GB,
            Microsoft YaHei,
            SimSun,
            sans-serif;
            width: 120px !important;
            height: 30px;
            line-height: 30px;
            overflow: hidden;
        }

        .btn {
            color: #2b2b2b;
            font-size: 14px;
            border: 0;
            width: 50px;
            height: 28px;
            background: #dddddd;
            padding: 0;
            text-align: center;
            margin: 16px 0 0 15px;
            font-family: 微软雅黑;
            float: left;

            &:hover {
                background: #a97b45;
                color: #fff;
            }
        }

        a {
            float: right;
            margin: 6px 0 0;
        }
    }
</style>