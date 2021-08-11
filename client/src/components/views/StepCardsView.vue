<template>
  <draggable
    class="step_cards_view__step_cards_view"
    v-bind="dragOptions"
    :list="list"
    :value="value"
    tag="div"
    @start="dragging = true"
    @end="dragging = false"
    @input="emitter"
  >
    <div v-for="step in realValue" :key="step.id">
      <div
        v-if="step.type === 'loop'"
        class="step_cards_view__step_card"
        :class="stepID === step.id ? 'step_cards_view__step_card--chosen' : ''"
        @click="
          stepID = step.id;
          formType = step.type;
        "
        v-badge="step.num_iterations"
      >
        <p class="step_cards_view__step_card__main_text">{{ step.name }}</p>
        <p class="step_cards_view__step_card__sub_text">
          {{ getFormTitleFromStepType(step.type) }}
        </p>
      </div>
      <div
        v-else
        class="step_cards_view__step_card"
        :class="stepID === step.id ? 'step_cards_view__step_card--chosen' : ''"
        @click="
          stepID = step.id;
          formType = step.type;
        "
      >
        <p class="step_cards_view__step_card__main_text">{{ step.name }}</p>
        <p class="step_cards_view__step_card__sub_text">
          {{ getFormTitleFromStepType(step.type) }}
        </p>
      </div>
      <slot v-if="step.type === 'loop'">
        <StepCardsView
          :list="step.substeps"
          class="step_cards_view__step_card__sub_step_cards_view"
        />
      </slot>
    </div>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
import types from "../../types";
import { mapGetters } from "vuex";

/**
 * A component that renders the step cards view.
 */
export default {
  name: "StepCardsView",
  components: {
    draggable,
  },
  computed: {
    ...mapGetters(["protocolEditorVariables"]),
    /**
     * A read/write object for the currently selected step.
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
     * A read/write object for the form type of the currently selected step.
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
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
    // this.value when input = v-model
    // this.list  when input != v-model
    realValue() {
      return this.value ? this.value : this.list;
    },
  },

  methods: {
    emitter(value) {
      this.$emit("input", value);
    },
    /**
     * Returns the corresponding form title for a step type.
     *
     * @param {string} type - The said step type.
     */
    getFormTitleFromStepType(type) {
      if (type === "array_transfer") return "Array Transfer";
      if (type === "simple_transfer") return "Simple Transfer";
      if (type === "sequence_transfer") return "Sequence Transfer";
      if (type === "loop") return "Loop";
      if (type === "bioshake_3000t") return "Bioshake 3000T";
      if (type === "timer") return "Timer";
      if (type === "pause") return "Pause";
      if (type === "slack_message") return "Slack Message";
    },
  },
  props: {
    value: {
      required: false,
      type: Array,
      default: null,
    },
    list: {
      required: false,
      type: Array,
      default: null,
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap");

.step_cards_view__step_card__sub_step_cards_view {
  padding: 20px;
  margin-bottom: 10px;
}
.step_cards_view__step_card {
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
.step_cards_view__step_cards_view {
  display: grid;
  grid-auto-rows: minmax(40px, auto);
  grid-row-gap: 20px;
}
.step_cards_view__step_card--chosen {
  box-shadow: 4px 4px 4px 2px rgba(255, 255, 255, 0.25),
    2px 2px 9px 2px #2196f3aa;
}
.step_cards_view__step_card:active {
  border: thin solid #2196f3aa;
}
.step_cards_view__step_card__main_text {
  width: 232px;
  height: 16px;
  font-size: 12px;
  color: #040716;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: "Rubik", sans-serif;
  font-weight: 600;
  margin: 0px;
}
.step_cards_view__step_card__sub_text {
  font-size: 10px;
  color: #767676;
  justify-self: end;
  margin: 0px;
}
</style>
