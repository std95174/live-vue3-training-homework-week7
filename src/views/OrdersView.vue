<template>
  <h1>這是訂單頁面</h1>
  <!--  bs table-->
  <table class="table">
    <thead>
    <tr>
      <th scope="col">消費者</th>
      <th scope="col">付款狀態</th>
      <th scope="col">手動調整付款</th>
      <th scope="col">總價</th>
      <th scope="col"></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="order in orders" :key="order.id">
      <th>{{ order.user.name }}</th>
      <td>
        <span class="badge rounded-pill bg-success ms-2" v-if="order.is_paid">已付款</span>
        <span class="badge rounded-pill bg-danger ms-2" v-else>尚未付款</span>
      </td>
      <td>
        <button type="button" class="btn btn-outline-primary" v-if="!order.is_paid" @click="payOrder(order)">付款
        </button>
        <span v-else>-</span>
      </td>
      <td>
        {{ formatMoney(order.total) }} 元
      </td>
      <td>
<!--        bs5 button to open modal-->
        <button type="button" class="btn btn-outline-primary me-2" data-bs-toggle="modal" data-bs-target="#orderModal" @click="selectedOrder = order">詳細資料</button>
        <button type="button" class="btn btn-outline-danger" @click="deleteOrder(order)">刪除</button>
      </td>
    </tr>
    </tbody>
  </table>
  <order-pagination @page-changed="setOrders"></order-pagination>
  <order-modal :selected-order="selectedOrder" @update-order="getOrders"></order-modal>
</template>

<script>
import axios from 'axios'
import {getToken} from '@/common/token'
import OrderPagination from "@/components/OrderPagination.vue";
import OrderModal from "@/components/OrderModal.vue";

const {VITE_API_URL, VITE_API_PATH} = import.meta.env

export default {
  name: 'OrdersView',
  data() {
    return {
      orders: [],
      selectedOrder: {}
    }
  },
  components: {OrderModal, OrderPagination},
  methods: {
    async deleteOrder(order) {
      const {isConfirmed} = await this.$swal({
        title: `是否刪除此訂單？`,
        icon: 'warning',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: '確認',
        cancelButtonText: '取消',
      })
      if (isConfirmed) {
        const loader = this.$loading.show()
        const {data} = await axios.delete(`${VITE_API_URL}/api/${VITE_API_PATH}/admin/order/${order.id}`, {
          headers: {
            Authorization: `${getToken()}`
          }
        })
        if (data.success) {
          loader.hide()
          this.$swal({
            title: '已刪除訂單',
            icon: 'success',
          })
          await this.getOrders()
        }

      }
    },
    async payOrder(order) {
      const {isConfirmed} = await this.$swal({
        title: `是否調整付款狀態？`,
        icon: 'warning',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: '確認',
        cancelButtonText: '取消',
      })
      if (isConfirmed) {
        const loader = this.$loading.show()

        const {data} = await axios.post(`${VITE_API_URL}/api/${VITE_API_PATH}/pay/${order.id}`, {
          headers: {
            Authorization: `${getToken()}`
          }
        })
        if (data.success) {
          loader.hide()
          this.$swal({
            title: '付款成功',
            icon: 'success',
          })
          await this.getOrders()
        }

      }
    },
    async getOrders() {
      const {data} = await axios.get(`${VITE_API_URL}/api/${VITE_API_PATH}/admin/orders`, {
        headers: {
          Authorization: `${getToken()}`
        }
      })
      this.orders = data.orders
    },
    setOrders(orders) {
      this.orders = orders
    },
    formatMoney(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  },
  computed: {},
  async mounted() {
    await this.getOrders()
  }
}
</script>
