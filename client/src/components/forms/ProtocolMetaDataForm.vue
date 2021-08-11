<template>
  <div>
    <div class="metadata_form">
      <div class="metadata_form__title">
        <p class="metadata_form__title__text">Protocol Meta-Data</p>
        <Button
          @click="bumpProtocolStatus"
          :label="protocolStatusLabel"
          :class="[
            cachedProtocolIsVerified ? 'p-button-success' : 'p-button-primary',
            'metadata_form__verify_button',
          ]"
        />
      </div>
      <Dialog
        header="Confirmation"
        :visible="shouldDisplayVerificationConfirmation"
        :style="{ width: '420px' }"
        :modal="true"
        :closable="false"
        :position="'top'"
      >
        <div class="confirmation-content">
          <span
            >Are you sure you want to set this protocol as Verified? (You will
            no longer be able to save further changes)</span
          >
        </div>
        <template #footer>
          <Button
            label="No"
            @click="closeVerifyConfirmation"
            class="p-button-text"
            autofocus
          />
          <Button label="Yes" @click="verifyProtocol" class="p-button-text" />
        </template>
      </Dialog>
      <div class="metadata_form__body">
        <div class="metadata_form__body__content--left-col">
          <label for="name">Name</label>
          <InputText
            id="name"
            type="text"
            class="metadata_form__body__content__text_input"
            v-model="name"
          />
          <label for="description">Description</label>
          <Textarea
            id="description"
            type="text"
            class="metadata_form__body__content__text_area"
            v-model="description"
          />
        </div>
        <div class="metadata_form__body__content--right-col">
          <label for="author">Author</label>
          <InputText
            id="author"
            type="text"
            class="metadata_form__body__content__text_input"
            :value="this.cachedProtocolAuthor"
            readonly
          />
          <label for="date_created">Date Created</label>
          <InputText
            id="date_created"
            type="text"
            class="metadata_form__body__content__text_input"
            :value="this.cachedProtocolCreated"
            readonly
          />
          <label for="share">Share Status</label>
          <Dropdown
            id="share"
            :options="[{ value: 'Shared' }, { value: 'Not Shared' }]"
            optionLabel="value"
            placeholder="Select option"
            class="metadata_form__body__content__dropdown"
            v-model="isShared"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import types from "../../types";
import { mapGetters } from "vuex";

/**
 * Accepts user input for the configuration of the metadata attributes within the object in the protocol cache.
 */
export default {
  name: "ProtocolMetaDataForm",
  data() {
    return {
      /**
       * Determines if the dialog to confirm verfication of a protocol is displayed.
       */
      shouldDisplayVerificationConfirmation: false,
    };
  },
  computed: {
    ...mapGetters([
      "cachedProtocolName",
      "cachedProtocolDescription",
      "cachedProtocolAuthor",
      "cachedProtocolCreated",
      "cachedProtocolIsVerified",
      "cachedProtocolIsShared",
      "userEmail",
      "cachedProtocol",
    ]),
    /**
     * Returns the protocol status in string format.
     */
    protocolStatusLabel() {
      if (this.cachedProtocolIsVerified) return "Verified";
      else return "In Development";
    },
    /**
     * A read/write object for the share status of a protocol.
     */
    isShared: {
      get: function() {
        return this.cachedProtocolIsShared
          ? { value: "Shared" }
          : { value: "Not Shared" };
      },
      set: function(newValue) {
        this.$store.dispatch(
          types.UPDATE_CACHED_PROTOCOL_SHARED_STATUS,
          newValue.value === "Shared" ? true : false
        );
      },
    },
    /**
     * A read/write object for the verification status of a protocol.
     */
    isVerified: {
      get: function() {
        return this.cachedProtocolIsVerified
          ? { value: "Verified" }
          : { value: "Not Verified" };
      },
      set: function(newValue) {
        if (newValue.value !== "Verified") return;
      },
    },
    /**
     * A read/write object for the name of a protocol.
     */
    name: {
      get: function() {
        return this.cachedProtocolName;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_CACHED_PROTOCOL_NAME, newValue);
      },
    },
    /**
     * A read/write object for the description of a protocol.
     */
    description: {
      get: function() {
        return this.cachedProtocolDescription;
      },
      set: function(newValue) {
        this.$store.dispatch(
          types.UPDATE_CACHED_PROTOCOL_DESCRIPTION,
          newValue
        );
      },
    },
  },
  methods: {
    /**
     * Bumps the status of a protocol.
     */
    bumpProtocolStatus() {
      if (
        !this.cachedProtocolIsVerified &&
        this.$route.params.id !== "imported"
      ) {
        if (
          this.userEmail !== this.cachedProtocol.protocol.metadata.author.email
        ) {
          this.$toast.add({
            severity: "warn",
            summary: "Notification",
            detail: "You can't verify a protocol that you didn't create",
            life: 1700,
          });
          return;
        }
        this.shouldDisplayVerificationConfirmation = true;
      }
    },
    /**
     * Closes the verificaiton confirmation dialog.
     */
    closeVerifyConfirmation() {
      this.shouldDisplayVerificationConfirmation = false;
    },
    /**
     * Marks a protocol as verified.
     */
    verifyProtocol() {
      this.$store
        .dispatch(types.UPDATE_CACHED_PROTOCOL_VERIFICATION_STATUS, true)
        .then(() => {
          this.$store.dispatch(types.REFRESH_USER_REGISTRATION).then(() => {
            this.$store.dispatch(types.SAVE_PROTOCOL_CACHE).then(() => {
              this.$toast.add({
                severity: "info",
                summary: "Notification",
                detail: "Protocol successfully verified",
                life: 1700,
              });
            });
            this.shouldDisplayVerificationConfirmation = false;
          });
        });
    },
  },
};
</script>

<style scoped>
.metadata_form__title {
  display: flex;
  align-items: center;
}
.metadata_form {
  width: 839px;
  height: 320px;
  background: #efefff;
  box-shadow: -10px -10px 9px 4px rgba(255, 255, 255, 0.25),
    6px 6px 9px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  display: grid;
  direction: column;
  grid-template-rows: 1fr 2fr;
  grid-row-gap: 30px;
  justify-content: stretch;
  align-self: center;
  justify-self: center;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 30px;
  grid-row-gap: 5px;
}
.metadata_form__verify_button {
  margin-left: 1em;
  height: 30px;
  width: auto;
  font-size: 14px;
  font-weight: bold;
  filter: drop-shadow(3px 3px 4px rgba(0, 0, 0, 0.25));
}
.metadata_form__title__text {
  font-weight: 600;
  font-size: 18px;
  color: #040716;
  margin: 0;
  padding-bottom: 0px;
}
.metadata_form__body {
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 16px;
  padding-bottom: 16px;
}
.metadata_form__body__content--left-col {
  display: grid;
  grid-template-columns: auto 2fr;
  grid-template-rows: 1fr 2fr;
  grid-column-gap: 10px;
  grid-row-gap: 8px;
  font-size: 12px;
  color: #070b1f;
}
.metadata_form__body__content--right-col {
  display: grid;
  grid-template-columns: auto 2fr;
  grid-template-rows: auto auto auto;
  grid-column-gap: 10px;
  grid-row-gap: 8px;
  font-size: 12px;
  color: #070b1f;
}
.metadata_form__body__content__text_input {
  background: #efefff;
  box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.25),
    inset -2px -2px 4px 3px rgba(255, 255, 255, 0.25),
    inset -2px -2px 4px 3px rgba(255, 255, 255, 0.25);
  border-radius: 6px;
  font-size: 12px;
  height: 32px;
  border: none;
}
.metadata_form__body__content__text_area {
  background: #efefff;
  box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.25),
    inset -2px -2px 4px 3px rgba(255, 255, 255, 0.25),
    inset -2px -2px 4px 3px rgba(255, 255, 255, 0.25);
  border-radius: 6px;
  font-size: 12px;
  border: none;
  resize: none;
}
.metadata_form__body__content__dropdown {
  background: #efefff;
  height: 34px;
  font-size: 9px;
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.25),
    -2px -2px 4px 1px rgba(255, 255, 255, 0.25);
  border-radius: 6px;
}
</style>
