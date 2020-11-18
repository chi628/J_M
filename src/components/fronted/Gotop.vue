<template>
  <div class="gotop" :class="{'show':gotop}" @click="goTop">
    <svg height="42" width="42">
      <circle cx="21" cy="21" r="20" />
    </svg>
    <i class="fas fa-chevron-up"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gotop: false,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.getPos, true);
  },
  methods: {
    getPos() {
      const scrollTop = window.pageYOffset;

      if (scrollTop > 450) {
        this.gotop = true;
      } else {
        this.gotop = false;
      }
    },
    goTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
  },
};
</script>
