<template>
  <div class="step_config_form" v-if="formType === 'array_transfer'">
    <p class="step_config_form__title">Array Transfer</p>
    <div class="step_config_form__body">
      <div class="step_config_form__body__content">
        <div>
          <p class="step_config_form__body__content__label--medium">
            Step Name
          </p>
          <InputText
            type="text"
            class="step_config_form__body__content__input--long"
            v-model="arrayTransferStepName"
          />
        </div>
        <div>
          <p class="step_config_form__body__content__label--medium">Pipette</p>
          <Dropdown
            :options="
              cachedProtocolPipettes.filter((item) =>
                item.name.toLowerCase().includes('single')
              )
            "
            optionLabel="name"
            placeholder="Select option"
            class="step_config_form__body__content__dropdown"
            v-model="arrayTransferPipette"
          />
        </div>
        <div>
          <p class="step_config_form__body__content__label--medium">
            Tips Strategy
          </p>
          <Dropdown
            :options="[
              { name: 'Standard', value: 'STANDARD' },
              { name: 'Strict', value: 'STRICT' },
              { name: 'Eco', value: 'ECO' },
              { name: 'Eco - New Tip', value: 'ECO - NEW TIP' },
            ]"
            optionLabel="name"
            v-tooltip="
              'STANDARD: one tip per source well, STRICT: one tip per dispense, ECO: reuse tip'
            "
            placeholder="Select option"
            class="step_config_form__body__content__dropdown"
            v-model="arrayTransferTipsStrategy"
          />
        </div>
        <div>
          <p class="step_config_form__body__content__label--medium">
            Liquid Class
          </p>
          <Dropdown
            :options="
              cachedProtocolLiquidClasses.map((item) => ({
                name: item.name,
                id: item.id,
              }))
            "
            optionLabel="name"
            placeholder="Select option"
            class="step_config_form__body__content__dropdown"
            v-model="arrayTransferLiquidConfig"
          />
        </div>

        <div>
          <p class="step_config_form__body__content__label--medium">
            Source Offset
          </p>
          <div class="step_config_form__body__content__field_group">
            <div>
              <p class="step_config_form__body__content__label--min">Type</p>
              <Dropdown
                :options="[{ name: 'Top' }, { name: 'Bottom' }]"
                optionLabel="name"
                placeholder="Select option"
                class="step_config_form__body__content__dropdown"
                v-model="arrayTransferSourceOffsetType"
              />
            </div>
            <div>
              <p class="step_config_form__body__content__label--min">
                Value (mm)
              </p>
              <InputNumber
                :minFractionDigits="2"
                :maxFractionDigits="5"
                class="step_config_form__body__content__input--short"
                v-model="arrayTransferSourceOffset"
              />
            </div>
          </div>
        </div>
        <div>
          <p class="step_config_form__body__content__label--medium">
            Destination Offset
          </p>
          <div class="step_config_form__body__content__field_group">
            <div>
              <p class="step_config_form__body__content__label--min">Type</p>
              <Dropdown
                :options="[{ name: 'Top' }, { name: 'Bottom' }]"
                optionLabel="name"
                placeholder="Select option"
                class="step_config_form__body__content__dropdown"
                v-model="arrayTransferDestinationOffsetType"
              />
            </div>
            <div>
              <p class="step_config_form__body__content__label--min">
                Value (mm)
              </p>
              <InputNumber
                :minFractionDigits="2"
                :maxFractionDigits="5"
                class="step_config_form__body__content__input--short"
                v-model="arrayTransferDestinationOffset"
              />
            </div>
          </div>
        </div>
        <div>
          <p class="step_config_form__body__content__label--medium">
            Array Map Filename
          </p>
          <div class="step_config_form__body__content__file_group">
            <InputText
              class="step_config_form__body__content__input--stretch"
              v-model="arrayMapFileName"
              readonly
            />
            <Button
              label="Browse"
              class="step_config_form__body__content__file_upload_button"
              @click="requestUploadFile"
              for="uploadmyfile"
            />
            <input
              type="file"
              id="uploadArrayMapFile"
              ref="uploadArrayMapFile"
              @change="parseArrayMapFile"
              accept=".csv"
            />
          </div>
        </div>
        <a
          class="step_config_form__body__content__file_hyperlink"
          href="/assets/array_map_template_simplified.xlsx"
          download
          >Download Template</a
        >
        <Button
          :label="arrayMappingButttonLabel"
          :class="arrayMappingButttonClass"
          class="step_config_form__body__content__colour_button"
          @click="shouldDisplayArrayMapModal = true"
          :disabled="
            assertValidDestinationVariableMap(getProtocolStep(stepID).parameters.destination_var_map)
          "
        />
      </div>
    </div>
    <ArrayMapForm
      :shouldDisplayModal="shouldDisplayArrayMapModal"
      :stepID="stepID"
      @formClosed="closeArrayMapModal"
      :pipette="arrayTransferPipette"
    />
  </div>
</template>

<script>
import types from "../../types";
import { mapGetters } from "vuex";
import Papa from "papaparse";
import { findDeep } from "../../utils";
import ArrayMapForm from "./ArrayMapForm.vue";

/**
 * A component to receive user input on the configuration of a chosen array transfer step.
 */
export default {
  components: { ArrayMapForm },
  name: "ArrayTransferConfigForm",
  props: {
    /**
     * Indicates if this component should be displayed or not (true if its value is set to `array_transfer`).
     */
    formType: String,
    /**
     * The ID of the current user clicked step in the protocol editor UI.
     */
    stepID: Number,
  },
  data() {
    return {
      /**
       * Determines if the array map modal child component is displayed or not.
       */
      shouldDisplayArrayMapModal: false,
    };
  },
  methods: {
    /**
     * Parses the input for the array map file for this step.
     */
    parseArrayMapFile() {
      let temp = this;
      let file = this.$refs.uploadArrayMapFile.files[0];
      this.$refs.uploadArrayMapFile.value = null;

      function isValidFile(arr) {
        if (
          arr.length == 0 ||
          arr[0].length < 3 ||
          !arr[0][0].includes("Labware Name") ||
          !arr[0][1].includes("Well Location") ||
          !arr[0][2].includes("Well Volume")
        )
          return false;
        return true;
      }

      Papa.parse(file, {
        skipEmptyLines: true,
        complete: function(results, file) {
          if (!isValidFile(results.data)) {
            temp.$toast.add({
              severity: "error",
              summary: "Notification",
              detail: "Unrecognized input file format",
              life: 1700,
            });
            return;
          }
          temp.$store.dispatch(types.UPDATE_ARRAY_MAP_FILENAME, {
            id: temp.stepID,
            newValue: file.name,
          });
          temp.$store.dispatch(types.UPDATE_ARRAY_MAP_PARSED_FILE, {
            id: temp.stepID,
            newValue: results.data,
          });
        },
      });
    },
    /**
     * Closes the array map modal child component.
     */
    closeArrayMapModal() {
      this.shouldDisplayArrayMapModal = false;
    },
    /**
     * Fetches the mapped protocol step from list of all steps by its ID.
     * 
     * @param {number} id - The ID of the said protocol step.
     */
    getProtocolStep(id) {
      return findDeep(this.cachedProtocolSteps, id);
    },
    /**
     * Simulates a user click on DOM element to initiate a file upload.
     */
    requestUploadFile() {
      this.$refs.uploadArrayMapFile.click();
    },
    /**
     * Asserts that a destination variable map has the accepted form.
     * 
     * @param {object} varMap - The said destination variable map.
     */
    assertValidDestinationVariableMap(varMap) {
      if (this.formType === "array_transfer" && this.stepID >= 0) {
        return Object.keys(varMap).length === 0 || !this.arrayTransferPipette;
      }
      return false;
    },
  },
  computed: {
    ...mapGetters([
      "cachedProtocolSteps",
      "cachedProtocolPipettes",
      "nonTipRackLabwares",
      "cachedProtocolLiquidClasses",
    ]),
    /**
     * Defines the class attribute of the array mapping button.
     */
    arrayMappingButttonClass() {
      if (this.formType === "array_transfer" && this.stepID >= 0) {
        return this.getProtocolStep(this.stepID).parameters.hasMapConflict ||
          !this.getProtocolStep(this.stepID).parameters.mappingComplete
          ? ["p-button-raised", "p-button-secondary"]
          : ["p-button-raised", "p-button-success"];
      }
      return "";
    },
    /**
     * Defines the label attribute of the array mapping button.
     */
    arrayMappingButttonLabel() {
      if (this.formType === "array_transfer" && this.stepID >= 0) {
        return this.getProtocolStep(this.stepID).parameters.hasMapConflict ||
          !this.getProtocolStep(this.stepID).parameters.mappingComplete
          ? "Define Array Mapping"
          : "Update Array Mapping";
      }
      return "";
    },
    /**
     * A read/write object for the array transfer step name.
     */
    arrayTransferStepName: {
      get: function() {
        return this.formType !== "array_transfer" || this.stepID < 0
          ? null
          : this.getProtocolStep(this.stepID).name;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_ARRAY_TRANSFER_STEP_NAME, {
          id: this.stepID,
          newValue,
        });
      },
    },
    /**
     * A read/write object for the array transfer pipette.
     */
    arrayTransferPipette: {
      get: function() {
        return this.formType !== "array_transfer" || this.stepID < 0
          ? null
          : this.cachedProtocolPipettes.filter(
              (item) =>
                item.name ===
                this.getProtocolStep(this.stepID).parameters.pipette_obj.name
            )[0];
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_ARRAY_TRANSFER_PIPETTE, {
          id: this.stepID,
          newValue,
        });
      },
    },
    /**
     * A read/write object for the array transfer pipette strategy.
     */
    arrayTransferPipetteStrategy: {
      get: function() {
        return this.formType !== "array_transfer" ||
          this.stepID < 0 ||
          !this.getProtocolStep(this.stepID).parameters.pipette_strategy
          ? null
          : {
              value: this.getProtocolStep(this.stepID).parameters.pipette_strategy,
              name: this.getProtocolStep(this.stepID)
                .parameters.pipette_strategy.split("_")
                .map(
                  (string) =>
                    string.charAt(0).toUpperCase() +
                    string.slice(1).toLowerCase()
                )
                .join(" "),
            };
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_ARRAY_TRANSFER_PIPETTE_STRATEGY, {
          id: this.stepID,
          newValue: newValue.value,
        });
      },
    },
    /**
     * A read/write object for the array transfer tips strategy.
     */
    arrayTransferTipsStrategy: {
      get: function() {
        return this.formType !== "array_transfer" ||
          this.stepID < 0 ||
          !this.getProtocolStep(this.stepID).parameters.tipsStrategy
          ? null
          : {
              value: this.getProtocolStep(this.stepID).parameters.tipsStrategy,
              name: this.getProtocolStep(this.stepID)
                .parameters.tipsStrategy.toLowerCase()
                .replace(/\b\w/g, (l) => l.toUpperCase()),
            };
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_ARRAY_TRANSFER_TIPS_STRATEGY, {
          id: this.stepID,
          newValue: newValue.value,
        });
      },
    },
    /**
     * A read/write object for the array transfer liquid configuration.
     */
    arrayTransferLiquidConfig: {
      get: function() {
        return this.formType !== "array_transfer" ||
          this.stepID < 0 ||
          typeof this.getProtocolStep(this.stepID).parameters.liquidClassId !==
            "number"
          ? null
          : {
              id: this.getProtocolStep(this.stepID).parameters.liquidClassId,
              name: this.getProtocolStep(this.stepID).parameters.liquidClass,
            };
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_ARRAY_TRANSFER_LIQUID_CLASS, {
          id: this.stepID,
          value: newValue,
        });
      },
    },
    /**
     * A read/write object for the array transfer source offset type.
     */
    arrayTransferSourceOffsetType: {
      get: function() {
        return this.formType !== "array_transfer" || this.stepID < 0
          ? null
          : { name: this.getProtocolStep(this.stepID).parameters.offset.source_type };
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_ARRAY_TRANSFER_SOURCE_OFFSET_TYPE, {
          id: this.stepID,
          newValue: newValue.name,
        });
      },
    },
    /**
     * A read/write object for the array transfer destination offset type.
     */
    arrayTransferDestinationOffsetType: {
      get: function() {
        return this.formType !== "array_transfer" || this.stepID < 0
          ? null
          : {
              name: this.getProtocolStep(this.stepID).parameters.offset
                .destination_type,
            };
      },
      set: function(newValue) {
        this.$store.dispatch(
          types.UPDATE_ARRAY_TRANSFER_DESTINATION_OFFSET_TYPE,
          {
            id: this.stepID,
            newValue: newValue.name,
          }
        );
      },
    },
    /**
     * A read/write object for the array transfer source offset.
     */
    arrayTransferSourceOffset: {
      get: function() {
        return this.formType !== "array_transfer" || this.stepID < 0
          ? null
          : this.getProtocolStep(this.stepID).parameters.offset.source;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_ARRAY_TRANSFER_SOURCE_OFFSET, {
          id: this.stepID,
          newValue: parseFloat(newValue),
        });
      },
    },
    /**
     * A read/write object for the array transfer destination offset.
     */
    arrayTransferDestinationOffset: {
      get: function() {
        return this.formType !== "array_transfer" || this.stepID < 0
          ? null
          : this.getProtocolStep(this.stepID).parameters.offset.destination;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_ARRAY_TRANSFER_DESTINATION_OFFSET, {
          id: this.stepID,
          newValue: parseFloat(newValue),
        });
      },
    },
    /**
     * A read/write object for the array transfer step's array map filename.
     */
    arrayMapFileName: {
      get: function() {
        return this.formType !== "array_transfer" || this.stepID < 0
          ? null
          : this.getProtocolStep(this.stepID).parameters.array_map_filename;
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_ARRAY_MAP_FILENAME, {
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
  padding-bottom: 30px;
}
.step_config_form__body__content__file_hyperlink {
  font-size: 9px;
}
.step_config_form__body__content__colour_button {
  width: 91%;
  font-size: 14px;
  font-weight: bold;
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
.step_config_form__body__content__input--stretch {
  background: #efefff;
  box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.25),
    inset -2px -2px 4px 3px rgba(255, 255, 255, 0.25),
    inset -2px -2px 4px 3px rgba(255, 255, 255, 0.25);
  border-radius: 6px;
  font-size: 12px;
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
#uploadArrayMapFile {
  display: none;
}
.step_config_form__body__content__file_upload_button {
  background: #efefff;
  border-radius: 4px;
  border: 0;
  color: grey;
  height: 30px;
  font-size: 14px;
  font-weight: bold;
  filter: drop-shadow(3px 3px 4px rgba(0, 0, 0, 0.25));
}
.step_config_form__body__content__file_group {
  display: grid;
  grid-template-columns: 6fr auto;
  grid-column-gap: 8px;
  width: 91%;
}
.step_config_form__title {
  font-size: 18px;
  margin: 0px;
}
.step_config_form__body__content__field_group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 40px;
  width: 92%;
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
.step_config_form__body__content__label--min {
  font-size: 10px;
  margin: 0px;
  margin-bottom: 8px;
}
</style>
