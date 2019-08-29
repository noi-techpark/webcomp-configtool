<template>
  <div>
    <b-form-textarea
      v-model="value"
      :placeholder="options.placeholder"
      type="text"
      v-on:change="changed"
    ></b-form-textarea>
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
      value: JSON.stringify(this.options.default)
    };
  },
  computed: {
    isValid() {
      return this.required === false || (this.value && this.value.length > 0);
    }
  }
};
</script>
