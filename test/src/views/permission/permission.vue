/* eslint-disable */
<template>
  <el-container>
    <el-header>
      <el-button-group>
        <el-button @click="permissionSearch">
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
      <el-form :model="ruleForm" ref="ruleForm">
        <el-form-item label="日期" prop="contractNo">
          <el-input v-model="ruleForm.date" placeholder="请输入内容"></el-input>
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

      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>


  </el-container>
</template>
<script src="./permission.js"></script>
