<template>
  <div class="sidecart">
    <loading loader="dots" :active.sync="isLoading"></loading>
    <div class="cart_header df jc-sb">
      <h3>Cart<span>({{cartLength}}items)</span></h3>
      <button type="button" class="closebtn">&times;</button>
    </div>
    <div class="cart_body">
      <div class="items" v-for="item in carts" :key="item.id">
        <div class="content df jc-sb">
          <div class="img df jc-c ai-c">
            <router-link to="">
              <img :src="`${item.product.imageUrl[0]}`" alt="">
            </router-link>
          </div>
          <div class="detail df fxd-c ai-c">
            <h2>{{item.product.title}}</h2>
            <p>{{item.product.title}}</p>
            <p class="price">{{item.product.price}}</p>
          </div>
        </div>
        <div class="update df">
          <div class="quantity">
            <button type="button" class="">-</button>
            <input type="number" :value="item.quantity" class="ta-c">
            <button type="button" class="">+</button>
          </div>
          <div class="remove df jc-c">
            <button type="button" class="ta-c">Remove</button>
          </div>
        </div>
      </div>
    </div>
    <div class="cart_footer">
      <div class="total df jc-sb">
        <label>SUBTOTAL</label>
        <span>{{subtotal | money}}</span>
      </div>
      <div class="checkout df jc-c">
        <router-link to='/'>
          <button type="button">Secure Checkout</button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLoading: false,
      cartLength: 0,
      carts: [],
      subtotal: 0,
    };
  },
  methods: {
    getCart() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      this.axios.get(url).then((res) => {
        this.cartLength = res.data.data.length;
        this.carts = res.data.data;
        this.subtotal = 0;
        this.carts.forEach((item) => {
          this.subtotal += (item.product.price) * (item.quantity);
        });
        this.isLoading = false;
      }).catch((err) => {
        this.isLoading = false;
        console.log(err);
      });
    },
  },
  created() {
    this.getCart();
  },
};

</script>
