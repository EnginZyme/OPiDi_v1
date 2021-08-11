<template>
  <div>
    <div class="protocol_side_panel">
      <div class="protocol_side_panel__title">
        <Button
          icon="pi pi-angle-left"
          class="p-button-rounded p-button-text"
          @click="exitAction"
        />
        <Dialog
          header="Confirmation"
          :visible="shouldDisplayExitConfirmationModal"
          :style="{ width: '420px', fontSize: '15px' }"
          :modal="true"
          :closable="false"
          :position="'top'"
        >
          <div class="confirmation_content">
            <span>Do you want to discard the changes you've made?</span>
          </div>
          <template #footer>
            <Button
              label="No"
              @click="closeExitConfirmation"
              class="p-button-text"
              autofocus
            />
            <Button label="Yes" @click="exitProtocolEditor" class="p-button-text" />
          </template>
        </Dialog>
        <span class="protocol_side_panel__title__text"> Protocol Editor </span>
      </div>
      <div class="protocol_side_panel__button_group">
        <div class="protocol_side_panel__grid">
          <Button
            label="Meta Data"
            class="base_button large_button_"
            @click="openMetadataView"
          />
          <Button
            label="Deck"
            class="base_button large_button_"
            @click="openDeckView"
          />
          <Button
            label="Sequences"
            class="base_button large_button_"
            @click="openSequencesView"
          />
          <Button
            label="Steps"
            class="base_button large_button_"
            @click="openStepsView"
          />
          <Button
            label="Generate"
            class="base_button large_button_"
            @click="openGenerateView"
          />
          <span class="p-buttonset">
            <Button
              class="file_button"
              @click="openSaveConfirmation"
              icon="pi pi-save"
              v-tooltip="'save'"
              :disabled="this.$route.params.id === 'imported'"
            />
            <Button
              class="file_button"
              @click="openshouldDisplayCloneConfirmationModal"
              icon="pi pi-copy"
              v-tooltip="'clone'"
            />
            <Button
              class="file_button"
              @click="openshouldDisplayDeleteConfirmationModal"
              icon="pi pi-trash"
              v-tooltip="'delete'"
              :disabled="this.$route.params.id === 'imported'"
            />
          </span>
          <Dialog
            header="Confirmation"
            :visible="shouldDisplayDeleteConfirmationModal"
            :style="{ width: '420px' }"
            :modal="true"
            :closable="false"
            :position="'top'"
          >
            <div class="confirmation-content">
              <span>Are you sure you want to delete this protocol?</span>
              <span>(Please note that this action is irreversible)</span>
            </div>
            <template #footer>
              <Button
                label="No"
                @click="closeshouldDisplayDeleteConfirmationModal"
                class="p-button-text"
                autofocus
              />
              <Button
                label="Yes"
                @click="deleteProtocol"
                class="p-button-text"
              />
            </template>
          </Dialog>
          <Dialog
            header="Confirmation"
            :visible="shouldDisplayCloneConfirmationModal"
            :style="{ width: '420px' }"
            :modal="true"
            :closable="false"
            :position="'top'"
          >
            <div class="confirmation-content">
              <span>Are you sure you want to clone this protocol?</span>
              <span
                >(Please note that all unsaved changes to the parent protocol
                will be lost)</span
              >
            </div>
            <template #footer>
              <Button
                label="No"
                @click="closeshouldDisplayCloneConfirmationModal"
                class="p-button-text"
                autofocus
              />
              <Button
                label="Yes"
                @click="cloneProtocol"
                class="p-button-text"
              />
            </template>
          </Dialog>
          <Dialog
            header="Confirmation"
            :visible="shouldDisplaySaveConfirmationModal"
            :style="{ width: '420px', fontSize: '15px' }"
            :modal="true"
            :closable="false"
            :position="'top'"
          >
            <div class="confirmation_content">
              <span>Are you sure you want to save this protocol?</span>
            </div>
            <template #footer>
              <Button
                label="No"
                @click="closeSaveConfirmation"
                class="p-button-text"
                autofocus
              />
              <Button label="Yes" @click="saveProtocolEditorChanges" class="p-button-text" />
            </template>
          </Dialog>
        </div>
        <div class="protocol_side_panel__grid">
          <Button
            label="Config."
            class="base_button large_button_"
            @click="openConfigView"
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
 * A component that renders the protocol editor side panel.
 */
export default {
  name: "ProtocolEditorSidePanel",
  data() {
    return {
      /**
       * Determines if the exit confirmation dialog is displayed.
       */
      shouldDisplayExitConfirmationModal: false,
      /**
       * Determines if the save confirmation dialog is displayed.
       */
      shouldDisplaySaveConfirmationModal: false,
      /**
       * Determines if the delete confirmation dialog is displayed.
       */
      shouldDisplayDeleteConfirmationModal: false,
      /**
       * Determines if the clone confirmation dialog is displayed.
       */
      shouldDisplayCloneConfirmationModal: false,
    };
  },
  computed: {
    ...mapGetters([
      "cachedProtocol",
      "cacheChangeRegister",
      "allProtocols",
      "userEmail",
    ]),
  },
  methods: {
    /**
     * Opens the protocol metadata view.
     */
    openMetadataView() {
      this.$router.push(`metadata`);
    },
    /**
     * Opens the protocol deck view.
     */
    openDeckView() {
      this.$router.push(`deck`);
    },
    /**
     * Opens the protocol sequences view.
     */
    openSequencesView() {
      this.$router.push(`sequences`);
    },
    /**
     * Opens the protocol steps view.
     */
    openStepsView() {
      this.$router.push(`steps`);
    },
    /**
     * Opens the protocol generate view.
     */
    openGenerateView() {
      this.$router.push(`generate`);
    },
    /**
     * Opens the protocol config. view.
     */
    openConfigView() {
      this.$router.push(`config`);
    },
    /**
     * Triggered when the user attempts to exit the protocol editor.
     */
    exitAction() {
      if (this.cacheChangeRegister) this.openExitConfirmation();
      else this.exitProtocolEditor();
    },
    /**
     * Opens the exit confirmation dialog.
     */
    openExitConfirmation() {
      this.shouldDisplayExitConfirmationModal = true;
    },
    /**
     * Closes the exit confirmation dialog.
     */
    closeExitConfirmation() {
      this.shouldDisplayExitConfirmationModal = false;
    },
    /**
     * Opens the save confirmation dialog.
     */
    openSaveConfirmation() {
      if (this.userEmail !== this.cachedProtocol.protocol.metadata.author.email) {
        this.$toast.add({
          severity: "warn",
          summary: "Notification",
          detail: "You can't save a protocol that you didn't create",
          life: 1700,
        });
        return;
      }
      if (this.cachedProtocol.protocol.metadata.is_verified) {
        this.$toast.add({
          severity: "warn",
          summary: "Notification",
          detail: "You can't save a protocol that's currently verified",
          life: 1700,
        });
        return;
      }
      this.shouldDisplaySaveConfirmationModal = true;
    },
    /**
     * Closes the save confirmation dialog.
     */
    closeSaveConfirmation() {
      this.shouldDisplaySaveConfirmationModal = false;
    },
    /**
     * Exits the protocol editor.
     */
    exitProtocolEditor() {
      this.$store.dispatch(types.REFRESH_USER_REGISTRATION).then(() => {
        this.$store.dispatch(types.LOAD_PROTOCOLS).then(() => {
          this.$store.dispatch(types.LOAD_LABWARES);
          this.$store.dispatch(types.LOAD_SLACK_WEBHOOK_OBJECTS);
          this.$store.dispatch(types.RESET_PROTOCOL_EDITOR_VARIABLES);
          this.$store.dispatch(types.RESET_PROTOCOL_CACHE);
          this.$router.push("../../explore");
        });
      });
    },
    /**
     * Saves changes made in the protocol editor.
     */
    saveProtocolEditorChanges() {
      this.$store.dispatch(types.REFRESH_USER_REGISTRATION).then(() => {
        this.$store.dispatch(types.SAVE_PROTOCOL_CACHE).then(() => {
          this.$toast.add({
            severity: "info",
            summary: "Notification",
            detail: "Protocol Saved",
            life: 1700,
          });
          this.closeSaveConfirmation();
        });
      });
    },
    /**
     * Deletes the protocol in the protocol editor.
     */
    deleteProtocol() {
      this.$store.dispatch(types.REFRESH_USER_REGISTRATION).then(() => {
        this.$store
          .dispatch(types.DELETE_PROTOCOL, this.$route.params.id)
          .then(() => {
            this.$store.dispatch(types.RESET_PROTOCOL_EDITOR_VARIABLES);
            this.$store.dispatch(types.RESET_PROTOCOL_CACHE);
            this.$router.push("../../explore");
            this.$toast.add({
              severity: "info",
              summary: "Notification",
              detail: "Protocol Deleted",
              life: 1700,
            });
          });
      });
    },
    /**
     * Clones the protocol in the protocol editor.
     */
    cloneProtocol() {
      this.$store.dispatch(types.REFRESH_USER_REGISTRATION).then(() => {
        this.$store.dispatch(types.CLONE_PROTOCOL).then((id) => {
          this.$store.dispatch(types.RESET_PROTOCOL_EDITOR_VARIABLES);
          this.$router.push(`../../protocol/${id}/metadata`);
          this.$toast.add({
            severity: "info",
            summary: "Notification",
            detail: "Protocol Cloned",
            life: 1700,
          });
          this.closeshouldDisplayCloneConfirmationModal();
        });
      });
    },
    /**
     * Opens the protocol deletion confirmation dialog.
     */
    openshouldDisplayDeleteConfirmationModal() {
      if (this.userEmail !== this.cachedProtocol.protocol.metadata.author.email) {
        this.$toast.add({
          severity: "warn",
          summary: "Notification",
          detail: "You can't delete a protocol that you didn't create",
          life: 1700,
        });
        return;
      }
      if (
        this.allProtocols.filter(
          (item) => item.id === this.cachedProtocol.id
        )[0].protocol.metadata.is_verified
      ) {
        this.$toast.add({
          severity: "warn",
          summary: "Notification",
          detail: "You can't delete a protocol that has been verified",
          life: 1700,
        });
        return;
      }
      if (
        this.allProtocols.filter(
          (item) => item.id === this.cachedProtocol.id
        )[0].protocol.metadata.is_shared
      ) {
        this.$toast.add({
          severity: "warn",
          summary: "Notification",
          detail: "You can't delete a protocol that's currently shared",
          life: 1700,
        });
        return;
      }
      this.shouldDisplayDeleteConfirmationModal = true;
    },
    /**
     * Closes the protocol deletion confirmation dialog.
     */
    closeshouldDisplayDeleteConfirmationModal() {
      this.shouldDisplayDeleteConfirmationModal = false;
    },
    /**
     * Opens the protocol cloning confirmation dialog.
     */
    openshouldDisplayCloneConfirmationModal() {
      this.shouldDisplayCloneConfirmationModal = true;
    },
    /**
     * Closes the protocol cloning confirmation dialog.
     */
    closeshouldDisplayCloneConfirmationModal() {
      this.shouldDisplayCloneConfirmationModal = false;
    },
  },
};
</script>

<style scoped>
.protocol_side_panel__title__text {
  font-size: 18px;
  font-weight: 600;
  color: #efefff;
  margin: 25px;
}
.protocol_side_panel__grid {
  display: grid;
  flex-direction: column;
  justify-items: center;
  align-self: start;
  grid-gap: 12px;
}
.protocol_side_panel__button_group {
  display: grid;
  flex-direction: column;
  justify-items: center;
  margin-top: 25px;
  margin-bottom: 100px;
  align-self: stretch;
  grid-template-rows: 1fr auto;
}
.protocol_side_panel__title {
  display: flex;
  align-items: center;
  margin-left: 17.5px;
}
.protocol_side_panel {
  background: #171a2e;
  height: 100%;
  width: 270px;
  display: grid;
  direction: column;
  grid-template-rows: auto 1fr;
}
.file_button {
  background: #1246a9;
  border-radius: 4px;
  color: #efefff;
}
.file_button.p-button.p-button-icon-only {
  height: 40px;
  width: 46px;
}
</style>
