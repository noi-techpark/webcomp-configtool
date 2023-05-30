<!--
SPDX-FileCopyrightText:  NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <Multiselect
      v-model="value"
      :options="options.values"
      v-on:input="changed"
      :disabled="disabled"
      :multiple="true"
    ></Multiselect>
    <div v-if="!required" class="cursor-pointer" style="font-size: small">
      <a v-if="!disabled" @click="disableField">[disable]</a>
      <a v-else @click="enableField">[enable]</a>
    </div>
    <div v-if="!isValid" class="invalid-feedback d-block">
      Value is invalid.
    </div>
    {{ value }}
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import mixins from '../common/field-mixin';
export default {
  components: { Multiselect },
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
      type: [Array, String],
      default: null
    }
  },
  data() {
    return {
      value: []
    };
  },
  computed: {
    isValid() {
      return this.required === false || (this.value && this.value.length > 0);
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
      if (!restoreValue) {
        return null;
      }

      let restored = [];

      const type = typeof restoreValue;
      if (type === 'string') {
        restored = restoreValue.split(',');
      }

      let allValid = true;

      if (restored) {
        restored.forEach(value => {
          if (
            !validOptions.find(entry => {
              return entry === value;
            })
          ) {
            allValid = false;
          }
        });

        if (allValid) {
          return restored;
        }
      }

      return null;
    }
  }
};
</script>
