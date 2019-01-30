/* eslint-disable */
<template>
  <el-container>
    <el-header>
      <el-button-group>
        <el-button @click="userSearch">
          查询
        </el-button>
        <el-button>
          删除
        </el-button>
        <el-button @click="hs(false)" v-if="isshow">
          隐藏
        </el-button>
        <el-button @click="hs(true)" v-if="!isshow">
          展开
        </el-button>
      </el-button-group>
    </el-header>
    <el-header>
      <el-form :model="userRuleForm" ref="userRuleForm">
        <el-form-item label="日期" prop="contractNo">
          <el-input v-model="userRuleForm.date" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="userRuleForm.nickName" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="用户id" prop="userId">
          <el-input v-model="userRuleForm.userId" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="contractNo" v-if="isshow">
          <el-input v-model="userRuleForm.name" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="contractNo" v-if="isshow">
          <el-input v-model="userRuleForm.name" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="contractNo" v-if="isshow">
          <el-input v-model="userRuleForm.name" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="contractNo" v-if="isshow">
          <el-input v-model="userRuleForm.name" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="contractNo" v-if="isshow">
          <el-input v-model="userRuleForm.name" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main ref="mainRef">
      <el-table :data="tableList" border style="width: 100%" @sort-change="handSortChange">
        <el-table-column v-for="(item) in tableColumn"
                         :prop="item.prop" :label="item.name"
                         :sortable="item.sortable"
                         :key="item.prop"
                         :width="item.width"
                         :fixed="item.fixed" style="width: 100%" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row[item.prop]}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <span class="lookMore">查看</span>
            <span class="lookMore">编辑</span>
            <span class="lookMore" @click="showRole(scope.row)">分配角色</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.current"
        :page-sizes="pageInfo.sizes"
        :page-size="pageInfo.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total">
      </el-pagination>
    </el-main>
    <el-footer ref="footerRef"></el-footer>


    <el-dialog  :visible.sync="dialogVisible" width="60%">
      <span>
        <template>
          <el-transfer
            filterable
            :titles="['可分配角色', '已分配角色']"
            :button-texts="['到左边', '到右边']"
            v-model="value1"
            :data="roleTable">

          </el-transfer>
        </template>
      </span>


      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="roleSubmit">确 定</el-button>
      </span>
    </el-dialog>


  </el-container>
</template>
<script src="./user.js"></script>
