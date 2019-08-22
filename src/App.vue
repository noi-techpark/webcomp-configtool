<template>
  <div>
    <ConfigurationForm
      :config="getConfig"
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
  props: {
    tagName: String
  },
  components: { ConfigurationForm },
  data() {
    return {
      show: false,
      config: [],
      snippet: null
    };
  },
  computed: {
    getConfig() {
      console.log(this);
      //if (this.$slots['default'] && this.$slots.default[0]) {
      return this.config;
      //} else {
      //  return [];
      //}
    }
  },
  mounted() {
    setTimeout(this.initConfig, 100);
  },
  methods: {
    initConfig() {
      //this.$emit('sepp', 'goil');

      this.config = JSON.parse(this.$slots.default[0].text);
      this.show = true;
    },
    updateResult(event) {
      let snippet = '<' + this.tagName;

      console.log(event, event.length);

      event.forEach((item) => {
        console.log('x');
        snippet = snippet + ' ' + item.key + '="' + item.data + '"';
      });

      snippet = snippet + '></' + this.tagName + '>';

      this.snippet = snippet;

      this.emitResult();

      console.log(event, this.snippet);
      //TODO: update snippet
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
