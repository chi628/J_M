<template>
  <div class="backend">
    <loading loader="dots" :active.sync="isLoading"></loading>
    <div class="container">
      <h3 class="ta-c">Coupons</h3>
      <button class="addbtn" type="button" @click="openModal('new')">新增優惠券</button>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Code</th>
            <th>Percent</th>
            <th>Ｅxpiry_Ｄate</th>
            <th>enabled</th>
            <th>Edit / Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in coupons" :key="item.id">
            <td>{{ item.title }}</td>
            <td>{{ item.code }}</td>
            <td>{{ item.percent }}</td>
            <td>{{ item.deadline.datetime }}</td>
            <td>
              <label class="container">
              <input
               type="checkbox"
               v-model="item.enabled"
               @click="openModal('enabled', item), updateCoupon()">
              <span class="checkmark"></span>
              <p v-if="item.enabled">已開放</p>
              <p v-else>未開放</p>
            </label>
            </td>
            <td>
              <button
               type="button"
               class="editbtn"
               @click="openModal('edit', item)">
               Edit
              </button>
              <button
               type="button"
               class="delbtn"
               @click="openModal('delete', item)">
               Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination
      :page="pagination" @updatepage="getCoupons" />
    </div>
    <!-- 新增/編輯 Modal -->
    <div class="couponmodal" :class="{'show':showModal}">
      <div class="couponmodal-header">
        <h1>
          <span v-if="isNew">新增優惠券</span>
          <span v-else>編輯優惠券</span>
        </h1>
        <div class="couponmodal-header-close">
          <button type="button" @click="showModal=false">
            <span>&times;</span>
           </button>
        </div>
      </div>
      <div class="couponmodal-body">
        <div>
          <label for="title">優惠券名稱</label>
          <input id="title" v-model="tempCoupon.title" type="text" placeholder="請輸入優惠券名稱" />
        </div>
        <div>
          <label for="coupon_code">優惠碼</label>
          <input id="coupon_code" v-model="tempCoupon.code" type="text" placeholder="請輸入優惠碼" />
        </div>
        <div>
          <label for="due_date">到期日</label>
          <input id="due_date" v-model="due_date" type="date" />
        </div>
        <div>
          <label for="due_time">到期時間</label>
          <input id="due_time" v-model="due_time" type="time" step="1" />
        </div>
        <div>
          <label for="price">折扣百分比</label>
          <input id="price" v-model="tempCoupon.percent" type="number" placeholder="請輸入折扣數" />
        </div>
        <div class="checkbox">
          <label for="enabled">是否啟用</label>
          <input type="checkbox" id="enabled" v-model="tempCoupon.enabled">
        </div>
      </div>
      <div class="couponmodal-footer">
        <button type="button" class="couponmodal-footer-close" @click="showModal=false">關閉</button>
        <button
         type="button"
         class="couponmodal-footer-sure"
         v-if="isNew"
         @click="addCoupon">
         確認新增
        </button>
        <button
         type="button"
         class="couponmodal-footer-sure"
         v-else
         @click="updateCoupon(tempCoupon.id)">
         確認修改
        </button>
      </div>
    </div>
    <!-- Modal End -->

    <!-- 刪除 Modal -->
    <div class="delmodal" :class="{'show':showDelModal}">
      <div class="delmodal-header">
        <h1>刪除優惠券</h1>
        <div  class="delmodal-header-close">
          <button type="button" @click="showDelModal=false">
          <span>&times;</span>
        </button>
        </div>
      </div>
      <div class="delmodal-body">
        <p>
          是否刪除
          <strong>{{ tempCoupon.title }}</strong>優惠券(刪除後將無法恢復)。
        </p>
      </div>
      <div class="delmodal-footer">
        <button
         type="button"
         class="delmodal-footer-close"
         @click="showDelModal=false">Close</button>
        <button
         type="button"
         class="delmodal-footer-sure"
         @click="deleteProduct(tempCoupon.id)">確認刪除</button>
      </div>
    </div>
    <!-- Modal End -->
  </div>
</template>
<script>
// import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    // Pagination,
  },
  data() {
    return {
      coupons: [],
      tempCoupon: {
        title: '',
        code: '',
        percent: 100,
        enabled: false,
        deadline_at: '2020-12-31 23:59:59',
      },
      due_date: '',
      due_time: '',
      isNew: false,
      token: '',
      isLoading: false,
      pagination: {},
      showModal: false,
      showDelModal: false,
    };
  },
  methods: {
    getCoupons(num = 1) {
      this.isLoading = true;
      this.axios
        .get(
          `${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/admin/ec/coupons?page=${num}`,
        )
        .then((res) => {
          this.coupons = res.data.data;
          this.pagination = res.data.meta.pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          console.log('err', err.response.data.message);
        });
    },
    getCoupon(id) {
      this.isLoading = true;
      this.axios
        .get(
          `${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${id}`,
        )
        .then((res) => {
          this.tempCoupon.deadline_at = `${this.due_date} ${this.due_time}`;
          this.tempCoupon = res.data.data;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err.response.data.message);
        });
    },
    addCoupon() {
      this.isLoading = true;
      this.tempCoupon.deadline_at = `${this.due_date} ${this.due_time}`;
      this.axios
        .post(
          `${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon`,
          this.tempCoupon,
        )
        .then((res) => {
          this.isLoading = false;
          this.tempCoupon = res.data.data;
          this.getCoupons();
          this.showModal = false;
          this.tempCoupon = {
            title: '',
            code: '',
            percent: 100,
            enabled: false,
            deadline_at: '2020-10-18 23:59:59',
          };
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err.response.data.message);
        });
    },
    updateCoupon(id) {
      this.isLoading = true;
      this.tempCoupon.deadline_at = `${this.due_date} ${this.due_time}`;
      this.axios
        .patch(
          `${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${id}`,
          this.tempCoupon,
        )
        .then(() => {
          this.isLoading = false;
          this.getCoupons();
          this.showModal = false;
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err.response.data.message);
        });
    },
    deleteProduct(id) {
      this.isLoading = true;
      this.axios
        .delete(
          `${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${id}`,
        )
        .then((res) => {
          console.log(res);
          this.isLoading = false;
          this.getCoupons();
          this.showDelModal = false;
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err.response.data.message);
        });
    },
    openModal(isNew, item) {
      switch (isNew) {
        case 'new':
          this.isNew = true;
          this.showModal = true;
          this.tempCoupon = {};
          break;
        case 'edit': {
          this.isNew = false;
          this.tempCoupon = { ...item };
          const dedlineAt = this.tempCoupon.deadline.datetime.split(' ');
          [this.due_date, this.due_time] = dedlineAt; // 日期

          this.showModal = true;
          break;
        }
        case 'enabled':
          this.isNew = false;
          this.tempCoupon = { ...item };
          this.tempCoupon.enabled = !this.tempCoupon.enabled;
          break;
        case 'delete':
          this.tempCoupon = { ...item };
          this.showDelModal = true;
          break;
        default:
          break;
      }
    },
  },
  created() {
    this.token = document.cookie.replace(
      /(?:(?:^|.*;\s*)MikoToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    this.axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
    this.getCoupons();
  },
};
</script>
