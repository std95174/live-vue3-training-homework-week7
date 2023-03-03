<template>
  <header>
    <ul class="nav justify-content-center">
      <li class="nav-item">
        <router-link :to="{ name: 'products' }" class="nav-link active">管理商品</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'orders' }" class="nav-link active">管理訂單</router-link>
      </li>
      <li class="nav-item" @click="logout">
        <a class="btn btn-link nav-link active">登出</a>
      </li>
    </ul>
  </header>

  <section class="container">
    <router-view></router-view>
  </section>
</template>

<script>
import { RouterView, RouterLink } from 'vue-router'
export default {
  name: 'HomeView',
  components: {
    RouterView,
    RouterLink
  },
  methods: {
    logout() {
      this.$router.push({ name: 'login' })

      // remove cookie
      document.cookie = `hexToken=; expires=${new Date()}; path=/`
    }
  }
}
</script>
