<template>
  <div>
    <el-card>
      <!-- 面包屑组件 -->
      <div slot="header" class="clearfix">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 头部 -->
      <div class="btn_box">
        <el-radio-group
          v-model="reqParams.collect"
          size="small"
          @change="toggleList"
        >
          <el-radio-button label="false">全部</el-radio-button>
          <el-radio-button label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button size="small" type="success" style="float: right"
          >添加素材</el-button
        >
      </div>
      <!-- 素材 -->
      <div class="img_list">
        <div class="img_item" v-for="item in images" :key="item.id">
          <img class="img_i" :src="item.url" alt="" />
          <div class="img_footer" v-show="!reqParams.collect">
            <span
              class="el-icon-star-off i_span"
              :class="{ red: item.is_collected }"
              style="margin: 0px 20px"
              @click="toggleStatus(item)"
            ></span>
            <span
              class="el-icon-delete i_span"
              style="margin: 0px 20px"
              @click="delImage(item.id)"
            ></span>
          </div>
        </div>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
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
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      total: 0
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    async getImages () {
      const { data: { data } } = await this.$http.get('/user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    toggleList () {
      this.reqParams.page = 1
      this.getImages()
    },
    async toggleStatus (item) {
      const { data: { data } } = await this.$http.put('user/images/' + item.id, { collect: !item.is_collected })
      item.is_collected = data.collect
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
    },
    delImage (id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete('user/images/' + id)
        this.$message.success('删除成功')
        this.getImages()
      }).catch(() => {

      })
    }
  }
}
</script>

<style scoped lang="less">
.img_list {
  margin-top: 20px;
}
.img_item {
  width: 220px;
  height: 220px;
  border: 1px dashed #ddd;
  position: relative;
  display: inline-block;
  margin-right: 60px;
  margin-left: 20px;
  margin-bottom: 20px;
}
.img_i {
  width: 100%;
  height: 100%;
}
.img_footer {
  width: 100%;
  height: 30px;
  line-height: 30px;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  position: absolute;
  left: 0;
  bottom: 0;
  text-align: center;
}
.i_span {
  margin: 0 20px;
  &.red {
    color: red;
  }
}
</style>
