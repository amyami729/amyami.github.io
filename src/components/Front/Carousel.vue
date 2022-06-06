<template>
  <div id="carousel">
    <slot :currentSlide="currentSlide"></slot>
    <div class="navigate">
      <div class="toggle-page left">
        <i @click="prevSlide" class="fas fa-chevron-left"></i>
      </div>
      <div class="toggle-page right">
        <i @click="nextSlide" class="fas fa-chevron-right"></i>
      </div>
    </div>
    <div class="pagination">
      <span @click="goToSlide(index)" v-for="(slide, index) in getSlideCount" :key="slide" :class="{ 'a_ctive': index + 1 === currentSlide }">
      </span>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const currentSlide = ref(1);
    const getSlideCount = ref(null);
    const autoPlayEnabled = ref(true);
    const timeoutDuration = ref(5000);
    const prevSlide = () => {
      if (currentSlide.value === 1) {
        currentSlide.value = getSlideCount.value;
        return;
      }
      currentSlide.value -= 1;
    };
    const nextSlide = () => {
      if (currentSlide.value === getSlideCount.value) {
        currentSlide.value = 1;
        return;
      }
      currentSlide.value += 1;
    };
    const goToSlide = (index) => {
      currentSlide.value = index + 1;
    }
    const autoPlay = () => {
      setInterval(() => {
        nextSlide();
      }, timeoutDuration.value);
    }
    if (autoPlayEnabled.value) {
      autoPlay();
    }
    onMounted(() => {
      getSlideCount.value = document.querySelectorAll('#slide').length;
    });
    return {
      currentSlide,
      nextSlide,
      prevSlide,
      getSlideCount,
      goToSlide
    }
  }
}
</script>

<style scoped lang="scss">
@mixin Width-Height($Wsize, $Hsize) {
  width: $Wsize;
  height: $Hsize;
};
@mixin desktop {
  @media screen and (max-width: 767px){
    @content
  }
};

.toggle-page{
  position: absolute;
  top: 175px;
  @include desktop() {
    top: 40%;
  }

  i{
    cursor: pointer;
    text-align: center;
    vertical-align: middle;
    padding-top: 14px;
    border-radius: 50%;
    @include Width-Height(45px, 45px);
    font-size: 20px;
    background: white;
    color: #c8aa96;
    opacity: 0.6;
    @include desktop() {
      @include Width-Height(35px, 35px);
      font-size: 14px;
      padding-top: 12px;
    }

    &:hover{
      opacity: 0.9;
    }
  }
}

.left{
  left: 50px;
  @include desktop() {
    left: 15px;
  }
}

.right{
  right: 50px;
  @include desktop() {
    right: 15px;
  }
}

.pagination{
  position: absolute;
  top: 365px;
  width: 100%;
  gap: 16px;
  justify-content: center;
  @include desktop() {
    top: 85%;
  }

  span {
    cursor: pointer;
    @include Width-Height(14px, 14px);
    border-radius: 50%;
    border: 1px solid white;
    background-color: #e7e7e5;
    @include desktop() {
      width: 12px;
      height: 12px;
    }
  }

  .a_ctive {
    background-color: #c2987b;
  }
}
</style>