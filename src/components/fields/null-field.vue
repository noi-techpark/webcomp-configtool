<!--
SPDX-FileCopyrightText: 2020 NOI Techpark <digital@noi.bz.it>

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
      type: null,
      required: false,
      default: false
    },
    restoreValue: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: this.restoreValue || this.options.default || false
    };
  },
  computed: {
    isValid() {
      return (
        this.value === true || this.value === false || this.required === false
      );
    }
  },
  watch: {
    restoreValue(value) {
      this.value = value;
      this.changed();
    }
  }
};
</script>
