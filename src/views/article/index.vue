<template>
  <div class="caotainer-article">
    <el-card>
      <div slot="header" class="clearfix">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态 :">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道 :">
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期 :">
          <el-date-picker
            v-model="dataArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <span>根据筛选条件攻查询到 {{ total }} 条结果：</span>
      </div>
      <el-table :data="articles" align="center">
        <el-table-column label="封面" align="center">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" width="150" height="100">
              <div slot="error" class="image-slot">
                <img
                  src="../../assets/error.gif"
                  width="150px"
                  height="100px"
                />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title" align="center">
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success"
              >审核通过</el-tag
            >
            <el-tag v-if="scope.row.status === 3" type="warning"
              >审核失败</el-tag
            >
            <el-tag v-if="scope.row.status === 4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate" align="center">
        </el-table-column>
        <el-table-column label="操作" width="120px " align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              plain
              @click="toEdit(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              plain
              @click="delArticle(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 20px"
        background
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        layout="prev, pager, next"
        :total="total"
        @current-change="pager"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 4,
        per_page: 20
      },
      channelOptions: [],
      dataArr: [],
      articles: [],
      total: 0
    }
  },
  methods: {
    async getChannelOptions () {
      const { data: { data } } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    async getArticles () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    search () {
      this.reqParams.page = 1
      this.getArticles()
    },
    changeDate (dateArr) {
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    toEdit (id) {
      // this.$router.push(`/publish?id=${id}`)
      this.$router.push({ path: 'publish', query: { id } })
    },
    async delArticle (id) {
      await this.$http.delete(`artcles/${id}`)
      this.$message.success('删除成功')
      this.getArticles()
    }
  },
  created () {
    this.getChannelOptions()
    this.getArticles()
  }
}
</script>

<style>
</style>
