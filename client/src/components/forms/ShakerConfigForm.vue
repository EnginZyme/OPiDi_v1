<template>
  <div class="step_config_form" v-if="formType === 'bioshake_3000t'">
    <p class="step_config_form__title">Shaker</p>
    <div class="step_config_form__body">
      <div class="step_config_form__body__content">
        <div>
          <p class="step_config_form__body__content__label--medium">
            Step Name
          </p>
          <InputText
            type="text"
            class="step_config_form__body__content__input--long"
            v-model="bioshakeStepName"
          />
        </div>
        <div class="form_sub_group">
          <div>
            <p class="step_config_form__body__content__label--medium">
              Speed (rpm)
            </p>
            <InputNumber
              :min="0"
              :max="3000"
              class="step_config_form__body__content__input--short"
              v-model="bioshakeSpeed"
              v-tooltip="'Positive integers ranging from 0 to 3000'"
            />
          </div>
          <div>
            <p class="step_config_form__body__content__label--medium">
              Set Point (°C)
            </p>
            <InputNumber
              :min="0"
              :max="99"
              class="step_config_form__body__content__input--short"
              v-model="bioshakeSetPoint"
              v-tooltip="'Positive integers ranging from 0 to 99'"
            />
          </div>
        </div>
        <div class="form_sub_group">
          <div>
            <p class="step_config_form__body__content__label--medium">
              Temperature Control
            </p>
            <Dropdown
              :options="[
                { name: 'True', value: true },
                { name: 'False', value: false },
              ]"
              optionLabel="name"
              placeholder="Select option"
              class="step_config_form__body__content__dropdown"
              v-model="bioshakeTemperatureControl"
              v-tooltip="'Enables temperature control in this step'"
            />
          </div>
          <div>
            <p class="step_config_form__body__content__label--medium">
              Cool Down
            </p>
            <Dropdown
              :options="[
                { name: 'True', value: true },
                { name: 'False', value: false },
              ]"
              optionLabel="name"
              placeholder="Select option"
              class="step_config_form__body__content__dropdown"
              v-model="bioshakeCoolDown"
              v-tooltip="'Stops temperature control at the end of the step'"
            />
          </div>
        </div>
        <div class="form_sub_group">
          <div>
            <p class="step_config_form__body__content__label--medium">
              Wait for Stop
            </p>
            <Dropdown
              :options="[
                { name: 'True', value: true },
                { name: 'False', value: false },
              ]"
              optionLabel="name"
              placeholder="Select option"
              class="step_config_form__body__content__dropdown"
              v-model="bioshakeWaitForStop"
              v-tooltip="
                'If True the step will lock the protocol waiting for the shakers stop-home signal'
              "
            />
          </div>
          <div>
            <p class="step_config_form__body__content__label--medium">
              Force Stop
            </p>
            <Dropdown
              :options="[
                { name: 'True', value: true },
                { name: 'False', value: false },
              ]"
              optionLabel="name"
              placeholder="Select option"
              class="step_config_form__body__content__dropdown"
              v-model="bioshakeForceStop"
              v-tooltip="
                'If True a signal is sent to immediately stop the shaker'
              "
            />
          </div>
        </div>
        <div>
          <p class="step_config_form__body__content__label--medium">Duration</p>
          <div class="form_sub_group">
            <div>
              <p class="step_config_form__body__content__label--min">Value</p>
              <InputNumber
                :min="1"
                :max="999999"
                class="step_config_form__body__content__input--short"
                v-model="bioshakeDuration"
                v-tooltip="'Positive integers ranging from 1 to 999999'"
              />
            </div>
            <div>
              <p class="step_config_form__body__content__label--min">Unit</p>
              <Dropdown
                :options="[
                  { name: 'Seconds' },
                  { name: 'Minutes' },
                  { name: 'Hours' },
                ]"
                optionLabel="name"
                placeholder="Select option"
                class="step_config_form__body__content__dropdown"
                v-model="durationUnit"
              />
            </div>
          </div>
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
 * Accepts user input on the configuration of a user selected shaker step within the protocol cache object.
 */
export default {
  name: "ShakerConfigForm",
  methods: {
    getProtocolStep(id) {
      return findDeep(this.cachedProtocolSteps, id);
    },
  },
  props: {
    /**
     * Determines if this component will be rendered or not (true if its value is set to `bioshake_3000t`).
     */
    formType: String,
    /**
     * Indicates the index of the user selected step card within the protocol editor UI.
     */
    stepID: Number,
  },
  data() {
    return {
      /**
       * Points to the unit object for the duration.
       */
      durationUnit: { name: "Seconds" },
    };
  },
  computed: {
    ...mapGetters(["cachedProtocolSteps", "nonTipRackLabwares"]),
    /**
     * A read/write object for the name of the bioshake step.
     */
    bioshakeStepName: {
      get: function() {
        return this.formType !== "bioshake_3000t" || this.stepID < 0
          ? null
          : this.getProtocolStep(this.stepID).name;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_BIOSHAKE_STEP_NAME, {
          id: this.stepID,
          newValue,
        });
      },
    },
    /**
     * A read/write object for the speed property of the bioshake step.
     */
    bioshakeSpeed: {
      get: function() {
        return this.formType !== "bioshake_3000t" || this.stepID < 0
          ? null
          : this.getProtocolStep(this.stepID).parameters.speed;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_BIOSHAKE_SPEED, {
          id: this.stepID,
          newValue: parseInt(newValue),
        });
      },
    },
    /**
     * A read/write object for the set-point property of the bioshake step.
     */
    bioshakeSetPoint: {
      get: function() {
        return this.formType !== "bioshake_3000t" || this.stepID < 0
          ? null
          : this.getProtocolStep(this.stepID).parameters.setpoint;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_BIOSHAKE_SETPOINT, {
          id: this.stepID,
          newValue: parseFloat(newValue),
        });
      },
    },
    /**
     * A read/write object for the temperature-control property of the bioshake step.
     */
    bioshakeTemperatureControl: {
      get: function() {
        return this.formType !== "bioshake_3000t" || this.stepID < 0
          ? null
          : {
              value: this.getProtocolStep(this.stepID).parameters.tempControl,
              name: this.getProtocolStep(this.stepID).parameters.tempControl
                ? "True"
                : "False",
            };
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_BIOSHAKE_TEMPERATURE_CONTROL, {
          id: this.stepID,
          newValue: newValue.value,
        });
      },
    },
    /**
     * A read/write object for the cool-down property of the bioshake step.
     */
    bioshakeCoolDown: {
      get: function() {
        return this.formType !== "bioshake_3000t" || this.stepID < 0
          ? null
          : {
              value: this.getProtocolStep(this.stepID).parameters.cooldown,
              name: this.getProtocolStep(this.stepID).parameters.cooldown
                ? "True"
                : "False",
            };
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_BIOSHAKE_COOLDOWN, {
          id: this.stepID,
          newValue: newValue.value,
        });
      },
    },
    /**
     * A read/write object for the wait-for-stop property of the bioshake step.
     */
    bioshakeWaitForStop: {
      get: function() {
        return this.formType !== "bioshake_3000t" || this.stepID < 0
          ? null
          : {
              value: this.getProtocolStep(this.stepID).parameters.wait_for_stop,
              name: this.getProtocolStep(this.stepID).parameters.wait_for_stop
                ? "True"
                : "False",
            };
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_BIOSHAKE_WAIT_FOR_STOP, {
          id: this.stepID,
          newValue: newValue.value,
        });
      },
    },
    /**
     * A read/write object for the force-stop property of the bioshake step.
     */
    bioshakeForceStop: {
      get: function() {
        return this.formType !== "bioshake_3000t" || this.stepID < 0
          ? null
          : {
              value: this.getProtocolStep(this.stepID).parameters.force_stop,
              name: this.getProtocolStep(this.stepID).parameters.force_stop
                ? "True"
                : "False",
            };
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_BIOSHAKE_FORCE_STOP, {
          id: this.stepID,
          newValue: newValue.value,
        });
      },
    },
    /**
     * A read/write object for the duration property of the bioshake step.
     */
    bioshakeDuration: {
      get: function() {
        if (this.durationUnit.name === "Minutes") {
          return this.formType !== "bioshake_3000t" || this.stepID < 0
            ? null
            : this.getProtocolStep(this.stepID).parameters.duration / 60;
        } else if (this.durationUnit.name === "Hours") {
          return this.formType !== "bioshake_3000t" || this.stepID < 0
            ? null
            : this.getProtocolStep(this.stepID).parameters.duration / 3600;
        } else {
          return this.formType !== "bioshake_3000t" || this.stepID < 0
            ? null
            : this.getProtocolStep(this.stepID).parameters.duration;
        }
      },
      set: function(newValue) {
        if (this.durationUnit.name === "Minutes") {
          this.$store.dispatch(types.UPDATE_BIOSHAKE_DURATION, {
            id: this.stepID,
            newValue: parseInt(newValue) * 60,
          });
        } else if (this.durationUnit.name === "Hours") {
          this.$store.dispatch(types.UPDATE_BIOSHAKE_DURATION, {
            id: this.stepID,
            newValue: parseInt(newValue) * 3600,
          });
        } else {
          this.$store.dispatch(types.UPDATE_BIOSHAKE_DURATION, {
            id: this.stepID,
            newValue: parseInt(newValue),
          });
        }
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
.form_sub_group {
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
  width: 80%;
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
