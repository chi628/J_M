<template>
  <div class="container df fxd-c">
    <OrderStep :step="step"/>
    <loading loader="dots" :active.sync="isLoading"></loading>
    <!-- <div class="orders">
      <h3>Shopping Cart</h3>
      <table class="table">
        <thead>
          <tr>
            <th width="50%">商品資訊</th>
            <th>數量</th>
            <th>單價</th>
            <th>小計</th>
            <th>刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart" :key="item.id">
            <td class="">
              <div class="item-img">
                <img :src="item.product.imageUrl[0]" alt />
              </div>
              <div class="item-title">
                <router-link to="/">{{item.product.title}}</router-link>
              </div>
            </td>
            <td>
              <span>數量</span>
              <div class="item-quantity">
                <select v-model="item.quantity" @change="updateCart(item.product.id,item.quantity)">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value=""><input type="number"></option>
                </select>
              </div>
            </td>
            <td>
              <span>單價</span>
              {{item.product.price | money}}
            </td>
            <td>
              <span>小計</span>
              {{item.product.price * item.quantity | money}}
            </td>
            <td>
              <span>刪除</span>
              <button type="button" class="checkorder_table_remove"
                @click="removeCartItem(item.product.id)">
                <i class="far fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="discount">
        <input type="text" name="coupon" v-model="coupon_code" placeholder="Enter discount code" />
        <button type="submit" @click="addCoupon">Apply</button>
      </div>

      <div class="order_total">
        <ul>
          <li>
            <span>Subtotal</span>
            <span>{{subtotal | money}}</span>
          </li>
          <li>
            <span>Shipping</span>
            <span>{{shipping | money}}</span>
          </li>
          <li>
            <span>Discount</span>
            <span v-if="discount>0">-{{discount | money}}</span>
            <span v-else>{{discount | money}}</span>
          </li>
          <li>
            <span>Total</span>
            <span>{{subtotal+shipping-discount | money}}</span>
          </li>
        </ul>
      </div>
      <div class="">
        <router-link to="/" class="back_btn">
          <button type="button">&laquo; Back to Shopping</button>
        </router-link>
        <router-link to="/orderinfo" class="info_btn">
          <button type="button">Order &raquo;</button>
        </router-link>
      </div>
    </div> -->
  </div>
</template>
<script>
import OrderStep from '@/components/fronted/Order_step.vue';

export default {
  components: {
    OrderStep,
  },
  data() {
    return {
      isLoading: false,
      cart: [],
      subtotal: 0,
      shipping: 60,
      discount: 0,
      coupon: {},
      coupon_code: '',
      step: 'one',
    };
  },
  methods: {
    getCart() {
      this.isLoading = true;
      this.axios
        .get(
          `${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/ec/shopping`,
        )
        .then((res) => {
          this.isLoading = false;
          this.cart = res.data.data;
          this.subtotal = 0;
          this.cart.forEach((item) => {
            this.subtotal += item.product.price * item.quantity;
          });
        })
        .catch(() => {
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
      this.axios
        .patch(url, data)
        .then(() => {
          this.getCart();
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    removeCartItem(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/ec/shopping/${id}`;
      this.axios
        .delete(url)
        .then(() => {
          this.isLoading = false;
          this.getCart();
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    addCoupon() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/ec/coupon/search`;
      const couponChecked = {
        code: this.coupon_code,
      };
      this.axios.post(url, couponChecked)
        .then((res) => {
          this.coupon = res.data.data;
          this.discount = Math.floor((this.subtotal * this.coupon.percent) / 100);
          this.$bus.$emit('checkcoupon', this.coupon);
          this.isLoading = false;
        }).catch(() => {
          this.isLoading = false;
        });
    },
  },
  created() {
    this.getCart();
  },
};

</script>
