<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a class="page-link" href="#" @click.prevent="pageChange(pagination.current_page - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
          class="page-item"
          :class="{ active: pagination.current_page === i }"
          v-for="i in pagination.total_pages"
          :key="i"
      >
        <a class="page-link" href="#" @click.prevent="pageChange(i)"> {{ i }}</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" @click.prevent="pageChange(pagination.current_page + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import axios from "axios";
import {getToken} from "@/common/token";

const {VITE_API_URL, VITE_API_PATH} = import.meta.env
export default {
  name: 'OrderPagination',
  data() {
    return {
      pagination: {}
    }
  },
  methods: {
    async pageChange(page) {
      if (
          page !== this.pagination.current_page ||
          page >= 0 ||
          page <= this.pagination.total_pages
      ) {
        await this.getOrders(page)
      }
    },
    async getOrders(page = 1) {
      const {data} = await axios.get(`${VITE_API_URL}/api/${VITE_API_PATH}/admin/orders?page=${page}`, {
        headers: {
          Authorization: `${getToken()}`
        }
      })
      this.$emit('page-changed', data.orders)
      this.pagination = data.pagination
    },
  },
  async mounted() {
    await this.getOrders()
  }
}
</script>

<style scoped></style>
