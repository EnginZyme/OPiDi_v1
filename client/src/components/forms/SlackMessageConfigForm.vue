<template>
  <div class="step_config_form" v-if="formType === 'slack_message'">
    <p class="step_config_form__title">Slack Message</p>
    <div class="step_config_form__body">
      <div class="step_config_form__body__content">
        <div>
          <p class="step_config_form__body__content__label--medium">
            Step Name
          </p>
          <InputText
            type="text"
            class="step_config_form__body__content__input--long"
            v-model="slackMessageStepName"
          />
        </div>
<!--        <div>-->
<!--          <p class="step_config_form__body__content__label&#45;&#45;medium">Channel</p>-->
<!--          <Dropdown-->
<!--            :options="slackWebhooks"-->
<!--            optionLabel="channel"-->
<!--            placeholder="Select option"-->
<!--            class="step_config_form__body__content__dropdown"-->
<!--            v-model="slackMessageChannel"-->
<!--          />-->
<!--        </div>-->
        <div>
          <p class="step_config_form__body__content__label--medium">Message</p>
          <InputText
            type="text"
            class="step_config_form__body__content__input--long"
            v-model="slackMessageMessage"
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
 * Accepts user input on the configuration of a user selected slack message step within the protocol cache object.
 */
export default {
  name: "SlackMessageConfigForm",
  methods: {
    /**
     * Fetches a protocol step by its ID.
     * 
     * @param {number} id - The said ID.
     */
    getProtocolStep(id) {
      return findDeep(this.cachedProtocolSteps, id);
    },
  },
  props: {
    /**
     * Determines if this component will be rendered or not (true if its value is set to `slack_message`)
     */
    formType: String,
    /**
     * Indicates the index of the user selected step card within the protocol editor UI
     */
    stepID: Number,
  },
  computed: {
    ...mapGetters([
      "cachedProtocolSteps",
      "nonTipRackLabwares",
      "slackWebhooks",
    ]),
    /**
     * A read/write object for the name of the slack message step.
     */
    slackMessageStepName: {
      get: function() {
        return this.formType !== "slack_message" || this.stepID < 0
          ? null
          : this.getProtocolStep(this.stepID).name;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_SLACK_MESSAGE_STEP_NAME, {
          id: this.stepID,
          newValue,
        });
      },
    },
    /**
     * A read/write object for the message property of the slack message step.
     */
    slackMessageMessage: {
      get: function() {
        return this.formType !== "slack_message" || this.stepID < 0
          ? null
          : this.getProtocolStep(this.stepID).message;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_SLACK_MESSAGE_MESSAGE, {
          id: this.stepID,
          newValue,
        });
      },
    },
    /**
     * A read/write object for the channel property of the slack message step.
     */
    slackMessageChannel: {
      get: function() {
        return this.formType !== "slack_message" || this.stepID < 0
          ? null
          : this.getProtocolStep(this.stepID).channel_object;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_SLACK_MESSAGE_CHANNEL, {
          id: this.stepID,
          newValue,
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
.step_config_form__body__content__dropdown {
  background: #efefff;
  width: 91%;
  font-size: 9px;
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.25),
    -2px -2px 4px 1px rgba(255, 255, 255, 0.25);
  border-radius: 6px;
}
</style>
