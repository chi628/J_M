<template>
  <div class="container df fxd-c">
    <Breadcrumb :catergroy="category" @getproducts="getProducts"/>
    <loading loader="dots" :active.sync="isLoading"></loading>
   <div class=" products df fxw-w">
      <div v-for="item in showProducts" :key="item.id" class="item">
      <div class="item-header">
        <router-link :to="`/product/${item.id}`">
          <img class="df" :src="`${item.imageUrl[0]}`" alt="">
          <button type="button" class="view_btn">Quick View</button>
        </router-link>
      </div>
      <div class="item-body ta-c">
        <router-link :to="`/product/${item.id}`">
          <h4>{{item.title}}</h4>
        </router-link>
        <p>NT.{{item.price}}</p>
      </div>
      <div class="item-footer df jc-c">
        <button type="button" @click="addtocart(item.id,1)">Add to Cart</button>
      </div>
    </div>
   </div>
   <Pagination :page="pagination"/>
  </div>
</template>
<script>
import Breadcrumb from '@/components/fronted/Breadcrumb.vue';
import Pagination from '@/components/fronted/Pagination.vue';

export default {
  components: {
    Breadcrumb,
    Pagination,
  },
  data() {
    return {
      isLoading: false,
      showProducts: [],
      products: [],
      err_data: '',
      category: '',
      pagination: {},
    };
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/ec/products`;
      this.showProducts = [];
      this.category = this.$route.params.category;
      this.axios.get(url)
        .then((res) => {
          this.pagination = res.data.meta.pagination;
          this.products = res.data.data;
          this.products.forEach((item) => {
            if (this.category === item.category) {
              this.showProducts.push(item);
              this.category = item.category;
            } else if (this.category === 'all') {
              this.showProducts = this.products;
            }
          });
          this.isLoading = false;
        }).catch((err) => {
          this.err_data = err.response.data.message;
          this.$bus.$emit('error', this.err_data);
          this.isLoading = false;
        });
    },
    addtocart(id, quantity = 1) {
      this.$bus.$emit('addtocart', id, quantity);
    },
  },
  created() {
    this.getProducts();
    this.$bus.$on('getproducts', () => {
      this.getProducts();
    });
  },
};
</script>
