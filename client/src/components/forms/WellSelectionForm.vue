<template>
  <Dialog
    :header="`Well Selection`"
    :visible="shouldDisplayModal"
    :style="{ minWidth: '40vw', maxWidth: '75vw' }"
    :closable="false"
    :modal="true"
  >
    <br />
    <div class="info">
      <p>
        <span>Click to select the boxes, use</span>
        <span class="key">ctrl</span> / <span class="key">cmd</span> +
        <span class="key">shift</span>
        <span> to select a range.</span>
      </p>
      <p>
        Click and drag <span class="key">left mouse</span> to make a
        multi-selection.
      </p>
      <p>
        Hold <span class="key">ctrl</span> / <span class="key">cmd</span> to
        make multiple selections.
      </p>
      <p>
        <b>Note</b>: The order you click on the wells is the order that the OT robot
        will make the transfers.
      </p>
    </div>
    <div class="box_container" v-if="shouldDisplayModal">
      <div
        class="boxes"
        :style="
          `grid-template-columns: repeat(${labwareDefinitionObject.ordering
            .length + 2}, 3.5em);`
        "
      >
        <p></p>
        <template v-for="col in labwareDefinitionObject.ordering.length">
          <p class="label" :key="col">{{ col }}</p>
        </template>
        <p></p>

        <template
          v-for="row in Math.max(
            ...labwareDefinitionObject.ordering.map((item) => item.length)
          )"
        >
          <template
            v-for="(col, idx) in labwareDefinitionObject.ordering.length"
          >
            <p class="label" v-if="col === 1" :key="`${row}-${col}_`">
              {{ convertNumberToAlphabet(row) }}
            </p>

            <div
              :key="`${row}-${col}`"
              v-if="
                labwareDefinitionObject.ordering[idx].includes(
                  `${convertNumberToAlphabet(row)}${col}`
                )
              "
              :id="`${convertNumberToAlphabet(row)}${col}`"
              :ref="`${convertNumberToAlphabet(row)}${col}`"
            ></div>
            <p v-else :key="`${row}-${col}`"></p>

            <p
              class="label"
              v-if="col === labwareDefinitionObject.ordering.length"
              :key="`${row}-${col}__`"
            >
              {{ convertNumberToAlphabet(row) }}
            </p>
          </template>
        </template>

        <p></p>
        <template v-for="col in labwareDefinitionObject.ordering.length">
          <p class="label" :key="`${col}_`">{{ col }}</p>
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
import SelectionArea from "@simonwep/selection-js";

/**
 * Accepts user input on the selection of wells for its parent step object.
 */
export default {
  name: "WellSelectionForm",
  mounted() {
    const selection = new SelectionArea({
      // All elements in this container can be selected
      selectables: [".boxes > div"],

      // The container is also the boundary in this case
      boundaries: [".boxes"],
    })
      .on("start", ({ store, event }) => {
        // Remove class if the user isn't pressing the control key or ⌘ key
        if (!event.ctrlKey && !event.metaKey) {
          // Unselect all elements
          for (const el of store.stored) {
            el.classList.remove("selected");
          }

          // Clear previous selection
          selection.clearSelection();
        }
      })
      .on(
        "move",
        ({
          store: {
            changed: { added, removed },
          },
        }) => {
          // Add a custom class to the elements that where selected.
          for (const el of added) {
            el.classList.add("selected");
          }

          // Remove the class from elements that where removed
          // since the last selection
          for (const el of removed) {
            el.classList.remove("selected");
          }
        }
      )
      .on("stop", () => {
        selection.keepSelection();
      });
    for (let selector of this.value) {
      this.$refs[selector][0].classList.add("selected");
      selection.select(this.$refs[selector][0]);
    }
    selection.keepSelection();
  },
  computed: {
    ...mapGetters(["labwareDefinitions"]),
    /**
     * Returns the definition object for the labware mapped to this component.
     */
    labwareDefinitionObject() {
      if (!this.shouldDisplayModal) return null;
      return this.labwareDefinitions.filter(
        (item) => item.id === this.labwareId
      )[0].labware_def;
    },
  },
  props: {
    /**
     * Determines if this component is rendered or not
     */
    shouldDisplayModal: Boolean,
    /**
     * The ID of the labware from which wells are to be selected
     */
    labwareId: String,
    /**
     * An array containing the IDs of the initially selected wells
     */
    value: Array,
  },
  methods: {
    /**
     * Fetches a protocol step by its ID.
     *
     * @param {number} id - The said ID.
     */
    getProtocolStep(id) {
      return findDeep(this.cachedProtocolSteps, id);
    },
    /**
     * Closes this component modal.
     */
    closeModal() {
      let output = [];
      for (const el of document.getElementsByClassName("selected")) {
        output.push(el.id);
      }
      this.$emit("input", output);
      this.$emit("formClosed");
    },
    /**
     * Converts a number to its corresponding alphabet.
     *
     * @param {number} num - The said number.
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

.box_container {
  display: grid;
  align-items: center;
  justify-content: center;
  overflow: auto;
}
.boxes {
  display: grid;
  grid-gap: 0.4em;
  padding: 0.5em;
  overflow: auto;
}
.boxes div {
  height: 3em;
  width: 3em;
  margin: 0.2em;
  background: rgba(66, 68, 90, 0.075);
  border: 2px solid transparent;
  border-radius: 0.15em;
  cursor: pointer;
}
.boxes div.selected {
  background: #2196f3;
  border: 2px solid rgba(0, 0, 0, 0.075);
}
.label {
  margin: 0;
  text-align: center;
  line-height: 3em;
  font-family: "Roboto Mono", monospace;
  color: rgba(66, 68, 90, 50%);
}
.info {
  text-align: center;
  font-family: "Roboto Mono", monospace;
  font-size: 10px;
  margin: 1em 0 2em 0;
  line-height: 2em;
  color: #42445a;
}
.key {
  display: inline-block;
  font-weight: bold;
  text-transform: uppercase;
  color: #2196f3;
  font-size: 10px;
  line-height: 1em;
  padding: 0.25em 0.4em 0.2em 0.4em;
  margin: 0 0.5em -4px;
  border: 1px solid #2196f3;
  border-bottom: 3px solid #2196f3;
  border-radius: 2px;
}
</style>
