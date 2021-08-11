<template>
  <div class="location_form" v-if="isLocationSelected">
    <p class="location_form__title">Location</p>
    <div class="location_form__body">
      <div class="location_form__body__content">
        <div>
          <p class="location_form__body__content__label--medium">Slot</p>
          <Dropdown
            :options="locationSlotDropdownLabwareOptions"
            optionLabel="display_name"
            placeholder="Select option"
            v-model="locationSlotName"
            class="location_form__body__content__dropdown"
          />
        </div>
        <div>
          <p class="location_form__body__content__label--medium">
            Wells ({{ locationWellCount }})
          </p>
          <Button
            :label="wellSelectionButtonLabel"
            :class="wellSelectionButtonClass"
            class="location_form__body__content__button"
            @click="openWellSelectionModal"
            :disabled="isLocationSlotSelected"
          />
        </div>
      </div>
      <WellSelectionForm
        v-if="isWellSelectionModalVisible"
        :shouldDisplayModal="isWellSelectionModalVisible"
        :labwareId="locationLabwareId"
        @formClosed="closeWellSelectionModal"
        v-model="locationWells"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import types from "../../types";
import WellSelectionForm from "./WellSelectionForm.vue";

/**
 * A component that accepts user input on the configuration of a location object within the object
 * in the protocol cache.
 */
export default {
  components: { WellSelectionForm },
  name: "LocationConfigForm",
  props: {
    /**
     * The ID of the user clicked sequence card in the protocol editor UI.
     */
    seqIdx: Number,
    /**
     * The ID of the user clicked location card in the protocol editor UI.
     */
    locIdx: Number,
    /**
     * Determines if this component is rendered or not (true if the value is set to `location`).
     */
    formType: String,
  },
  data() {
    return {
      /**
       * Determines if the well selection modal is visible or not.
       */
      isWellSelectionModalVisible: false,
    };
  },
  methods: {
    /**
     * Opens the well selection modal.
     */
    openWellSelectionModal() {
      this.isWellSelectionModalVisible = true;
    },
    /**
     * Closes the well selection modal.
     */
    closeWellSelectionModal() {
      this.isWellSelectionModalVisible = false;
    },
  },
  computed: {
    ...mapGetters([
      "cachedProtocolSequences",
      "cachedProtocolDeck",
      "nonTipRackLabwares",
    ]),
    /**
     * Indicates if a location card has been selected by the user.
     */
    isLocationSelected() {
      return this.formType === "location";
    },
    /**
     * Indicates if a deck slot has been selected for the user-selected location.
     */
    isLocationSlotSelected() {
      return this.locIdx >= 0 && this.seqIdx >= 0
        ? this.cachedProtocolSequences
            .filter((item) => item.id === this.seqIdx)[0]
            .locations.filter((item) => item.id === this.locIdx)[0]
            .slot_number === -1
        : true;
    },
    /**
     * Gets all labware objects available to the user-selected location.
     */
    locationSlotDropdownLabwareOptions() {
      return this.nonTipRackLabwares.map((item) => ({
        id: item.id,
        display_name: item.display_name,
        name: item.name,
      }));
    },
    /**
     * Returns the number of wells in the chosen labware object for the user-selected location.
     */
    locationWellCount() {
      return this.locIdx >= 0 && this.seqIdx >= 0
        ? this.cachedProtocolSequences
            .filter((item) => item.id === this.seqIdx)[0]
            .locations.filter((item) => item.id === this.locIdx)[0].wells.length
        : null;
    },
    /**
     * Returns the appropriate class for the location well selection button.
     */
    wellSelectionButtonClass() {
      if (this.locIdx >= 0 && this.seqIdx >= 0) {
        return this.cachedProtocolSequences
          .filter((item) => item.id === this.seqIdx)[0]
          .locations.filter((item) => item.id === this.locIdx)[0].wells
          .length === 0
          ? ["p-button-raised", "p-button-secondary"]
          : ["p-button-raised", "p-button-success"];
      }
      return "";
    },
    /**
     * Returns the appropriate label for the location well selction button.
     */
    wellSelectionButtonLabel() {
      if (this.locIdx >= 0 && this.seqIdx >= 0) {
        return this.cachedProtocolSequences
          .filter((item) => item.id === this.seqIdx)[0]
          .locations.filter((item) => item.id === this.locIdx)[0].wells
          .length === 0
          ? "Select Wells"
          : "Update Wells";
      }
      return "";
    },
    /**
     * Returns the ID of the chosen labware for the user-selected location.
     */
    locationLabwareId() {
      if (this.locIdx >= 0 && this.seqIdx >= 0) {
        const slot_number = this.cachedProtocolSequences
          .filter((item) => item.id === this.seqIdx)[0]
          .locations.filter((item) => item.id === this.locIdx)[0].slot_number;
        return slot_number !== -1
          ? this.cachedProtocolDeck.slots[slot_number].labware_id
          : null;
      }
      return null;
    },
    /**
     * A read/write object for the location slot name.
     */
    locationSlotName: {
      get: function() {
        if (this.locIdx >= 0 && this.seqIdx >= 0) {
          const slot_number = this.cachedProtocolSequences
            .filter((item) => item.id === this.seqIdx)[0]
            .locations.filter((item) => item.id === this.locIdx)[0].slot_number;
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
        this.$store.dispatch(types.UPDATE_LOCATION_SLOT_NAME, {
          seqIdx: this.seqIdx,
          locIdx: this.locIdx,
          value: newValue,
        });
      },
    },
    /**
     * A read/write object for the location offset type.
     */
    locationOffsetType: {
      get: function() {
        if (this.locIdx >= 0 && this.seqIdx >= 0) {
          let value = this.cachedProtocolSequences
            .filter((item) => item.id === this.seqIdx)[0]
            .locations.filter((item) => item.id === this.locIdx)[0].offset
            .offset_type;
          return {
            name: value,
          };
        }
        return null;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_LOCATION_OFFSET_TYPE, {
          seqIdx: this.seqIdx,
          locIdx: this.locIdx,
          value: newValue.name,
        });
      },
    },
    /**
     * A read/write object for the location offset value.
     */
    locationOffsetValue: {
      get: function() {
        if (this.locIdx >= 0 && this.seqIdx >= 0)
          return this.cachedProtocolSequences
            .filter((item) => item.id === this.seqIdx)[0]
            .locations.filter((item) => item.id === this.locIdx)[0].offset
            .value;
        return null;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_LOCATION_OFFSET_VALUE, {
          seqIdx: this.seqIdx,
          locIdx: this.locIdx,
          value: parseFloat(newValue),
        });
      },
    },
    /**
     * A read/write object for the location wells.
     */
    locationWells: {
      get: function() {
        if (this.locIdx >= 0 && this.seqIdx >= 0)
          return this.cachedProtocolSequences
            .filter((item) => item.id === this.seqIdx)[0]
            .locations.filter((item) => item.id === this.locIdx)[0].wells;
        return null;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_LOCATION_WELLS, {
          seqIdx: this.seqIdx,
          locIdx: this.locIdx,
          value: newValue,
        });
      },
    },
  },
};
</script>

<style scoped>
.location_form__body__content {
  align-self: center;
  display: grid;
  grid-row-gap: 3vh;
}
.location_form__title {
  font-size: 18px;
  margin: 0px;
}
.location_form {
  display: grid;
  grid-template-rows: auto auto;
  padding-top: 20px;
}
.location_form__body {
  padding-left: 16px;
  height: 65vh;
  display: grid;
}
.location_form__body__content__label--medium {
  font-size: 13px;
  margin: 0px;
  margin-bottom: 8px;
}
.location_form__body__content__button {
  width: 91%;
  font-size: 14px;
  font-weight: bold;
}
.location_form__body__content__dropdown {
  background: #efefff;
  width: 91%;
  font-size: 12px;
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.25),
    -2px -2px 4px 1px rgba(255, 255, 255, 0.25);
  border-radius: 6px;
}
</style>
