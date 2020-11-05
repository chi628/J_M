<template>
  <div class="container pagination">
    <a href="#">&laquo;</a>
    <a href="#" v-for="page in page.total_pages" :key="page"
    @click.prevent="updatePage(page)">{{page}}</a>
    <a href="#">&raquo;</a>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ['page'],
  methods: {
    updatePage(num) {
      this.$emit('updatepage', num);
    },
  },
};
</script>
