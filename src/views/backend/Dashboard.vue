<template>
  <div>
    <loading loader="dots" :active.sync="isLoading"></loading>
    <div class="navbar df jc-sa ai-c">
      <h2>後台管理</h2>
      <router-link to="/admin/products">商品列表</router-link>|
      <router-link to="/admin/coupons">優惠券列表</router-link>|
      <router-link to="/admin/storage">圖片列表</router-link>|
      <router-link to="/admin/orders">訂單列表</router-link>|
      <router-link to="/">回到前台</router-link>
    </div>
    <router-view v-if="checkedSuccess" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      token: '',
      err_data: '',
      checkedSuccess: false,
      isLoading: false,
    };
  },
  methods: {
    checkedToken() {
      this.isLoading = true;
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)MikoToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1');
      this.axios.post(`${process.env.VUE_APP_ApiPath}/api/auth/check`, {
        api_token: this.token,
      }).then(() => {
        this.axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
        this.checkedSuccess = true;
        this.isLoading = false;
      }).catch((err) => {
        this.err_data = err.response.data.message;
        this.$bus.$emit('error', this.err_data);
        this.isLoading = false;
        this.$router.push('/');
      });
    },
  },
  created() {
    this.checkedToken();
  },
};

</script>
