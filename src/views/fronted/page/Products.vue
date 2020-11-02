<template>
  <div class="container products df fxw-w">
    <div v-for="item in products" :key="item.id" class="item">
      <div class="item-header">
        <router-link to="">
          <img class="df" :src="`${item.imageUrl[0]}`" alt="">
          <button type="button" class="view_btn">Quick View</button>
        </router-link>
      </div>
      <div class="item-body ta-c">
        <router-link to="">
          <h2>{{item.title}}</h2>
        </router-link>
        <p>NT.{{item.price}}</p>
      </div>
      <div class="item-footer df jc-c">
        <button type="button">Add to Cart</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLoading: false,
      products: [],
      err_data: '',
    };
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/ec/products`;
      this.axios.get(url)
        .then((res) => {
          this.products = res.data.data;
        }).catch((err) => {
          this.err_data = err.response.data.message;
          this.$bus.$emit('error', this.err_data);
          this.isLoading = false;
        });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
