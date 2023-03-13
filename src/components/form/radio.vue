<template>
  <view>
    <label :class="props.checked ? 'checked' : ''" class="radio blue" @click="toggleCheck">
      <span class="indicator">
        <span class="inner"></span>
      </span>
    </label>
  </view>
</template>

<script setup>
import { defineProps, defineEmits, defineExpose } from 'vue'
const props = defineProps(['checked'])
const emits = defineEmits(['onToggle'])

const toggleCheck = () => {
  emits('onToggle')
}
defineExpose({
  toggleCheck,
})
</script>

<style lang="scss" scoped>
$black: #2d3137;
$blue: #007aff;
$green: #329e78;
$grey: #d6d6d6;
$red: #dd3c3a;
$white: #ffffff;

$border-radius: 3px;

@mixin radio($color) {
  margin-right: 1rem;
  padding-left: 1.75rem;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  .indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: $border-radius;
    position: absolute;
    border-radius: 50%;
    left: 0;
    top: -2px;
    width: 1rem;
    height: 1rem;
    background-color: lighten($white, 65%);
    border: 2px solid lighten($black, 35%);
    pointer-events: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .inner {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    margin-left: 1px;
  }
  &.checked .inner {
    background-color: $blue;
  }
}

::v-deep label.radio {
  @include radio($green);

  &.blue {
    @include radio($blue);
  }
}
</style>
