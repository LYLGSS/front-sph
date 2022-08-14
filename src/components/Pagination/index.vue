<template>
  <div class="pagination">
    <button :disabled="pageNo === 1" @click="$emit('getPageNo', pageNo - 1)">&lt; 上一页</button>
    <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo', 1)" :class="{ active: pageNo === 1 }">1</button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <!-- 连续的页码 -->
    <!-- 这里使用 <span> 来包裹是为了解决 v-for 和 v-if 不能同时使用的问题 -->
    <span v-for="(page, index) in startNumAndEndNum.end" :key="index">
      <button v-if="page >= startNumAndEndNum.start" @click="$emit('getPageNo', page)" :class="{ active: pageNo === page }">{{ page }}</button>
    </span>

    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button v-if="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo', totalPage)" :class="{ active: pageNo === totalPage }">{{ totalPage }}</button>
    <button :disabled="pageNo === totalPage" @click="$emit('getPageNo', pageNo + 1)">下一页 &gt;</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    // 计算总共多少页
    totalPage() {
      // 向上取整（不满一页要多一页）
      return Math.ceil(this.total / this.pageSize)
    },

    // 计算连续页码的起始页和结束页【连续页码至少为5】
    startNumAndEndNum() {
      // 先定义两个变量存储起始页数和结束页数
      let start = 0
      let end = 0
      // 不正常现象：【总页数没有连续页多】
      if (this.continues > this.totalPage) {
        start = 1
        end = this.totalPage
      } else {
        // 正常现象：【总页数大于连续页数】
        start = this.pageNo - parseInt(this.continues / 2)
        end = this.pageNo + parseInt(this.continues / 2)
        // 纠正不正常的现象【star为0|负数】
        if (start < 1) {
          start = 1
          end = this.continues
        }
        // 纠正不正常的现象【end大于总页码数】
        if (end > this.totalPage) {
          start = this.totalPage - this.continues + 1
          end = this.totalPage
        }
      }
      return { start, end }
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
