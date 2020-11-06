<template>
  <div class="">
    <ul class="df jc-sa">
      <li class="steps df fxd-c jc-c ai-c" :class="{tag:one}">
        <div class="step df jc-c ai-c">
          <svg height="42" width="42">
            <circle cx="21" cy="21" r="20" />
          </svg>
          <span>1</span>
        </div>
        <p>訂單確認</p>
      </li>
      <li class="steps df fxd-c jc-c ai-c" :class="{tag:two}">
        <div class="step df jc-c ai-c">
          <svg height="42" width="42">
            <circle cx="21" cy="21" r="20" />
          </svg>
          <span>2</span>
        </div>
        <p>收件資訊</p>
      </li>
      <li class="steps df fxd-c jc-c ai-c" :class="{tag:three}">
        <div class="step df jc-c ai-c">
          <svg height="42" width="42">
            <circle cx="21" cy="21" r="20" />
          </svg>
          <span>3</span>
        </div>
        <p>訂單成立</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['step'],
  data() {
    return {
      one: false,
      two: false,
      three: false,
    };
  },
  created() {
    if (this.step === 'one') {
      this.one = true;
      this.two = false;
      this.three = false;
    } else if (this.tag === 'two') {
      this.one = false;
      this.two = true;
      this.three = false;
    } else if (this.tag === 'three') {
      this.one = false;
      this.two = false;
      this.three = true;
    }
  },
};

</script>
