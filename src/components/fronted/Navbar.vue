<template>
  <header class="header" :class="{ scroll: scroll }">
    <div class="logo df jc-c ai-c">
      <div class="ham" :class="{ show: ham }" @click="ham=!ham">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h1 class="ta-c" @click="ham=false">
        <router-link to="/">J&amp;M </router-link>
      </h1>
      <ul class="mobile-icons-header icons dn" @click="ham=false">
        <li>
          <input type="search" placeholder="Search..." />
          <button>
            <i class="fa fa-search"></i>
          </button>
        </li>
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
                <div class="df fxd-c">
                  <span>Wish list</span>
                  <span>願望清單</span>
                </div>
              </router-link>
            </li>
            <li>
              <router-link to="/orderhistory">
                <i class="fas fa-clipboard-list"></i>
                <div class="df fxd-c">
                  <span>My orders</span>
                  <span>訂單查詢</span>
                </div>
              </router-link>
            </li>
            <li>
              <router-link to="/coupons">
                <i class="fas fa-tags"></i>
                <div class="df fxd-c">
                  <span>My coupons</span>
                  <span>優惠券</span>
                </div>
              </router-link>
            </li>
          </ul>
        </li>
        <li>
          <button type="button" @click="showCart()">
            <i class="fas fa-shopping-cart"></i>
            <span class="cart-amount">{{cartlength}}</span>
          </button>
        </li>
      </ul>
    </div>
    <nav class="nav df jc-fe ai-c">
      <ul class="menu df" :class="{show:ham}">
        <li>
          <router-link to="">
            <span>About J&amp;M</span>
            <span>品牌故事</span>
          </router-link>
        </li>
        <li>
          <router-link to="">
            <span>All Items</span>
            <span>全部商品</span>
          </router-link>
        </li>
        <li>
          <router-link to="">
            <span>Category</span>
            <span>分類商品</span>
            <ul>
              <li>
                <router-link to="">
                  <span>Scented candle</span>
                  <span>香氛蠟燭</span>
                </router-link>
              </li>
              <li>
                <router-link to="">
                  <span>Fragrance cream</span>
                  <span>居家香氛膏</span>
                </router-link>
              </li>
              <li>
                <router-link to="">
                  <span>Aroma spray</span>
                  <span>芳香噴霧</span>
                </router-link>
              </li>
              <li>
                <router-link to="">
                  <span>Essential oil</span>
                  <span>天然精油</span>
                </router-link>
              </li>
            </ul>
          </router-link>
        </li>
        <li>
          <router-link to="">
            <span>reservation</span>
            <span>預約手作</span>
          </router-link>
        </li>
      </ul>
      <ul class="icons pc-icons df">
        <li>
          <input type="search" placeholder="Search..." />
          <button type="button">
            <i class="fa fa-search"></i>
          </button>
        </li>
        <li>
          <button type="button">
            <router-link to="/account">
              <i class="far fa-user"></i>
            </router-link>
          </button>
          <ul>
            <li>
              <router-link to="/wishlist">
                <i class="far fa-heart"></i>
                <div class="df fxd-c">
                  <span>Wish list</span>
                  <span>願望清單</span>
                </div>
              </router-link>
            </li>
            <li>
              <router-link to="/orderhistory">
                <i class="fas fa-clipboard-list"></i>
                <div class="df fxd-c">
                  <span>My orders</span>
                  <span>訂單查詢</span>
                </div>
              </router-link>
            </li>
            <li>
              <router-link to="/coupons">
                <i class="fas fa-tags"></i>
                <div class="df fxd-c">
                  <span>My coupons</span>
                  <span>優惠券</span>
                </div>
              </router-link>
            </li>
          </ul>
        </li>
        <li>
          <button type="button" @click="showCart()">
            <i class="fas fa-shopping-cart"></i>
            <span class="cart-amount">{{cartlength}}</span>
          </button>
        </li>
      </ul>
      <ul class="mobile-icons-footer pc-icons df">
        <li>
          <button type="button">
            <router-link to="/account">
              <i class="far fa-user"></i>
            </router-link>
          </button>
        </li>
        <li>
          <button type="button">
            <router-link to="/wishlist">
              <i class="far fa-heart"></i>
            </router-link>
          </button>
        </li>
        <li>
          <button type="button">
            <router-link to="/orderhistory">
              <i class="fas fa-clipboard-list"></i>
            </router-link>
          </button>
        </li>
        <li>
          <button type="button">
            <router-link to="/coupons">
              <i class="fas fa-tags"></i>
            </router-link>
          </button>
        </li>
        <li>
          <button type="button" @click="showCart()">
            <i class="fas fa-shopping-cart"></i>
            <span class="cart-amount">{{cartlength}}</span>
          </button>
        </li>
      </ul>
    </nav>
    <div class="mask" :class="{show: showcart, menu_show: ham}" @click="closeCart(),ham=false">
    </div>
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
  },
};

</script>
