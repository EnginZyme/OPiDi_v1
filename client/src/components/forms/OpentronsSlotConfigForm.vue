<template>
  <div>
    <div class="slot_layout__grid">
      <DeckSlotCard :index="10" />
      <DeckSlotCard :index="11" />
      <div></div>
      <DeckSlotCard :index="7" />
      <DeckSlotCard :index="8" />
      <DeckSlotCard :index="9" />
      <DeckSlotCard :index="4" />
      <DeckSlotCard :index="5" />
      <DeckSlotCard :index="6" />
      <DeckSlotCard :index="1" />
      <DeckSlotCard :index="2" />
      <DeckSlotCard :index="3" />
    </div>
  </div>
</template>

<script>
import DeckSlotCard from "../base/DeckSlotCard";

/**
 * Displays all the Opentrons slot cards for user interaction.
 */
export default {
  name: "OpentronsSlotConfigForm",
  components: {
    DeckSlotCard,
  },
};
</script>

<style scoped>
.slot_layout__grid {
  display: grid;
  grid-row-gap: max(2vh, 10px);
  grid-column-gap: max(9px, 2vh);
  grid-template-columns: minmax(230px, 1fr) minmax(230px, 1fr) minmax(
      230px,
      1fr
    );
  grid-auto-rows: minmax(160px, 20vh);
  padding: 21px 160px 30px 160px;
}
</style>
