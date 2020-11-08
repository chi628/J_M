<template>
  <div class="modal del"  :class="{'show':opendelmodal}">
    <div class="modal-header df jc-sb ai-c">
      <h3>刪除{{title}}</h3>
      <button type="button" @click="closeDelModal">
        <span>&times;</span>
      </button>
    </div>
    <div class="modal-body df jc-c ai-c">
      <p> 是否刪除
      <span v-if="title==='產品'">{{ tempItem.title }}</span>
      <span v-else-if="title==='優惠券'">{{ tempItem.code }}</span>
      (刪除後將無法恢復)。</p>
    </div>
    <div class="modal-footer df jc-fe">
      <button
       type="button"
       @click="closeDelModal">Close</button>
       <button
       type="button"
       @click="deleteItem(tempItem.id)">確認刪除</button>
    </div>
  </div>
</template>
<script>
export default {
  props: ['title', 'opendelmodal', 'tempItem'],
  methods: {
    closeDelModal() {
      this.$emit('closedelmodal');
    },
    deleteItem(id) {
      this.$emit('deleteitem', id);
    },
  },
};
</script>
