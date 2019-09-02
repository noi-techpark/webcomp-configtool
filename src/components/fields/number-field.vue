<template>
  <div>
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
    <div v-if="!isValid" class="invalid-feedback d-block">
      Value is invalid.
    </div>
  </div>
</template>

<script>
import mixins from '../common/field-mixin';
export default {
  mixins: [mixins],
  props: {
    options: {
      type: Object,
      required: true
    },
    fieldKey: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      value: this.options.default
    };
  },
  computed: {
    isValid() {
      return (
        this.required === false ||
        (this.value && !Number.isNaN(this.value.length))
      );
    }
  }
};
</script>
