<template>
  <div class="step_config_form" v-if="formType === 'loop'">
    <p class="step_config_form__title">Loop</p>
    <div class="step_config_form__body">
      <div class="step_config_form__body__content">
        <div>
          <p class="step_config_form__body__content__label--medium">
            Step Name
          </p>
          <InputText
            type="text"
            class="step_config_form__body__content__input--long"
            v-model="loopStepName"
          />
        </div>
        <div>
          <p class="step_config_form__body__content__label--medium">
            Number of Loops
          </p>
          <InputNumber
            :min="1"
            class="step_config_form__body__content__input--short"
            v-model="loopNumber"
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
 * Accepts user input for the configuration of a loop step within the object in the protocol cache (editor).
 */
export default {
  name: "LoopConfigForm",
  methods: {
    /**
     * Fetches a protocol step by its ID.
     * 
     * @params {number} id - The said ID.
     */
    getProtocolStep(id) {
      return findDeep(this.cachedProtocolSteps, id);
    },
  },
  props: {
    /**
     * Determines if this component will be rendered or not (true if its value is set to `loop`).
     */
    formType: String,
    /**
     * The ID of the current user-selected step card.
     */
    stepID: Number,
  },
  computed: {
    ...mapGetters(["cachedProtocolSteps", "nonTipRackLabwares"]),
    /**
     * A read/write object for the name of the user-selected loop step.
     */
    loopStepName: {
      get: function() {
        return this.formType !== "loop" || this.stepID < 0
          ? null
          : this.getProtocolStep(this.stepID).name;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_LOOP_STEP_NAME, {
          id: this.stepID,
          newValue,
        });
      },
    },
    /**
     * A read/write object for the number of loops of the user-selected loop step.
     */
    loopNumber: {
      get: function() {
        return this.formType !== "loop" || this.stepID < 0
          ? null
          : this.getProtocolStep(this.stepID).num_iterations;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_LOOP_NUMBER, {
          id: this.stepID,
          newValue: parseInt(newValue),
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
</style>
