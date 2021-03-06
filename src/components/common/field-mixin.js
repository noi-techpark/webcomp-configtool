export default {
  mounted() {
    this.emitData('init');
  },
  methods: {
    changed() {
      this.$nextTick(() => {
        this.emitData('updated');
      });
    },
    emitData(event) {
      this.$emit(event, {
        key: this.fieldKey,
        data: this.value,
        valid: this.isValid
      });
    }
  }
};
