<template>
  <div>
    <div class="create_protocol_form">
      <p class="create_protocol_form__title">Create New Protocol</p>
      <div class="create_protocol_form__input_group">
        <InputText
          type="text"
          placeholder="Name"
          class="create_protocol_form__name_input"
          v-model="name"
        />
        <Textarea
          placeholder="Description"
          class="create_protocol_form__description_input"
          v-model="description"
        />
      </div>
      <div class="button_container">
        <ProgressSpinner
          class="create_protocol_form__progress_spinner"
          strokeWidth="8"
          fill="#EEEEEE"
          animationDuration=".5s"
          v-show="protocolCreationInProgress"
        />
        <Button
          label="Create New"
          class="base_button small_button_"
          @click="createProtocol"
          :disabled="!formInputIsValidForSubmission || protocolCreationInProgress"
        />
      </div>
    </div>
  </div>
</template>

<script>
import types from "../../types";

/**
 * A component that accepts user input for the creation of a new protocol.
 */
export default {
  name: "CreateProtocolForm",
  data() {
    return {
      /**
       *  Stores the user input for the name of the new protocol.
       */
      name: "",
      /**
       *  Stores the user input for the description of the new protocol.
       */
      description: "",
      /**
       *  A flag to indicate if the new protocol is already being created.
       */
      protocolCreationInProgress: false,
    };
  },
  computed: {
    /**
     *  Validates the protocol creation form inputs against submission.
     */
    formInputIsValidForSubmission() {
      return this.name && this.description
    }
  },
  methods: {
    /**
     *  Creates a new protocol from the form inputs.
     */
    createProtocol() {
      this.protocolCreationInProgress = true;
      this.$store.dispatch(types.REFRESH_USER_REGISTRATION).then(() => {
        this.$store
          .dispatch(types.CREATE_PROTOCOL, {
            name: this.name,
            description: this.description,
          })
          .then((id) => {
            this.$router.push(`protocol/${id}/metadata`);
            this.protocolCreationInProgress = false;
            this.$toast.add({
              severity: "info",
              summary: "Notification",
              detail: "Protocol Created",
              life: 1700,
            });
          });
      });
    },
  },
};
</script>

<style scoped>
.button_container {
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 8px;
  justify-content: end;
}
.create_protocol_form__progress_spinner {
  height: 24px;
  width: 24px;
}
.create_protocol_form {
  width: 557px;
  height: 237px;
  background: #efefff;
  align-self: center;
  justify-self: center;
  box-shadow: -10px -10px 9px 4px rgba(255, 255, 255, 0.25),
    6px 6px 9px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  display: grid;
  direction: column;
  justify-content: center;
  grid-row-gap: 5px;
}
.create_protocol_form__title {
  font-weight: 600;
  font-size: 18px;
  color: #040716;
  margin: 0;
  margin-top: 27px;
  padding-bottom: 0px;
}
.create_protocol_form__name_input {
  background: #efefff;
  box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.25),
    inset -2px -2px 4px 3px rgba(255, 255, 255, 0.25),
    inset -2px -2px 4px 3px rgba(255, 255, 255, 0.25);
  border-radius: 6px;
  font-size: 14px;
  width: 352px;
  height: 32px;
  border: none;
}
.create_protocol_form__description_input {
  background: #efefff;
  box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.25),
    inset -2px -2px 4px 3px rgba(255, 255, 255, 0.25),
    inset -2px -2px 4px 3px rgba(255, 255, 255, 0.25);
  border-radius: 6px;
  font-size: 14px;
  width: 352px;
  height: 69px;
  border: none;
  resize: none;
}
.create_protocol_form__input_group {
  display: grid;
  direction: column;
}
</style>
