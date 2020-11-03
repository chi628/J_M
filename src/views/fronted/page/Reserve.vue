<template>
  <div class="reserve_container">
    <ul class="rule">
      <li><h3 class="ta-c">預約須知</h3></li>
      <li>為了維護體驗品質，手作課程僅開放線上預約。造成您的不便，敬請諒解。</li>
      <li>預約成功後，我們將會寄發確認簡訊。若未收到簡訊，請立即與我們聯繫。</li>
      <li>因應新冠病毒，來店時我們將量測體溫。若體溫高於 37.5度，本店保有取消體驗的權利。</li>
    </ul>
    <div class="reserve-form">
      <h3 class="ta-c">預約表單</h3>
      <ValidationObserver v-slot="{ invalid }">
        <form @submit.prevent="" class="df fxd-c">
          <div class="label">
            <ValidationProvider rules="required" v-slot="{ errors}">
              <label for="name">預約人姓名</label>
              <input id="name" type="text" v-model="name" />
              <span class="errmsg">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider rules="required" v-slot="{ errors}">
              <label for="phone">預約人手機</label>
              <input id="phone" type="tel" v-model="tel" />
              <span class="errmsg">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider rules="required" v-slot="{ errors}">
              <label for="date">體驗日期</label>
              <input id="date" type="date" v-model="date" />
              <span class="errmsg">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider rules="required" v-slot="{ errors}">
              <label for="time">體驗場次</label>
              <select name="場次" v-model="time">
                <option value selected disabled>請選擇</option>
                <option value="1">9:00-10:00</option>
                <option value="2">10:00-11:00</option>
                <option value="3">11:00-12:00</option>
                <option value="4">11:00-12:00</option>
                <option value="5">13:00-14:00</option>
                <option value="6">14:00-15:00</option>
                <option value="7">15:00-16:00</option>
                <option value="8">16:00-17:00</option>
                <option value="9">17:00-18:00</option>
                <option value="10">18:00-19:00</option>
              </select>
              <span class="errmsg">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider rules="required" v-slot="{ errors}">
              <label for="member">體驗人數</label>
              <select id="member" name="人數" v-model="member">
                <option value selected disabled>請選擇</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              <span class="errmsg">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <button type="submit" class="reserve-btn" :disabled="invalid">確定預約</button>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: '',
      tel: '',
      date: '',
      time: '',
      member: '',
    };
  },
};

</script>
