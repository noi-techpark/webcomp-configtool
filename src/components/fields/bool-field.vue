<template>
  <b-form-checkbox v-model="value" v-on:change="changed"></b-form-checkbox>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      required: true
    },
    fieldKey: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      value: this.options.default
    };
  },
  methods: {
    changed() {
      this.$emit('updated', { key: this.fieldKey, data: this.value });
    }
  }
};
</script>
