<template>
  <Dialog
    :header="`Well Selection (Multi Channel)`"
    :visible="shouldDisplayModal"
    :style="{ minWidth: '40vw', maxWidth: '75vw' }"
    :closable="false"
    :modal="true"
  >
    <br />
    <div class="well_selection_form__info_section">
      <p>
        <span>Click to select or deselect a column</span>
      </p>
      <p>
        <b>Note</b>: The order you click on the wells is the order that the OT robot
        will make the transfers.
      </p>
    </div>
    <div class="well_selection_form__wells_container" v-if="shouldDisplayModal">
      <div
        class="well_selection_form__wells"
        :style="
          `grid-template-columns: repeat(${labwareDefinitionObject.ordering.length +
            2}, 3.5em);`
        "
      >
        <p></p>
        <template v-for="col in labwareDefinitionObject.ordering.length">
          <p class="well_selection_form__wells_container__label" :key="col">
            {{ col }}
          </p>
        </template>
        <p></p>

        <template
          v-for="row in Math.max(
            ...labwareDefinitionObject.ordering.map((item) => item.length)
          )"
        >
          <template v-for="(col, idx) in labwareDefinitionObject.ordering.length">
            <p
              class="well_selection_form__wells_container__label"
              v-if="col === 1"
              :key="`${row}-${col}_`"
            >
              {{ convertNumberToAlphabet(row) }}
            </p>

            <div
              :key="`${row}-${col}`"
              v-if="labwareDefinitionObject.ordering[idx].includes(`${convertNumberToAlphabet(row)}${col}`)"
              :id="`${convertNumberToAlphabet(row)}${col}`"
              :ref="`${convertNumberToAlphabet(row)}${col}`"
              :class="getWellClass(`${convertNumberToAlphabet(row)}${col}`)"
              @click="toggleWellColumn(col)"
            ></div>
            <p v-else :key="`${row}-${col}`"></p>

            <p
              class="well_selection_form__wells_container__label"
              v-if="col === labwareDefinitionObject.ordering.length"
              :key="`${row}-${col}__`"
            >
              {{ convertNumberToAlphabet(row) }}
            </p>
          </template>
        </template>

        <p></p>
        <template v-for="col in labwareDefinitionObject.ordering.length">
          <p
            class="well_selection_form__wells_container__label"
            :key="`${col}_`"
          >
            {{ col }}
          </p>
        </template>
        <p></p>
      </div>
    </div>
    <template #footer>
      <Button label="Close" @click="closeModal" autofocus />
    </template>
  </Dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { findDeep } from "../../utils";

/**
 * Accepts user input on the selection of wells for its parent step object with a restriction
 * of selections to atomic actions of selecting a single column.
 */
export default {
  name: "MultiWellSelectionForm",
  computed: {
    ...mapGetters(["labwareDefinitions"]),
    /**
     * Provides the definition object for the labware this components is mapped to.
     */
    labwareDefinitionObject() {
      if (!this.shouldDisplayModal) return null;
      return this.labwareDefinitions.filter((item) => item.id === this.labwareId)[0]
        .labware_def;
    },
  },
  data() {
    return {
      /**
       * Stores the indices of the user-selected wells.
       */
      selectedWells: [],
    };
  },
  mounted() {
    this.selectedWells = [
      ...new Set(this.value.map((item) => item.slice(1))),
    ].map((item) => `A${item}`);
  },
  props: {
    /**
     * Determines if this component is rendered or not.
     */
    shouldDisplayModal: Boolean,
    /**
     * The ID of the labware from which wells are to be selected.
     */
    labwareId: String,
    /**
     * An array containing the IDs of the initially selected wells.
     */
    value: Array,
  },
  methods: {
    /**
     * Fetches a protocol step by its ID.
     * 
     * @params {number} id - The ID of the said protocol step.
     */
    getProtocolStep(id) {
      return findDeep(this.cachedProtocolSteps, id);
    },
    /**
     * Returns the appropriate class for a well.
     * 
     * @params {string} id - The ID of the said well.
     */
    getWellClass(well) {
      if (this.selectedWells.includes(well)) return "picked";
      else if (
        this.selectedWells.filter((item) => item.slice(1) === well.slice(1))
          .length
      )
        return "shadowed";
      return "";
    },
    /**
     * Selects (or deselects) all wells in a column at once.
     * 
     * @params {number} col - The index of the said column.
     */
    toggleWellColumn(col) {
      const well = `A${col}`;

      if (this.selectedWells.includes(well)) {
        this.selectedWells = this.selectedWells.filter((item) => item !== well);
      } else {
        this.selectedWells.push(well);
      }
    },
    /**
     * Closes this component modal.
     */
    closeModal() {
      this.$emit("input", this.selectedWells);
      this.$emit("formClosed");
    },
    /**
     * Converts a number into its corresponding alphabet.
     * 
     * @params {number} num - The said number.
     */
    convertNumberToAlphabet(num) {
      if (num < 1 || num > 26 || typeof num !== "number") {
        return -1;
      }
      const leveller = 64;
      return String.fromCharCode(num + leveller);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono");

.well_selection_form__wells_container {
  display: grid;
  align-items: center;
  justify-content: center;
  overflow: auto;
}
.well_selection_form__wells {
  display: grid;
  grid-gap: 0.4em;
  padding: 0.5em;
  overflow: auto;
}
.well_selection_form__wells div {
  height: 3em;
  width: 3em;
  margin: 0.2em;
  background: rgba(66, 68, 90, 0.075);
  border: 2px solid transparent;
  border-radius: 0.15em;
  cursor: pointer;
}
.well_selection_form__wells div.picked {
  background: #2196f3;
  border: 2px solid rgba(0, 0, 0, 0.075);
}
.well_selection_form__wells div.shadowed {
  background: #2196f399;
  border: 2px solid rgba(0, 0, 0, 0.075);
}
.well_selection_form__wells_container__label {
  margin: 0;
  text-align: center;
  line-height: 3em;
  font-family: "Roboto Mono", monospace;
  color: rgba(66, 68, 90, 50%);
}
.well_selection_form__info_section {
  text-align: center;
  font-family: "Roboto Mono", monospace;
  font-size: 10px;
  margin: 1em 0 2em 0;
  line-height: 2em;
  color: #42445a;
}
</style>
