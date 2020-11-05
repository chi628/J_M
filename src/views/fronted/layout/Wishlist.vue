<template>
  <div class="products">
    <div v-for="item in wishlist" :key="item.id" class="item">
      <div class="item-header">
        <router-link :to="`/product/${item.id}`">
          <img class="df" :src="`${item.imageUrl[0]}`" alt="">
          <button type="button" class="view_btn">Quick View</button>
        </router-link>
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
