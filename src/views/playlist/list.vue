<template lang="pug">
  div
    el-table(v-loading="loading" :data="playlist" stripe)
      el-table-column(type="index" width="50")
      el-table-column(label="封面" width="100")
        template(#default="{row}")
          el-image(:src="row.picUrl" fit="fill")
      el-table-column(label="名称" prop="name")
      el-table-column(label="描述" prop="copywriter")
      el-table-column(label="操作")
        template(#default="{row}")
          el-button(size="mini" @click="onEdit(row)") 编辑
          el-button(size="mini" type="danger" @click="onDel(row)") 删除
      //- 确认删除的对话框
      el-dialog(title="提示" :visible.sync="delDialogVisible" width="30%")
        span 确定删除该歌单吗
        template(#footer)
          span(class="dialog-footer")
            el-button(@click="delDialogVisible = false") 取 消
            el-button(type="primary" @click="doDel") 确 定
</template>

<script>
import { fetchList, del } from '@/api/playlist'
import scroll from '@/utils/scroll'

export default {
  name: 'List',
  data() {
    return {
      playlist: [],
      count: 50,
      loading: false,
      // 删除歌单的对话框是否显示
      delDialogVisible: false,
      info: {}
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    scroll.start(this.getList)
  },
  methods: {
    async getList() {
      try {
        this.loading = true
        const { resp_data, code } = await fetchList({
          start: this.playlist.length,
          count: this.count
        })
        if (code !== 20000) {
          throw new Error('连接失败')
        }

        const data = JSON.parse(resp_data)
        this.playlist = this.playlist.concat(data.data)
        this.loading = false
        if (data.data.length < this.count) {
          scroll.end()
        }
      } catch (error) {
        console.log(error)
      }
    },
    onEdit(row) {
      this.$router.push(`/playlist/edit/${row._id}`)
    },
    onDel(row) {
      this.delDialogVisible = true
      this.info.id = row._id
    },
    doDel() {
      del({ id: this.info.id }).then(res => {
        this.delDialogVisible = false
        if (res.data.deleted > 0) {
          this.playlist = []
          this.getList()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        } else {
          this.$message.error('删除失败')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
