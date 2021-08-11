<template>
  <div class="step_config_form" v-if="formType === 'pause'">
    <p class="step_config_form__title">Pause</p>
    <div class="step_config_form__body">
      <div class="step_config_form__body__content">
        <div>
          <p class="step_config_form__body__content__label--medium">
            Step Name
          </p>
          <InputText
            type="text"
            class="step_config_form__body__content__input--long"
            v-model="pauseStepName"
          />
        </div>
        <div>
          <p class="step_config_form__body__content__label--medium">
            Pause Time (Seconds)
          </p>
          <InputNumber
            :min="1"
            :max="999999"
            class="step_config_form__body__content__input--short"
            v-model="pauseTime"
            v-tooltip="'Positive integers with range 1 to 999999'"
            :disabled="
              formType !== 'pause' || stepID < 0
                ? true
                : getProtocolStep(stepID).auto_resume
            "
          />
        </div>
        <div>
          <SelectButton
            v-model="pauseAutoResume"
            :options="[
              { name: 'Auto Resume' },
              { name: 'Wait for User Input' },
            ]"
            optionLabel="name"
            class="step_config_form__body__content__toggle_button"
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
 * Accepts user input for the configuration of a pause step within the object in the protocol cache.
 */
export default {
  name: "PauseConfigForm",
  methods: {
    /**
     * Fetches a protocol step by its ID.
     * 
     * @params {number} id - The said ID.
     */
    getProtocolStep(id) {
      return findDeep(this.cachedProtocolSteps, id);
    },
    /**
     * Toggles the auto-resume property of the pause step.
     */
    toggleAutoResume() {
      this.$store.dispatch(types.UPDATE_PAUSE_AUTORESUME, {
        id: this.stepID,
        newValue: !this.getProtocolStep(this.stepID).auto_resume,
      });
    },
  },
  props: {
    /**
     * Determines if this component will be displayed or not (true if its value is set to `pause`).
     */
    formType: String,
    /**
     * Indicates the ID of the user clicked step within the protocol editor UI.
     */
    stepID: Number,
  },
  computed: {
    ...mapGetters(["cachedProtocolSteps"]),
    /**
     * A read/write object for the name of the pause step.
     */
    pauseStepName: {
      get: function() {
        return this.formType !== "pause" || this.stepID < 0
          ? null
          : this.getProtocolStep(this.stepID).name;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_PAUSE_STEP_NAME, {
          id: this.stepID,
          newValue,
        });
      },
    },
    /**
     * A read/write object for the pause-time of the pause step.
     */
    pauseTime: {
      get: function() {
        return this.formType !== "pause" || this.stepID < 0
          ? null
          : this.getProtocolStep(this.stepID).pause_time;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_PAUSE_TIME, {
          id: this.stepID,
          newValue: parseInt(newValue),
        });
      },
    },
    /**
     * A read/write object for the auto-resume property of the pause step.
     */
    pauseAutoResume: {
      get: function() {
        return this.formType !== "pause" || this.stepID < 0
          ? null
          : {
              name: this.getProtocolStep(this.stepID).auto_resume
                ? "Auto Resume"
                : "Wait for User Input",
            };
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_PAUSE_AUTORESUME, {
          id: this.stepID,
          newValue: newValue.name === "Auto Resume" ? true : false,
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
  display: grid;
  overflow: auto;
  height: 65vh;
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
  width: 40%;
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
.step_config_form__body__content__label--medium {
  font-size: 13px;
  margin: 0px;
  margin-bottom: 8px;
}
.step_config_form__body__content__toggle_button {
  font-size: 11px;
  filter: drop-shadow(3px 3px 4px rgba(0, 0, 0, 0.25));
}
</style>
