<template>
  <button :disabled="disabled" class="button">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.button {
  &[disabled] {
    opacity: 0.5;
    &:hover {
      color: #2d3748;
    }
  }
}
</style>
