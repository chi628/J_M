<template>
  <div class="single df fxd-c">
    <loading loader="dots" :active.sync="isLoading"></loading>
    <div class="product df jc-sb">
      <div class="product_img df jc-c ai-c">
        <img :src="`${product.imageUrl[0]}`" alt="">
      </div>
      <div class="product_detail">
        <div class="">
          <div>
            <h2>{{product.title}}</h2>
            <h4>NT.{{product.price}}</h4>
            <div class="size">
              <label for="">容量:</label>
              <button type="button"
               :class="{click:sm_size}" @click="sm_size=!sm_size,bg_size=false">30 ml</button>
              <button type="button"
               :class="{click:bg_size}" @click="bg_size=!bg_size,sm_size=false">50 ml</button>
            </div>
            <div class="quantity">
              <button type="button" :disabled="quantity===1" @click="quantity=quantity-1">-</button>
              <input type="text" :value="quantity">
              <button type="button" @click="quantity = quantity + 1">+</button>
            </div>
            <div class="product_btns df fxd-c ta-c">
              <span class="errormsg ta-l"
               v-if="sm_size===false&&bg_size===false">您尚未勾選容量</span>
              <button type="button" class="addcart"
               :disabled="sm_size===false&&bg_size===false"
               @click="addToCart(product.id,quantity)">
               Add To Cart</button>
              <button type="button" @click="addToWish(product)">
                <i class="far fa-heart"></i>
                <span>Wish List</span></button>
              <button type="button" class="remove_wish" :class="{show:remove_wish}"
                @click="removeWish(product)">
                <i class="fas fa-heart"></i>
                <span>Remove Wish List</span>
              </button>
            </div>
          </div>

        </div>
        <div class="describe">
          <ul class="df jc-sa ta-c" @click="clickLI">
            <li class="df fxd-c" :class="{border:decribe_box}">
              <span class="describe_tag">商品描述</span>
              <span class="describe_tag">DESCRIPTION</span>

            </li>
            <li class="df fxd-c" :class="{border:notice_box}">
              <span class="notice_tag">注意事項</span>
              <span class="notice_tag">Notice</span>
            </li>
          </ul>
          <div class="describe_content">
            <p v-if="decribe_box">{{ product.content }}</p>
            <p v-if="notice_box">{{ product.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="related container df fxd-c ai-fs">
      <h3 class="ta-c">More Look</h3>
      <div class="related_items df jc-sb ai-c fxw-w">
        <div v-for="item in relatedProducts" :key="item.id"
          class="related_item"
          @click="getSingleProduct(),getProducts()">
          <div class="item-header">
            <router-link :to="`/product/${item.id}`">
              <img class="df" :src="`${item.imageUrl[0]}`" alt="">
              <button type="button" class="view_btn">Quick View</button>
            </router-link>
          </div>
           <div class="item-body ta-c">
            <router-link :to="`/product/${item.id}`">
              <h4>{{item.title}}</h4>
            </router-link>
            <p>NT.{{item.price}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLoading: false,
      remove_wish: false,
      notice_box: false,
      decribe_box: true,
      sm_size: true,
      bg_size: false,
      quantity: 1,
      products: [],
      product: {
        imageUrl: [],
      },
      relatedProducts: [],
      idArray: [],
      wishlist: JSON.parse(localStorage.getItem('wishList')) || [],
      err_data: '',
    };
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/ec/products`;
      this.axios.get(url)
        .then((res) => {
          this.relatedProducts = [];
          this.products = res.data.data;
          this.products.forEach((item) => {
            if (item.category === this.product.category && item.id !== this.product.id) {
              this.relatedProducts.push(item);
            }
          });
        }).catch((err) => {
          this.err_data = err.response.data.message;
          this.$bus.$emit('error', this.err_data);
          this.isLoading = false;
        });
    },
    getSingleProduct() {
      this.isLoading = true;
      const {
        id,
      } = this.$route.params;
      const url = `${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/ec/product/${id}`;
      this.axios.get(url)
        .then((res) => {
          this.isLoading = false;
          this.product = res.data.data;
          this.wishlist.forEach((wishitem) => {
            if (wishitem.id === this.product.id) {
              this.remove_wish = true;
            }
            this.idArray.push(wishitem.id);
          });
        }).catch((err) => {
          this.err_data = err.response.data.message;
          this.$bus.$emit('error', this.err_data);
          this.isLoading = false;
        });
    },
    addToCart(id, quantity) {
      this.$bus.$emit('addtocart', id, quantity);
    },
    addToWish(item) {
      this.remove_wish = true;
      this.wishlist.push(item);
      localStorage.setItem('wishList', JSON.stringify(this.wishlist));
    },
    removeWish(item) {
      const index = this.idArray.indexOf(item.id);
      this.wishlist.splice(index, 1);
      this.remove_wish = false;
      localStorage.setItem('wishList', JSON.stringify(this.wishlist));
    },
    clickLI(e) {
      console.log(e.target);
      if (e.target.className === 'describe_tag') {
        this.decribe_box = true;
        this.notice_box = false;
      } else if (e.target.className === 'notice_tag') {
        this.notice_box = true;
        this.decribe_box = false;
      }
    },
  },
  created() {
    this.getProducts();
    this.getSingleProduct();
  },
};

</script>
