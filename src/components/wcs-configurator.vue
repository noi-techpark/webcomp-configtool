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
        var curConf = this.config.options.find(obj => obj.key == item.key);
        if (curConf.type == 'null') {
          if (item.data && item.data === true) {
            snippet = snippet + ' ' + item.key;
          }
        } else {
          var quotes = '"';
          if (
            (typeof item.data === 'string' || item.data instanceof String) &&
            item.data.includes('"')
          ) {
            quotes = "'";
          }
          snippet =
            snippet + ' ' + item.key + '=' + quotes + item.data + quotes;
        }
      });
      this.snippet = snippet + '></' + this.config.tagName + '>';
      this.emitResult();
    },
    emitResult() {
      this.$emit('snippet', this.snippet);
    }
  }
};
</script>
