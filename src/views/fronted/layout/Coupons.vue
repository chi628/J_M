<template>
  <div class="coupons">
    <AccountBread :tag="tag"/>
    <div class="coupons-coupon">
      <div class="coupons-coupon-left">
          <p>12%</p>
      </div>
      <div class="coupons-coupon-right">
        <p>
          歡慶情人節，結帳輸入折扣碼「<span>iloveu</span>」，不限金額立即 88 折。
        </p>
        <p class="date">有效期限:2020.08 ~ 2020.11</p>
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
      tag: 'coupons',
    };
  },
};
</script>
