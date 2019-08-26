<template>
  <div>
    <ConfigurationForm
      :config="getOptions"
      v-if="show"
      v-on:updated="updateResult"
    ></ConfigurationForm>
  </div>
</template>

<script>
import Vue from 'vue';
import ConfigurationForm from './components/configuration-form';
import BootstrapVue from 'bootstrap-vue';

Vue.use(BootstrapVue);
export default {
  components: { ConfigurationForm },
  props: {
    test: String
  },
  data() {
    return {
      show: false,
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
      this.config = JSON.parse(this.$slots.default[0].text);
      console.log('XXX', this.config);
      this.show = true;
    },
    updateResult(event) {
      let snippet = '<' + this.config.tagName;

      event.forEach((item) => {
        snippet = snippet + ' ' + item.key + '="' + item.data + '"';
      });

      snippet = snippet + '></' + this.getTagName() + '>';

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
