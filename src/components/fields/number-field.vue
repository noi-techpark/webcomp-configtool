<!--
SPDX-FileCopyrightText: 2020 NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

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
      :disabled="disabled"
    ></b-form-input>
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
      return (
        this.required === false ||
        (this.value && !Number.isNaN(this.value.length))
      );
    }
  },
  created() {
    const res = this.correctRestoreValue(this.restoreValue);
    if (res) {
      this.value = res;
    }
  },
  watch: {
    restoreValue(value) {
      const res = this.correctRestoreValue(value);
      if (res) {
        this.value = res;
        this.changed();
      }
    }
  },
  methods: {
    correctRestoreValue(restoreValue) {
      let type = typeof restoreValue;
      let castValue;
      if (type === 'string') {
        const cast = Number.parseInt(restoreValue);
        if (cast) {
          castValue = cast;
        }
      }
      if (castValue) {
        return castValue;
      }

      return null;
    }
  }
};
</script>
