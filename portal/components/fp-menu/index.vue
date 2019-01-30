<template>
    <div class="home" v-if="config.isReady">
        <header class="header">
            <template v-if="!isPreview">
                <aside class="name" v-show="!config.status.isCollapse">
                    <i class="img" :style="getIcon()"></i>
                </aside>
                <aside class="no-name" v-show="config.status.isCollapse">
                    <i class="img" :style="getSIcon()"></i>
                </aside>
            </template>
            <template v-if="isPreview">
                <aside class="name" v-show="!config.status.isCollapse">
                    <i class="img-preview" :style="getIcon()"></i>
                </aside>
                <aside class="no-name" v-show="config.status.isCollapse">
                    <i class="img-preview" :style="getSIcon()"></i>
                </aside>
            </template>
            <nav class="top-navs">
                <top-menu :menuData='menuData' :config='config' :sys="sys"></top-menu>
                <div class="user-infor">
                    <role :config='config'></role>
                </div>
            </nav>
        </header>
        <div class="bg-color main" id="main">
            <left-menu :menuData='menuData' :config='config' v-if="menuData.navs.length"></left-menu>
            <transition name="el-fade-in">
                <div class="content" id="content">
                    <tabs :menuData='menuData' :config='config'>
                        <component is="frame" slot="frame" :menuData='menuData' :config='config'></component>
                    </tabs>
                </div>
            </transition>
        </div>
        <div class="drag_line"></div>
        <div class="drag_button">
            <i></i>
        </div>
        <div class="drag_pop"></div>
        <screen-directive :config='config' />
        <reflesh-directive :config='config' />
    </div>
</template>
<script src="./index.js"></script>
<style lang="less">
    .home {
        min-width: 950px;
        .header {
            position: relative;
            width: 100%;
            height: 60px;
            background-color: #302e2e;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: flex-start;
            .name,
            .no-name {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: flex-start;
                width: 230px;
                h1 {
                    margin: 13px 0 0 0;
                    font-size: 18px;
                    color: #fff;
                }
                .img {
                    display: block;
                    background-image: url(../../assets/images/logo_default.png);
                }
                .img-preview {
                    width: 200px;
                    height: 46px;
                    display: block;
                    margin: 9px 10px 0 0px;
                    background: url(../../assets/images/logo_default_preview.png) 38px 1px no-repeat;
                    background-size: 94px;
                }
            }
            .no-name {
                .img {
                    display: block;
                    background-image: url(../../assets/images/logo_small_default.png);
                }
                .img-preview {
                    background: url(../../assets/images/logo_small_default_preview.png) 15px 5px no-repeat;
                    background-size: 29px;
                }
                box-sizing: border-box;
                width: 60px;
            }
            .top-navs {
                flex: 1;
                justify-content: flex-start;
            }
            .org-name {
                position: absolute;
                right: 150px;
                top: 15px;
                color: #fff;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 200px;
            }
            .user-name {
                position: absolute;
                font-size: 14px;
                right: 370px;
                top: 15px;
                color: #fff;
            }
            .user-infor {
                position: absolute;
                right: 0px;
                top: 0px;
                height: 60px;
                background:#302e2e;
                .user-name {
                    padding-right: 10px;
                    color: #fff;
                }
                .role-name {
                    position: relative;
                    display: inline-block;
                    padding-left: 10px;
                    font-size: 14px;
                    color: #fff;
                    width: 80px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    cursor: pointer;
                }
                .dian {
                    &:after {
                        content: ' ';
                        position: absolute;
                        width: 0;
                        height: 0;
                        top: 23px;
                        right: -15px;
                        border-left: 4px solid transparent;
                        border-right: 4px solid transparent;
                        border-top: 4px solid #fff;
                    }
                }
                .user-popover {
                    z-index: 11;
                    position: absolute;
                    top: 50px;
                    right: -20px;
                    /*left: -20px;*/
                    background-color: #fff;
                    &:before {
                        content: ' ';
                        position: absolute;
                        top: -8px;
                        right: 10px;
                        width: 0;
                        height: 0;
                        border-left: 5px solid transparent;
                        border-right: 5px solid transparent;
                        border-bottom: 8px solid #fff;
                    }
                    li {
                        width: 100px;
                        padding: 10px 0;
                        text-align: center;
                        line-height: 14px;
                        color: #4a4a4a;
                        font-size: 14px;
                        &:hover {
                            color: #fff;
                        }
                    }
                }
            }
        }
        .bg-color {
            background: #efefef;
        }
        .main {
            display: flex;
            width: 100%;
            height: calc(100vh-60px);
            overflow: hidden;
            position: absolute;
            top: 60px;
            bottom: 0;
            .sub-navs {
                width: 180px;
                overflow-y: auto;
                background-color: #262a35;
            }
            .content {
                position: relative;
                display: flex;
                flex-direction: column;
                flex: 1;
                margin: 6px 0 0 10px;
                overflow: hidden;
                border-radius: 6px;
            }
        }
        .mainFull {
            width: 100%;
            overflow: hidden;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            .contentFull {
                display: absolute;
                top: 40px;
                left: 0;
                overflow: hidden;
                border-radius: 6px;
                .iframesFull {
                    position: absolute;
                    top: 40px;
                    bottom: 0;
                    width: 100%;
                    background-color: #fff;
                    .iframe-page {
                        width: 100%;
                        height: 100%;
                        border: none;
                        background-color: #fff;
                    }
                }
                .iframesFull_image {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 100%;
                    background-color: #fff;
                    .iframe-page {
                        width: 100%;
                        height: 100%;
                        background-color: #fff;
                    }
                }
            }
        }
    }

    .tabsHide {
        display: none;
    }

    .tabsShow {
        display: block;
    }

    .el-tabs__header {
        border: 0 !important;
    }

    .el-dropdown-link {
        outline: 0;
    }
</style>