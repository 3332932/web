<template>
    <div class="content-box scroll-hidden">
        <div class="tabs" ref="tabs" id="tabs">
            <el-tabs v-model="menuData.tabChecked" type="card" @tab-remove="removeTab">
                <el-tab-pane v-for="(item, index) in menuData.tabs" :closable="item.id!==config.index.id" :key="item.id"
                    :name="String(item.id)">
                    <span slot="label" v-if="item.id!=-1">{{item.text}}<i class="el-icon-refresh refresh" @click="doReflesh(item)"></i></span>
                    <span slot="label" v-else>{{item.text}}</span>
                </el-tab-pane>
            </el-tabs>
            <div class="button_right">
                <el-popover ref="popover" placement="bottom" width="80" v-model="isShow" trigger="click">
                    <div class="popover-directive">
                        <ul>
                            <li @click="tofull">{{$t('main.option[0]')}}</li>
                            <li @click="tohalf">{{$t('main.option[1]')}}</li>
                            <li @click="closeOtherPage">{{$t('main.option[2]')}}</li>
                        </ul>
                    </div>
                </el-popover>
                <el-button v-popover:popover @click.stop="" type="primary" icon="el-icon-menu" size="mini" class="op-btn" circle></el-button>
            </div>
            <close-page-directive :menuData="menuData" :config="config" />
        </div>
        <div class="bg"></div>
        <slot name="frame"></slot>
    </div>
</template>

<script src="./top-tabs.js"></script>
<style lang="less">
    #tabs{
        .is-focus{
            box-shadow: none!important;
        }
    }
    .refresh {
        margin-left: 5px;
    }
    .el-icon-close {
        margin-left: 0px !important;
    }
    .popover-directive {
        padding: 0;
        ul {
            padding: 0;
            li {
                display: block;
                height: 25px;
                line-height: 25px;
                padding-left: 10px;
                font-size: 14px;
                cursor: pointer;
                border-radius: 5px;
                &:hover {
                    background: #a97c45;
                    color: #fff;
                }
            }
        }
    }

    .tabsFull {
        height: 40px;
        background-color: #f4f4f4;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }

    .tabsFull .tab {
        display: inline-block;
        line-height: 40px;
        padding-left: 20px;
        padding-right: 20px;
        border-right: 1px solid #ccc;
        font-size: 12px;
        color: #555;
        cursor: pointer;
    }

    .tabsFull .is-active {
        color: #fff !important;
        background: #ae8351;
        margin-bottom: 0;
    }

    .content-box {
        .tabs {
            height: 40px;
            background-color: #efefef;
            width: 100%;
            .tab {
                display: inline-block;
                line-height: 40px;
                padding-left: 20px;
                padding-right: 20px;
                border-right: 1px solid #ccc;
                font-size: 12px;
                color: #555;
                cursor: pointer;
            }
            .is-active {
                color: #ae8351;
                background: #fff !important;
                margin-bottom: 0;
                border-bottom: none !important;
            }
            .el-tabs__nav-next{
                top:-5px;
            }
            .el-tabs__nav-prev{
                top:-5px;
            }
        }

        .el-tabs--card>.el-tabs__header .el-tabs__item {
            border: solid 1px #d1dbe5;
            border-right: none;
            background: #f4f4f4;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            height: 34px;
            line-height: 34px;
            outline: none;
            &.is-active {
                background: #ae8351;
            }
            &:last-child{
                border-right: solid 1px #d1dbe5;
            }
        }
        .el-tabs__header {
            margin: 0;
            margin-bottom: 0 !important;
        }
        .el-tabs .el-tabs__nav-wrap {
            width: calc(100% - 65px)
        }
        .el-tabs .el-tabs__nav {
            border: 0;
        }
        .el-tabs--card>.el-tabs__header .el-tabs__item .el-icon-close {
            width: 14px !important;
        }
        .el-tabs--card>.el-tabs__header .el-tabs__item.is-closable:hover {
            padding: 0 20px !important;
        }
        .bg {
            background-color: #fff;
            height: 0;
        }
        .button_right {
            width: 24px;
            text-align: right;
            position: absolute;
            right: 14px;
            top: 3px;
            z-index: 10
        }
    }
</style>