<template>
  <div class="step_config_form" v-if="formType === 'simple_transfer'">
    <p class="step_config_form__title">Simple Transfer</p>
    <div class="step_config_form__body">
      <div class="step_config_form__body__content">
        <div>
          <p class="step_config_form__body__content__label--medium">
            Step Name
          </p>
          <InputText
            type="text"
            class="step_config_form__body__content__input--long"
            v-model="simpleTransferStepName"
          />
        </div>
        <div>
          <p class="step_config_form__body__content__label--medium">Pipette</p>
          <Dropdown
            :options="cachedProtocolPipettes"
            optionLabel="name"
            placeholder="Select option"
            class="step_config_form__body__content__dropdown--stretch"
            v-model="simpleTransferPipette"
          />
        </div>
        <div>
          <p class="step_config_form__body__content__label--medium">
            Tips Strategy
          </p>
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
            v-model="simpleTransferTipsStrategy"
            v-tooltip="
              'STANDARD: one tip per source well, STRICT: one tip per dispense, ECO: reuse tip'
            "
          />
        </div>
        <div>
          <p class="step_config_form__body__content__label--medium">
            Liquid Class
          </p>
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
            v-model="simpleTransferLiquidConfig"
          />
        </div>
        <div>
          <p class="step_config_form__body__content__label--medium">
            Source Slot
          </p>
          <Dropdown
            :options="labwareList"
            optionLabel="display_name"
            placeholder="Select option"
            class="step_config_form__body__content__dropdown--stretch"
            v-model="simpleTransferSourceSlot"
          />
        </div>
        <div>
          <p class="step_config_form__body__content__label--medium">
            Destination Slot
          </p>
          <Dropdown
            :options="labwareList"
            optionLabel="display_name"
            placeholder="Select option"
            class="step_config_form__body__content__dropdown--stretch"
            v-model="simpleTransferDestinationSlot"
          />
        </div>
        <div>
          <p class="step_config_form__body__content__label--medium">
            Source Offset
          </p>
          <div class="step_config_form__body__content__field_group">
            <div>
              <p class="step_config_form__body__content__label--min">Type</p>
              <Dropdown
                :options="[{ name: 'Top' }, { name: 'Bottom' }]"
                optionLabel="name"
                placeholder="Select option"
                class="step_config_form__body__content__dropdown"
                v-model="simpleTransferSourceOffsetType"
              />
            </div>
            <div>
              <p class="step_config_form__body__content__label--min">
                Value (mm)
              </p>
              <InputNumber
                :minFractionDigits="2"
                :maxFractionDigits="5"
                class="step_config_form__body__content__input--short"
                v-model="simpleTransferSourceOffset"
              />
            </div>
          </div>
        </div>
        <div>
          <p class="step_config_form__body__content__label--medium">
            Destination Offset
          </p>
          <div class="step_config_form__body__content__field_group">
            <div>
              <p class="step_config_form__body__content__label--min">Type</p>
              <Dropdown
                :options="[{ name: 'Top' }, { name: 'Bottom' }]"
                optionLabel="name"
                placeholder="Select option"
                class="step_config_form__body__content__dropdown"
                v-model="simpleTransferDestinationOffsetType"
              />
            </div>
            <div>
              <p class="step_config_form__body__content__label--min">
                Value (mm)
              </p>
              <InputNumber
                :minFractionDigits="2"
                :maxFractionDigits="5"
                class="step_config_form__body__content__input--short"
                v-model="simpleTransferDestinationOffset"
              />
            </div>
          </div>
        </div>
        <div>
          <p class="step_config_form__body__content__label--medium">
            Source Wells ({{ sourceWellNumber }})
          </p>
          <Button
            :label="sourceWellButtonLabel"
            :class="sourceWellButtonClass"
            class="step_config_form__body__content__well_button"
            @click="openSourceWellModal"
            :disabled="isSourceButtonDisabled"
          />
        </div>
        <div>
          <p class="step_config_form__body__content__label--medium">
            Destination Wells ({{ destinationWellNumber }})
          </p>
          <Button
            :label="destinationWellButtonLabel"
            :class="destinationWellButtonClass"
            class="step_config_form__body__content__well_button"
            @click="openDestinationWellModal"
            :disabled="isDestinationButtonDisabled"
          />
        </div>
        <div>
          <p class="step_config_form__body__content__label--medium">
            Volumes (μL)
          </p>
          <InputText
            v-model="simpleTransferVolumes"
            class="step_config_form__body__content__input--long"
          />
        </div>
        <br />
      </div>
      <WellSelectionForm
        v-if="shouldDisplaySourceWellModal && !chosenPipetteIsMultiChannel"
        :shouldDisplayModal="shouldDisplaySourceWellModal && !chosenPipetteIsMultiChannel"
        :labwareId="sourceLabwareId"
        @formClosed="closeSourceWellModal"
        v-model="simpleTransferSourceWells"
      />
      <MultiWellSelectionForm
        v-if="shouldDisplaySourceWellModal && chosenPipetteIsMultiChannel"
        :shouldDisplayModal="shouldDisplaySourceWellModal && chosenPipetteIsMultiChannel"
        :labwareId="sourceLabwareId"
        @formClosed="closeSourceWellModal"
        v-model="simpleTransferSourceWells"
      />
      <WellSelectionForm
        v-if="shouldDisplayDestinationWellModal && !chosenPipetteIsMultiChannel"
        :shouldDisplayModal="
          shouldDisplayDestinationWellModal && !chosenPipetteIsMultiChannel
        "
        :labwareId="destinationLabwareId"
        @formClosed="closeDestinationWellModal"
        v-model="simpleTransferDestinationWells"
      />
      <MultiWellSelectionForm
        v-if="shouldDisplayDestinationWellModal && chosenPipetteIsMultiChannel"
        :shouldDisplayModal="
          shouldDisplayDestinationWellModal && chosenPipetteIsMultiChannel
        "
        :labwareId="destinationLabwareId"
        @formClosed="closeDestinationWellModal"
        v-model="simpleTransferDestinationWells"
      />
    </div>
  </div>
</template>

<script>
import types from "../../types";
import { mapGetters } from "vuex";
import { findDeep } from "../../utils";
import WellSelectionForm from "./WellSelectionForm.vue";
import MultiWellSelectionForm from "./MultiWellSelectionForm.vue";

/**
 * Accepts user input on the configuration of a user selected simple transfer step within the protocol cache object.
 */
export default {
  components: { WellSelectionForm, MultiWellSelectionForm },
  name: "SimpleTransferConfigForm",
  methods: {
    /**
     * Fetches a protocol step by its ID.
     * 
     * @param {number} id - The said ID.
     */
    getProtocolStep(id) {
      return findDeep(this.cachedProtocolSteps, id);
    },
    /**
     * Closes the source well modal.
     */
    closeSourceWellModal() {
      this.shouldDisplaySourceWellModal = false;
    },
    /**
     * Closes the destination well modal.
     */
    closeDestinationWellModal() {
      this.shouldDisplayDestinationWellModal = false;
    },
    /**
     * Opens the source well modal.
     */
    openSourceWellModal() {
      this.shouldDisplaySourceWellModal = true;
    },
    /**
     * Opens the destination well modal.
     */
    openDestinationWellModal() {
      this.shouldDisplayDestinationWellModal = true;
    },
  },
  data() {
    return {
      /**
       * Determines if the source well modal is displayed.
       */
      shouldDisplaySourceWellModal: false,
      /**
       * Determines if the destination well modal is displayed.
       */
      shouldDisplayDestinationWellModal: false,
    };
  },
  props: {
    /**
     * Determines if this component will be rendered or not (true if its value is set to `simple_transfer`)
     */
    formType: String,
    /**
     * Indicates the index of the user selected step card within the protocol editor UI
     */
    stepID: Number,
  },
  computed: {
    ...mapGetters([
      "cachedProtocolSteps",
      "nonTipRackLabwares",
      "cachedProtocolDeck",
      "cachedProtocolLiquidClasses",
      "cachedProtocolPipettes",
    ]),
    /**
     * Asserts if chosen pipette is multichannel.
     */
    chosenPipetteIsMultiChannel() {
      return this.cachedProtocolPipettes.filter(
        (item) => item.category === this.simpleTransferPipette.category
      )[0].is_multichannel;
    },
    /**
     * Returns the number of source wells.
     */
    sourceWellNumber() {
      return this.formType !== "simple_transfer" || !(this.stepID >= 0)
        ? null
        : this.getProtocolStep(this.stepID).parameters.source.wells.length;
    },
    /**
     * Returns the number of destination wells.
     */
    destinationWellNumber() {
      return this.formType !== "simple_transfer" || !(this.stepID >= 0)
        ? null
        : this.getProtocolStep(this.stepID).parameters.destination.wells.length;
    },
    /**
     * Determines if source well button is disabled (or not).
     */
    isSourceButtonDisabled() {
      if (!(this.formType !== "simple_transfer" || this.stepID < 0)) {
        return (
          this.getProtocolStep(this.stepID).parameters.source.slot_number ===
            -1 || !this.simpleTransferPipette
        );
      }
      return true;
    },
    /**
     * Determines if destination well button is disabled (or not).
     */
    isDestinationButtonDisabled() {
      if (!(this.formType !== "simple_transfer" || this.stepID < 0)) {
        return (
          this.getProtocolStep(this.stepID).parameters.destination
            .slot_number === -1 || !this.simpleTransferPipette
        );
      }
      return true;
    },
    /**
     * Returns the list of all selected labware available to the simple transfer step.
     */
    labwareList() {
      return this.nonTipRackLabwares.map((item) => ({
        id: item.id,
        display_name: item.display_name,
        name: item.name,
      }));
    },
    /**
     * Returns the appropriate class for the source well button.
     */
    sourceWellButtonClass() {
      if (!(this.formType !== "simple_transfer" || this.stepID < 0)) {
        return this.getProtocolStep(this.stepID).parameters.source.wells
          .length === 0
          ? ["p-button-raised", "p-button-secondary"]
          : ["p-button-raised", "p-button-success"];
      }
      return "";
    },
    /**
     * Returns the appropriate label for the source well button.
     */
    sourceWellButtonLabel() {
      if (!(this.formType !== "simple_transfer" || this.stepID < 0)) {
        return this.getProtocolStep(this.stepID).parameters.source.wells
          .length === 0
          ? "Select Wells"
          : "Update Wells";
      }
      return "";
    },
    /**
     * Returns the appropriate class for the destination well button.
     */
    destinationWellButtonClass() {
      if (!(this.formType !== "simple_transfer" || this.stepID < 0)) {
        return this.getProtocolStep(this.stepID).parameters.destination.wells
          .length === 0
          ? ["p-button-raised", "p-button-secondary"]
          : ["p-button-raised", "p-button-success"];
      }
      return "";
    },
    /**
     * Returns the appropriate label for the destination well button.
     */
    destinationWellButtonLabel() {
      if (!(this.formType !== "simple_transfer" || this.stepID < 0)) {
        return this.getProtocolStep(this.stepID).parameters.destination.wells
          .length === 0
          ? "Select Wells"
          : "Update Wells";
      }
      return "";
    },
    /**
     * Returns the ID of the selected source labware.
     */
    sourceLabwareId() {
      if (!(this.formType !== "simple_transfer" || this.stepID < 0)) {
        const slot_number = this.getProtocolStep(this.stepID).parameters.source
          .slot_number;
        return slot_number !== -1
          ? this.cachedProtocolDeck.slots[slot_number].labware_id
          : null;
      }
      return null;
    },
    /**
     * Returns the ID of the selected destination labware.
     */
    destinationLabwareId() {
      if (!(this.formType !== "simple_transfer" || this.stepID < 0)) {
        const slot_number = this.getProtocolStep(this.stepID).parameters
          .destination.slot_number;
        return slot_number !== -1
          ? this.cachedProtocolDeck.slots[slot_number].labware_id
          : null;
      }
      return null;
    },
    /**
     * A read/write object for the name of the simple transfer step.
     */
    simpleTransferStepName: {
      get: function() {
        return this.formType !== "simple_transfer" || this.stepID < 0
          ? null
          : this.getProtocolStep(this.stepID).name;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_SIMPLE_TRANSFER_STEP_NAME, {
          id: this.stepID,
          newValue,
        });
      },
    },
    /**
     * A read/write object for the pipette property of the simple transfer step.
     */
    simpleTransferPipette: {
      get: function() {
        return this.formType !== "simple_transfer" || this.stepID < 0
          ? null
          : this.cachedProtocolPipettes.filter(
              (item) =>
                item.name ===
                this.getProtocolStep(this.stepID).parameters.pipette_obj.name
            )[0];
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_SIMPLE_TRANSFER_PIPETTE, {
          id: this.stepID,
          newValue,
        });
      },
    },
    /**
     * A read/write object for the pipette strategy of the simple transfer step.
     */
    simpleTransferPipetteStrategy: {
      get: function() {
        return this.formType !== "simple_transfer" ||
          this.stepID < 0 ||
          !this.getProtocolStep(this.stepID).parameters.pipette_strategy
          ? null
          : {
              value: this.getProtocolStep(this.stepID).parameters
                .pipette_strategy,
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
        this.$store.dispatch(types.UPDATE_SIMPLE_TRANSFER_PIPETTE_STRATEGY, {
          id: this.stepID,
          newValue: newValue.value,
        });
      },
    },
    /**
     * A read/write object for the tips strategy of the simple transfer step.
     */
    simpleTransferTipsStrategy: {
      get: function() {
        return this.formType !== "simple_transfer" ||
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
        this.$store.dispatch(types.UPDATE_SIMPLE_TRANSFER_TIPS_STRATEGY, {
          id: this.stepID,
          newValue: newValue.value,
        });
      },
    },
    /**
     * A read/write object for the liquid config. property of the simple transfer step.
     */
    simpleTransferLiquidConfig: {
      get: function() {
        return this.formType !== "simple_transfer" ||
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
        this.$store.dispatch(types.UPDATE_SIMPLE_TRANSFER_LIQUID_CLASS, {
          id: this.stepID,
          value: newValue,
        });
      },
    },
    /**
     * A read/write object for the source slot property of the simple transfer step.
     */
    simpleTransferSourceSlot: {
      get: function() {
        if (!(this.formType !== "simple_transfer" || this.stepID < 0)) {
          const slot_number = this.getProtocolStep(this.stepID).parameters
            .source.slot_number;
          return slot_number !== -1
            ? {
                display_name: this.cachedProtocolDeck.slots[slot_number]
                  .display_name,
                id: slot_number,
                name: this.cachedProtocolDeck.slots[slot_number].name,
              }
            : null;
        }
        return null;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_SIMPLE_TRANSFER_SOURCE_SLOT, {
          id: this.stepID,
          newValue,
        });
      },
    },
    /**
     * A read/write object for the source offset property of the simple transfer step.
     */
    simpleTransferSourceOffset: {
      get: function() {
        return this.formType !== "simple_transfer" || this.stepID < 0
          ? null
          : this.getProtocolStep(this.stepID).parameters.offset.source;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_SIMPLE_TRANSFER_SOURCE_OFFSET, {
          id: this.stepID,
          newValue,
        });
      },
    },
    /**
     * A read/write object for the destination slot property of the simple transfer step.
     */
    simpleTransferDestinationSlot: {
      get: function() {
        if (!(this.formType !== "simple_transfer" || this.stepID < 0)) {
          const slot_number = this.getProtocolStep(this.stepID).parameters
            .destination.slot_number;
          return slot_number !== -1
            ? {
                display_name: this.cachedProtocolDeck.slots[slot_number]
                  .display_name,
                id: slot_number,
                name: this.cachedProtocolDeck.slots[slot_number].name,
              }
            : null;
        }
        return null;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_SIMPLE_TRANSFER_DESTINATION_SLOT, {
          id: this.stepID,
          newValue,
        });
      },
    },
    /**
     * A read/write object for the source offset property of the simple transfer step.
     */
    simpleTransferSourceOffsetType: {
      get: function() {
        return this.formType !== "simple_transfer" || this.stepID < 0
          ? null
          : {
              name: this.getProtocolStep(this.stepID).parameters.offset
                .source_type,
            };
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_SIMPLE_TRANSFER_SOURCE_OFFSET_TYPE, {
          id: this.stepID,
          newValue: newValue.name,
        });
      },
    },
    /**
     * A read/write object for the destination offset type property of the simple transfer step.
     */
    simpleTransferDestinationOffsetType: {
      get: function() {
        return this.formType !== "simple_transfer" || this.stepID < 0
          ? null
          : {
              name: this.getProtocolStep(this.stepID).parameters.offset
                .destination_type,
            };
      },
      set: function(newValue) {
        this.$store.dispatch(
          types.UPDATE_SIMPLE_TRANSFER_DESTINATION_OFFSET_TYPE,
          {
            id: this.stepID,
            newValue: newValue.name,
          }
        );
      },
    },
    /**
     * A read/write object for the destination offset property of the simple transfer step.
     */
    simpleTransferDestinationOffset: {
      get: function() {
        return this.formType !== "simple_transfer" || this.stepID < 0
          ? null
          : this.getProtocolStep(this.stepID).parameters.offset.destination;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_SIMPLE_TRANSFER_DESTINATION_OFFSET, {
          id: this.stepID,
          newValue,
        });
      },
    },
    /**
     * A read/write object for the source wells property of the simple transfer step.
     */
    simpleTransferSourceWells: {
      get: function() {
        return this.formType !== "simple_transfer" || this.stepID < 0
          ? null
          : this.getProtocolStep(this.stepID).parameters.source.wells;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_SIMPLE_TRANSFER_SOURCE_WELLS, {
          id: this.stepID,
          newValue: newValue,
        });
      },
    },
    /**
     * A read/write object for the destination wells property of the simple transfer step.
     */
    simpleTransferDestinationWells: {
      get: function() {
        return this.formType !== "simple_transfer" || this.stepID < 0
          ? null
          : this.getProtocolStep(this.stepID).parameters.destination.wells;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_SIMPLE_TRANSFER_DESTINATION_WELLS, {
          id: this.stepID,
          newValue: newValue,
        });
      },
    },
    /**
     * A read/write object for the volumes property of the simple transfer step.
     */
    simpleTransferVolumes: {
      get: function() {
        return this.formType !== "simple_transfer" || this.stepID < 0
          ? null
          : this.getProtocolStep(this.stepID).parameters.volumes_string;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_SIMPLE_TRANSFER_VOLUMES, {
          id: this.stepID,
          newValue,
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
  border-radius: 5px;
  box-shadow: 0 -1em 1em -1em #bcbcbc inset;
  padding-top: 20px;
  padding-left: 16px;
  height: 65vh;
  display: grid;
  overflow: auto;
  margin-top: 10px;
}
.step_config_form__body__content {
  align-self: center;
  display: grid;
  grid-row-gap: 3vh;
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
.step_config_form__body__content__well_button {
  width: 91%;
  font-size: 14px;
  font-weight: bold;
}
.step_config_form__body__content__label--medium {
  font-size: 13px;
  margin: 0px;
  margin-bottom: 8px;
}
.step_config_form__body__content__dropdown {
  background: #efefff;
  width: 128px;
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
