<template>
  <div>
    <WcsConfigurator
      :config="getOptions"
      v-if="show"
      v-on:snippet="emitResult"
    ></WcsConfigurator>
    <div v-if="error">
      Error while loading config.
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import WcsConfigurator from './components/wcs-configurator';
import BootstrapVue from 'bootstrap-vue';

Vue.use(BootstrapVue);
export default {
  components: { WcsConfigurator },
  data() {
    return {
      show: false,
      error: false,
      config: {
        options: []
      },
      snippet: null
    };
  },
  computed: {
    getOptions() {
      return this.config;
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
    emitResult(snippet) {
      this.$emit('snippet', snippet);
    }
  }
};
</script>

<style lang="scss">
@import './assets/styles/style';
@import '../node_modules/vue-multiselect/dist/vue-multiselect.min.css';
</style>
