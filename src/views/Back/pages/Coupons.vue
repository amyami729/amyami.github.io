<template>
  <div>
    <loading :active="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-success" @click="createCoupon">新增優惠券</button>
    </div>
    <div class="table-responsive-xl mt-4">
      <table class="table nowrap">
        <thead>
          <tr>
            <th>名稱</th>
            <th>折扣百分比</th>
            <th>到期日</th>
            <th class="d-sm-table-cell d-none">是否啟用</th>
            <th>編輯/刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in coupons" :key="item.id">
            <td>{{ item.title }}</td>
            <td>{{ item.percent }}</td>
            <td>{{ item.due_date }}</td>
            <td class="d-sm-table-cell d-none">
              <span class="text-success" v-if="item.is_enabled">啟用</span>
              <span class="text-muted" v-else>未啟用</span>
            </td>
            <td>
              <button class="btn btn-outline-success me-2 btn-sm" @click="editCoupon(item)">編輯</button>
              <button class="btn btn-outline-danger me-2 btn-sm" @click="showDeleteCouponModal(item)">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <couponModal ref="couponModal" :currentItem="currentCoupon" @emit-hide="showCouponModal(false)" @emit-getCoupons="getCoupons">
      <template v-slot:title>{{ modalTitle }}</template>
    </couponModal>
    <deleteModal ref="deleteModal" :currentItem="currentCoupon" @emit-hide="showDeleteModal(false)" @deleteItem="deleteCoupon">
      <template v-slot:title>{{ modalTitle }}</template>
    </deleteModal>
    <div class="product-pagination">
      <pagination class="pagination-inner" :paginations="pagination" @emitGetProducts="getCoupons"></pagination>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';
import couponModal from '@/components/Back/CouponModal.vue';
import deleteModal from '@/components/Back/DeleteModal.vue';
import pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      coupons: [],
      pagination: {},
      currentCoupon: {},
      isNew: false,
      modalTitle: '',
      couponModal: '',
      deleteModal: '',
      isLoading: false
    }
  },
  components: {
    couponModal,
    deleteModal,
    pagination
  },
  methods: {
    getCoupons(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.isLoading = false; 
        vm.coupons = response.data.coupons;
        vm.pagination = response.data.pagination;
      });
    },
    showCouponModal(isShow) {
      if (isShow) {
        this.couponModal.show();
      }else {
        this.couponModal.hide();
      }
    },
    showDeleteModal(isShow) {
      if (isShow) {
        this.deleteModal.show();
      }else {
        this.deleteModal.hide();
      }
    },
    createCoupon() {
      const vm = this;
      vm.currentCoupon = {};
      vm.showCouponModal(true);
      vm.modalTitle = '新增優惠卷';
      vm.isNew = true;
    },
    editCoupon(item) {
      const vm = this;
      vm.currentCoupon = Object.assign({}, item);
      vm.showCouponModal(true);
      vm.modalTitle = '編輯優惠卷';
      vm.isNew = false;
    },
    showDeleteCouponModal(item) {
      const vm = this;
      vm.showDeleteModal(true);
      vm.currentCoupon = item;
      vm.modalTitle = '刪除優惠卷';
    },
    deleteCoupon(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${id}`;
      this.$http.delete(api).then((response) => {
        if (response.data.success) {
          vm.showDeleteModal(false);
          vm.getCoupons();
        }
      });
    }
  },
  created() {
    this.getCoupons();
  },
  mounted() {
    this.couponModal = new Modal(this.$refs.couponModal.$el);
    this.deleteModal = new Modal(this.$refs.deleteModal.$el);
  }
}
</script>

<style scoped lang="scss">
.product-pagination{
  display: flex;
  justify-content: center;
  margin-top: -16px;

  .pagination-inner{
    width: 50%;
    height: 93px;
    display: flex;
    justify-content: center;
    padding-top: 30px;
  }
}
</style>