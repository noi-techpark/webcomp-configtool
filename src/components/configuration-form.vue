<template>
  <div>
    <div v-for="field in config" :key="field.key">
      <b-form-group
        :id="'input-group-' + field.key"
        :label="field.key"
        :label-for="'input-' + field.key"
      >
        <BoolField
          v-if="field.type === 'bool'"
          :fieldKey="field.key"
          :options="field.options"
          v-on:updated="fieldUpdated"
        ></BoolField>
        <MultiselectField
          v-else-if="field.type === 'multiselect'"
          :fieldKey="field.key"
          :options="field.options"
          v-on:updated="fieldUpdated"
        ></MultiselectField>
        <NumberField
          v-else-if="field.type === 'number'"
          :fieldKey="field.key"
          :options="field.options"
          v-on:updated="fieldUpdated"
        ></NumberField>
        <ObjectField
          v-else-if="field.type === 'object'"
          :fieldKey="field.key"
          :options="field.options"
          v-on:updated="fieldUpdated"
        ></ObjectField>
        <SelectField
          v-else-if="field.type === 'select'"
          :fieldKey="field.key"
          :options="field.options"
          v-on:updated="fieldUpdated"
        ></SelectField>
        <TextField
          v-else-if="field.type === 'text'"
          :fieldKey="field.key"
          :options="field.options"
          v-on:updated="fieldUpdated"
        ></TextField>
        <TextAreaField
          v-else-if="field.type === 'textarea'"
          :fieldKey="field.key"
          :options="field.options"
          v-on:updated="fieldUpdated"
        ></TextAreaField>
      </b-form-group>
    </div>
    {{ config }}
  </div>
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
      fields: []
    };
  },
  mounted() {
    this.initFields();
  },
  methods: {
    initFields() {
      this.config.forEach(item => {
        this.fields.push({ key: item.key, data: item.options.default });
      });

      this.emitData();
    },
    fieldUpdated(event) {
      this.fields = this.fields.filter(item => {
        return item.key !== event.key;
      });

      this.fields.push(event);

      this.emitData();
    },
    emitData() {
      this.$emit('updated', this.fields);
    }
  }
};
</script>
