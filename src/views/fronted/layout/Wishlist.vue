<template>
  <div class="container df fxd-c">
    <h3 class="wishTitle">Wish List</h3>
    <div class="wishlist df jc-c ai-c fxw-w">
      <div v-for="item in wishlist" :key="item.id" class="item">
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
</template>

<script>
export default {
  data() {
    return {
      wishlist: JSON.parse(localStorage.getItem('wishList')) || [],
    };
  },
  created() {
    console.log(this.wishlist);
  },
};

</script>
