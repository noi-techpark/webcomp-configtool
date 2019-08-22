<template>
  <b-form-select
    v-model="selected"
    :options="options.values"
    v-on:change="changed"
  ></b-form-select>
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
      selected: this.options.default
    };
  },
  methods: {
    changed() {
      this.$emit('updated', { key: this.fieldKey, data: this.selected });
    }
  }
};
</script>
