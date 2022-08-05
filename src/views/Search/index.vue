<template>
  <div>
    <h2>Search 路由组件 -- {{ keyword }}</h2>
    <h2>Search 路由组件 -- {{ $route.query.k }}</h2>
  </div>
</template>

<script>
export default {
  name: 'MyHome',
  props: ['keyword']
}
</script>

<style></style>
