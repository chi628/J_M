<template>
    <div class="product df jc-sb">
      <div class="product_img df jc-c ai-fs">
        <img :src="`${product.imageUrl[0]}`" alt="">
      </div>
      <div class="product_detail">
        <div class="">
          <div>
            <h4>{{product.title}}</h4>
            <p>NT.{{product.price}}</p>
            <p>容量:
                <button type="button">30 ml</button>
                <button type="button">50 ml</button></p>
            <div class="quantity">
              <button type="button">-</button>
              <input type="text" :value="quantity">
              <button type="button">+</button>
            </div>
            <div class="addbtn df fxd-c">
              <button type="button">Add To Cart</button>
              <button type="button">Wish List</button>
              <button type="button">Remove Wish List</button>
            </div>
          </div>

        </div>
        <div class="describe">
          <ul class="df jc-c ta-c" @click="clickLI">
            <li class="df fxd-c" :class="{border:decribe_box}">
              <span class="describe_tag">商品描述</span>
              <span class="describe_tag">DESCRIPTION</span>

            </li>
            <li class="df fxd-c" :class="{border:notice_box}">
              <span class="notice_tag">注意事項</span>
              <span class="notice_tag">Notice</span>
            </li>
          </ul>
          <p v-if="decribe_box">{{ product.content }}</p>
          <p v-if="notice_box">{{ product.description }}</p>
        </div>
      </div>
    <div class="related"></div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      isLoading: false,
      notice_box: false,
      decribe_box: true,
      quantity: 1,
      products: [],
      product: {
        imageUrl: [],
      },
      relatedProducts: [],
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
          //   this.products.forEach((item) => {
          //     if (item.category === this.product.category && item.id !== this.product.id) {
          //       this.relatedProducts.push(item);
          //       console.log(item);
          //     }
          //   });
          //   console.log('相關', this.relatedProducts);
          //   console.log(this.products);
        }).catch((err) => {
          this.err_data = err.response.data.message;
          this.$bus.$emit('error', this.err_data);
          this.isLoading = false;
        });
    },
    getSingleProduct() {
      this.isLoading = true;
      const {
        id,
      } = this.$route.params;
      const url = `${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/ec/product/${id}`;
      this.axios.get(url)
        .then((res) => {
          this.product = res.data.data;
          //   console.log('single', this.product);
        }).catch((err) => {
          this.err_data = err.response.data.message;
          this.$bus.$emit('error', this.err_data);
          this.isLoading = false;
        });
    },
    getRelated() {
      this.axios.all([this.getProducts(), this.getSingleProduct()])
        .then((res) => {
          console.log('promiseall', res);
        });
    },
    clickLI(e) {
      console.log(e.target);
      if (e.target.className === 'describe_tag') {
        this.decribe_box = true;
        this.notice_box = false;
      } else if (e.target.className === 'notice_tag') {
        this.notice_box = true;
        this.decribe_box = false;
      }
    },
  },
  created() {
    this.getProducts();
    this.getSingleProduct();
  },
};

</script>
