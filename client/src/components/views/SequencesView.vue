<template>
  <div>
    <div class="sequences_view">
      <div
        class="sequences_view__sequences_view__body__main_view__content__header"
      >
        <div
          class="sequences_view__sequences_view__body__main_view__content__header__title"
        >
          <span
            class="sequences_view__sequences_view__body__main_view__content__header__title__text"
            >Sequences</span
          >
        </div>
      </div>
      <div class="sequences_view__body">
        <div class="sequences_view__body__side_panel">
          <Button
            label="Location Sequences"
            class="p-button-text sequences_view__body__side_panel__small_font"
            :class="activeTab === 0 ? '' : 'p-button-secondary'"
            @click="toLocationSequencesTab"
          />
        </div>
        <div class="sequences_view__body__main_view">
          <div class="sequences_view__body__main_view__content">
            <p class="sequences_view__body__main_view__content__header">
              Location Sequences
            </p>
            <div
              class="sequences_view__body__main_view__content__crud_button_group"
            >
              <Button
                label="Add Sequence +"
                class="sequences_view__body__main_view__content__crud_button_group__add_button"
                @click="createNewSequence"
              />
              <Button
                icon="pi pi-copy"
                class="p-button-raised p-button-primary p-button-text"
                @click="triggerDuplicate"
              />
              <Button
                icon="pi pi-trash"
                class="p-button-raised p-button-danger p-button-text"
                @click="triggerDelete"
              />
              <Dialog
                header="Confirmation"
                :visible="shouldDisplayDeleteConfirmationModal"
                :style="{ width: '420px', fontSize: '15px' }"
                :modal="true"
                :closable="false"
                :position="'top'"
              >
                <div class="confirmation-content">
                  <span
                    >Are you sure you want to delete the
                    <b>{{
                      getSelectedLocation() ? getSelectedLocation().name : ""
                    }}</b>
                    {{
                      formType === "location"
                        ? "location"
                        : "location sequence"
                    }}?</span
                  >
                </div>
                <template #footer>
                  <Button
                    label="No"
                    @click="closeDeleteConfirmation"
                    class="p-button-text"
                    autofocus
                  />
                  <Button
                    label="Yes"
                    @click="deleteLocation"
                    class="p-button-text"
                  />
                </template>
              </Dialog>
            </div>
            <div
              class="sequences_view__body__main_view__content__step_cards_area"
            >
              <div
                class="sequences_view__body__main_view__content__step_cards_area__content"
              >
                <template v-for="(sequence, index) in cachedProtocolSequences">
                  <div
                    class="sequences_view__body__main_view__content__step_cards_area__sub_cards_area"
                    :key="index"
                  >
                    <div
                      class="sequences_view__body__main_view__content__step_cards_area__card"
                      :class="
                        stepID === `${cachedProtocolSequences[index].id}`
                          ? 'sequences_view__body__main_view__content__step_cards_area__card--chosen'
                          : ''
                      "
                      :key="`${cachedProtocolSequences[index].id}`"
                      @click="
                        stepID = `${cachedProtocolSequences[index].id}`;
                        formType = 'sequence';
                      "
                    >
                      <p
                        class="sequences_view__body__main_view__content__step_cards_area__card__main_text"
                      >
                        {{ sequence.name }}
                      </p>
                      <p
                        class="sequences_view__body__main_view__content__step_cards_area__card__sub_text"
                      >
                        Location Sequence
                      </p>
                    </div>
                    <template v-if="sequence.locations.length">
                      <div
                        class="sequences_view__body__main_view__content__step_cards_area__card--indented"
                        :class="
                          stepID ===
                          `${cachedProtocolSequences[index].id}-${cachedProtocolSequences[index].locations[idx].id}`
                            ? 'sequences_view__body__main_view__content__step_cards_area__card--chosen'
                            : ''
                        "
                        v-for="(location, idx) in sequence.locations"
                        :key="
                          `${cachedProtocolSequences[index].id}-${cachedProtocolSequences[index].locations[idx].id}`
                        "
                        @click="
                          stepID = `${cachedProtocolSequences[index].id}-${cachedProtocolSequences[index].locations[idx].id}`;
                          formType = 'location';
                        "
                      >
                        <p
                          class="sequences_view__body__main_view__content__step_cards_area__card__main_text"
                        >
                          {{
                            location.slot_number !== -1
                              ? cachedProtocolDeck.slots[location.slot_number]
                                  .display_name
                              : ""
                          }}
                        </p>
                        <p
                          class="sequences_view__body__main_view__content__step_cards_area__card__sub_text"
                        >
                          Location
                        </p>
                      </div>
                    </template>
                    <div
                      class="sequences_view__body__main_view__content__step_cards_area__card_button"
                      :key="`button-${cachedProtocolSequences[index].id}`"
                      @click="
                        createNewLocation(cachedProtocolSequences[index].id)
                      "
                    >
                      <p
                        class="sequences_view__body__main_view__content__step_cards_area__card_button__text"
                      >
                        Add Location +
                      </p>
                    </div>
                  </div>
                </template>
                <br />
              </div>
            </div>
          </div>
          <div class="sequences_view__body__main_view__side_panel">
            <LocationSequenceConfigForm :seqIdx="seqIdx" :formType="formType" />
            <LocationConfigForm
              :locIdx="locIdx"
              :seqIdx="seqIdx"
              :formType="formType"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import types from "../../types";
import LocationConfigForm from "../forms/LocationConfigForm.vue";
import LocationSequenceConfigForm from "../forms/LocationSequenceConfigForm.vue";

/**
 * A component that renders the protocol sequences view.
 */
export default {
  components: { LocationSequenceConfigForm, LocationConfigForm },
  name: "SequencesView",
  data() {
    return {
      /**
       * Determines which sequences view tab is visible.
       */
      activeTab: 0,
      /**
       * Determines if the delete confirmation modal is visible.
       */
      shouldDisplayDeleteConfirmationModal: false,
    };
  },
  computed: {
    ...mapGetters([
      "cachedProtocolSequences",
      "protocolEditorVariables",
      "cachedProtocolDeck",
      "cachedProtocol",
    ]),
    /**
     * The index of the user selected location card.
     */
    locIdx() {
      if (!this.stepID.length) return -1;
      if (this.formType === "location")
        return parseInt(this.stepID.split("-")[1]);
      return -1;
    },
    /**
     * The index of the user selected location sequence card.
     */
    seqIdx() {
      if (!this.stepID.length) return -1;
      if (this.formType === "location")
        return parseInt(this.stepID.split("-")[0]);
      return parseInt(this.stepID);
    },
    /**
     * A read write object for the location sequence step ID property.
     */
    stepID: {
      get: function() {
        return this.protocolEditorVariables.locSeqID;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_LOCATION_SEQUENCE_VARIABLES, {
          locSeqID: newValue,
        });
      },
    },
    /**
     * A read/write object for the location sequence form type.
     */
    formType: {
      get: function() {
        return this.protocolEditorVariables.locSeqCategory;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_LOCATION_SEQUENCE_VARIABLES, {
          locSeqCategory: newValue,
        });
      },
    },
  },
  methods: {
    /**
     * Initiates the deletion of a location or location sequence.
     */
    triggerDelete() {
      if (this.stepID.length) this.shouldDisplayDeleteConfirmationModal = true;
    },
    /**
     * Initiates the duplication of a location or location sequence.
     */
    triggerDuplicate() {
      if (this.stepID.length) this.duplicateSequence();
    },
    /**
     * Closes the delete confirmation dialog.
     */
    closeDeleteConfirmation() {
      this.shouldDisplayDeleteConfirmationModal = false;
    },
    /**
     * Duplicates a location sequence.
     */
    duplicateSequence() {
      if (this.formType === "sequence") {
        this.$store
          .dispatch(types.DUPLICATE_LOCATION_SEQUENCE, this.seqIdx)
          .then(() => {
            this.$toast.add({
              severity: "info",
              summary: "Notification",
              detail: "Location Sequence Duplicated",
              life: 1700,
            });
          });
      } else {
        this.$store
          .dispatch(types.DUPLICATE_LOCATION, {
            seqIdx: this.seqIdx,
            locIdx: this.locIdx,
          })
          .then(() => {
            this.$toast.add({
              severity: "info",
              summary: "Notification",
              detail: "Location Duplicated",
              life: 1700,
            });
          });
      }
    },
    /**
     * Deletes a location.
     */
    deleteLocation() {
      if (this.formType === "sequence") {
        this.$store
          .dispatch(types.DELETE_LOCATION_SEQUENCE, this.seqIdx)
          .then(() => {
            this.shouldDisplayDeleteConfirmationModal = false;
            this.$toast.add({
              severity: "info",
              summary: "Notification",
              detail: "Location Sequence Deleted",
              life: 1700,
            });
          });
      } else {
        this.$store
          .dispatch(types.DELETE_LOCATION, {
            seqIdx: this.seqIdx,
            locIdx: this.locIdx,
          })
          .then(() => {
            this.shouldDisplayDeleteConfirmationModal = false;
            this.$toast.add({
              severity: "info",
              summary: "Notification",
              detail: "Location Deleted",
              life: 1700,
            });
          });
      }
    },
    /**
     * Routes to location sequences tab.
     */
    toLocationSequencesTab() {
      this.activeTab = 0;
    },
    /**
     * Returns the currently selected location.
     */
    getSelectedLocation() {
      if (this.formType === "location") {
        return this.cachedProtocolSequences
          .filter((item) => item.id === this.seqIdx)[0]
          .locations.filter((item) => item.id === this.locIdx)[0];
      }
      return this.cachedProtocolSequences.filter(
        (item) => item.id === this.seqIdx
      )[0];
    },
    /**
     * Creates a new location sequence.
     */
    createNewSequence() {
      this.$store.dispatch(types.CREATE_LOCATION_SEQUENCE).then(() => {
        this.stepID = `${this.cachedProtocol.protocol.sequenceCounter - 1}`;
        this.formType = "sequence";
      });
    },
    /**
     * Creates a new location within a parent location sequence.
     *
     * @param {number} idx - The ID of the said parent location sequence.
     */
    createNewLocation(idx) {
      this.$store.dispatch(types.CREATE_LOCATION, idx).then(() => {
        let sequence = this.cachedProtocolSequences.filter(
          (item) => item.id === idx
        )[0];
        this.stepID = `${idx}-${sequence.locationCounter - 1}`;
        this.formType = "location";
      });
    },
  },
};
</script>

<style type="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap");

.sequences_view__sequences_view__body__main_view__content__header__title__text {
  font-weight: 600;
  font-size: 18px;
  color: #040716;
  margin-left: 32px;
}
.sequences_view {
  min-height: 650px;
  min-width: 1000px;
  width: 95%;
  height: 90vh;
  background: #efefff;
  box-shadow: 6px 6px 9px 4px rgba(0, 0, 0, 0.25),
    -10px -10px 9px 4px rgba(255, 255, 255, 0.25);
  border-radius: 5px;
  display: grid;
  align-self: center;
  justify-self: center;
  grid-template-columns: auto;
  grid-template-rows: auto 1fr;
}
.sequences_view__sequences_view__body__main_view__content__header {
  height: 48px;
  background: #efefff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: grid;
  align-content: center;
}
.sequences_view__body__side_panel__small_font {
  font-size: 12px;
  text-align: left;
  margin-left: 12px;
  margin-right: 12px;
}
.sequences_view__body {
  display: grid;
  grid-template-columns: minmax(200px, 15%) auto;
}
.sequences_view__body__side_panel {
  display: grid;
  grid-template-rows: 30px 30px;
  margin-top: 80px;
  margin-left: 15px;
  grid-auto-columns: 170px;
  grid-row-gap: 8px;
}
.sequences_view__body__main_view {
  display: grid;
  grid-template-columns: auto minmax(400px, 30%);
  grid-column-gap: 12px;
  padding-right: 20px;
}
.sequences_view__body__main_view__content {
  display: grid;
  grid-template-rows: 65px auto auto;
  padding-top: 10px;
  padding-left: 8px;
}
.sequences_view__body__main_view__side_panel {
  margin: 16px 0px 16px 0px;
  background: #efefff;
  box-shadow: 2px 2px 9px rgba(0, 0, 0, 0.25);
  display: grid;
  padding-top: 10px;
  padding-left: 40px;
}
.sequences_view__body__main_view__content__header {
  font-size: 18px;
  color: #040716;
}
.sequences_view__body__main_view__content__crud_button_group__add_button {
  width: 150px;
  height: 32px;
  background: #1246a9;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25),
    -3px -3px 4px 3px rgba(255, 255, 255, 0.25);
  border-radius: 6px;
  font-size: 14px;
  color: #efefff;
}
.sequences_view__body__main_view__content__step_cards_area__content {
  display: grid;
  grid-auto-rows: auto;
  grid-row-gap: 32px;
  margin-top: 24px;
  margin-bottom: 20px;
  padding-top: 20px;
  overflow: auto;
}
.sequences_view__body__main_view__content__step_cards_area__sub_cards_area {
  display: grid;
  grid-auto-rows: auto;
  grid-row-gap: 9px;
}
.sequences_view__body__main_view__content__step_cards_area__card--indented {
  width: 310px;
  height: 48px;
  display: grid;
  grid-template-rows: 12px 10px;
  grid-row-gap: 5px;
  background: #efefff;
  box-shadow: 2px 2px 9px 2px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  padding-left: 33px;
  padding-right: 16px;
  padding-top: 14px;
  padding-bottom: 2px;
  margin-left: 30px;
  cursor: pointer;
}
.sequences_view__body__main_view__content__step_cards_area__card_button {
  width: 150px;
  height: 40px;
  display: grid;
  grid-template-rows: 12px;
  background: #efefff;
  box-shadow: 2px 2px 9px 2px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  padding-left: 33px;
  padding-right: 16px;
  margin-left: 30px;
  cursor: pointer;
}
.sequences_view__body__main_view__content__step_cards_area__card {
  width: 310px;
  height: 48px;
  display: grid;
  grid-template-rows: 12px 10px;
  grid-row-gap: 5px;
  background: #efefff;
  box-shadow: 2px 2px 9px 2px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  padding-left: 33px;
  padding-right: 16px;
  padding-top: 14px;
  padding-bottom: 2px;
  margin-left: 10px;
  cursor: pointer;
}
.sequences_view__body__main_view__content__step_cards_area__card--chosen {
  box-shadow: 4px 4px 4px 2px rgba(255, 255, 255, 0.25),
    2px 2px 9px 2px #2196f3aa;
}
.sequences_view__body__main_view__content__step_cards_area__card:active,
.sequences_view__body__main_view__content__step_cards_area__card--indented:active,
.sequences_view__body__main_view__content__step_cards_area__card_button:active {
  border: thin solid #2196f3aa;
}
.sequences_view__body__main_view__content__step_cards_area__card__main_text {
  width: 232px;
  height: 16px;
  font-size: 12px;
  color: #040716;
  font-family: "Rubik", sans-serif;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0px;
}
.sequences_view__body__main_view__content__step_cards_area__card_button__text {
  color: #2196f3;
  font-size: 12px;
}
.sequences_view__body__main_view__content__step_cards_area__card__sub_text {
  font-size: 10px;
  color: #767676;
  justify-self: end;
  margin: 0px;
}
.sequences_view__body__main_view__content__crud_button_group {
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: start;
  grid-column-gap: 8px;
}
.sequences_view__body__main_view__content__step_cards_area {
  height: 65vh;
  overflow: auto;
}
</style>
