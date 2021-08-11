<template>
  <Dialog
    :header="`Array Mapping`"
    :visible="shouldDisplayModal"
    :style="{ width: '50vw', minWidth: '900px' }"
    :closable="false"
    :modal="true"
  >
    <br />
    <div class="array_map_form" v-if="shouldDisplayModal">
      <Panel header="Sources">
        <div class="array_map_form__nested_form">
          <div
            class="array_map_form__nested_form__source_variable_entry"
            :key="selectedSourceVariableName"
            v-for="(sourceVariableValue,
            selectedSourceVariableName) in getSourceVariableEntries(stepID)"
          >
            <div>
              <p
                class="array_map_form__nested_form__source_variable_entry__name"
              >
                {{ selectedSourceVariableName }}
              </p>
              <p
                class="array_map_form__nested_form__source_variable_entry__well_count"
              >
                {{
                  ` [${getSourceVariableWellCount(
                    selectedSourceVariableName,
                    vue_reactivity_triggering_counter_
                  )} well(s)]`
                }}
              </p>
            </div>
            <Dropdown
              :options="labwareDropdownOptions"
              class="array_map_form__nested_form__labware_slot_dropdown"
              @change="updateSourceVariableLabware($event, selectedSourceVariableName)"
              optionLabel="display_name"
              placeholder="Select Labware Slot"
              :value="
                getSlotForSourceVariable(
                  selectedSourceVariableName,
                  vue_reactivity_triggering_counter_
                )
              "
            />
            <Button
              :label="
                getSourceVariableWellButtonLabel(
                  selectedSourceVariableName,
                  vue_reactivity_triggering_counter_
                )
              "
              :class="
                getSourceVariableWellButtonClass(
                  selectedSourceVariableName,
                  vue_reactivity_triggering_counter_
                )
              "
              class="array_map_form__nested_form__source_variable_entry__button"
              @click="openSourceVariableWellForm(selectedSourceVariableName)"
              :disabled="
                assertSourceVariableHasLabware(
                  selectedSourceVariableName,
                  vue_reactivity_triggering_counter_
                )
              "
            />
            <WellSelectionForm
              v-if="
                assertSourceWellSelectionModalVisible(
                  selectedSourceVariableName,
                  vue_reactivity_triggering_counter_
                )
              "
              :shouldDisplayModal="
                assertSourceWellSelectionModalVisible(
                  selectedSourceVariableName,
                  vue_reactivity_triggering_counter_
                )
              "
              :labwareId="
                getSourceVariableLabwareID(
                  selectedSourceVariableName,
                  vue_reactivity_triggering_counter_
                )
              "
              @formClosed="closeSourceVariableWellForm"
              :value="
                getWellsFromSourceVariableObject(
                  sourceVariableValue,
                  vue_reactivity_triggering_counter_
                )
              "
              @input="updateSourceVariableWells($event, selectedSourceVariableName)"
            />
          </div>
        </div>
      </Panel>
      <Panel header="Destinations">
        <div class="array_map_form__nested_form">
          <div
            class="array_map_form__nested_form__destination_variable_entry"
            :key="destinationVariableName"
            v-for="(_,
            destinationVariableName) in getDestinationVariableEntries(stepID)"
          >
            <span>{{ destinationVariableName }}</span>
            <Dropdown
              :options="labwareDropdownOptions"
              @change="
                updateDestinationVariableLabware(
                  $event,
                  destinationVariableName
                )
              "
              optionLabel="display_name"
              class="array_map_form__nested_form__labware_slot_dropdown"
              placeholder="Select Labware Slot"
              :value="
                getSlotForDestinationVariable(
                  destinationVariableName,
                  vue_reactivity_triggering_counter_
                )
              "
            />
          </div>
        </div>
      </Panel>
    </div>
    <template #footer>
      <Button label="Close" @click="saveChangesAndCloseForm" autofocus />
    </template>
  </Dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { findDeep } from "../../utils";
import types from "../../types";
import WellSelectionForm from "./WellSelectionForm.vue";

/**
 * A component to receive user input on the configuration of an array map within
 * an array transfer step.
 */
export default {
  components: { WellSelectionForm },
  name: "ArrayMapForm",
  computed: {
    ...mapGetters([
      "cachedProtocolSteps",
      "nonTipRackLabwares",
      "cachedProtocolDeck",
      "cachedProtocolPipettes",
    ]),
    /**
     * A getter for the labware dropdown options.
     */
    labwareDropdownOptions() {
      return this.nonTipRackLabwares.map((item) => ({
        id: item.id,
        display_name: item.display_name,
        name: item.name,
      }));
    },
  },
  data() {
    return {
      /**
       * A variable to be used to trigger component updates via incrementing its value.
       */
      vue_reactivity_triggering_counter_: 0,
      /**
       * A variable to store the name of the selected source variable.
       */
      selectedSourceVariableName: "",
      /**
       * A variable to indicate if the pipette for the procedure is single- or multi-channel.
       */
      isMultiChannelPipette: false,
    };
  },
  props: {
    /**
     * Determins if the component is visible or not.
     */
    shouldDisplayModal: Boolean,
    /**
     * The unique ID of the parent array transfer step.
     */
    stepID: Number,
    /**
     * The pipette object within the parent array transfer step.
     */
    pipette: Object,
  },
  methods: {
    /**
     * Returns a step given its unique ID.
     *
     * @param {number} id - The ID of the protocol to be fetched
     */
    getProtocolStep(id) {
      return findDeep(this.cachedProtocolSteps, id);
    },
    /**
     * Returns the value of the wells attribute of a source variable.
     *
     * @param {object} obj - Source variable object.
     */
    getWellsFromSourceVariableObject(obj) {
      return obj.wells;
    },
    /**
     * Returns the corresponding slot object given the name of a source variable.
     *
     * @param {string} name - Source variable name.
     */
    getSlotForSourceVariable(name) {
      let obj = this.getProtocolStep(this.stepID).parameters.source_var_map[
        name
      ];
      return obj.slot_number !== -1
        ? {
            display_name: this.cachedProtocolDeck.slots[obj.slot_number]
              .display_name,
            id: obj.slot_number,
            name: this.cachedProtocolDeck.slots[obj.slot_number].name,
          }
        : null;
    },
    /**
     * Returns the source variable entries for a given protocol step.
     *
     * @param {number} stepID - The ID of the protocol step.
     */
    getSourceVariableEntries(stepID) {
      return this.getProtocolStep(stepID).parameters.source_var_map;
    },
    /**
     * Returns the destination variable entries for a given protocol step.
     *
     * @param {number} stepID - The ID of the protocol step.
     */
    getDestinationVariableEntries(stepID) {
      return this.getProtocolStep(stepID).parameters.destination_var_map;
    },
    /**
     * Indicates if a source variable (identified by its name) has labware added to it.
     *
     * @param {string} selectedSourceVariableName - The name of the said source variable.
     */
    assertSourceVariableHasLabware(selectedSourceVariableName) {
      return (
        this.getProtocolStep(this.stepID).parameters.source_var_map[
          selectedSourceVariableName
        ].slot_number === -1
      );
    },
    /**
     * Indicates if the well selection modal for a source variable should be visible or not.
     *
     * @param {string} selectedSourceVariableName - The name of the said source variable.
     */
    assertSourceWellSelectionModalVisible(selectedSourceVariableName) {
      return (
        this.selectedSourceVariableName === selectedSourceVariableName &&
        !this.isMultiChannelPipette
      );
    },
    /**
     * Returns the corresponding slot object given the name of a destination variable.
     *
     * @param {string} name - The name of the said source variable.
     */
    getSlotForDestinationVariable(name) {
      let obj = this.getProtocolStep(this.stepID).parameters
        .destination_var_map[name];
      return obj.slot_number !== -1
        ? {
            display_name: this.cachedProtocolDeck.slots[obj.slot_number]
              .display_name,
            id: obj.slot_number,
            name: this.cachedProtocolDeck.slots[obj.slot_number].name,
          }
        : null;
    },
    /**
     * Makes the component hidden and saves the user's changes to the array map attribute of the parent array transfer step.
     */
    saveChangesAndCloseForm() {
      this.$store
        .dispatch(types.UPDATE_ARRAY_MAP, {
          id: this.stepID,
        })
        .then(() => this.$emit("formClosed"));
    },
    /**
     * Displays the well form for a source variable given its name.
     *
     * @param {string} name - The name of the said source variable.
     */
    openSourceVariableWellForm(name) {
      this.selectedSourceVariableName = name;
    },
    /**
     * Updates the labware added to a source variable given its name.
     * Further, it forces an update of the component.
     *
     * @param {string} name - The name of the said source variable.
     */
    updateSourceVariableLabware(event, name) {
      this.$store
        .dispatch(types.UPDATE_ARRAY_MAP_SOURCE_VARIABLE_LABWARE, {
          id: this.stepID,
          name,
          data: event.value,
        })
        .then(() => (this.vue_reactivity_triggering_counter_ += 1));
    },
    /**
     * Hides the well for a source variable given its name.
     *
     * @param {string} name - The name of the said source variable.
     */
    closeSourceVariableWellForm() {
      this.selectedSourceVariableName = "";
    },
    /**
     * Get the number of wells a source variable has - given its name.
     *
     * @param {string} name - The name of the said source variable.
     */
    getSourceVariableWellCount(name) {
      return this.getProtocolStep(this.stepID).parameters.source_var_map[name]
        .wells.length;
    },
    /**
     * Get the class for the well button of a source variable - given its name.
     *
     * @param {string} name - The name of the said source variable.
     */
    getSourceVariableWellButtonClass(name) {
      return this.getProtocolStep(this.stepID).parameters.source_var_map[name]
        .wells.length === 0
        ? ["p-button-raised", "p-button-secondary"]
        : ["p-button-raised", "p-button-success"];
    },
    /**
     * Get the label for the well button of a source variable - given its name.
     *
     * @param {string} name - The name of the said source variable.
     */
    getSourceVariableWellButtonLabel(name) {
      return this.getProtocolStep(this.stepID).parameters.source_var_map[name]
        .wells.length === 0
        ? "Select Wells"
        : "Update Wells";
    },
    /**
     * Get the labware ID of a source variable - given its name.
     *
     * @param {string} name - The name of the said source variable.
     */
    getSourceVariableLabwareID(name) {
      const slot_number = this.getProtocolStep(this.stepID).parameters
        .source_var_map[name].slot_number;
      return slot_number !== -1
        ? this.cachedProtocolDeck.slots[slot_number].labware_id
        : null;
    },
    /**
     * Updates the wells of a source variable given its name.
     * Further, it forces an update of the component.
     *
     * @param {object} value - The updated value of the wells of the said source variable.
     * @param {string} name - The name of the said source variable.
     */
    updateSourceVariableWells(value, sourceName) {
      this.$store
        .dispatch(types.UPDATE_ARRAY_SOURCE_WELLS, {
          id: this.stepID,
          sourceName,
          data: value,
        })
        .then(() => (this.vue_reactivity_triggering_counter_ += 1));
    },
    /**
     * Updates the labware of a destination variable - given its name.
     * Further, it forces an update of the component.
     *
     * @param {object} event - The user triggered event.
     * @param {string} name - The name of the said event.
     */
    updateDestinationVariableLabware(event, name) {
      this.$store
        .dispatch(types.UPDATE_ARRAY_MAP_DESTINATION_VARIABLE_LABWARE, {
          id: this.stepID,
          name,
          data: event.value,
        })
        .then(() => (this.vue_reactivity_triggering_counter_ += 1));
    },
  },
};
</script>

<style scoped>
.array_map_form {
  display: grid;
  grid-template-rows: auto auto;
  grid-row-gap: 30px;
  padding-bottom: 10px;
}
.array_map_form__nested_form__destination_variable_entry {
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 10px;
}
.array_map_form__nested_form__source_variable_entry {
  display: grid;
  grid-template-columns: 100px auto 200px;
  grid-column-gap: 10px;
}
.array_map_form__nested_form__source_variable_entry__button {
  width: 91%;
  font-size: 14px;
  font-weight: bold;
  height: 32px;
}
.array_map_form__nested_form__source_variable_entry__name {
  margin: 0;
}
.array_map_form__nested_form__source_variable_entry__well_count {
  font-size: 10px;
  margin: 0;
  margin-top: 8px;
}
.array_map_form__nested_form__labware_slot_dropdown {
  height: 32px;
}
.array_map_form__nested_form {
  display: grid;
  grid-auto-rows: auto;
  grid-row-gap: 20px;
}
</style>
