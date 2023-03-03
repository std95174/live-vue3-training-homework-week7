<template>
  <div
      class="modal fade"
      id="orderModal"
      tabindex="-1"
      aria-labelledby="updateOrderModalLabel"
      aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="updateOrderModalLabel">
            訂單詳細資訊
          </h1>
          <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="card">
              <div class="card-body">
                <div class="row mb-3">
                  <div class="col-md-4">
                    <strong>訂單編號：</strong> {{ selectedOrder.id }}
                  </div>
                  <div class="col-md-4">
                    <strong>訂單日期：</strong> {{ selectedOrder.create_at }}
                  </div>
                  <div class="col-md-4">
                    <strong>訂單狀態：</strong>
                    <span class="badge rounded-pill" :class="selectedOrder.is_paid?'bg-success':'bg-danger'">{{
                        selectedOrder.is_paid ? '已付款' : '未付款'
                      }}</span>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-4">
                    <strong>客戶姓名：</strong> {{ selectedOrder.user?.name }}
                  </div>
                  <div class="col-md-4">
                    <strong>客戶電話：</strong> {{ selectedOrder.user?.tel }}
                  </div>
                  <div class="col-md-4">
                    <strong>客戶地址：</strong> {{ selectedOrder.user?.address }}
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-4">
                    <strong>客戶信箱：</strong> {{ selectedOrder.user?.email }}
                  </div>
                  <div class="col-md-8">
                    <strong>留言：</strong> {{ selectedOrder.message }}
                  </div>
                </div>
                <table class="table table-striped">
                  <thead>
                  <tr>
                    <th>產品名稱</th>
                    <th>數量</th>
                    <th>單價</th>
                    <th>小計</th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="item in selectedOrder.products" :key="item.id">
                    <td>{{ item.product?.title }}</td>
                    <td>{{ item.qty }}</td>
                    <td>{{ item.product?.price }}</td>
                    <td>{{ item.final_total }}</td>
                    <td>
                      <button class="btn btn-close btn-sm" @click="removeProduct(item)"></button>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" @click="calculateTotal">關閉</button>
          <button type="button" class="btn btn-primary" @click="updateOrder">更新</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getToken} from "@/common/token";

const {VITE_API_URL, VITE_API_PATH} = import.meta.env;
export default {
  name: "OrderModal",
  data() {
    return {
      modal: {},
    }
  },
  props: {
    selectedOrder: {
      type: Object,
      required: true
    }
  },
  methods: {
    removeProduct(product) {
      delete this.order.products[product.id]
      this.order.total = this.calculateTotal()
    },
    calculateTotal() {
      let total = 0
      for (let productId in this.order.products) {
        total += this.order.products[productId].final_total;
      }
      return total;
    },
    async updateOrder() {
      let loader = this.$loading.show()
      const {data} = await this.axios.put(`${VITE_API_URL}/api/${VITE_API_PATH}/admin/order/${this.order.id}`, {
            data: this.order
          },
          {
            headers: {
              'Authorization': getToken(),
            }
          })
      loader.hide()
      if (data.success) {
        this.$swal({
          title: '訂單更新成功',
          icon: 'success',
        })
        this.$emit('update-order')
      } else {
        this.$swal({
          title: '訂單更新失敗',
          icon: 'error',
        })
      }
    }
  },
  computed: {
    order() {
      return {...this.selectedOrder}
    }
  }
}
</script>

<style scoped>

</style>
