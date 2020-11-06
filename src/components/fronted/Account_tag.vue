<template>
  <div class="account_bread">
    <ul class="df jc-sa ai-c">
      <li>
        <router-link to="/wishlist" class="df fxd-c jc-sa ai-c" :class="{'tag':wish_list}">
          <i class="far fa-heart"></i>
          <span>Wish List</span>
        </router-link>
      </li>
      <li>
        <router-link to="/orderhistory" class="df fxd-c jc-sa ai-c" :class="{'tag':history}">
          <i class="fas fa-clipboard-list"></i>
          <span>Order History</span>
        </router-link>
      </li>
      <li>
        <router-link to="/coupons" class="df fxd-c jc-sa ai-c"  :class="{'tag':coupons}">
          <i class="fas fa-tags"></i>
          <span>My Coupons</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['tag'],
  data() {
    return {
      wish_list: false,
      history: false,
      coupons: false,
    };
  },
  created() {
    if (this.tag === 'wishlist') {
      this.wish_list = true;
      this.history = false;
      this.coupons = false;
    } else if (this.tag === 'orderhistory') {
      this.wish_list = false;
      this.history = true;
      this.coupons = false;
    } else if (this.tag === 'coupons') {
      this.wish_list = false;
      this.history = false;
      this.coupons = true;
    }
  },
};
</script>
