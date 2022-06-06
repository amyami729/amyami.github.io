<template>
  <div id="slide">
    <transition name="moveSlide">
      <div class="slide-warpper">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
.moveSlide-enter-active,
.moveSlide-leave-active {
  transition: opacity 0.7s ease-in-out;
}

.moveSlide-enter-from,
.moveSlide-leave-to {
  opacity: 0;
}

.moveSlide-enter-to,
.moveSlide-leave-from {
  opacity: 1;
}
</style>