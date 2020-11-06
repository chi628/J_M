<template>
  <div class="container">
    <OrderStep :step="step" />
    <loading loader="dots" :active.sync="isLoading"></loading>
    <div class="orderinfo df">
      <div class="cartinfo">
        <table>
          <thead>
            <tr>
              <th>商品資訊</th>
              <th>數量</th>
              <th>單價</th>
              <th>小計</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart" :key="item.id">
              <td class="cartinfo_item df jc-c ai-c">
                <div class="itemimg">
                  <img :src="item.product.imageUrl[0]" alt />
                </div>
                <p class="itemtitle">
                  {{item.product.title}}
                </p>
              </td>
              <td>
                <span>{{item.quantity}}</span>
              </td>
              <td>
                <span>NT.{{item.product.price | money}}</span>
              </td>
              <td>
                <span>NT.{{item.product.price * item.quantity | money}}</span>
              </td>
            </tr>
          </tbody>
        </table>
          <ul class="cartinfo_total df fxd-c ai-fe">
            <li>
              <span>Subtotal</span>
              <span>{{subtotal | money}}</span>
            </li>
            <li>
              <span>Shipping</span>
              <span>60</span>
            </li>
            <li>
              <span>Discount</span>
            <span v-if="discount>0">-{{discount | money}}</span>
            <span v-else>{{discount | money}}</span>
            </li>
            <li>
              <span>Total</span>
              <span>100</span>
            </li>
          </ul>
      </div>
      <div class="info_form df jc-c">
        <validation-observer v-slot="{ invalid }">
          <form @submit.prevent="createOrder">
            <div class="form-group">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <label for="name" class="checkinfo_form_title">姓名</label>
                <input id="name" v-model="form.name" type="text" class="checkinfo_form_ans" />
                <span class="errormsg">{{errors[0]}}</span>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <label for="tel" class="checkinfo_form_title">手機</label>
                <input id="tel" v-model="form.tel" type="tel" class="checkinfo_form_ans" />
                <span class="errormsg">{{errors[0]}}</span>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <label for="address" class="checkinfo_form_title">地址</label>
                <input id="address" v-model="form.address" type="text" class="checkinfo_form_ans" />
                <span class="errormsg">{{errors[0]}}</span>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <label for="email" class="checkinfo_form_title">E-mail</label>
                <input id="email" v-model="form.email" type="email" class="checkinfo_form_ans" />
                <span class="errormsg">{{errors[0]}}</span>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <label for="ship" class="checkinfo_form_title">運送方式</label>
                <select id="ship" v-model="ship" class="checkinfo_form_ans">
                  <option value="Delivery" selected>宅配</option>
                  <option value="711">7-11 超商取貨</option>
                  <option value="familymart">全家 超商取貨</option>
                  <option value="Okmart">OK 超商取貨</option>
                  <option value="Hilife">萊爾富 超商取貨</option>
                </select>
                <span class="errormsg">{{errors[0]}}</span>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <label for="payment" class="checkinfo_form_title">付款方式</label>
                <select id="payment" v-model="form.payment" class="checkinfo_form_ans">
                  <option value="WebATM" selected>WebATM</option>
                  <option value="ATM">ATM</option>
                  <option value="CVS">CVS</option>
                  <option value="Barcode">Barcode</option>
                  <option value="Credit">Credit</option>
                  <option value="GooglePay">GooglePay</option>
                  <option value="ApplePay">ApplePay</option>
                </select>
                <span class="errormsg">{{errors[0]}}</span>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <label for="invoice" class="checkinfo_form_title">發票</label>
                <select id="invoice" v-model="invoice" class="checkinfo_form_ans">
                  <option selected value="electronic-invoice">電子發票</option>
                  <option value="mobile-vehicle">手機載具</option>
                  <option value="donation-invoice">捐贈發票</option>
                  <option value="unified-invoice">統編發票</option>
                </select>
                <span class="errormsg">{{errors[0]}}</span>
              </ValidationProvider>
            </div>
          <div class="info_btns df jc-sb">
            <button type="button" class="infoback_btn">
              <router-link to="/checkout">
                &laquo; back to cart
              </router-link>
            </button>
            <button type="submit" class="found_btn" :disabled="invalid">Order &raquo;</button>
          </div>
          </form>
        </validation-observer>
      </div>
    </div>
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
      step: 'two',
      form: {
        name: '',
        tel: '',
        address: '',
        email: '',
        payment: 'WebATM',
      },
      ship: 'Delivery',
      invoice: 'electronic-invoice',
      cart: [],
      subtotal: 0,
      discount: 0,
      err_data: '',
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
        .catch((err) => {
          this.err_data = err.response.data.message;
          this.$bus.$emit('error', this.err_data);
          this.isLoading = false;
        });
    },
    createOrder() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/ec/orders`;
      const order = { ...this.form };
      this.$bus.$on('checkcoupon', () => {
        if (this.coupon.enabled) {
          order.coupon = this.coupon.code;
        }
      });
      this.axios.post(url, order)
        .then((res) => {
          if (res.data.data.id) {
            this.$router.push(`/orderfound/${res.data.data.id}`);
          }
          this.isLoading = false;
        }).catch((err) => {
          this.err_data = err.response.data.message;
          this.$bus.$emit('error', this.err_data);
          this.isLoading = false;
        });
    },
  },
  created() {
    this.getCart();
  },
};

</script>
