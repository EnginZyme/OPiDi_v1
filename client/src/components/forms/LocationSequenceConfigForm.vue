<template>
  <div class="step_config_form" v-if="formType === 'sequence'">
    <p class="step_config_form__title">Location Sequence</p>
    <div class="step_config_form__body">
      <div class="step_config_form__body__content">
        <div>
          <p class="step_config_form__body__content__label--medium">Name</p>
          <InputText
            type="text"
            class="step_config_form__body__content__input--long"
            v-model.lazy="sequenceName"
          />
        </div>
        <div>
          <p class="step_config_form__body__content__label--medium">
            Number of Wells
          </p>
          <InputText
            type="text"
            :class="locationWellNumberInputClass"
            :value="locationsWellNumber"
            readonly
          />
          <p
            class="p-error step_config_form__body__content__text--error"
            v-if="assertLocationSequenceHasNoLocations"
          >
            * Please add a location
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import types from "../../types";

/**
 * Accepts user input for the configuration of a sequence object within the object in the protocol cache.
 */
export default {
  name: "LocationSequenceConfigForm",
  props: {
    /**
     * Determines if this component will be rendered or not (true if its value is set to `sequence`).
     */
    formType: String,
    /**
     * The ID of the user clicked sequence card within the protocol editor UI.
     */
    seqIdx: Number,
  },
  computed: {
    ...mapGetters(["cachedProtocolSequences"]),
    /**
     * Asserts if the user-selected location sequence has no locations.
     */
    assertLocationSequenceHasNoLocations() {
      return (
        this.seqIdx >= 0 &&
        this.cachedProtocolSequences.filter((item) => item.id === this.seqIdx)[0]
          .locations.length === 0
      );
    },
    /**
     * Returns the appropriate class of the location well number input element.
     */
    locationWellNumberInputClass() {
      return this.seqIdx >= 0 &&
        this.cachedProtocolSequences.filter((item) => item.id === this.seqIdx)[0]
          .locations.length === 0
        ? "step_config_form__body__content__input--invalid"
        : "step_config_form__body__content__input--long";
    },
    /**
     * Returns the number of wells present within the user-selected location sequence.
     */
    locationsWellNumber() {
      if (
        this.seqIdx >= 0 &&
        this.cachedProtocolSequences.filter((item) => item.id === this.seqIdx)[0]
          .locations.length
      ) {
        return this.cachedProtocolSequences
          .filter((item) => item.id === this.seqIdx)[0]
          .locations.map((item) => item.wells.length)
          .reduce((acc, val) => acc + val);
      }
      return 0;
    },
    /**
     * A read/write object for the sequence name of the user-selected location sequence.
     */
    sequenceName: {
      get: function() {
        if (this.seqIdx >= 0)
          return this.cachedProtocolSequences.filter(
            (item) => item.id === this.seqIdx
          )[0].name;
        return null;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_SEQUENCE_NAME, {
          seqIdx: this.seqIdx,
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
}
.step_config_form__title {
  font-size: 18px;
  margin: 0px;
}
.step_config_form__body__content {
  grid-row-gap: 3vh;
  align-self: center;
  display: grid;
}
.step_config_form__body {
  display: grid;
  height: 65vh;
  padding-left: 16px;
}
.step_config_form__body__content__label--medium {
  font-size: 13px;
  margin: 0px;
  margin-bottom: 8px;
}
.step_config_form__body__content__input--invalid {
  background: #efefff;
  box-shadow: inset 2px 2px 4px rgba(241, 3, 3, 0.25),
    inset -2px -2px 4px 3px rgba(255, 255, 255, 0.25),
    inset -2px -2px 4px 3px rgba(255, 255, 255, 0.25);
  border-radius: 6px;
  font-size: 12px;
  width: 89%;
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
  width: 89%;
  height: 32px;
  border: none;
}
.step_config_form__body__content__text--error {
  font-size: 14px;
}
</style>
