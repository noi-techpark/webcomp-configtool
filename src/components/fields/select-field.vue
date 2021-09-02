<template>
  <div>
    <b-form-select
      v-model="value"
      :options="options.values"
      v-on:change="changed"
      :disabled="disabled"
    ></b-form-select>
    <div v-if="!required" class="cursor-pointer" style="font-size: small">
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
    },
    restoreValue: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      value: this.options.default
    };
  },
  computed: {
    isValid() {
      return this.required === false || this.value;
    }
  },
  created() {
    const res = this.correctRestoreValue(
      this.restoreValue,
      this.options.values
    );
    if (res) {
      this.value = res;
    }
  },
  watch: {
    restoreValue(value) {
      const res = this.correctRestoreValue(value, this.options.values);
      if (res) {
        this.value = res;
        this.changed();
      }
    }
  },
  methods: {
    correctRestoreValue(restoreValue, validOptions) {
      let type = typeof validOptions[0];
      let castValue;
      if (type === 'number') {
        const cast = Number.parseInt(restoreValue);
        if (cast) {
          castValue = cast;
        }
      } else {
        const cast = String(restoreValue);
        if (cast) {
          castValue = cast;
        }
      }

      if (
        validOptions.find(entry => {
          return entry === castValue;
        })
      ) {
        return castValue;
      }

      return null;
    }
  }
};
</script>
