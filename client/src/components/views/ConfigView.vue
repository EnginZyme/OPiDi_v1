<template>
  <div>
    <div class="config_view">
      <div class="config_view__config_view__body__main_view__content__header">
        <div
          class="config_view__config_view__body__main_view__content__header__title"
        >
          <span
            class="config_view__config_view__body__main_view__content__header__title__text"
            >Config.</span
          >
        </div>
      </div>
      <div class="config_view__body">
        <div class="config_view__body__side_panel">
          <Button
            label="Liquid Classes"
            class="p-button-text small_font"
            :class="activeTab === 0 ? '' : 'p-button-secondary'"
            @click="routeToLiquidClassesTab"
          />
          <Button
            label="Labwares"
            class="p-button-text small_font"
            :class="activeTab === 1 ? '' : 'p-button-secondary'"
            @click="routeToLabwaresTab"
          />
        </div>
        <div class="config_view__body__main_view">
          <template v-if="activeTab === 0">
            <Dialog
              header="Confirmation"
              :visible="shouldDisplayLiquidClassDeleteConfirmationModal"
              :style="{ width: '420px', fontSize: '15px' }"
              :modal="true"
              :closable="false"
              :position="'top'"
            >
              <div class="confirmation-content">
                <span
                  >Are you sure you want to delete the
                  <b>{{
                    getChosenLiquidClassObject()
                      ? getChosenLiquidClassObject().name
                      : ""
                  }}</b>
                  liquid class?</span
                >
              </div>
              <template #footer>
                <Button
                  label="No"
                  @click="closeLiquidClassDeleteConfirmationModal"
                  class="p-button-text"
                  autofocus
                />
                <Button
                  label="Yes"
                  @click="deleteChosenLiquidClass"
                  class="p-button-text"
                />
              </template>
            </Dialog>
            <div class="config_view__body__main_view__content">
              <p class="config_view__body__main_view__content__header">
                Liquid Classes
              </p>
              <div
                class="config_view__body__main_view__content__crud_button_group"
              >
                <Button
                  label="Add New +"
                  class="add_button"
                  @click="createNewLiquidClass"
                />
                <Button
                  icon="pi pi-copy"
                  class="p-button-raised p-button-primary p-button-text"
                  @click="triggerChosenLiquidClassDuplication"
                />
                <Button
                  icon="pi pi-trash"
                  class="p-button-raised p-button-danger p-button-text"
                  @click="triggerChosenLiquidClassDeletion('liquidClass')"
                />
              </div>
              <div>
                <div class="config_view__body__main_view__content__cards_area">
                  <div
                    class="config_view__body__main_view__content__cards_area__card"
                    v-for="(liquidClass, index) in cachedProtocolLiquidClasses"
                    :key="index"
                    :class="
                      chosenLiquidClassID ===
                      cachedProtocolLiquidClasses[index].id
                        ? 'chosen_card'
                        : ''
                    "
                    @click="
                      chosenLiquidClassID =
                        cachedProtocolLiquidClasses[index].id
                    "
                  >
                    <p
                      class="config_view__body__main_view__content__cards_area__card__main_text"
                    >
                      {{ liquidClass.name }}
                    </p>
                  </div>
                  <br />
                </div>
              </div>
            </div>
            <div class="config_view__body__main_view__content__form">
              <LiquidClassConfigForm :lcIdx="chosenLiquidClassID" />
            </div>
          </template>
          <template v-if="activeTab === 1">
            <div class="config_view__body__main_view__content">
              <p class="config_view__body__main_view__content__header">
                Labwares
              </p>
              <div
                class="config_view__body__main_view__content__crud_button_group"
              >
                <Button
                  label="Get Labwares"
                  class="add_button"
                  @click="downloadZippedLabwareDefinitionsFolder"
                />
              </div>
              <div></div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import types from "../../types";
import LiquidClassConfigForm from "../forms/LiquidClassConfigForm.vue";
import JsZip from "jszip";
import Axios from "axios";
import { saveAs } from "file-saver";
import { OBJECT_API_URL as LABWARE_API_URL } from "../../urls";

/**
 * A component that renders the protocol Config view.
 */
export default {
  components: { LiquidClassConfigForm },
  name: "ConfigView",
  data() {
    return {
      /**
       * Determines which config. tab is visible.
       */
      activeTab: 0,
      /**
       * Determines if the liquid class delete confirmation modal is visible (or not).
       */
      shouldDisplayLiquidClassDeleteConfirmationModal: false,
    };
  },
  computed: {
    ...mapGetters([
      "cachedProtocolLiquidClasses",
      "protocolEditorVariables",
      "cachedProtocol",
      "userAuthToken",
    ]),
    /**
     * A read/write object for the ID of the chosen liquid class card.
     */
    chosenLiquidClassID: {
      get: function() {
        return this.protocolEditorVariables.chosenLiquidClassID;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_LIQUID_CLASS_VARIABLES, {
          chosenLiquidClassID: newValue,
        });
      },
    },
  },
  methods: {
    /**
     * Gets the chosen liquid class object.
     */
    getChosenLiquidClassObject() {
      return this.cachedProtocolLiquidClasses.filter(
        (item) => item.id === this.chosenLiquidClassID
      )[0];
    },
    /**
     * Initiates the duplication of the chosen liquid class.
     */
    triggerChosenLiquidClassDuplication() {
      if (this.chosenLiquidClassID >= 0) this.duplicateChosenLiquidClass();
    },
    /**
     * Initiates the deletion of the chosen liquid class.
     */
    triggerChosenLiquidClassDeletion(category) {
      if (category === "liquidClass" && this.chosenLiquidClassID >= 0) {
        if (this.chosenLiquidClassID === 0) {
          this.$toast.add({
            severity: "warn",
            summary: "Notification",
            detail: "You can't delete default liquid class",
            life: 1700,
          });
          return;
        }
        this.openLiquidClassDeleteConfirmationModal();
      }
    },
    /**
     * Opens the liquid class delete confirmation modal.
     */
    openLiquidClassDeleteConfirmationModal() {
      this.shouldDisplayLiquidClassDeleteConfirmationModal = true;
    },
    /**
     * Closes the liquid class delete confirmation modal.
     */
    closeLiquidClassDeleteConfirmationModal() {
      this.shouldDisplayLiquidClassDeleteConfirmationModal = false;
    },
    /**
     * Deletes the chosen liquid class and throws a warning if the default liquid class is chosen.
     */
    deleteChosenLiquidClass() {
      if (this.chosenLiquidClassID === 0) {
        this.$toast.add({
          severity: "warn",
          summary: "Notification",
          detail: "You can't delete the default liquid class.",
          life: 1700,
        });
        return;
      }
      this.$store
        .dispatch(types.DELETE_LIQUID_CLASS, this.chosenLiquidClassID)
        .then(() => {
          this.shouldDisplayLiquidClassDeleteConfirmationModal = false;
          this.$toast.add({
            severity: "info",
            summary: "Notification",
            detail: "Liquid Class Deleted",
            life: 1700,
          });
        });
    },
    /**
     * Routes the main view to the liquid classes tab.
     */
    routeToLiquidClassesTab() {
      this.activeTab = 0;
    },
    /**
     * Routes the main view to the labwares tab.
     */
    routeToLabwaresTab() {
      this.activeTab = 1;
    },
    /**
     * Creates a new liquid class.
     */
    createNewLiquidClass() {
      this.$store.dispatch(types.CREATE_LIQUID_CLASS).then(() => {
        this.chosenLiquidClassID =
          this.cachedProtocol.protocol.liquidClassCounter - 1;
      });
    },
    /**
     * Duplicates the chosen liquid class.
     */
    duplicateChosenLiquidClass() {
      this.$store
        .dispatch(types.DUPLICATE_LIQUID_CLASS, this.chosenLiquidClassID)
        .then(() => {
          this.$toast.add({
            severity: "info",
            summary: "Notification",
            detail: "Liquid Class Duplicated",
            life: 1700,
          });
        });
    },
    /**
     * Exports an array as a JSON file in the browser.
     *
     * @param {array} array - The said array.
     */
    exportArrayAsJSONFile(array) {
      let zip = JsZip();
      for (let obj of array) {
        let blob = new Blob([JSON.stringify(obj.labware_def, null, 2)], {
          type: "text/plain;charset=utf-8;",
        });
        zip.file(`${obj.id}.json`, blob);
      }
      zip
        .generateAsync({ type: "blob" })
        .then((zipFile) => saveAs(zipFile, "labwares.zip"));
    },
    /**
     * Downloads the zipped labware definitions folder.
     */
    downloadZippedLabwareDefinitionsFolder() {
      Axios.get(`${LABWARE_API_URL}/labware_def/`, {
        headers: {
          Authorization: this.userAuthToken,
        },
      }).then(
        (response) => {
          this.exportArrayAsJSONFile(response.data);
          this.$toast.add({
            severity: "info",
            summary: "Notification",
            detail: "Labware File Downloaded",
            life: 1700,
          });
        },
        () => {
          this.$toast.add({
            severity: "warn",
            summary: "Notification",
            detail: "Refreshing your currently expired session...",
            life: 1700,
          });
          this.$store.dispatch(types.REFRESH_USER_REGISTRATION).then(() => {
            this.$toast.add({
              severity: "info",
              summary: "Notification",
              detail: "Session refreshed. Please try again",
              life: 1700,
            });
          });
        }
      );
    },
  },
};
</script>

<style type="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap");

.config_view__config_view__body__main_view__content__header__title__text {
  font-weight: 600;
  font-size: 18px;
  color: #040716;
  margin-left: 32px;
}
.config_view {
  min-height: 650px;
  min-width: 1000px;
  width: 95%;
  height: 90vh;
  align-self: center;
  justify-self: center;
  background: #efefff;
  box-shadow: 6px 6px 9px 4px rgba(0, 0, 0, 0.25),
    -10px -10px 9px 4px rgba(255, 255, 255, 0.25);
  border-radius: 5px;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto 1fr;
}
.config_view__config_view__body__main_view__content__header {
  height: 48px;
  background: #efefff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: grid;
  align-content: center;
}
.config_view__body {
  display: grid;
  grid-template-columns: minmax(200px, 15%) auto;
}
.small_font {
  font-size: 12px;
  text-align: left;
  margin-left: 12px;
  margin-right: 12px;
}
.config_view__body__side_panel {
  display: grid;
  direction: column;
  grid-template-rows: 30px 30px;
  margin-top: 80px;
  margin-left: 15px;
  margin-right: 20px;
  grid-row-gap: 8px;
  width: 170px;
}
.config_view__body__main_view__content__crud_button_group {
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: start;
  grid-column-gap: 8px;
}
.config_view__body__main_view {
  display: grid;
  grid-template-columns: auto minmax(400px, 30%);
  grid-column-gap: 12px;
  padding-right: 20px;
}
.config_view__body__main_view__content {
  display: grid;
  grid-template-rows: 1fr auto 7fr;
  padding-top: 10px;
  padding-left: 8px;
}
.config_view__body__main_view__content__form {
  margin: 16px 0px 16px 0px;
  background: #efefff;
  box-shadow: 2px 2px 9px rgba(0, 0, 0, 0.25);
  display: grid;
  padding-left: 24px;
}
.config_view__body__main_view__content__cards_area__card__main_text {
  width: 232px;
  height: 16px;
  font-size: 12px;
  font-family: "Rubik", sans-serif;
  font-weight: 600;
  color: #040716;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0px;
}
.config_view__body__main_view__content__header {
  font-size: 18px;
  color: #040716;
}
.add_button {
  width: 150px;
  height: 32px;
  background: #1246a9;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25),
    -3px -3px 4px 3px rgba(255, 255, 255, 0.25);
  border-radius: 6px;
  font-size: 14px;
  color: #efefff;
}
.config_view__body__main_view__content__cards_area {
  display: grid;
  grid-auto-rows: 40px;
  grid-row-gap: 20px;
  margin-top: 24px;
  margin-bottom: 20px;
  padding-top: 20px;
  height: 420px;
  overflow: auto;
}
.config_view__body__main_view__content__cards_area__card {
  width: 310px;
  height: 45px;
  display: grid;
  background: #efefff;
  align-content: center;
  box-shadow: 2px 2px 9px 2px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  padding-left: 33px;
  padding-right: 16px;
  margin-left: 10px;
  cursor: pointer;
}
.chosen_card {
  box-shadow: 4px 4px 4px 2px rgba(255, 255, 255, 0.25),
    2px 2px 9px 2px #2196f3aa;
}
.config_view__body__main_view__content__cards_area__card:active {
  border: thin solid #2196f3aa;
}
</style>
