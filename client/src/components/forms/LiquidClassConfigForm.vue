<template>
  <div class="liquid_class_form" v-show="isLiquidClassSelected">
    <div class="liquid_class_form__body">
      <div class="liquid_class_form__body__content">
        <div>
          <p class="liquid_class_form__body__content__label--medium">Name</p>
          <InputText
            type="text"
            class="liquid_class_form__body__content__input--long"
            v-model.lazy="liquidClassName"
          />
        </div>
        <div class="liquid_class_form__body__content__field_group">
          <div>
            <p class="liquid_class_form__body__content__label--medium">
              Blow Out
            </p>
            <Dropdown
              :options="[
                { name: 'True', value: true },
                { name: 'False', value: false },
              ]"
              optionLabel="name"
              placeholder="Select option"
              class="liquid_class_form__body__content__dropdown"
              v-model="liquidClassBlowOut"
              v-tooltip="
                'If True, a blow out will occur following each dispense, but only if the pipette has no liquid left in it.\n\nIf set to False, no blow out will occur.'
              "
            />
          </div>
          <div>
            <p class="liquid_class_form__body__content__label--medium">
              Touch Tip
            </p>
            <Dropdown
              :options="[
                { name: 'True', value: true },
                { name: 'False', value: false },
              ]"
              optionLabel="name"
              placeholder="Select option"
              class="liquid_class_form__body__content__dropdown"
              v-model="liquidClassTouchTip"
              v-tooltip="
                'If True, a touch tip will occur following each aspirate and dispense.\n\nIf set to False, no touch tip will occur.'
              "
            />
          </div>
        </div>
        <div>
          <p class="liquid_class_form__body__content__label--medium">
            Air Gap (μL)
          </p>
          <InputNumber
            :min="0"
            class="liquid_class_form__body__content__input--long"
            :minFractionDigits="2"
            :maxFractionDigits="5"
            v-model.lazy="liquidClassAirGap"
            v-tooltip="
              'Volume [uL] of air pulled in after an aspirate step to prevent liquid dripping'
            "
          />
        </div>
        <div>
          <p class="liquid_class_form__body__content__label--medium">
            Blow Out Location
          </p>
          <Dropdown
            :options="[
              { name: 'Source Well' },
              { name: 'Destination Well' },
              { name: 'Trash' },
            ]"
            optionLabel="name"
            placeholder="Select option"
            class="liquid_class_form__body__content__dropdown--stretch"
            v-model="liquidClassBlowOutLocation"
          />
        </div>
        <div>
          <p class="liquid_class_form__body__content__label--medium">
            Mix Before
          </p>
          <div class="liquid_class_form__body__content__field_group">
            <div>
              <p class="liquid_class_form__body__content__label--min">
                Repetitions
              </p>
              <InputNumber
                :min="0"
                class="liquid_class_form__body__content__input--short"
                v-model.lazy="liquidClassMixBeforeReps"
              />
            </div>
            <div>
              <p class="liquid_class_form__body__content__label--min">
                Volume (μL)
              </p>
              <InputNumber
                :min="0"
                :minFractionDigits="2"
                :maxFractionDigits="5"
                class="liquid_class_form__body__content__input--short"
                v-model.lazy="liquidClassMixBeforeVolume"
              />
            </div>
          </div>
        </div>
        <div>
          <p class="liquid_class_form__body__content__label--medium">
            Mix After
          </p>
          <div class="liquid_class_form__body__content__field_group">
            <div>
              <p class="liquid_class_form__body__content__label--min">
                Repetitions
              </p>
              <InputNumber
                :min="0"
                class="liquid_class_form__body__content__input--short"
                v-model.lazy="liquidClassMixAfterReps"
              />
            </div>
            <div>
              <p class="liquid_class_form__body__content__label--min">
                Volume (μL)
              </p>
              <InputNumber
                :min="0"
                :minFractionDigits="2"
                :maxFractionDigits="5"
                class="liquid_class_form__body__content__input--short"
                v-model.lazy="liquidClassMixAfterVolume"
              />
            </div>
          </div>
        </div>
        <div>
          <p class="liquid_class_form__body__content__label--medium">
            Pipette Rates
          </p>
          <div class="liquid_class_form__body__content__field_group">
            <div>
              <p class="liquid_class_form__body__content__label--min">
                Aspirate Rate
              </p>
              <InputNumber
                :min="0.1"
                :max="2"
                :step="0.1"
                :minFractionDigits="1"
                :maxFractionDigits="1"
                class="liquid_class_form__body__content__input--short"
                v-model.lazy="liquidClassAspirateRate"
              />
            </div>
            <div>
              <p class="liquid_class_form__body__content__label--min">
                Dispense Rate
              </p>
              <InputNumber
                :min="0.1"
                :max="2"
                :step="0.1"
                :minFractionDigits="1"
                :maxFractionDigits="1"
                class="liquid_class_form__body__content__input--short"
                v-model.lazy="liquidClassDispenseRate"
              />
            </div>
          </div>
        </div>
        <div>
          <div class="liquid_class_form__body__content__field_group">
            <div>
              <p class="liquid_class_form__body__content__label--min">
                Blow-Out Rate
              </p>
              <InputNumber
                :min="0.1"
                :max="2"
                :step="0.1"
                :minFractionDigits="1"
                :maxFractionDigits="1"
                class="liquid_class_form__body__content__input--short"
                v-model.lazy="liquidClassBlowOutRate"
              />
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import types from "../../types";

/**
 * Accepts user input on the configuration of a liquid class object within the object in the protocol cache (editor).
 */
export default {
  name: "LiquidClassConfigForm",
  props: {
    /**
     * Indicates the ID of the user selected liquid class within the protocol editor UI.
     */
    lcIdx: Number,
  },
  computed: {
    ...mapGetters(["cachedProtocolLiquidClasses"]),
    /**
     * Indicates if a liquid class card has been selected by the user.
     */
    isLiquidClassSelected() {
      return this.lcIdx !== -1;
    },
    /**
     * A read/write object for the name of a liquid class.
     */
    liquidClassName: {
      get: function() {
        if (
          this.lcIdx >= 0 &&
          this.cachedProtocolLiquidClasses.filter(
            (item) => item.id === this.lcIdx
          )
        )
          return this.cachedProtocolLiquidClasses.filter(
            (item) => item.id === this.lcIdx
          )[0].name;
        return null;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_LIQUID_CLASS_NAME, {
          lcIdx: this.lcIdx,
          value: newValue,
        });
      },
    },
    /**
     * A read/write object for the blow-out property of a liquid class.
     */
    liquidClassBlowOut: {
      get: function() {
        if (
          this.lcIdx >= 0 &&
          this.cachedProtocolLiquidClasses.filter(
            (item) => item.id === this.lcIdx
          )
        ) {
          let value = this.cachedProtocolLiquidClasses.filter(
            (item) => item.id === this.lcIdx
          )[0].liquid_config_object.blow_out;
          if (typeof value === "boolean")
            return {
              name: value ? "True" : "False",
              value,
            };
        }
        return null;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_LIQUID_CLASS_BLOW_OUT, {
          lcIdx: this.lcIdx,
          value: newValue.value,
        });
      },
    },
    /**
     * A read/write object for the carry-over property of a liquid class.
     */
    liquidClassCarryOver: {
      get: function() {
        if (
          this.lcIdx >= 0 &&
          this.cachedProtocolLiquidClasses.filter(
            (item) => item.id === this.lcIdx
          )
        ) {
          let value = this.cachedProtocolLiquidClasses.filter(
            (item) => item.id === this.lcIdx
          )[0].liquid_config_object.carryover;
          if (typeof value === "boolean")
            return {
              name: value ? "True" : "False",
              value,
            };
        }
        return null;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_LIQUID_CLASS_CARRY_OVER, {
          lcIdx: this.lcIdx,
          value: newValue.value,
        });
      },
    },
    /**
     * A read/write object for the touch-tip property of a liquid class.
     */
    liquidClassTouchTip: {
      get: function() {
        if (
          this.lcIdx >= 0 &&
          this.cachedProtocolLiquidClasses.filter(
            (item) => item.id === this.lcIdx
          )
        ) {
          let value = this.cachedProtocolLiquidClasses.filter(
            (item) => item.id === this.lcIdx
          )[0].liquid_config_object.touch_tip;
          if (typeof value === "boolean")
            return {
              name: value ? "True" : "False",
              value,
            };
        }
        return null;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_LIQUID_CLASS_TOUCH_TIP, {
          lcIdx: this.lcIdx,
          value: newValue.value,
        });
      },
    },
    /**
     * A read/write object for the blow-out location property of a liquid class.
     */
    liquidClassBlowOutLocation: {
      get: function() {
        if (
          this.lcIdx >= 0 &&
          this.cachedProtocolLiquidClasses.filter(
            (item) => item.id === this.lcIdx
          )
        ) {
          let value = this.cachedProtocolLiquidClasses
            .filter((item) => item.id === this.lcIdx)[0]
            .liquid_config_object.blowout_location.replace(/\b\w/g, (l) =>
              l.toUpperCase()
            );
          return { name: value };
        }
        return null;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_LIQUID_CLASS_BLOWOUT_LOCATION, {
          lcIdx: this.lcIdx,
          value: newValue.name.replace(/\b\w/g, (l) => l.toLowerCase()),
        });
      },
    },
    /**
     * A read/write object for the air-gap property of a liquid class.
     */
    liquidClassAirGap: {
      get: function() {
        if (
          this.lcIdx >= 0 &&
          this.cachedProtocolLiquidClasses.filter(
            (item) => item.id === this.lcIdx
          )
        )
          return this.cachedProtocolLiquidClasses.filter(
            (item) => item.id === this.lcIdx
          )[0].liquid_config_object.air_gap;
        return null;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_LIQUID_CLASS_AIR_GAP, {
          lcIdx: this.lcIdx,
          value: newValue,
        });
      },
    },
    /**
     * A read/write object for the mix-before reps property of a liquid class.
     */
    liquidClassMixBeforeReps: {
      get: function() {
        if (
          this.lcIdx >= 0 &&
          this.cachedProtocolLiquidClasses.filter(
            (item) => item.id === this.lcIdx
          )
        )
          return this.cachedProtocolLiquidClasses.filter(
            (item) => item.id === this.lcIdx
          )[0].liquid_config_object.mix_before.repetitions;
        return null;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_LIQUID_CLASS_MIX_BEFORE_REPS, {
          lcIdx: this.lcIdx,
          value: newValue,
        });
      },
    },
    /**
     * A read/write object for the mix-before volume of a liquid class.
     */
    liquidClassMixBeforeVolume: {
      get: function() {
        if (
          this.lcIdx >= 0 &&
          this.cachedProtocolLiquidClasses.filter(
            (item) => item.id === this.lcIdx
          )
        )
          return this.cachedProtocolLiquidClasses.filter(
            (item) => item.id === this.lcIdx
          )[0].liquid_config_object.mix_before.volume;
        return null;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_LIQUID_CLASS_MIX_BEFORE_VOLUME, {
          lcIdx: this.lcIdx,
          value: newValue,
        });
      },
    },
    /**
     * A read/write object for the mix-after reps of a liquid class.
     */
    liquidClassMixAfterReps: {
      get: function() {
        if (
          this.lcIdx >= 0 &&
          this.cachedProtocolLiquidClasses.filter(
            (item) => item.id === this.lcIdx
          )
        )
          return this.cachedProtocolLiquidClasses.filter(
            (item) => item.id === this.lcIdx
          )[0].liquid_config_object.mix_after.repetitions;
        return null;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_LIQUID_CLASS_MIX_AFTER_REPS, {
          lcIdx: this.lcIdx,
          value: newValue,
        });
      },
    },
    /**
     * A read/write object for the mix-after volume of a liquid class.
     */
    liquidClassMixAfterVolume: {
      get: function() {
        if (
          this.lcIdx >= 0 &&
          this.cachedProtocolLiquidClasses.filter(
            (item) => item.id === this.lcIdx
          )
        )
          return this.cachedProtocolLiquidClasses.filter(
            (item) => item.id === this.lcIdx
          )[0].liquid_config_object.mix_after.volume;
        return null;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_LIQUID_CLASS_MIX_AFTER_VOLUME, {
          lcIdx: this.lcIdx,
          value: newValue,
        });
      },
    },
    /**
     * A read/write object for the aspirate rate of a liquid class.
     */
    liquidClassAspirateRate: {
      get: function() {
        if (
          this.lcIdx >= 0 &&
          this.cachedProtocolLiquidClasses.filter(
            (item) => item.id === this.lcIdx
          )
        )
          return this.cachedProtocolLiquidClasses.filter(
            (item) => item.id === this.lcIdx
          )[0].liquid_config_object.aspirate_rate;
        return null;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_LIQUID_CLASS_ASPIRATE_RATE, {
          lcIdx: this.lcIdx,
          value: newValue,
        });
      },
    },
    /**
     * A read/write object for the dispense rate of a liquid class.
     */
    liquidClassDispenseRate: {
      get: function() {
        if (
          this.lcIdx >= 0 &&
          this.cachedProtocolLiquidClasses.filter(
            (item) => item.id === this.lcIdx
          )
        )
          return this.cachedProtocolLiquidClasses.filter(
            (item) => item.id === this.lcIdx
          )[0].liquid_config_object.dispense_rate;
        return null;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_LIQUID_CLASS_DISPENSE_RATE, {
          lcIdx: this.lcIdx,
          value: newValue,
        });
      },
    },
    /**
     * A read/write object for the blow-out rate of a liquid class.
     */
    liquidClassBlowOutRate: {
      get: function() {
        if (
          this.lcIdx >= 0 &&
          this.cachedProtocolLiquidClasses.filter(
            (item) => item.id === this.lcIdx
          )
        )
          return this.cachedProtocolLiquidClasses.filter(
            (item) => item.id === this.lcIdx
          )[0].liquid_config_object.blow_out_rate;
        return null;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_LIQUID_CLASS_BLOW_OUT_RATE, {
          lcIdx: this.lcIdx,
          value: newValue,
        });
      },
    },
  },
};
</script>

<style scoped>
.liquid_class_form {
  display: grid;
  padding-top: 20px;
  padding-bottom: 10px;
}
.liquid_class_form__body {
  padding-top: 20px;
  margin-right: 11px;
  display: grid;
  padding-left: 8px;
  overflow: auto;
  box-shadow: 0 -1em 1em -1em #bcbcbc inset;
  border-radius: 5px;
  height: 72vh;
  margin-top: 10px;
}
.liquid_class_form__body__content {
  align-self: start;
  display: grid;
  grid-row-gap: 3vh;
  padding-bottom: 3vh;
}
.liquid_class_form__body__content__field_group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 40px;
}
.liquid_class_form__body__content__label--medium {
  font-size: 13px;
  margin: 0px;
  margin-bottom: 8px;
}
.liquid_class_form__body__content__label--min {
  font-size: 10px;
  margin: 0px;
  margin-bottom: 8px;
}
.liquid_class_form__body__content__input--short {
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
.liquid_class_form__body__content__input--long {
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
.liquid_class_form__body__content__dropdown {
  background: #efefff;
  width: 80%;
  font-size: 9px;
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.25),
    -2px -2px 4px 1px rgba(255, 255, 255, 0.25);
  border-radius: 6px;
}
.liquid_class_form__body__content__dropdown--stretch {
  background: #efefff;
  width: 91%;
  font-size: 9px;
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.25),
    -2px -2px 4px 1px rgba(255, 255, 255, 0.25);
  border-radius: 6px;
}
</style>
