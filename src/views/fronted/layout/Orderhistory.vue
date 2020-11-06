<template>
  <div class="history">
    <AccountBread :tag="tag" />
    <loading loader="dots" :active.sync="isLoading"></loading>
    <div class="orders">
      <div v-for="order in orderlist" :key="order.id" class="single-history">
        <p>訂單成立時間：{{ order.created.datetime }}</p>
        <p>訂單總金額: NT.{{ order.amount }}</p>
        <p>付款方式：{{ order.payment }}</p>
        <router-link :to="`/ordersuccess/${order.id}`"
          class="ta-r">檢視訂單細節 &raquo;</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import AccountBread from '@/components/fronted/Account_tag.vue';

export default {
  components: {
    AccountBread,
  },
  data() {
    return {
      isLoading: false,
      orderlist: [],
      err_data: '',
      tag: 'orderhistory',
    };
  },
  methods: {
    orders() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/ec/orders`;
      this.axios
        .get(url)
        .then((res) => {
          this.orderlist = res.data.data;
          this.isLoading = false;
        })
        .catch((err) => {
          this.err_data = err.response.data.message;
          this.$bus.$emit('error', this.err_data);
          this.isLoading = false;
        });
    },
  },
  created() {
    this.orders();
  },
};
</script>
