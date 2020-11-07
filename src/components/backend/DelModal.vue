<template>
  <div class="modal del"  :class="{'show':opendelmodal}">
    <div class="modal-header df jc-sb ai-c">
      <h3>刪除產品</h3>
      <button type="button" @click="closeDelModal">
        <span>&times;</span>
      </button>
    </div>
    <div class="modal-body df jc-c ai-c">
      <p> 是否刪除
      <span>{{ tempProduct.title }}</span> (刪除後將無法恢復)。</p>
    </div>
    <div class="modal-footer df jc-fe">
      <button
       type="button"
       @click="closeDelModal">Close</button>
      <button
       type="button"
       @click="deleteProduct(tempProduct.id)">確認刪除</button>
    </div>
  </div>
</template>
<script>
export default {
  props: ['opendelmodal', 'tempProduct'],
  methods: {
    closeDelModal() {
      this.$emit('closedelmodal');
    },
    deleteProduct(id) {
      this.$emit('deleteproduct', id);
    },
  },
};
</script>
