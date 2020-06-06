<template lang="pug">
div
  el-form(ref="form" :model="playlist" label-width="80px")
    el-form-item( label="歌单名称")
      el-input( v-model="playlist.name")
    el-form-item( label="描述")
      el-input( v-model="playlist.copywriter")
    el-form-item
      el-button( type="primary" @click="onSubmit") 更新
      el-button( @click="onCancel") 取消
</template>

<script>
import { fetchById, update } from '@/api/playlist'

export default {
  name: 'Edit',
  props: {
    id: { type: String || Number, default: 0 }
  },
  data() {
    return {
      playlist: {}
    }
  },
  async created() {
    const res = await fetchById({
      id: this.id
    })
    if (res.code !== 20000) {
      console.error('请求错误')
    }
    const { data } = res.res
    this.playlist = JSON.parse(data)
  },
  methods: {
    async onSubmit() {
      try {
        const res = await update(this.playlist)

        if (res.data.modified > 0) {
          this.$message({
            message: '更新成功',
            type: 'success'
          })
        } else {
          this.$message.error('更新失败')
        }
        this.$router.push('/playlist/list')
      } catch (error) {
        console.log(error)
      }
    },
    onCancel() {
      this.$router.push('/playlist/list')
    }
  }
}
</script>

<style lang="scss" scoped></style>
