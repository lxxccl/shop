<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from './components/Footer'

export default {
  name: 'app',
  components: {
    Header,
    Footer
  },
  mounted() {
    //App的根组件挂载完毕,发一次请求即可.
    this.$store.dispatch('categoryList')
  }
}
</script>

<style lang="less" scoped></style>
