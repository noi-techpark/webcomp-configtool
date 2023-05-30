<!--
SPDX-FileCopyrightText:  NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <b-form-checkbox
      name="fieldKey"
      v-model="value"
      switch
      :disabled="disabled"
      v-on:change="changed"
      >{{ options.description }}</b-form-checkbox
    >
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
      type: [Boolean, String],
      default: null
    }
  },
  data() {
    return {
      value: this.options.default || false
    };
  },
  computed: {
    isValid() {
      return (
        this.value === true || this.value === false || this.required === false
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
      let castValue = null;
      if (type === 'string') {
        if (restoreValue === 'true') {
          castValue = true;
        } else if (restoreValue === 'false') {
          castValue = false;
        }
      } else if (type === 'boolean') {
        castValue = restoreValue;
      }

      return castValue;
    }
  }
};
</script>
