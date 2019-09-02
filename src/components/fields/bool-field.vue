<template>
  <div>
    <b-form-checkbox name="fieldKey" v-model="value" v-on:change="changed">{{
      options.description
    }}</b-form-checkbox>
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
      value: this.options.default || false
    };
  },
  computed: {
    isValid() {
      return this.value === true || this.required === false;
    }
  }
};
</script>
