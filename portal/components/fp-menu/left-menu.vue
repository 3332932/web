<template>
    <div class="leftMenu">
        <el-menu :unique-opened="true" :default-active="menuData.nowMenuId" :collapse-transition="false" class="el-menu-vertical-demo"
            @open="handleOpen" @close="handleClose" :collapse="config.status.isCollapse" theme="dark">
            <template v-for="item in menuData.navs">
                <el-submenu :index="String(item.id)" v-if="item.children.length">
                    <template slot="title">
                        <i class="icon" :style="getIcon(item.icon)" :class="getClass(item.icon)"></i>
                        <span slot="title">{{item.text}}</span>
                    </template>
                    <template v-for="it in item.children">
                        <el-menu-item :class="getClass(it)" :index="String(it.id)" v-if="!it.children.length" @click="openMenu(it)">
                            <div class="sub1_name" :title="it.text">
                                <i class="icon expend-icon"></i> {{it.text}}</div>
                        </el-menu-item>
                        <el-submenu :index="String(it.id)" v-if="it.children.length">
                            <span slot="title">
                                <div class="sub1_name" :title="it.text">{{it.text}}</div>
                            </span>
                            <template v-for="it2 in it.children">
                                <el-menu-item :class="getClass(it2)" :index="String(it2.id)" v-if="!it2.children.length" @click="openMenu(it2)">
                                    <div class="sub2_name" :title="it2.text">
                                        <i class="icon expend-icon"></i>{{it2.text}}</div>
                                </el-menu-item>
                                <el-submenu :index="String(it2.id)" v-if="it2.children.length">
                                    <span slot="title">
                                        <div class="sub2_name" :title="it2.text">{{it2.text}}</div>
                                    </span>
                                    <template v-for="it3 in it2.children">
                                        <el-menu-item :class="getClass(it3)" :index="String(it3.id)" @click="openMenu(it3)">
                                            <div class="sub3_name" :title="it3.text">
                                                <i class="icon expend-icon"></i>{{it3.text}}</div>
                                        </el-menu-item>
                                    </template>
                                </el-submenu>
                            </template>
                        </el-submenu>
                    </template>
                </el-submenu>
                <el-menu-item :class="getClass(item)" :index="String(item.id)" v-if="!item.children.length" @click="openMenu(item)">
                    <i class="icon" :style="getIcon(item.icon)"></i>
                    <span slot="title">{{item.text}}</span>
                </el-menu-item>
            </template>
        </el-menu>
        <open-page-directive :menuData="menuData" :config="config" />
    </div>
</template>
<style lang="less">
    .leftMenu {
        transition: none;
        color: #f6f6fe;
        background: #fcfcfc;
        overflow-y: auto;
        .expend-icon{
            margin-right: 0px;
            vertical-align: -2px;
            width:14px;
            height: 14px;
            opacity: 0.8;
        }
        /*隐藏滚动条*/
        height: 100%;
        overflow: scroll;
        -ms-overflow-style: none;
        &::-webkit-scrollbar {
            width: 0;
            height: 0;
        }
        .el-menu-item-group {
            background: #384152;
        }
        .el-menu-item-group__title {
            color: #f6f6fe;
        }
        .el-submenu__icon-arrow {
            top: 52%;
            font-size: 13px;
            color: #8d8d8d;
        }
        .sub1_name {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .sub2_name {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .sub3_name {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .el-submenu__title {
            background: #fcfcfc;
            color: #303133;
            &:hover {
                background: #ebeded !important;
                color: #a97b45 !important;
                border-right: solid 3px #a97b45;
            }
        }
        .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 230px;
            min-height: 400px;
        }
        .el-menu--collapse {
            width: 60px !important;
        }
        .el-menu-item {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            background: #fcfcfc;
            color: #303133;
            &.is-actived {
                background: #ecf5ff;
                color: #a97b45;
            }
            &:hover {
                background: #ebeded;
                border-right: solid 3px #a97b45;
                color: #a97b45;
            }
        }
    }
</style>
<script src="./left-menu.js"></script>