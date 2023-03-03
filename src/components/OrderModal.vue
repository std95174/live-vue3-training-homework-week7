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
              <div class="card-header">
                <h5 class="card-title">訂單詳細內容</h5>
              </div>
              <div class="card-body">
                <div class="row mb-3">
                  <div class="col-md-4">
                    <strong>訂單編號：</strong> {{ order.id }}
                  </div>
                  <div class="col-md-4">
                    <strong>訂單日期：</strong> {{ order.create_at }}
                  </div>
                  <div class="col-md-4">
                    <strong>訂單狀態：</strong> {{ order.is_paid ? '已付款' : '未付款' }}
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-4">
                    <strong>客戶姓名：</strong> {{ order.user?.name }}
                  </div>
                  <div class="col-md-4">
                    <strong>客戶電話：</strong> {{ order.user?.tel }}
                  </div>
                  <div class="col-md-4">
                    <strong>客戶地址：</strong> {{ order.user?.address }}
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-4">
                    <strong>客戶信箱：</strong> {{ order.user?.email }}
                  </div>
                  <div class="col-md-8">
                    <strong>留言：</strong> {{ order.message }}
                  </div>
                </div>
                <table class="table table-striped">
                  <thead>
                  <tr>
                    <th>產品名稱</th>
                    <th>數量</th>
                    <th>單價</th>
                    <th>小計</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="item in order.products" :key="item.id">
                    <td>{{ item.product_id }}</td>
                    <td>{{ item.qty }}</td>
                    <td>{{ item.price }}</td>
                    <td>{{ item.price * item.qty }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderModal",
  data() {
    return {
      modal:{}
    }
  },
  props:{
    order: {
      type: Object,
      required: true
    }
  },
}
</script>

<style scoped>

</style>
