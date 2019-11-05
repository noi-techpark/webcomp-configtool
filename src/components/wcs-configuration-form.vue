<template>
  <form ref="theForm">
    <div v-for="field in config" :key="field.key">
      <b-form-group
        :id="'input-group-' + field.key"
        :label="labelOrKey(field)"
        :label-for="'input-' + field.key"
      >
        <BoolField
          v-if="field.type === 'bool'"
          :fieldKey="field.key"
          :options="field.options"
          :required="field.required"
          v-on:updated="fieldUpdated"
          v-on:init="fieldInit"
        ></BoolField>
        <MultiselectField
          v-else-if="field.type === 'multiselect'"
          :fieldKey="field.key"
          :options="field.options"
          :required="field.required"
          v-on:updated="fieldUpdated"
          v-on:init="fieldInit"
        ></MultiselectField>
        <NumberField
          v-else-if="field.type === 'number'"
          :fieldKey="field.key"
          :options="field.options"
          :required="field.required"
          v-on:updated="fieldUpdated"
          v-on:init="fieldInit"
        ></NumberField>
        <ObjectField
          v-else-if="field.type === 'object'"
          :fieldKey="field.key"
          :options="field.options"
          :required="field.required"
          v-on:updated="fieldUpdated"
          v-on:init="fieldInit"
        ></ObjectField>
        <SelectField
          v-else-if="field.type === 'select'"
          :fieldKey="field.key"
          :options="field.options"
          :required="field.required"
          v-on:updated="fieldUpdated"
          v-on:init="fieldInit"
        ></SelectField>
        <TextField
          v-else-if="field.type === 'text'"
          :fieldKey="field.key"
          :options="field.options"
          :required="field.required"
          v-on:updated="fieldUpdated"
          v-on:init="fieldInit"
        ></TextField>
        <TextAreaField
          v-else-if="field.type === 'textarea'"
          :fieldKey="field.key"
          :options="field.options"
          :required="field.required"
          v-on:updated="fieldUpdated"
          v-on:init="fieldInit"
        ></TextAreaField>
      </b-form-group>
    </div>
  </form>
</template>

<script>
import BoolField from './fields/bool-field';
import MultiselectField from './fields/multiselect-field';
import NumberField from './fields/number-field';
import ObjectField from './fields/object-field';
import SelectField from './fields/select-field';
import TextField from './fields/text-field';
import TextAreaField from './fields/textarea-field';

export default {
  props: {
    config: {
      type: Array,
      required: true
    }
  },
  components: {
    BoolField,
    MultiselectField,
    NumberField,
    ObjectField,
    SelectField,
    TextField,
    TextAreaField
  },
  data() {
    return {
      fields: [],
      fieldsInitialized: 0
    };
  },
  computed: {
    formValid() {
      let isValid = true;

      this.fields.forEach(field => {
        if (field.valid === false) {
          isValid = false;
        }
      });

      return isValid;
    }
  },
  mounted() {
    if (this.config.length === 0) {
      this.emitData();
    }
  },
  methods: {
    fieldInit(field) {
      this.updateFieldData(field);

      this.fieldsInitialized++;

      if (this.fieldsInitialized === this.config.length) {
        this.emitData();
      }
    },
    fieldUpdated(field) {
      this.updateFieldData(field);

      this.emitData();
    },
    updateFieldData(field) {
      this.fields = this.fields.filter(item => {
        return item.key !== field.key;
      });

      this.fields.push(field);
    },
    emitData() {
      if (this.formValid) {
        this.$emit('updated', this.fields);
      }
    },
    labelOrKey(item) {
      if (item.label && item.label.length > 0) {
        return item.label;
      }

      return item.key;
    }
  }
};
</script>
