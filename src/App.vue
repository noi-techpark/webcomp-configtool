<template>
  <div>
    <ConfigurationForm
      :config="getOptions"
      v-if="show"
      v-on:updated="updateResult"
    ></ConfigurationForm>
    <div v-if="error">
      Error while loading config.
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import ConfigurationForm from './components/configuration-form';
import BootstrapVue from 'bootstrap-vue';

Vue.use(BootstrapVue);
export default {
  components: { ConfigurationForm },
  data() {
    return {
      show: false,
      error: false,
      config: [],
      snippet: null
    };
  },
  computed: {
    getOptions() {
      return this.config.options;
    }
  },
  mounted() {
    setTimeout(this.initConfig, 100);
  },
  methods: {
    initConfig() {
      if (this.$slots.default && this.$slots.default[0]) {
        try {
          this.config = JSON.parse(this.$slots.default[0].text);
          this.show = true;
        } catch (e) {
          this.error = true;
        }
      } else {
        this.error = true;
      }
    },
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

<style lang="scss">
@import 'assets/styles/style';
</style>
