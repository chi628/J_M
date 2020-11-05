<template>
  <header class="header container df jc-c ai-c fxd-c" :class="{scroll:scroll}">
    <div class="logo df ai-c">
      <div class="ham" :class="{show:ham}" @click="ham=!ham">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h1 class="ta-c">
        <router-link to="/">J&amp;M</router-link>
      </h1>
    </div>
    <nav class="nav df jc-fe ai-fs">
      <ul class="mobile-icons df jc-sa">
        <li>
          <button>
            <router-link to="">
              <i class="far fa-user"></i>
            </router-link>
          </button>
        </li>
        <li>
          <button>
            <router-link to="">
              <i class="far fa-heart"></i>
            </router-link>
          </button>
        </li>
        <li>
          <button>
            <router-link to="">
              <i class="fas fa-clipboard-list"></i>
            </router-link>
          </button>
        </li>
        <li>
          <button>
            <router-link to="">
              <i class="fas fa-tags"></i>
            </router-link>
          </button>
        </li>
        <li>
          <button type="button" @click="showCart">
            <i class="fas fa-shopping-cart"></i>
            <span class="cart-amount">{{cartlength}}</span>
          </button>
        </li>
      </ul>
      <ul class="menu df ta-c" :class="{show:ham}">
        <li @click="ham=false">
          <router-link to="/about">
            <span>About J&amp;M</span>
            <span>品牌故事</span>
          </router-link>
        </li>
        <li @click="ham=false">
          <router-link to="/products/all">
            <span>All Items</span>
            <span>全部商品</span>
          </router-link>
        </li>
        <li>
          <router-link to="">
            <span>Category</span>
            <span>分類商品</span>
          </router-link>
          <ul>
            <li @click="ham=false">
              <router-link to="/products/candle">
                <span>Scented candle</span>
                <span>香氛蠟燭</span>
              </router-link>
            </li>
            <li @click="ham=false">
              <router-link to="/products/jar">
                <span>Fragrance cream</span>
                <span>居家香氛膏</span>
              </router-link>
            </li>
            <li @click="ham=false">
              <router-link to="/products/sprayer">
                <span>Aroma spray</span>
                <span>芳香噴霧</span>
              </router-link>
            </li>
            <li @click="ham=false">
              <router-link to="/products/oil">
                <span>Essential oil</span>
                <span>天然精油</span>
              </router-link>
            </li>
          </ul>
        </li>
        <li @click="ham=false">
          <router-link to="/reserve">
            <span>reservation</span>
            <span>預約手作</span>
          </router-link>
        </li>
      </ul>
      <ul class="icons df">
        <li>
          <input type="search" placeholder="Search..." />
          <button type="button">
            <i class="fa fa-search"></i>
          </button></li>
        <li>
          <button>
            <router-link to="/account">
              <i class="far fa-user"></i>
            </router-link>
          </button>
          <ul>
            <li>
              <router-link to="/wishlist">
                <i class="far fa-heart"></i>
                <div class="df fxd-c ta-c">
                  <span>Wish list</span>
                  <span>願望清單</span>
                </div>
              </router-link>
            </li>
            <li>
              <router-link to="/orderhistory">
                <i class="fas fa-clipboard-list"></i>
                <div class="df fxd-c ta-c">
                  <span>My orders</span>
                  <span>訂單查詢</span>
                </div>
              </router-link>
            </li>
            <li>
              <router-link to="/coupons">
                <i class="fas fa-tags"></i>
                <div class="df fxd-c ta-c">
                  <span>My coupons</span>
                  <span>優惠券</span>
                </div>
              </router-link>
            </li>
          </ul>
        </li>
        <li>
          <button type="button" @click="showCart">
            <i class="fas fa-shopping-cart"></i>
            <span class="cart-amount">{{cartlength}}</span>
          </button>
        </li>
      </ul>
    </nav>
    <div class="mask"
         :class="{showCart:showcart,showMenu:ham}"
         @click="closeCart(),ham=false"></div>
  </header>
</template>
<script>
export default {
  data() {
    return {
      scroll: false,
      showcart: false,
      ham: false,
      cartlength: 0,
    };
  },
  methods: {
    getPos() {
      const scrollTop = window.pageYOffset;

      if (scrollTop > 165) {
        this.scroll = true;
      } else if (scrollTop < 10) {
        this.scroll = false;
      }
    },
    showCart() {
      this.showcart = true;
      this.$bus.$emit('showcart');
    },
    closeCart() {
      console.log('click');
      this.showcart = false;
      this.$bus.$emit('closecart');
    },
  },
  mounted() {
    window.addEventListener('scroll', this.getPos, true);
  },
  created() {
    this.$bus.$on('cartlength', (cartlength) => {
      this.cartlength = cartlength;
    });
    this.$bus.$on('mobileclose', () => {
      this.showcart = false;
    });
    this.$bus.$on('showcart', () => {
      this.showcart = true;
    });
    this.$bus.$on('closecart', () => {
      this.showcart = false;
    });
  },
  beforeDestroy() {
    this.$bus.$off('cartlength');
    this.$bus.$off('mobileclose');
    this.$bus.$off('showcart');
    this.$bus.$off('closecart');
  },
};
</script>
