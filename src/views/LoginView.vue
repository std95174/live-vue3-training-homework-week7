<template>
  <div class="container d-flex align-items-center justify-content-center vh-100">
    <div class="card w-25">
      <div class="card-header">登入</div>
      <div class="card-body">
        <v-form ref="form" v-slot="{errors}" @submit="login">
          <div class="form-group mb-3">
            <label for="帳號" class="form-label">帳號</label>
            <v-field id="user-name"
                     name="帳號"
                     type="email"
                     class="form-control"
                     :class="{'is-invalid': errors['帳號']}"
                     placeholder="請輸入帳號"
                     rules="required|email"
                     v-model="user.username"></v-field>
            <error-message name="帳號" class="invalid-feedback"></error-message>
          </div>
          <div class="form-group mb-3">
            <label for="password">密碼</label>
            <v-field id="password" name="密碼" type="password" class="form-control"
                     :class="{'is-invalid': errors['密碼']}"
                     placeholder="請輸入密碼" rules="required" v-model="user.password"></v-field>
            <error-message name="密碼" class="invalid-feedback"></error-message>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary">
              登入
            </button>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
    }
  },
  methods: {
    async login() {
      let loader = this.$loading.show()
      try {
        const {data} = await this.axios.post(
            `${import.meta.env.VITE_API_URL}/admin/signin`,
            this.user
        )
        loader.hide()
        // store to cookie
        if (data.success) {
          const {token, expired} = data
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}; path=/`
          await this.$swal({
            title: '登入成功',
            icon: 'success',
            showConfirmButton: true
          })
          // redirect to admin page
          await this.$router.push({name: 'products'})
        } else {
          this.$swal({
            title: '登入失敗',
            icon: 'error',
            timer: 1500,
            showConfirmButton: true
          })
        }
      } catch (e) {
        loader.hide()
        if (e) {
          this.$swal({
            title: '登入失敗',
            icon: 'error',
            timer: 1500,
            showConfirmButton: true
          })
        }
      }
    }
  }
}
</script>

