<template>
    <div>
        <ul class="breadcrumbs df ai-c">
            <li @click="getProducts()">
                <router-link to="/products/all">All Products</router-link>
            </li>
            <li class="nowPos">{{catergroy}}</li>
        </ul>
    </div>
</template>
<script>
export default {
  props: ['catergroy'],
  data() {
    return {

    };
  },
  methods: {
    getProducts() {
      this.$emit('getproducts');
    },
  },
};
</script>
