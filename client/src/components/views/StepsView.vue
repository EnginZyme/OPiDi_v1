<template>
  <div>
    <div class="steps_view">
      <div class="steps_view__header">
        <div class="steps_view__title">
          <span class="steps_view__title__text">Steps</span>
        </div>
      </div>
      <div class="steps_view__body">
        <div class="steps_view__body__main_view">
          <div class="steps_view__body__main_view__crud_button_group">
            <Button
              label="Add Step +"
              class="steps_view__body__main_view__crud_button_group__add_button"
              @click="toggle"
              aria-haspopup="true"
              aria-controls="step_menu"
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
              :visible="shouldDisplayStepDeleteConfirmationModal"
              :style="{ width: '420px', fontSize: '15px' }"
              :modal="true"
              :closable="false"
              :position="'top'"
            >
              <div class="confirmation-content">
                <span
                  >Are you sure you want to delete the
                  <b>{{
                    getProtocolStep(stepID) ? getProtocolStep(stepID).name : ""
                  }}</b>
                  step?</span
                >
              </div>
              <template #footer>
                <Button
                  label="No"
                  @click="closeDeleteConfirmationModal"
                  class="p-button-text"
                  autofocus
                />
                <Button label="Yes" @click="deleteStep" class="p-button-text" />
              </template>
            </Dialog>
          </div>
          <Menu id="step_menu" ref="step_menu" :model="items" :popup="true" />
          <div class="steps_view__body__main_view__steps_area">
            <StepCardsView ref="step_cards" v-model="stepsList" />
            <br />
          </div>
        </div>
        <div class="steps_view__body__side_panel">
          <LoopConfigForm :formType="formType" :stepID="stepID" />
          <PauseConfigForm :formType="formType" :stepID="stepID" />
          <ArrayTransferConfigForm :formType="formType" :stepID="stepID" />
          <SequenceTransferConfigForm :formType="formType" :stepID="stepID" />
          <SimpleTransferConfigForm :formType="formType" :stepID="stepID" />
          <SlackMessageConfigForm :formType="formType" :stepID="stepID" />
          <TimerConfigForm :formType="formType" :stepID="stepID" />
          <ShakerConfigForm :formType="formType" :stepID="stepID" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import types from "../../types";
import StepCardsView from "./StepCardsView";
import LoopConfigForm from "../forms/LoopConfigForm";
import ArrayTransferConfigForm from "../forms/ArrayTransferConfigForm";
import PauseConfigForm from "../forms/PauseConfigForm";
import SequenceTransferConfigForm from "../forms/SequenceTransferConfigForm";
import ShakerConfigForm from "../forms/ShakerConfigForm";
import SimpleTransferConfigForm from "../forms/SimpleTransferConfigForm";
import SlackMessageConfigForm from "../forms/SlackMessageConfigForm";
import TimerConfigForm from "../forms/TimerConfigForm";
import { mapGetters } from "vuex";
import { findDeep } from "../../utils";

function getProtocolStepDataList() {
  return [
    ["Array Transfer", "array_transfer"],
    ["Loop", "loop"],
    ["Pause", "pause"],
    ["Sequence Transfer", "sequence_transfer"],
    ["Bioshake 3000T", "bioshake_3000t"],
    ["Simple Transfer", "simple_transfer"],
    ["Slack Message", "slack_message"],
    ["Timer", "timer"],
  ];
}

/**
 * A component that renders the steps view.
 */
export default {
  name: "StepsView",
  data() {
    return {
      /**
       * Determines if the step deletion confirmation modal is visible.
       */
      shouldDisplayStepDeleteConfirmationModal: false,
      /**
       * Determines if the step duplication confirmation modal is visible.
       */
      shouldDisplayStepDuplicationConfirmationModal: false,
      items: getProtocolStepDataList().map((tuple) => ({
        label: tuple[0],
        command: () => {
          this.createStep(tuple[1]);
        },
      })),
    };
  },
  components: {
    LoopConfigForm,
    ArrayTransferConfigForm,
    PauseConfigForm,
    SequenceTransferConfigForm,
    SimpleTransferConfigForm,
    ShakerConfigForm,
    SlackMessageConfigForm,
    TimerConfigForm,
    StepCardsView,
  },
  methods: {
    /**
     * Initiates the deletion of the selected step.
     */
    triggerDelete() {
      if (this.stepID >= 0) this.shouldDisplayStepDeleteConfirmationModal = true;
    },
    /**
     * Initiates the duplication of the selected step.
     */
    triggerDuplicate() {
      if (this.stepID >= 0) this.duplicateStep();
    },
    /**
     * Closes the delete confirmation modal.
     */
    closeDeleteConfirmationModal() {
      this.shouldDisplayStepDeleteConfirmationModal = false;
    },
    /**
     * Closes the duplication confirmation modal.
     */
    closeDuplicationConfirmationModal() {
      this.shouldDisplayStepDuplicationConfirmationModal = false;
    },
    /**
     * Deletes the selected step.
     */
    deleteStep() {
      this.$store.dispatch(types.DELETE_STEP, this.stepID).then(() => {
        this.shouldDisplayStepDeleteConfirmationModal = false;
        this.$toast.add({
          severity: "info",
          summary: "Notification",
          detail: "Step Deleted",
          life: 1700,
        });
      });
    },
    /**
     * Duplicates the selected step.
     */
    duplicateStep() {
      this.$store.dispatch(types.DUPLICATE_STEP, this.stepID).then(() => {
        this.closeDuplicationConfirmationModal();
        this.$toast.add({
          severity: "info",
          summary: "Notification",
          detail: "Step Duplicated",
          life: 1700,
        });
      });
    },
    /**
     * Creates a new step of a given category.
     *
     * @param {string} category - The referenced category.
     */
    createStep(category) {
      this.$store.dispatch(types.CREATE_STEP, category).then(() => {
        this.stepID = this.cachedProtocolStepCounter - 1;
        this.formType = category;
        this.$refs["step_cards"].stepID = this.cachedProtocolStepCounter - 1;
        this.$refs["step_cards"].formType = category;
      });
    },
    toggle(event) {
      this.$refs.step_menu.toggle(event);
    },
    /**
     * Fetches a protocol step by its ID.
     *
     * @param {string} id - The said ID.
     */
    getProtocolStep(id) {
      return findDeep(this.cachedProtocolSteps, id);
    },
  },
  computed: {
    ...mapGetters([
      "cachedProtocolSteps",
      "cachedProtocolStepCounter",
      "protocolEditorVariables",
    ]),
    /**
     * A read/write object for the ID of the currently selected step.
     */
    stepID: {
      get: function() {
        return this.protocolEditorVariables.stepsstepID;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_STEP_VARIABLES, {
          stepsstepID: newValue,
        });
      },
    },
    /**
     * A read/write object for the category of the currently selected step.
     */
    formType: {
      get: function() {
        return this.protocolEditorVariables.stepsFormType;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_STEP_VARIABLES, {
          stepsFormType: newValue,
        });
      },
    },
    /**
     * A read/write object for the list of all created steps.
     */
    stepsList: {
      get: function() {
        return this.cachedProtocolSteps;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_CACHED_PROTOCOL_STEPS, newValue);
      },
    },
  },
};
</script>

<style type="scss" scoped>
.steps_view__title__text {
  font-weight: 600;
  font-size: 18px;
  color: #040716;
  margin-left: 32px;
}
.steps_view {
  min-height: 650px;
  min-width: 1000px;
  width: 95%;
  height: 90vh;
  align-self: center;
  justify-self: center;
  background: #efefff;
  box-shadow: 6px 6px 9px 4px rgba(0, 0, 0, 0.25),
    -10px -10px 9px 4px rgba(255, 255, 255, 0.25);
  border-radius: 5px;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto 1fr;
}
.steps_view__header {
  height: 48px;
  background: #efefff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: grid;
  align-content: center;
}
.steps_view__body {
  display: grid;
  grid-template-columns: auto minmax(400px, 30%);
  grid-column-gap: 12px;
  padding-right: 20px;
}
.steps_view__body__main_view {
  display: grid;
  grid-template-rows: 1fr 7fr;
  padding-top: 44px;
  padding-left: 48px;
}
.steps_view__body__side_panel {
  margin: 16px 0px 16px 0px;
  background: #efefff;
  box-shadow: 2px 2px 9px rgba(0, 0, 0, 0.25);
  display: grid;
  padding-top: 10px;
  padding-left: 30px;
  padding-right: 10px;
}
.steps_view__body__main_view__crud_button_group__add_button {
  width: 112px;
  height: 32px;
  background: #1246a9;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25),
    -3px -3px 4px 3px rgba(255, 255, 255, 0.25);
  border-radius: 6px;
  font-size: 14px;
  color: #efefff;
}
.steps_view__body__main_view__steps_area {
  padding-bottom: 30px;
  padding-top: 20px;
  height: 65vh;
  overflow: auto;
}
.steps_view__body__main_view__crud_button_group {
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: start;
  grid-column-gap: 8px;
}
</style>
