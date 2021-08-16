<template>
  <div>
    <ConfigurationForm
      :config="config.options || []"
      :restore-snippet="restoreSnippet"
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
      default: () => {},
    },
    restoreSnippet: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      snippet: null,
    };
  },
  methods: {
    updateResult(event) {
      let snippet = '<' + this.config.tagName;
      event.sort((a, b) => {
        var nameA = a.key.toUpperCase(); // ignore upper and lowercase
        var nameB = b.key.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
      event.forEach((item) => {
        var curConf = this.config.options.find((obj) => obj.key === item.key);
        if (curConf.type === 'null') {
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

          let data = item.data;

          if(curConf.type === 'multiselect') {
            console.log(item.data)
            data = item.data.join(',');
            console.log(data)
            if(data.includes('"')) {
              quotes = "'";
            }
          }

          snippet =
            snippet + ' ' + item.key + '=' + quotes + data + quotes;
        }
      });
      this.snippet = snippet + '></' + this.config.tagName + '>';

      console.log(snippet)
      this.emitResult();
    },
    emitResult() {
      this.$emit('snippet', this.snippet);
    },
  },
};
</script>
