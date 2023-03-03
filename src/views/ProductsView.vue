<template>
  <h1>商品總覽</h1>
  <div class="container mt-3">
    <div class="text-end">
      <button
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#updateProductModal"
          @click="setIsNew(true); clearProduct()"
      >
        建立新產品
      </button>
    </div>
    <table class="table">
      <thead>
      <tr>
        <th scope="col">分類</th>
        <th scope="col">產品名稱</th>
        <th scope="col">原價</th>
        <th scope="col">售價</th>
        <th scope="col">是否啟用</th>
        <th scope="col">編輯</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in products" :key="product.id">
        <th>{{ product.category }}</th>
        <td>{{ product.title }}</td>
        <td>{{ product.origin_price }}</td>
        <td>{{ product.price }}</td>
        <td :class="product.is_enabled ? 'text-success' : ''">
          {{ product.is_enabled ? '已啟用' : '未啟用' }}
        </td>
        <td>
          <button
              class="btn btn-sm btn-outline-primary me-3"
              data-bs-toggle="modal"
              data-bs-target="#updateProductModal"
              @click="showUpdateProductModal(product)"
          >
            編輯
          </button>
          <button
              class="btn btn-sm btn-outline-danger"
              data-bs-toggle="modal"
              data-bs-target="#deleteProductModal"
              @click="showDeleteProductModal(product)"
          >
            刪除
          </button>
        </td>
      </tr>
      </tbody>
    </table>
    <pagination></pagination>
  </div>

  <!--  Update Product Modal -->
  <update-product-modal ref="update-product-modal"></update-product-modal>
</template>

<script>
import {mapActions, mapState} from 'pinia'
import {adminProductStore} from '@/stores/admin-product-store'
import Pagination from '@/components/PaginationComponent.vue'
// import DeleteProductModal from '../../components/DeleteProductModal.vue'
import UpdateProductModal from '@/components/UpdateProductModal.vue'

const {VITE_API_URL, VITE_API_PATH} = import.meta.env
export default {
  name: 'AdminProductsView',
  components: {
    Pagination,
    UpdateProductModal
    // DeleteProductModal,
  },
  data() {
    return {}
  },
  methods: {
    ...mapActions(adminProductStore, ['clearProduct', 'getProducts', 'selectProduct', 'setIsNew']),
    showUpdateProductModal(product) {
      this.selectProduct({...product})
      this.setIsNew(false)
    },
    async showDeleteProductModal(product) {
      // show sweet alert
      const {isConfirmed} = await this.$swal({
        title: `是否刪除 ${product.title}`,
        icon: 'warning',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: '確認',
        cancelButtonText: '取消',
      })
      if (isConfirmed) {
        const loader = this.$loading.show()
        try {
          const {data} = await this.axios.delete(`${VITE_API_URL}/api/${VITE_API_PATH}/admin/product/${product.id}`)
          if (data.success) {
            loader.hide()
            this.$swal({
              title: '刪除成功',
              icon: 'success',
              showConfirmButton: true,
            })
            await this.getProducts()
          } else {
            loader.hide()
            this.$swal({
              title: '刪除失敗，請重新操作',
              icon: 'error',
              showConfirmButton: true,
            })
          }
        } catch (e) {
          loader.hide()
          this.$swal({
            title: '刪除失敗，請重新操作',
            icon: 'error',
            showConfirmButton: true,
          })
        }
      }
    }
  },
  computed: {
    ...mapState(adminProductStore, ['products', 'pagination', 'selectedProduct', 'isNew'])
  },

  async mounted() {
    const loader = this.$loading.show()
    await this.getProducts()
    loader.hide()
  }
}
</script>

<style scoped></style>
