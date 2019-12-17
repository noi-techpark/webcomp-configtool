<template>
  <div>
    <ConfigurationForm
      :config="config.options || []"
      v-on:updated="updateResult"
    ></ConfigurationForm>
  </div>
</template>

<script>
import Vue from 'vue';
import ConfigurationForm from './wcs-configuration-form';
import BootstrapVue from 'bootstrap-vue';

Vue.use(BootstrapVue);
export default {
  components: { ConfigurationForm },
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      snippet: null
    };
  },
  methods: {
    updateResult(event) {
      let snippet = '<' + this.config.tagName;

      event.forEach(item => {
        snippet = snippet + ' ' + item.key + '="' + item.data + '"';
      });

      snippet = snippet + '></' + this.config.tagName + '>';

      this.snippet = snippet;

      this.emitResult();
    },
    emitResult() {
      this.$emit('snippet', this.snippet);
    }
  }
};
</script>
