<template>
  <div>
    <div class="deck_setup_view">
      <div class="deck_setup_view__header">
        <div class="deck_setup_view__header__title">
          <span class="deck_setup_view__header__title__text">Deck Setup</span>
        </div>
      </div>
      <div class="deck_setup_view__body">
        <span>
          <label for="" class="deck_setup_view__body__device_type_label"
            >Device Type</label
          >
          <Dropdown
            :options="[{ name: 'Opentrons' }]"
            v-model="deviceType"
            optionLabel="name"
            placeholder="Select Device"
            class="deck_setup_view__body__dropdown"
          />
        </span>
        <div>
          <div class="deck_setup_view__body__deck_layout_card">
            <p>Deck Layout</p>
            <OpentronsSlotConfigForm />
          </div>
        </div>
        <div class="deck_setup_view__body__pipettes_card">
          <p>Pipettes</p>
          <div class="deck_setup_view__body__pipettes_card__grid">
            <div
              class="deck_setup_view__body__pipettes_card__grid__dropdown_group"
            >
              <label for="" class="deck_setup_view__body__pipettes_card__label"
                >Left Pipette</label
              >
              <Dropdown
                :options="pipettes"
                v-model="leftPipette"
                optionLabel="name"
                placeholder="Select Pipette"
                class="deck_setup_view__body__dropdown--long"
              />
            </div>
            <div
              class="deck_setup_view__body__pipettes_card__grid__dropdown_group"
            >
              <label for="" class="deck_setup_view__body__pipettes_card__label"
                >Right Pipette</label
              >
              <Dropdown
                :options="pipettes"
                v-model="rightPipette"
                optionLabel="name"
                placeholder="Select Pipette"
                class="deck_setup_view__body__dropdown--long"
              />
            </div>
            <div
              class="deck_setup_view__body__pipettes_card__grid__dropdown_group"
            >
              <label for="" class="deck_setup_view__body__pipettes_card__label"
                >Left Tipracks</label
              >
              <MultiSelect
                v-model="leftSelectedTipracks"
                :options="leftTipracks"
                optionLabel="id"
                placeholder="Select Tiprack(s)"
                class="deck_setup_view__body__dropdown--long"
              />
            </div>
            <div
              class="deck_setup_view__body__pipettes_card__grid__dropdown_group"
            >
              <label for="" class="deck_setup_view__body__pipettes_card__label"
                >Right Tipracks</label
              >
              <MultiSelect
                v-model="rightSelectedTipracks"
                :options="rightTipracks"
                optionLabel="id"
                placeholder="Select Tiprack(s)"
                class="deck_setup_view__body__dropdown--long"
              />
            </div>
          </div>
        </div>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import OpentronsSlotConfigForm from "../forms/OpentronsSlotConfigForm";
import { mapGetters } from "vuex";
import types from "../../types";

/**
 * A component that renders the deck setup view.
 */
export default {
  name: "DeckSetupView",
  components: {
    OpentronsSlotConfigForm,
  },
  data() {
    return {
      /**
       * Points the the robot device type object.
       */
      deviceType: {
        name: "Opentrons",
      },
    };
  },
  computed: {
    /**
     * A read/write object for the left pipette attribute of the protocol deck.
     */
    leftPipette: {
      get: function() {
        return this.pipettes.filter(
          (item) =>
            item.name === this.cachedProtocolDeck.left_pipette.pipette.name
        )[0];
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_LEFT_PIPETTE, newValue);
      },
    },
    /**
     * A read/write object for the right pipette attribute of the protocol deck.
     */
    rightPipette: {
      get: function() {
        return this.pipettes.filter(
          (item) =>
            item.name === this.cachedProtocolDeck.right_pipette.pipette.name
        )[0];
      },
      set: function(newValue) {
        this.$store.dispatch(types.UPDATE_RIGHT_PIPETTE, newValue);
      },
    },
    /**
     * A read/write object for the left selected tipracks attribute of the protocol deck.
     */
    leftSelectedTipracks: {
      get: function() {
        return this.cachedProtocolDeck.left_pipette.tipracks.map((item) => ({
          id: item,
        }));
      },
      set: function(newValue) {
        this.$store.dispatch(
          types.UPDATE_LEFT_TIPRACKS,
          newValue.map((item) => item.id)
        );
      },
    },
    /**
     * A read/write object for the right selected tipracks attribute of the protocol deck.
     */
    rightSelectedTipracks: {
      get: function() {
        return this.cachedProtocolDeck.right_pipette.tipracks.map((id) => ({
          id,
        }));
      },
      set: function(newValue) {
        this.$store.dispatch(
          types.UPDATE_RIGHT_TIPRACKS,
          newValue.map((item) => item.id)
        );
      },
    },
    /**
     * Returns the tipracks available to be selected as left tipracks.
     */
    leftTipracks() {
      return this.chosenTipRacks
        .filter(
          (obj) =>
            !this.rightSelectedTipracks.filter((item) => item.id === obj.id)
              .length
        )
        .map((item) => ({
          id: item.id,
        }));
    },
    /**
     * Returns the tipracks available to be selected as right tipracks.
     */
    rightTipracks() {
      return this.chosenTipRacks
        .filter(
          (obj) =>
            !this.leftSelectedTipracks.filter((item) => item.id === obj.id)
              .length
        )
        .map((item) => ({
          id: item.id,
        }));
    },
    ...mapGetters(["pipettes", "chosenTipRacks", "cachedProtocolDeck"]),
  },
};
</script>

<style lang="scss" scoped>
.deck_setup_view__header__title__text {
  font-weight: 600;
  font-size: 18px;
  color: #040716;
  margin-left: 32px;
}
.deck_setup_view {
  min-height: 650px;
  min-width: 1000px;
  width: 95%;
  height: 90vh;
  background: #efefff;
  box-shadow: 6px 6px 9px 4px rgba(0, 0, 0, 0.25),
    -10px -10px 9px 4px rgba(255, 255, 255, 0.25);
  border-radius: 5px;
  align-self: center;
  justify-self: center;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-row-gap: 2px;
}
.deck_setup_view__header {
  height: 48px;
  background: #efefff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: grid;
  align-content: center;
}
.deck_setup_view__body {
  display: grid;
  grid-template-rows: 40px auto auto auto;
  grid-row-gap: 30px;
  padding: 37px 40px 0px 40px;
  overflow: auto;
}
.deck_setup_view__body__device_type_label {
  margin-right: 15px;
  font-size: 14px;
}
.deck_setup_view__body__pipettes_card__label {
  font-size: 12px;
}
.deck_setup_view__body__dropdown {
  background: #efefff;
  width: 140px;
  font-size: 12px;
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.25),
    -2px -2px 4px 1px rgba(255, 255, 255, 0.25);
  border-radius: 6px;
}
.deck_setup_view__body__dropdown--long {
  background: #efefff;
  width: auto;
  font-size: 12px;
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.25),
    -2px -2px 4px 1px rgba(255, 255, 255, 0.25);
  border-radius: 6px;
}
.deck_setup_view__body__pipettes_card {
  width: 800px;
  height: 300px;
  display: grid;
  background: #efefff;
  box-shadow: -2px -2px 9px 2px rgba(255, 255, 255, 0.25),
    2px 2px 9px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  padding: 1px 22px;
}
.deck_setup_view__body__pipettes_card__grid__dropdown_group {
  display: grid;
  grid-template-rows: 1.5em 32px;
}
.deck_setup_view__body__deck_layout_card {
  width: 100%;
  background: #efefff;
  box-shadow: -2px -2px 9px 2px rgba(255, 255, 255, 0.25),
    2px 2px 9px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  padding: 1px 22px;
  margin-bottom: 10px;
}
.deck_setup_view__body__pipettes_card__grid {
  padding: 10px;
  padding-bottom: 8%;
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 50px;
  grid-row-gap: 1vh;
}
</style>
