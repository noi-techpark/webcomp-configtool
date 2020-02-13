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
      type: null,
      required: false,
      default: null
    }
  },
  data() {
    return {
      value: this.options.default || null
    };
  },
  computed: {
    isValid() {
      return this.value === true || this.required === false;
    }
  }
};
</script>
