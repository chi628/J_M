<template>
  <div class="sidecart" :class="{close:closeCart}">
    <loading loader="dots" :active.sync="isLoading"></loading>
    <div class="cart_header df jc-sb">
      <h3>Cart<span>({{cartLength}}items)</span></h3>
      <button type="button" class="closebtn"
        @click="closeCart=true">&times;</button>
    </div>
    <div class="cart_body">
      <div class="items" v-for="item in carts" :key="item.id">
        <div class="content df jc-sb">
          <div class="img df jc-c ai-c">
            <router-link to="/">
              <img :src="`${item.product.imageUrl[0]}`" alt="">
            </router-link>
          </div>
          <div class="detail df fxd-c ai-c">
            <router-link to="/">
            <h2>{{item.product.title}}</h2></router-link>
            <p>{{item.product.title}}</p>
            <p class="price">{{item.product.price}}</p>
          </div>
        </div>
        <div class="update df">
          <div class="quantity">
            <button
              type="button"
              :disabled="item.quantity === 1"
              @click="updateCart(item.product.id, item.quantity-1)">-</button>
            <input type="number" :value="item.quantity" class="ta-c">
            <button
             type="button"
             @click="updateCart(item.product.id, item.quantity+1)">+</button>
          </div>
          <div class="remove df jc-c">
            <button type="button" class="ta-c" @click="removeItem(item.product.id)">Remove</button>
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
      closeCart: false,
      cartLength: 0,
      carts: [],
      subtotal: 0,
      err_data: '',
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
        this.err_data = err.response.data.message;
        this.$bus.$emit('error', this.err_data);
        this.isLoading = false;
      });
    },
    updateCart(id, num) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      const data = {
        product: id,
        quantity: num,
      };
      this.axios.patch(url, data).then(() => {
        this.getCart();
        this.isLoading = false;
      }).catch((err) => {
        this.err_data = err.response.data.message;
        this.$bus.$emit('error', this.err_data);
        this.isLoading = false;
      });
    },
    removeItem(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/ec/shopping/${id}`;
      this.axios.delete(url).then(() => {
        this.getCart();
        this.isLoading = false;
      }).catch((err) => {
        this.err_data = err.response.data.message; this.$bus.$emit('error', this.err_data);
        this.isLoading = false;
      });
    },
  },
  created() {
    this.getCart();
  },
};

</script>
