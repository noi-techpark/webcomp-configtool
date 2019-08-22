<template>
  <b-form-select
    v-model="selected"
    :options="options.values"
    multiple
  ></b-form-select>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selected: this.options.default
    };
  }
};
</script>
