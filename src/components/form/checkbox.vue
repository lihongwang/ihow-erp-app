<template>
  <view>
    <label v-if="props.disabled" class="checked disabled checkbox blue" @click="toggleCheck">
      <span class="indicator"></span>
    </label>
    <label v-else-if="props.checked" class="checked checkbox blue" @click="toggleCheck">
      <span class="indicator"></span>
    </label>
    <label v-else :class="checked ? 'checked' : ''" class="checkbox blue" @click="toggleCheck">
      <span class="indicator"></span>
    </label>
    <!-- <input v-else type="checkbox" class="c-checkbox" :class="props.class"  /> -->
  </view>
</template>

<script setup>
import { defineProps, defineEmits, defineExpose, ref } from 'vue'
const props = defineProps(['checked', 'disabled'])
const emits = defineEmits(['onToggle'])
const checked = ref(false)
const toggleCheck = () => {
  checked.value = !checked.value
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

@mixin checkbox($color) {
  margin-right: 1rem;
  padding-left: 1.75rem;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  .indicator {
    border-radius: $border-radius;
    position: absolute;
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
  &.checked .indicator {
    color: $white;
    background: $color
      url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIxMiIgaGVpZ2h0PSI5IiB2aWV3Qm94PSIwIDAgMTIgOSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgPHBhdGggZD0iTTQuNTc1IDguOTc3cy0uNDA0LS4wMDctLjUzNi0uMTY1TC4wNTcgNS42NGwuODI5LTEuMjI3TDQuNDcgNy4yNjggMTAuOTIxLjA4NmwuOTIzIDEuMTAzLTYuODYzIDcuNjRjLS4xMzQtLjAwMy0uNDA2LjE0OC0uNDA2LjE0OHoiIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPg0KPC9zdmc+)
      50% 40% no-repeat;
    border: 2px solid $color;
  }

  &.disabled .indicator {
    background-color: lighten($black, 65%);
    border: 2px solid lighten($black, 50%);
  }
}

::v-deep label.checkbox {
  @include checkbox($green);

  &.blue {
    @include checkbox($blue);
  }
}
</style>
