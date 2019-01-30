<template>
    <div class="top_menu">
        <div :class="{'left-icon': config.status.isCollapse, 'right-icon': !config.status.isCollapse}" @click="doCollapse"></div>
        <ul class="nav-ul-left">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <span>{{nowSys.name}}</span>
                    <i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="navClickEvent(nav, index)" v-for="(nav, index) in sysList" :key="'nav-' + index">{{nav.name}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <a @click="openLog" class="version" v-html="versionHtml"></a>
            <div class="search">
                <el-autocomplete prefix-icon="el-icon-search" size="mini" class="inline-input" v-model="state" :fetch-suggestions="querySearch"
                    :placeholder="$t('main.search')" :trigger-on-focus="true" @select="handleSelect">
                    <template slot-scope="{ item }">
                        <div class="name" @click="openMenu(item.url, item.id, item.name)">{{ item.value }}</div>
                    </template>
                </el-autocomplete>
            </div>
            <div class="conf-ope-c">
                <el-popover transition="" placement="bottom" width="320" trigger="hover">
                    <message/>
                    <a slot="reference" href="javascript:void(0)" @click='getInfoFunc' class="pr">
                        <img src="/img/info.png" alt=""><i class="bge" v-show='$store.state.messageSum > 0'>{{$store.state.messageSum}}</i></a>
                </el-popover>
                <el-dropdown @command="handleCommandFunc">
                    <a href="javascript:void(0)" @click='getConfFunc'><img src="/img/config.png" alt=""></a>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item disabled>{{$t('main.langswitch')}}</el-dropdown-item>
                        <el-dropdown-item command="cn" divided><span :class='{langSelect: "cn" == lang}'>{{$t('main.lang[0]')}}</span></el-dropdown-item>
                        <el-dropdown-item command="zh"><span :class='{langSelect: "zh" == lang}'>{{$t('main.lang[1]')}}</span></el-dropdown-item>
                        <el-dropdown-item command="en"><span :class='{langSelect: "en" == lang}'>{{$t('main.lang[2]')}}</span></el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
            </div>
        </ul>
    </div>
</template>

<style lang="less" scoped>
    .langSelect{
        color: #ae8351;
    }
    .top_menu {
        display: flex;
        background: #3d3a39;
        justify-content: flex-start;
        .nav-ul-left {
            flex: 1;
            display: flex;
            padding-left: 0;
            justify-content: flex-start;
            margin: 0;
            line-height: 60px;
            height: 60px;
            .txt {
                color: #fff;
                font-weight: bold;
                font-size: 16px;
            }
            .nav-li {
                font-size: 14px;
                padding: 0 12px;
                color: #999;
                cursor: pointer;
                list-style: none;
                &.checked {
                    color: #fff;
                }
            }
        }
        .top_right {
            color: #fff;
            font-size: 13px;
            width: 400px;
            height: 50px;
            line-height: 50px;
            padding: 0 12px;
        }
        .left-icon {
            width: 60px;
            height: 60px;
            background: url('../../../assets/images/icon-right.png') no-repeat center center;
            background-size: 20px 20px;
            cursor: pointer;
        }
        .right-icon {
            width: 60px;
            height: 60px;
            background: url('../../../assets/images/icon-right.png') no-repeat center center;
            background-size: 20px 20px;
            cursor: pointer;
            transform: rotate(-180deg);
        }
        .el-dropdown-link {
            color: #fff;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            span{
              font-size: 16px !important;
            }
        }
        .search {
            height: 60px;
            color: #fff;
            position: absolute;
            top: 0px;
            right: 330px;
            input{
                border: 1px solid red;
            }
        }
        .conf-ope-c{
            position: absolute;
            right: 210px;
            top: 0px;
            a{
                display: inline-block;
                margin-left: 25px;
                vertical-align: -7px;
                img{
                    width: 22px;
                    height: 22px;
                }
                .bge {
                    top: 6px;
                    left: 15px;
                    padding: 0 4px;
                    height: 15px;
                    line-height: 15px;
                    border-radius: 8px;
                    position: absolute;
                    display: block;
                    font-size: 12px;
                    font-style: normal;
                    color: #fff;
                    background: #f5222d;
                }
            }
        }
        .version {
            cursor: pointer;
            color: #fff;
            font-size: 12px;
            margin: 0px 0 0 20px;
        }
        
    }
</style>
<script src="./top-menu.js"></script>