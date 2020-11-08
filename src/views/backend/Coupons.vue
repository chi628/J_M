<template>
  <div class="backend">
    <Modal :title="title" :isNew="isNew" :tempItem="tempCoupon" :openmodal="showModal"
      @additem="addCoupon" @updateitem="updateCoupon" @closemodal="closeModal"/>
    <DelModal :title="title" :tempCoupon="tempCoupon" :opendelmodal="showDelModal"
      @deleteitem="deleteCoupon" @closedelmodal="closeDelModal" />
    <loading loader="dots" :active.sync="isLoading"></loading>
    <div class="container">
      <div class="df jc-sb ai-c">
        <h3 class="ta-c">Coupons</h3>
      <button class="addbtn" type="button" @click="openModal('new')">新增優惠券</button>
      </div>
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
      <!-- <Pagination
      :page="pagination" @updatepage="getCoupons" /> -->
    </div>
  </div>
</template>
<script>
// import Pagination from '@/components/Pagination.vue';
import Modal from '@/components/backend/Modal.vue';
import DelModal from '@/components/backend/DelModal.vue';

export default {
  components: {
    // Pagination,
    Modal,
    DelModal,
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
        due_date: '',
        due_time: '',
      },
      isNew: false,
      token: '',
      isLoading: false,
      pagination: {},
      showModal: false,
      showDelModal: false,
      title: '優惠券',
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
      this.tempCoupon.deadline_at = `${this.tempCoupon.due_date} ${this.tempCoupon.due_time}`;
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
      this.tempCoupon.deadline_at = `${this.tempCoupon.due_date} ${this.tempCoupon.due_time}`;
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
    deleteCoupon() {
      this.isLoading = true;
      this.axios
        .delete(
          `${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.tempCoupon.id}`,
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
          [this.tempCoupon.due_date, this.tempCoupon.due_time] = dedlineAt; // 日期

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
    closeModal() {
      this.showModal = false;
    },
    closeDelModal() {
      this.showDelModal = false;
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
