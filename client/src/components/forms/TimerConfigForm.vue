<template>
  <div class="step_config_form" v-if="formType === 'timer'">
    <p class="step_config_form__title">Timer</p>
    <img
      src="../../assets/coming_soon_meme.jpg"
      style="border: none; width: 100%;"
      alt="Coming soon!"
    />
  </div>
</template>

<script>
/**
 * Accepts user input on the configuration of a user selected timer step within the protocol cache object.
 */
export default {
  name: "TimerConfigForm",
  props: {
    /**
     * Determines if this component will be rendered or not (true if its value is set to `timer`).
     */
    formType: String,
    /**
     * Indicates the index of the user selected step card within the protocol editor UI.
     */
    stepID: Number,
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
.step_config_form__title {
  font-size: 18px;
  margin: 0px;
}
</style>
