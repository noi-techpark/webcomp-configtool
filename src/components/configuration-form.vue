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
      </b-form-group>
    </div>
    {{ config }}
  </div>
</template>

<script>
import BoolField from './fields/bool-field';
import MultiselectField from './fields/multiselect-field';
import SelectField from './fields/select-field';
import TextField from './fields/text-field';

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
    SelectField,
    TextField
  },
  data() {
    return {
      fields: []
    };
  },
  mounted() {},
  methods: {
    fieldUpdated(event) {
      console.log(event);

      this.fields = this.fields.filter(item => {
        return item.key !== event.key;
      });

      this.fields.push(event);

      this.$emit('updated', this.fields);
    }
  }
};
</script>
