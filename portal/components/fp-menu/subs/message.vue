<template>
    <div class="message">
        <el-tabs v-model="activeName" tab-position="top" @tab-click="handleClick">
            <el-tab-pane :label="$t('main.news[0]')" name="1">
                <div class="list">
                    <div class="item" v-for="item in noticeInfo">
                        <div class="title" :title='item.title'>{{item.title}}</div>
                        <div class="content" :title='item.content'>{{item.content}}</div>
                        <div class="content" :title='item.creator +" / "+ item.createTime'>{{item.creator}} /
                            {{item.createTime}}</div>
                    </div>
                </div>
                <div class="history">
                    <span @click='openNewPage("notice", -3)'>{{$t('main.notice')}}</span>
                </div>
            </el-tab-pane>
            <el-tab-pane :label="getMsg()" name="2">
                <div class="list-message">
                    <div class="item" v-for="item in retDetail">
                        <div class="name">
                            <div class="txt">{{item.title}}</div>
                            <el-switch @change='switchChangeFunc(item)' class="switch" :active-text="item.unReadFlag ? $t('main.unread') : $t('main.read')"
                                v-model='item.unReadFlag' :disabled='!item.unReadFlag'></el-switch>
                        </div>
                        <div class="content" v-html='item.content'></div>
                    </div>
                </div>
                <div class="history">
                    <span @click='openNewPage("message", -4)'>{{$t('main.message')}}</span>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import SockJS from 'sockjs-client';
    import { getSocket, getNoticeInfo } from '~/api.js'
    export default {
        data() {
            return {
                sock: null,
                activeName: '1',
                retDetail: [],
                noticeInfo: []
            }
        },
        mounted() {
            try {
                this.initSocket()
                this._getNoticeInfo()
            } catch (e) {
                console.error(e)
            }
        },
        methods: {
            openNewPage(str, num) {
                let title = (str === 'notice') ? this.$t('main.news[0]') : this.$t('main.news[1]')
                let gateway = localStorage.getItem('portal-gateway')
                window.parent.postMessage({ type: 'activetag', id: num, title: title, url: `/uc-web/${gateway ? '?gateway=' + gateway : ''}#/${str}` }, '*')
            },
            async _getNoticeInfo() {
                const { data } = await getNoticeInfo()
                if (data && data.flag && data.flag.retCode === '0') {
                    this.noticeInfo = data.rows
                }
            },
            getMsg() {
                let sum = 0
                for (let o of this.retDetail) {
                    if (o.unReadFlag === true) {
                        sum += 1;
                    }
                }
                let label = this.$t('main.news[1]')
                return `${label}(${this.$store.state.messageSum})`
            },
            handleClick(tab, event) {
                // console.log(tab, event)
            },
            switchChangeFunc(item) {
                let that = this;
                let json = {
                    retCode: "notification_read",
                    retDetail: item.id || ''
                }
                let str = JSON.stringify(json)
                that.sock.send(str)
                that.sock.onmessage = function (e) {
                    let message = {}
                    try {
                        message = JSON.parse(e.data)
                        if (message.retCode == 0) {
                            let messageSum = that.$store.state.messageSum
                            messageSum = messageSum - 1
                            that.$store.commit('updateMessageSum', messageSum)
                        } else {
                            that.$message.error(message.retMsg)
                        }
                    }
                    catch (e) {
                        that.$message.error('返货的socket数据格式错误')
                    }
                }
                that.sock.onclose = function () {
                    console.log('close')
                }
            },
            getguidFunc() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            },
            initSocket() {
                let that = this;
                let transports = {
                    transports: [
                        'xhr-polling']
                }
                that.sock = new SockJS(getSocket() + 'id=' + this.getguidFunc() + '&token=' + this.$store.state.token + '&loginName=' + this.$store.state.data.loginName, null, transports);
                that.sock.onopen = function () {
                    let json = {
                        retCode: "notification"
                    }
                    let str = JSON.stringify(json)
                    that.sock.send(str)
                }
                that.sock.onmessage = function (e) {
                    let message = {}
                    try {
                        message = JSON.parse(e.data)
                        if (message.retDetail) {
                            if (message.retDetail.constructor === Array) {
                                that.retDetail = message.retDetail
                            } else if (message.retDetail.constructor === Object) {
                                that.retDetail = [message.retDetail]
                            }
                        }
                    }
                    catch (e) {
                        console.error('返货的socket数据格式错误');
                    }
                    that.retDetail.map(o => {
                        let flag = o.isRead !== 1 ? true : false
                        that.$set(o, 'unReadFlag', flag)
                    })
                    let messageSum = 0
                    if (that.retDetail.length && that.retDetail[0].unreadCount) {
                        messageSum = that.retDetail[0].unreadCount
                    }
                    that.$store.commit('updateMessageSum', messageSum)
                    // that.sock.close()
                }
                that.sock.onclose = function () {
                    console.log('close')
                }
            },
        }
    }
</script>
<style lang="less" scoped>
    .message {
        padding-bottom: 5px;


        .list {
            .item {
                max-height: 140px;
                border-bottom: solid 1px #e8e8e8;
                font-weight: 400;
                font-size: 14px;
                overflow: auto;
                padding-bottom: 5px;

                .title {
                    color: #595959;
                    width: 270px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    padding-top: 5px;
                }

                .content {
                    padding: 2px 0;
                    color: rgba(0, 0, 0, .45);
                    font-size: 12px;
                    width: 270px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }

        .list-message {
            margin-top: -2px;
            overflow: auto;
            max-height: 550px;

            .item {
                margin-top: 2px;
                padding-bottom: 2px;
                border-bottom: solid 1px #e8e8e8;

                .name {
                    color: #595959;
                    font-size: 15px;
                    display: flex;
                    flex-direction: row;

                    .txt {
                        flex: 1;
                        margin-right: 8px;
                        width: 270px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    .switch {
                        margin-right: 5px;
                    }
                }

                .content {
                    color: #8c8c8c;
                    font-size: 14px;
                }
            }
        }

        .history {
            text-align: center;
            padding-top: 10px;
            color: #1890ff;

            span {
                cursor: pointer;
            }
        }
    }
</style>