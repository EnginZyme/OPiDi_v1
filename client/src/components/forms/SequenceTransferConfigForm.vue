<template>
  <div class="step_config_form" v-if="formType === 'sequence_transfer'">
    <p class="step_config_form__title">Sequence Transfer</p>
    <div class="step_config_form__body">
      <div class="step_config_form__body__content">
        <div>
          <p class="step_config_form__body__content__label--medium">Step Name</p>
          <InputText
            type="text"
            class="step_config_form__body__content__input--long"
            v-model="sequenceTransferStepName"
          />
        </div>
        <div>
          <p class="step_config_form__body__content__label--medium">Pipette</p>
          <Dropdown
            :options="cachedProtocolPipettes"
            optionLabel="name"
            placeholder="Select option"
            class="step_config_form__body__content__dropdown--stretch"
            v-model="sequenceTransferPipette"
          />
        </div>
        <div>
          <p class="step_config_form__body__content__label--medium">
            Source Sequence {{ this.sourceSequenceWellNumber }}
          </p>
          <Dropdown
            :options="
              cachedProtocolSequences.map((item) => ({
                name: item.name,
                id: item.id,
              }))
            "
            optionLabel="name"
            placeholder="Select option"
            class="step_config_form__body__content__dropdown--stretch"
            v-model="sequenceTransferSourceSequence"
          />
        </div>
        <div>
          <p class="step_config_form__body__content__label--medium">
            Destination Sequence {{ this.destinationSequenceWellNumber }}
          </p>
          <Dropdown
            :options="
              cachedProtocolSequences.map((item) => ({
                name: item.name,
                id: item.id,
              }))
            "
            optionLabel="name"
            placeholder="Select option"
            class="step_config_form__body__content__dropdown--stretch"
            v-model="sequenceTransferDestinationSequence"
          />
        </div>
        <div>
          <p class="step_config_form__body__content__label--medium">Tips Strategy</p>
          <Dropdown
            :options="[
              { name: 'Standard', value: 'STANDARD' },
              { name: 'Strict', value: 'STRICT' },
              { name: 'Eco', value: 'ECO' },
              { name: 'Eco - New Tip', value: 'ECO - NEW TIP' },
            ]"
            optionLabel="name"
            placeholder="Select option"
            class="step_config_form__body__content__dropdown--stretch"
            v-model="sequenceTransferTipsStrategy"
            v-tooltip="
              'STANDARD: one tip per source well,\nSTRICT: one tip per dispense,\nECO: reuse tip'
            "
          />
        </div>
        <div>
          <p class="step_config_form__body__content__label--medium">Liquid Class</p>
          <Dropdown
            :options="
              cachedProtocolLiquidClasses.map((item) => ({
                name: item.name,
                id: item.id,
              }))
            "
            optionLabel="name"
            placeholder="Select option"
            class="step_config_form__body__content__dropdown--stretch"
            v-model="sequenceTransferLiquidConfig"
          />
        </div>
        <div>
          <p class="step_config_form__body__content__label--medium">Source Offset</p>
          <div class="step_config_form__body__content__field_group">
            <div>
              <p class="step_config_form__body__content__label--min">Type</p>
              <Dropdown
                :options="[{ name: 'Top' }, { name: 'Bottom' }]"
                optionLabel="name"
                placeholder="Select option"
                class="step_config_form__body__content__dropdown"
                v-model="sequenceTransferSourceOffsetType"
              />
            </div>
            <div>
              <p class="step_config_form__body__content__label--min">Value (mm)</p>
              <InputNumber
                :minFractionDigits="2"
                :maxFractionDigits="5"
                class="step_config_form__body__content__input--short"
                v-model="sequenceTransferSourceOffset"
              />
            </div>
          </div>
        </div>
        <div>
          <p class="step_config_form__body__content__label--medium">Destination Offset</p>
          <div class="step_config_form__body__content__field_group">
            <div>
              <p class="step_config_form__body__content__label--min">Type</p>
              <Dropdown
                :options="[{ name: 'Top' }, { name: 'Bottom' }]"
                optionLabel="name"
                placeholder="Select option"
                class="step_config_form__body__content__dropdown"
                v-model="sequenceTransferDestinationOffsetType"
              />
            </div>
            <div>
              <p class="step_config_form__body__content__label--min">Value (mm)</p>
              <InputNumber
                :minFractionDigits="2"
                :maxFractionDigits="5"
                class="step_config_form__body__content__input--short"
                v-model="sequenceTransferDestinationOffset"
              />
            </div>
          </div>
        </div>
        <div>
          <p class="step_config_form__body__content__label--medium">Volumes (μL)</p>
          <InputText
            v-model="sequenceTransferVolumes"
            separator=","
            class="step_config_form__body__content__input--long"
            :addOnBlur="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import types from "../../types";
import { mapGetters } from "vuex";
import { findDeep } from "../../utils";

/**
 * Accepts user input for the configuration of a user selected sequence transfer step within the protocol cache object.
 */
export default {
  name: "SequenceTransferConfigForm",
  methods: {
    getProtocolStep(id) {
      return findDeep(this.cachedProtocolSteps, id);
    },
  },
  props: {
    /**
     * Determines if this component will be rendered or not (true if its value is set to `sequence_transfer`).
     */
    formType: String,
    /**
     * Indicates the ID of the user selected step card within the protocol editor UI.
     */
    stepID: Number,
  },
  computed: {
    ...mapGetters([
      "cachedProtocolSteps",
      "cachedProtocolSequences",
      "nonTipRackLabwares",
      "cachedProtocolLiquidClasses",
      "cachedProtocolPipettes",
    ]),
    /**
     * Returns the number of wells in the source sequence of the sequence transfer step.
     */
    sourceSequenceWellNumber() {
      if (
        !(this.formType !== "sequence_transfer" || this.stepID < 0) &&
        this.getProtocolStep(this.stepID).parameters.sourceSequenceId !== -1
      ) {
        const locations = this.cachedProtocolSequences.filter(
          (item) =>
            item.id === this.getProtocolStep(this.stepID).parameters.sourceSequenceId
        )[0].locations;
        if (locations.length)
          return `(${locations
            .map((item) => item.wells.length)
            .reduce((acc, val) => acc + val)} wells)`;
        return "(0 wells)";
      }
      return null;
    },
    /**
     * Returns the number of wells in the destination sequence of the sequence transfer step.
     */
    destinationSequenceWellNumber() {
      if (
        !(this.formType !== "sequence_transfer" || this.stepID < 0) &&
        this.getProtocolStep(this.stepID).parameters.destinationSequenceId !== -1
      ) {
        const locations = this.cachedProtocolSequences.filter(
          (item) =>
            item.id === this.getProtocolStep(this.stepID).parameters.destinationSequenceId
        )[0].locations;
        if (locations.length)
          return `(${locations
            .map((item) => item.wells.length)
            .reduce((acc, val) => acc + val)} wells)`;
        return "(0 wells)";
      }
      return null;
    },
    /**
     * A read/write object for the name of the sequence transfer step.
     */
    sequenceTransferStepName: {
      get: function() {
        return this.formType !== "sequence_transfer" || this.stepID < 0
          ? null
          : this.getProtocolStep(this.stepID).name;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_SEQUENCE_TRANSFER_STEP_NAME, {
          id: this.stepID,
          newValue,
        });
      }, 
    },
    /**
     * A read/write object for the pipette attribute of the sequence transfer step.
     */
    sequenceTransferPipette: {
      get: function() {
        return this.formType !== "sequence_transfer" || this.stepID < 0
          ? null
          : this.cachedProtocolPipettes.filter(item => item.name === this.getProtocolStep(this.stepID).parameters.pipette_obj.name)[0];
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_SEQUENCE_TRANSFER_PIPETTE, {
          id: this.stepID,
          newValue,
        });
      },
    },
    /**
     * A read/write object for the pipette strategy of the sequence transfer step.
     */
    sequenceTransferPipetteStrategy: {
      get: function() {
        return this.formType !== "sequence_transfer" ||
          this.stepID < 0 ||
          !this.getProtocolStep(this.stepID).parameters.pipette_strategy
          ? null
          : {
              value: this.getProtocolStep(this.stepID).parameters.pipette_strategy,
              name: this.getProtocolStep(this.stepID)
                .parameters.pipette_strategy.split("_")
                .map(
                  (string) =>
                    string.charAt(0).toUpperCase() +
                    string.slice(1).toLowerCase()
                )
                .join(" "),
            };
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_SEQUENCE_TRANSFER_PIPETTE_STRATEGY, {
          id: this.stepID,
          newValue: newValue.value,
        });
      },
    },
    /**
     * A read/write object for the source offset property of the sequence transfer step.
     */
    sequenceTransferSourceOffset: {
      get: function() {
        return this.formType !== "sequence_transfer" || this.stepID < 0
          ? null
          : this.getProtocolStep(this.stepID).parameters.offset.source;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_SEQUENCE_TRANSFER_SOURCE_OFFSET, {
          id: this.stepID,
          newValue: parseFloat(newValue),
        });
      },
    },
    /**
     * A read/write object for the destination offset property of the sequence transfer step.
     */
    sequenceTransferDestinationOffset: {
      get: function() {
        return this.formType !== "sequence_transfer" || this.stepID < 0
          ? null
          : this.getProtocolStep(this.stepID).parameters.offset.destination;
      },
      set: function(newValue) {
        this.$store.dispatch(
          types.UPDATE_SEQUENCE_TRANSFER_DESTINATION_OFFSET,
          {
            id: this.stepID,
            newValue: parseFloat(newValue),
          }
        );
      },
    },
    /**
     * A read/write object for the source sequence property of the sequence transfer step.
     */
    sequenceTransferSourceSequence: {
      get: function() {
        return this.formType !== "sequence_transfer" || this.stepID < 0
          ? null
          : {
              name: this.getProtocolStep(this.stepID).parameters.source_sequence,
              id: this.getProtocolStep(this.stepID).parameters.sourceSequenceId,
            };
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_SEQUENCE_TRANSFER_SOURCE_SEQUENCE, {
          id: this.stepID,
          value: newValue,
        });
      },
    },
    /**
     * A read/write object for the destination sequence property of the sequence transfer step.
     */
    sequenceTransferDestinationSequence: {
      get: function() {
        return this.formType !== "sequence_transfer" || this.stepID < 0
          ? null
          : {
              name: this.getProtocolStep(this.stepID).parameters.destination_sequence,
              id: this.getProtocolStep(this.stepID).parameters.destinationSequenceId,
            };
      },
      set: function(newValue) {
        this.$store.dispatch(
          types.UPDATE_SEQUENCE_TRANSFER_DESTINATION_SEQUENCE,
          {
            id: this.stepID,
            value: newValue,
          }
        );
      },
    },
    /**
     * A read/write object for the volumes property of the sequence transfer step.
     */
    sequenceTransferVolumes: {
      get: function() {
        return this.formType !== "sequence_transfer" || this.stepID < 0
          ? null
          : this.getProtocolStep(this.stepID).parameters.volumes_string;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_SEQUENCE_TRANSFER_VOLUMES, {
          id: this.stepID,
          newValue,
        });
      },
    },
    /**
     * A read/write object for the tips strategy property of the sequence transfer step.
     */
    sequenceTransferTipsStrategy: {
      get: function() {
        return this.formType !== "sequence_transfer" ||
          this.stepID < 0 ||
          !this.getProtocolStep(this.stepID).parameters.tipsStrategy
          ? null
          : {
              value: this.getProtocolStep(this.stepID).parameters.tipsStrategy,
              name: this.getProtocolStep(this.stepID)
                .parameters.tipsStrategy.toLowerCase()
                .replace(/\b\w/g, (l) => l.toUpperCase()),
            };
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_SEQUENCE_TRANSFER_TIPS_STRATEGY, {
          id: this.stepID,
          newValue: newValue.value,
        });
      },
    },
    /**
     * A read/write object for the source offset type property of the sequence transfer step.
     */
    sequenceTransferSourceOffsetType: {
      get: function() {
        return this.formType !== "sequence_transfer" || this.stepID < 0
          ? null
          : { name: this.getProtocolStep(this.stepID).parameters.offset.source_type };
      },
      set: function(newValue) {
        this.$store.dispatch(
          types.UPDATE_SEQUENCE_TRANSFER_SOURCE_OFFSET_TYPE,
          {
            id: this.stepID,
            newValue: newValue.name,
          }
        );
      },
    },
    /**
     * A read/write object for the destination offset type property of the sequence transfer step.
     */
    sequenceTransferDestinationOffsetType: {
      get: function() {
        return this.formType !== "sequence_transfer" || this.stepID < 0
          ? null
          : {
              name: this.getProtocolStep(this.stepID).parameters.offset
                .destination_type,
            };
      },
      set: function(newValue) {
        this.$store.dispatch(
          types.UPDATE_SEQUENCE_TRANSFER_DESTINATION_OFFSET_TYPE,
          {
            id: this.stepID,
            newValue: newValue.name,
          }
        );
      },
    },
    /**
     * A read/write object for the liquid config. property of the sequence transfer step.
     */
    sequenceTransferLiquidConfig: {
      get: function() {
        return this.formType !== "sequence_transfer" ||
          this.stepID < 0 ||
          typeof this.getProtocolStep(this.stepID).parameters.liquidClassId !==
            "number"
          ? null
          : {
              id: this.getProtocolStep(this.stepID).parameters.liquidClassId,
              name: this.getProtocolStep(this.stepID).parameters.liquidClass,
            };
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_SEQUENCE_TRANSFER_LIQUID_CLASS, {
          id: this.stepID,
          value: newValue,
        });
      },
    },
  },
};
</script>

<style scoped>
.step_config_form {
  display: grid;
  grid-template-rows: auto auto;
  padding-top: 20px;
  padding-bottom: 10px;
}
.step_config_form__body {
  padding-top: 20px;
  padding-left: 16px;
  display: grid;
  overflow: auto;
  box-shadow: 0 -1em 1em -1em #bcbcbc inset;
  border-radius: 5px;
  height: 65vh;
  margin-top: 10px;
}
.step_config_form__body__content {
  align-self: center;
  display: grid;
  grid-row-gap: 3vh;
  padding-bottom: 3vh;
}
.step_config_form__body__content__input--short {
  background: #efefff;
  box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.25),
    inset -2px -2px 4px 3px rgba(255, 255, 255, 0.25),
    inset -2px -2px 4px 3px rgba(255, 255, 255, 0.25);
  border-radius: 6px;
  font-size: 12px;
  width: 80%;
  height: 32px;
  border: none;
}
.step_config_form__body__content__input--long {
  background: #efefff;
  box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.25),
    inset -2px -2px 4px 3px rgba(255, 255, 255, 0.25),
    inset -2px -2px 4px 3px rgba(255, 255, 255, 0.25);
  border-radius: 6px;
  font-size: 12px;
  width: 91%;
  height: 32px;
  border: none;
}
.step_config_form__title {
  font-size: 18px;
  margin: 0px;
}
.step_config_form__body__content__field_group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 40px;
}
.step_config_form__body__content__label--medium {
  font-size: 13px;
  margin: 0px;
  margin-bottom: 8px;
}
.step_config_form__body__content__dropdown {
  background: #efefff;
  width: 91%;
  font-size: 9px;
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.25),
    -2px -2px 4px 1px rgba(255, 255, 255, 0.25);
  border-radius: 6px;
}
.step_config_form__body__content__dropdown--stretch {
  background: #efefff;
  width: 91%;
  font-size: 9px;
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.25),
    -2px -2px 4px 1px rgba(255, 255, 255, 0.25);
  border-radius: 6px;
}
.step_config_form__body__content__label--min {
  font-size: 10px;
  margin: 0px;
  margin-bottom: 8px;
}
</style>
