<template>
  <div class="favorite">
    <div class="favoriteTop">
      <p class="title">
        <i class="fas fa-heart"></i>收藏清單
      </p>
    </div>
    <div class="favoriteContent" v-if="favorites.length !== 0">
      <div class="favoriteNav">
        <div class="septalLine"></div>
        <div class="navTitleLeft">
          <p class="goods">商品</p>
          <p class="price">價格</p>
        </div>
        <div class="navTitleRight">
          <div class="titleContentLeft">
            <p class="stockStatus">庫存狀態</p>
          </div>
          <div class="titleContentRight">
            <p class="cart">加入購物車</p>
            <p class="operate">操作</p>
          </div>
        </div>
      </div>
      <div class="favoriteListBox">
        <div class="favoriteList" v-for="item in favorites" :key="item">
          <div class="septalLine"></div>
          <div class="listInfo">
            <div class="infoLeft">
              <img :src="item.imageUrl" alt="">
              <router-link :to="`/product-info/${item.id}`">
                <p class="productTitle">{{ item.title }}</p>
              </router-link>
            </div>
            <div class="infoRight">
              <span class="price">{{ $filters.currency(item.price) }}</span>
            </div>
          </div>
          <div class="listOther">
            <div class="otherLeft">
              <div class="stockBox">
                <p>有庫存</p>
              </div>
            </div>
            <div class="otherRight">
              <div class="addCartBtn" @click="addToCart(item)">
                <i class="fas fa-cart-plus"></i>
                <span>加入購物車</span>
              </div>
              <i class="fa-solid fa-trash-can remove" @click="removeFavoriteItem(item)"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="favorite-otherContent" v-else>
      <div class="emptyFavorite-logo"></div>
      <p>你的收藏清單是空的ㄛ</p>
       <div class="jumpPage">
        <router-link to="/products?categoryId=全部商品" class="goToPageBtn">去購物吧!</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  methods: {
    addToCart(item, qty = 1) {
      const id = item.id;
      this.$store.dispatch('shoppingCart/addItemToCart', { id, qty });
      this.removeFavoriteItem(item);
    },
    removeFavoriteItem(item) {
      this.$store.dispatch('favorite/removeFavoriteItem', item);
    }
  },
  computed: {
    ...mapState('favorite', {
      favorites: state => state.favorites
    })
  },
  created() {
    this.$store.dispatch('favorite/getFavoriteContents');
  }
}
</script>

<style scoped lang="scss">
@mixin Width-Height($Wsize, $Hsize) {
  width: $Wsize;
  height: $Hsize;
};

.favorite{
  width: 1124px;
  margin: 0 auto;

  .favoriteTop{
    height: 90px;

    .title{
      font-size: 30px;
      color: #616161;
      text-align: center;
      padding-top: 16px;

      i{
        color: #c13e1b;
      }
    }
  }

  .septalLine{
    @include Width-Height(95%, 1px);
    margin-left: 27px;
    background: #808080;
  }

  .favoriteNav{
    height: 85px;
    background: #616161;
    padding-top: 30px;

    .navTitleLeft{
      float: left;
      @include Width-Height(540px, 54px);
      font-size: 18px;
      color: #a6b1cf;

      .goods{
        float: left;
        margin-left: 50px;
        margin-top: 14px;
      }

      .price{
        float: right;
        margin-right: 90px;
        margin-top: 14px;
      }
    }

    .navTitleRight{
      float: right;
      @include Width-Height(584px, 54px);
      font-size: 18px;
      color: #a6b1cf;

      .titleContentLeft{
        float: left;
        @include Width-Height(190px, 54px);

        .stockStatus{
          margin-left: 35px;
          margin-top: 14px;
        }
      }

      .titleContentRight{
        float: right;
        @include Width-Height(394px, 54px);

        .cart{
          float: left;
          margin-left: 45px;
          margin-top: 14px;
        }

        .operate{
          float: right;
          margin-right: 70px;
          margin-top: 14px;
        }
      }
    }
  }

  .favoriteListBox{
    margin-bottom: 100px;

    .favoriteList{
      height: 160px;
      background: #616161;
    

      .listInfo{
        float: left;
        @include Width-Height(540px, 159px);

        .infoLeft{
          float: left;
          @include Width-Height(413px, 159px);

          img{
            float: left;
            @include Width-Height(100px, 75px);
            margin-left: 40px;
            margin-top: 40px;
          }

          .productTitle{
            float: right;
            @include Width-Height(200px, 45px);
            font-size: 16px;
            color: #ffffff;
            margin-top: 50px;
            margin-right: 45px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .infoRight{
          float: right;
          @include Width-Height(127px, 159px);

          .price{
            font-size: 16px;
            color: #afafaf;
            display: block;
            margin-top: 50px;
          }
        }
      }

      .listOther{
        float: right;
        @include Width-Height(584px, 159px);

        .otherLeft{
          float: left;
          @include Width-Height(175px, 159px);

          .stockBox{
            @include Width-Height(85px, 21px);
            background: #34c38f;
            margin-top: 50px;
            margin-left: 32px;
            border-radius: 20px;
            text-align: center;

            p{
              color: #ffffff;
            }
          }
        }

        .otherRight{
          float: right;
          @include Width-Height(409px, 159px);

          .addCartBtn{
            float: left;
            @include Width-Height(150px, 40px);
            border-radius: 5px;
            background: #c2987b;
            color: #ffffff;
            margin-top: 42px;
            margin-left: 40px;
            cursor: pointer;

            &:hover{
              opacity: 0.9;
            }

            i{
              float: left;
              font-size: 16px;
              margin-left: 20px;
              margin-top: 12px;
            }

            span{
              float: right;
              display: block;
              font-size: 16px;
              margin-top: 8px;
              margin-right: 25px;
            }
          }

          .remove{
            float: right;
            margin-right: 80px;
            margin-top: 50px;
            font-size: 18px;
            color: #afafaf;

            &:hover{
              color: #ef4c2f;
            }
          }
        }
      }
    }
  }

  .favorite-otherContent{
    text-align: center;
    margin-bottom: 100px;

    .emptyFavorite-logo{
      padding-bottom: 20px;
      @include Width-Height(104px, 122px);
      background: url(../../../assets/img/empty.png) no-repeat right 0;
      margin: 0 auto;
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