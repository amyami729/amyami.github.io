<template>
  <div class="shoppingCart">
    <div class="shopCartTop">
      <p class="cartTitle">購物車清單</p>
    </div>
    <div class="shopCartContent" v-if="cartProducts.length !== 0">
      <div class="shopCartNav">
        <div class="listTitleLeft">
          <div class="checkboxTitle">
            <input class="check" type="checkbox" @click="clickCheckAll" v-model="checkAll" />
          </div>
          <div class="productMessageTitle">
            <p class="goods">商品</p>
            <p class="unitPrice">單價</p>
          </div>
        </div>
        <div class="listTitleRight">
          <div class="otherTitleLeft">
            <p class="quantity">數量</p>
          </div>
          <div class="otherTitleRight">
            <p class="totalPriceTitle">總價</p>
            <p class="operate">操作</p>
          </div>
        </div>
      </div>
      <div class="cartList" v-for="item in cartProducts" :key="item">
        <div class="cartListInfo">
          <div class="checkbox">
            <input class="check" type="checkbox" @click="clickCheckbox(item)" v-model="item.checked" />
          </div>
          <div class="productMessage">
            <img :src="item.imageUrl" alt="">
            <router-link :to="`/product-info/${item.id}`">
              <p class="productTitle">{{ item.title }}</p>
            </router-link>
          </div>
        </div>
        <div class="cartListOther">
          <div class="otherLeft">
            <span class="originalPrice">{{ $filters.currency(item.price) }}</span>
            <cartControl class="cartControl" :inputQty="item.quantity" :productId="item.id" @emitUpdateItemQty="updateItemQty"></cartControl>
          </div>
          <div class="otherRight">
            <span class="totalPrice">{{ $filters.currency(item.total) }}</span>
            <div class="deleteBtn" @click="removeCartItem(item.id)">
              <i class="fas fa-trash"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="cartCheckoutInfo">
        <div class="CouponUsage">
          <input  class="couponUsageInput" type="text" placeholder="請輸入優惠券序號">
          <div class="UsageBtn">
            <span>套用</span>
          </div>
        </div>
        <div class="checkoutInfo">
          <div class="checkoutLeft">
            <input class="check" type="checkbox" @click="clickCheckAll" v-model="checkAll" />
            <span class="selectAll">全選({{ cartProducts.length }})</span>
          </div>
          <div class="checkoutRight">
            <div class="productstotalPrice">
              <span class="numberOfItems">總金額 ({{ checkedNumber }} 個商品): </span>
              <span class="checkoutTotalPrice">{{ $filters.currency(checkedTotal) }}</span>
              <p class="howMuchDiscount">已省下 <span>$0</span></p>
            </div>
            <div class="checkoutBtn">
              <span>去買單</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="shopCart-otherContent" v-else>
      <div class="emptyCart-box">
        <img src="@/assets/img/empty.png" alt="" class="emptyCart-logo">
      </div>
      <p>你的購物車是空的ㄛ</p>
      <div class="jumpPage">
        <router-link to="/products?categoryId=全部商品" class="goToPageBtn">去購物吧!</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import cartControl from '@/components/Front/CartControl.vue';
import { mapState } from 'vuex';

export default {
  components: {
    cartControl
  },
  data() {
    return {
      checkAll: false,
      checkedNumber: 0,
      checkedTotal: 0
    }
  },
  methods: {
    removeCartItem(id) {
      this.checkAll = false;
      const api = `${process.env.VUE_APP_CARTAPI}/api/cart/${id}`;
      this.$http.delete(api).then(() => {
        this.$store.dispatch('shoppingCart/getCartContents');
      });
    },
    updateItemQty(productInFo) {
      const vm = this;
      vm.checkAll = false;
      vm.checkedNumber = 0;
      vm.checkedTotal = 0;
      const id = productInFo[0];
      const qty = productInFo[1];
      this.$store.dispatch('shoppingCart/updateItemQty', { id, qty });
    },
    clickCheckAll() {
      const vm = this;
      vm.checkAll = !vm.checkAll;
      if (vm.checkAll) {
        vm.checkedTotal = 0;
        vm.cartProducts.forEach((item) => {
          item.checked = true;
          vm.checkedTotal += item.total;
        });
        vm.checkedNumber = this.cartProducts.length;
      }else {
        vm.cartProducts.forEach((item) => {
          item.checked = false;
          vm.checkedTotal = 0;
        });
        vm.checkedNumber = 0;
      }
    },
    clickCheckbox(item) {
      const vm = this;
      item.checked = !item.checked;
      if (item.checked) {
        vm.checkedNumber++;
        if (vm.checkedNumber === vm.cartProducts.length) {
          vm.checkAll = true;
        }
        vm.checkedTotal += item.total;
      }else {
        vm.checkedNumber--;
        vm.checkAll = false;
        vm.checkedTotal -= item.total;
      }
    }
  },
  computed: {
    ...mapState('shoppingCart', {
      cartProducts: state => state.cartProducts
    })
  },
  created() {
    this.$store.dispatch('shoppingCart/getCartContents');
  }
}
</script>

<style scoped lang="scss">
@mixin Width-Height($Wsize, $Hsize) {
  width: $Wsize;
  height: $Hsize;
}
@mixin checkbox($margin-top, $margin-left) {
	input[type=checkbox] {
    @include Width-Height(21px, 21px);
    position: relative;
    margin-top: $margin-top;
    margin-left: $margin-left;
  }
  input[type=checkbox]:after {
    position: absolute;
    @include Width-Height(21px, 21px);
    display: inline-block;
    visibility: visible;
    border-radius: 3px;
  }
  input[type=checkbox]:checked:after {
    content: "✓";
    font-size: 15px;
    background-color: #ff0000;
    color: #fff;
    padding: 0 4px;
    font-weight: bold;
  }
}

.shoppingCart{
  width: 1124px;
  margin: 0 auto;

  .shopCartTop{
    height: 90px;

    .cartTitle{
      text-align: center;
      font-size: 30px;
      color: #616161;
      padding-top: 16px;
    }
  }

  .shopCartNav{
    height: 60px;
    box-shadow: 3px 0px 20px 0px #c4c4c4;

    .listTitleLeft{
      float: left;
      @include Width-Height(583px, 58px);

      .checkboxTitle{
        float: left;
        @include Width-Height(50px, 60px);
        @include checkbox(20px, 13px);
      }

      .productMessageTitle{
        float: right;
        @include Width-Height(533px, 58px);
        color: #616161;
        font-size: 18px;

        .goods{
          float: left;
          margin-left: 20px;
          margin-top: 16px;
        }

        .unitPrice{
          float: right;
          margin-right: 115px;
          margin-top: 16px;
        }
      }
    }

    .listTitleRight{
      float: right;
      @include Width-Height(539px, 58px);

      .otherTitleLeft{
        float: left;
        @include Width-Height(250px, 58px);

        .quantity{
          margin-top: 16px;
          color: #616161;
          font-size: 18px;
          padding-left: 55px;
        }
      }

      .otherTitleRight{
        float: right;
        @include Width-Height(289px, 58px);
        color: #616161;
        font-size: 18px;

        .totalPriceTitle{
          float: left;
          margin-top: 16px;
          margin-left: 10px;
        }

        .operate{
          float: right;
          margin-top: 16px;
          margin-right: 40px;
        }
      }
    }
  }

  .cartList{
    @include Width-Height(1124px, 109px);
    box-shadow: 3px 0px 8px 0px #c4c4c4;
    margin-top: 15px;
    margin-bottom: 15px;

    .cartListInfo{
      float: left;
      @include Width-Height(395px, 107px);

      .checkbox{
        float: left;
        @include Width-Height(50px, 107px);
        @include checkbox(43px, 13px);
      }

      .productMessage{
        float: right;
        @include Width-Height(335px, 107px);

        img{
          float: left;
          @include Width-Height(100px, 75px);
          margin-top: 16px;
        }

        .productTitle{
          float: right;
          @include Width-Height(200px, 45px);
          margin-top: 32px;
          margin-right: 15px;
          color: #616161;
          font-size: 16px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    .cartListOther{
      float: right;
      @include Width-Height(690px, 107px);

      .otherLeft{
        float: left;
        @include Width-Height(400px, 107px);

        .originalPrice{
          float: left;
          margin-top: 42px;
          color: #616161;
          font-size: 16px;
          font-weight: bold;
        }

        .cartControl{
          float: right;
          @include Width-Height(250px, 107px);
          padding-top: 30px;
          padding-left: 10px;
        }
      }

      .otherRight{
        float: right;
        @include Width-Height(290px, 107px);

        .totalPrice{
          float: left;
          margin-top: 42px;
          color: #db4949;
          font-size: 16px;
          font-weight: bold;
          margin-left: 10px;
        }

        .deleteBtn{
          float: right;
          @include Width-Height(45px, 45px);
          border: 1px solid #ef4c2f;
          margin-top: 32px;
          margin-right: 30px;
          cursor: pointer;
          color: #ef4c2f;

          &:hover{
            background: #ef4c2f;
            color: white;
          }

          i{
            font-size: 20px;
            margin-left: 13px;
            margin-top: 12px;
          }
        }
      }
    }
  }

  .cartCheckoutInfo{
    @include Width-Height(1124px, 150px);
    background: white;
    margin-bottom: 50px;
    box-shadow: 3px 3px 15px 0px #c4c4c4;
    position: sticky;
    bottom: 0;

    .CouponUsage{
      height: 80px;
      border-bottom: 1px dashed #e8e8e8;

      .couponUsageInput{
        float: left;
        @include Width-Height(250px, 50px);
        padding-left: 15px;
        font-size: 16px;
        border: #c6c6c6;
        outline: none;
        box-shadow: 3px 3px 15px 0px #c4c4c4;
        margin-left: 755px;
        margin-top: 15px;
      }

      input::placeholder{
        color: #c6c6c6;
      }

      .UsageBtn{
        float: right;
        @include Width-Height(70px, 50px);
        background: #616161;
        padding-top: 12px;
        margin-right: 30px;
        margin-top: 15px;
        cursor: pointer;

        &:hover{
          opacity: 0.9;
        }

        span{
          font-size: 18px;
          color: white;
          margin-left: 17px;
        }
      }
    }

    .checkoutInfo{
      height: 70px;

      .checkoutLeft{
        float: left;
        @include Width-Height(300px, 70px);
        @include checkbox(25px, 15px);

        .selectAll{
          float: right;
          width: 100px;
          font-size: 16px;
          margin-right: 150px;
          margin-top: 22px;
          color: #616161;
        }
      }

      .checkoutRight{
        float: right;
        @include Width-Height(500px, 70px);

        .productstotalPrice{
          float: left;
          margin-left: 10px;
          margin-top: 14px;

          .numberOfItems{
            font-size: 16px;
          }

          .checkoutTotalPrice{
            font-size: 23px;
            color: #db4949;
          }

          .howMuchDiscount{
            margin-left: 110px;
            margin-top: -7px;

            span{
              color: red;
            }
          }
        }

        .checkoutBtn{
          float: right;
          @include Width-Height(200px, 40px);
          background: #a67e65;
          padding-top: 7px;
          margin-right: 30px;
          margin-top: 15px;
          cursor: pointer;

          &:hover{
            background: #89644f;
          }

          span{
            color: white;
            font-size: 16px;
            margin-left: 75px;
          }
        }
      }
    }
  }

  .shopCart-otherContent{
    text-align: center;
    margin-bottom: 100px;

    .emptyCart-box{
      @include Width-Height(104px, 122px);
      margin: 25px auto;
      overflow: hidden;

      .emptyCart-logo{
        -webkit-user-drag: none;
      }
    }

    p{
      font-size: 16px;
      color: #909090;
      font-weight: bold;
    }

    .jumpPage{
      @include Width-Height(120px, 25px);
      background: #ef4c2f;
      margin-left: 502px;

      .goToPageBtn{
        vertical-align: middle;
        text-decoration: none;
        color: #ffffff;

        &:hover{
          color: #ffffff;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>