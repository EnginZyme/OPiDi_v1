<template>
  <Dialog
    :header="`Slot ${index} Labware`"
    :visible="shouldDisplayModal"
    :style="{ width: '500px' }"
    :closable="false"
    :modal="true"
  >
    <Accordion>
      <AccordionTab header="TIP RACK">
        <div class="labware_option_list">
          <div
            v-for="(labware, index) in tipRacks"
            :key="index"
            class="labware_option_list__button"
            @click="addLabwareToDeckSlot(labware)"
          >
            {{ labware.labware_name }}
          </div>
        </div>
      </AccordionTab>
      <AccordionTab header="TUBE RACK">
        <div class="labware_option_list">
          <div
            v-for="(labware, index) in tubeRacks"
            :key="index"
            class="labware_option_list__button"
            @click="addLabwareToDeckSlot(labware)"
          >
            {{ labware.labware_name }}
          </div>
        </div>
      </AccordionTab>
      <AccordionTab header="WELL PLATE">
        <div class="labware_option_list">
          <div
            v-for="(labware, index) in wellPlates"
            :key="index"
            class="labware_option_list__button"
            @click="addLabwareToDeckSlot(labware)"
          >
            {{ labware.labware_name }}
          </div>
        </div>
      </AccordionTab>
      <AccordionTab header="RESERVOIR">
        <div class="labware_option_list">
          <div
            v-for="(labware, index) in reservoirs"
            :key="index"
            class="labware_option_list__button"
            @click="addLabwareToDeckSlot(labware)"
          >
            {{ labware.labware_name }}
          </div>
        </div>
      </AccordionTab>
      <AccordionTab header="SHAKER">
        <div class="labware_option_list">
          <div
            v-for="(labware, index) in shakerLabwares"
            :key="index"
            class="labware_option_list__button"
            @click="addLabwareToDeckSlot(labware)"
          >
            {{ labware.labware_name }}
          </div>
        </div>
      </AccordionTab>
    </Accordion>
    <template #footer>
      <Button label="Close" @click="closeModal" autofocus />
    </template>
  </Dialog>
</template>

<script>
import { mapGetters } from "vuex";
import types from "../../types";

/**
 * A component that enable the user to select only one labware from a  list of all available labwares.
 */
export default {
  name: "LabwareSelectForm",
  props: {
    /**
     * Determines if this component is displayed or not.
     */
    shouldDisplayModal: Boolean,
    /**
     * The index of the deck slot that displays this component when clicked within the protocol editor UI.
     */
    index: Number,
  },
  methods: {
    addLabwareToDeckSlot(labware) {
      this.$store
        .dispatch(types.ADD_LABWARE, {
          id: this.index,
          labware,
        })
        .then(() => this.closeModal());
    },
    closeModal() {
      this.$emit("formClosed");
    },
  },
  computed: {
    ...mapGetters([
      "tipRacks",
      "tubeRacks",
      "wellPlates",
      "reservoirs",
      "shakerLabwares",
    ]),
  },
};
</script>

<style scoped>
.labware_option_list {
  display: grid;
  grid-auto-rows: auto;
  grid-row-gap: 8px;
}
.labware_option_list__button {
  cursor: pointer;
}
.labware_option_list__button:hover {
  color: #2196f3;
}
</style>
