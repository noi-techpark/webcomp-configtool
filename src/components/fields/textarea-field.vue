<template>
  <div>
    <b-form-textarea
      v-model="value"
      :placeholder="options.placeholder"
      type="text"
      v-on:change="changed"
      :disabled="disabled"
    ></b-form-textarea>
    <div v-if="!required" class="cursor-pointer" style="font-size: small;">
      <a v-if="!disabled" @click="disableField">[disable]</a>
      <a v-else @click="enableField">[enable]</a>
    </div>
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
      return this.required === false || (this.value && this.value.length > 0);
    }
  }
};
</script>
