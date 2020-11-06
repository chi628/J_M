<template>
  <div class="container">
    <OrderStep :step="step" />
    <loading loader="dots" :active.sync="isLoading"></loading>
    <div class="ordersuccess">
      <div class="df jc-c ai-c">
        <div class="success-icon">
          <span></span>
          <span></span>
          <svg height="36" width="36">
            <circle cx="18" cy="18" r="17" />
          </svg>
        </div>
        <h3>訂單建立成功</h3>
      </div>
      <div class="found-content">
        <div class="found-group">
          <h3>訂單商品</h3>
          <table class="found_table">
            <thead>
              <tr class="ta-c">
                <th>商品資訊</th>
                <th>數量</th>
                <th>金額</th>
              </tr>
            </thead>
            <tbody>
              <tr  v-for="item in order.products" :key="item.id" class="ta-c">
                <td width="50%">
                  <div class="df jc-c ai-c">
                    <img :src="`${item.product.imageUrl[0]}`" alt style="width: 50px" />
                    <h4>{{ item.product.title }}</h4>
                  </div>
                </td>
                <td><span>{{ item.quantity }}</span></td>
                <td><span> NT. {{ item.product.price * item.quantity }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="found-group">
          <h3>訂單金額</h3>
          <ul class="found-total">
            <li>
              <span>商品小計</span>
              <span>{{ subtotal | money }}</span>
            </li>
            <li>
              <span>運費</span>
              <span>{{ shipping | money }}</span>
            </li>
            <li>
              <span>折扣</span>
              <span>{{ discount | money }}</span>
            </li>
            <li>
              <span>總金額</span>
              <span>{{ (subtotal + shipping - discount) | money }}</span>
            </li>
          </ul>
        </div>
        <div class="found-group">
          <h3>訂單資訊</h3>
          <ul class="found-detail">
            <li>
              <span>訂單成立時間</span>
              <span>{{ order.created.datetime }}</span>
            </li>
            <li>
              <span>訂購人姓名</span>
              <span>{{ order.user.name }}</span>
            </li>
            <li>
              <span>訂購人信箱</span>
              <span>{{ order.user.email }}</span>
            </li>
            <li>
              <span>訂購人聯絡電話</span>
              <span>{{ order.user.tel }}</span>
            </li>
            <li>
              <span>收件地址</span>
              <span>{{ order.user.address }}</span>
            </li>
          </ul>
        </div>
         <div class="found-btns df jc-c">
            <button type="button" class="order-history">
                <router-link to="/orderhistory">查看訂購紀錄</router-link>
            </button>
            <button type="button" class="to-home">
                <router-link to="/">回首頁</router-link>
            </button>
        </div>
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
      order: {
        user: {},
        created: {},
      },
      subtotal: 0,
      orderId: '',
      shipping: 60,
      discount: 0,
      isLoading: false,
      step: 'three',
    };
  },
  methods: {
    getOrderDetailed() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/ec/orders/${this.orderId}`;
      this.axios
        .get(url)
        .then((res) => {
          this.order = res.data.data;
          this.subtotal = this.order.amount;
          this.$bus.$emit('createorder');
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrderDetailed();
  },
};

</script>
