<template>
    <b-form-input
            v-model="value"
            :placeholder="options.placeholder"
            type="number"
            :min="options.min"
            :max="options.max"
            :step="options.step"
            v-on:change="changed"
            multiple
    ></b-form-input>
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
