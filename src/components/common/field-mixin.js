export default {
  data() {
    return {
      disabled: false
    };
  },
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
        valid: this.isValid,
        disabled: this.disabled
      });
    },
    enableField() {
      this.disabled = false;
      this.changed();
    },
    disableField() {
      this.disabled = true;
      this.changed();
    }
  }
};
