<template>
  <div class="deck-slot-card">
    <LabwareSelectForm
      :shouldDisplayModal="shouldDisplayLabwareModal"
      :index="index"
      @formClosed="closeLabwareSelectionModal"
    />
    <template v-if="!deckSlotHasAddedLabware">
      <div
        class="deck-slot-card__underlay deck-slot-card__underlay--deck-index"
      >
        {{ deckSlotIndex }}
      </div>
      <div
        class="deck-slot-card__overlay deck-slot-card__overlay--add-labware"
        @click="openLabwareSelectionModal"
      >
        <p>+ Add Labware</p>
      </div>
    </template>
    <template v-else>
      <div class="deck-slot-card__underlay">
        <div class="deck-slot-card__underlay__banner">
          <div
            v-if="deckSlotObject.nickname.length"
            class="deck-slot-card__underlay__banner__nested-content"
          >
            <p
              class="deck-slot-card__underlay__banner__nested-content__deck-nickname"
            >
              {{ `${deckSlotObject.nickname}` }}
            </p>
            <p
              class="deck-slot-card__underlay__banner__nested-content__deck-labware-name"
            >
              {{ `(${deckSlotObject.labware_name})` }}
            </p>
          </div>
          <p v-else>{{ deckSlotObject.labware_name }}</p>
        </div>
      </div>
      <div class="deck-slot-card__overlay deck-slot-card__overlay--grid">
        <Inplace
          :closable="false"
          class="deck-slot-card__overlay--grid__nickname-input"
        >
          <template #display>
            <span
              class="deck-slot-card__overlay--grid__nickname-input-display"
              >{{ deckSlotLabwareNickName || "Nickname ?" }}</span
            >
          </template>

          <template #content>
            <InputText
              v-model="deckSlotLabwareNickName"
              autoFocus
              class="deck-slot-card__overlay--grid__nickname-input-field"
            />
          </template>
        </Inplace>
        <span @click="removeLabwareFromDeckSlot()"
          ><i class="pi pi-times" style="font-size: 10px"></i> Remove
          Labware</span
        >
        <span @click="openLabwareSelectionModal"
          ><i class="pi pi-pencil" style="font-size: 10px"></i> Edit
          Labware</span
        >
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import types from "../../types";
import LabwareSelectForm from "../forms/LabwareSelectForm";

/**
 * A component that renders information and actions on a specified deck slot within the object
 * in the protocol cache (protocol editor).
 */
export default {
  name: "DeckSlotCard",
  props: {
    /**
     * Represents the index of the deck slot in question.
     */
    index: Number,
  },
  components: {
    LabwareSelectForm,
  },
  data() {
    return {
      shouldDisplayLabwareModal: false,
    };
  },
  methods: {
    /**
     * Triggers the rendering of the labware selection form.
     */
    openLabwareSelectionModal() {
      this.shouldDisplayLabwareModal = true;
    },
    /**
     * Triggers the taking down of the labware selection form.
     */
    closeLabwareSelectionModal() {
      this.shouldDisplayLabwareModal = false;
    },
    /**
     * Triggers an action to remove the labware data saved within the deck slot in question.
     */
    removeLabwareFromDeckSlot() {
      this.$store.dispatch(types.REMOVE_LABWARE_FROM_DECK_SLOT, this.index);
    },
  },
  computed: {
    /**
     * A getter of the index of the deck slot in scope.
     */
    deckSlotIndex() {
      return this.index;
    },
    /**
     * Returns the data stored in a given deck slot given its index.
     */
    deckSlotObject() {
      let slotObject = null;

      if (this.index === 1) slotObject = this.slot1;
      else if (this.index === 2) slotObject = this.slot2;
      else if (this.index === 3) slotObject = this.slot3;
      else if (this.index === 4) slotObject = this.slot4;
      else if (this.index === 5) slotObject = this.slot5;
      else if (this.index === 6) slotObject = this.slot6;
      else if (this.index === 7) slotObject = this.slot7;
      else if (this.index === 8) slotObject = this.slot8;
      else if (this.index === 9) slotObject = this.slot9;
      else if (this.index === 10) slotObject = this.slot10;
      else if (this.index === 11) slotObject = this.slot11;
      else if (this.index === 12) slotObject = this.slot12;

      return slotObject;
    },
    /**
     * An indicator of if the deck slot in scope has labware added to it.
     */
    deckSlotHasAddedLabware() {
      return this.deckSlotObject.labware_id;
    },
    /**
     * A read/write object for the nickname of the deck slot in scope.
     */
    deckSlotLabwareNickName: {
      get: function() {
        return this.deckSlotObject.nickname;
      },
      set: function(newValue) {
        return this.$store.dispatch(types.UPDATE_SLOT_NICKNAME, {
          id: this.index,
          nickname: newValue,
        });
      },
    },
    ...mapGetters([
      "slot1",
      "slot2",
      "slot3",
      "slot4",
      "slot5",
      "slot6",
      "slot7",
      "slot8",
      "slot9",
      "slot10",
      "slot11",
      "slot12",
    ]),
  },
};
</script>

<style scoped>
.deck-slot-card {
  position: relative;
}
.deck-slot-card:hover .deck-slot-card__overlay {
  opacity: 1;
}
.deck-slot-card__underlay--deck-index {
  padding: 12px 22px;
  justify-content: center;
  align-content: center;
  font-size: 36px;
}
.deck-slot-card__underlay {
  background: #efefff;
  box-shadow: 4px 4px 4px 2px rgba(255, 255, 255, 0.25),
    4px 4px 9px 2px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  display: grid;
  cursor: pointer;
  font-weight: bold;
  color: #767676;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.deck-slot-card__underlay__banner__nested-content__deck-nickname {
  width: inherit;
  margin: 0px;
  margin-bottom: 4px;
  padding: 0px 10px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.deck-slot-card__underlay__banner__nested-content__deck-labware-name {
  margin: 0;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.deck-slot-card__underlay__banner {
  border-radius: 2px;
  background: rgba(0, 0, 0, 0.7);
  color: #efefff;
  text-align: center;
  font-size: 11px;
  align-content: center;
  justify-content: center;
  display: grid;
  width: 100%;
  height: 54%;
  padding-left: 10px;
  padding-right: 10px;
  align-self: end;
}
.deck-slot-card__overlay {
  display: grid;
  border-radius: 2px;
  cursor: pointer;
  align-content: center;
  justify-content: center;
  opacity: 0;
  z-index: 9;
  transition: 0.5s ease;
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  font-weight: 600;
  color: #efefff;
}
.deck-slot-card__overlay--add-labware {
  font-size: 18px;
}
.deck-slot-card__overlay--grid {
  font-size: 14px;
  grid-template-columns: 65%;
  grid-auto-rows: 20px;
  grid-row-gap: 14px;
}
.deck-slot-card__overlay--grid__nickname-input {
  margin-bottom: 3px;
  font-size: 14px;
  font-weight: 600;
  padding-left: 0px;
}
.deck-slot-card__overlay--grid__nickname-input-display {
  font-size: 12px;
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 90%;
}
.deck-slot-card__underlay__banner__nested-content {
  display: grid;
  justify-content: center;
}
.deck-slot-card__overlay--grid__nickname-input-field {
  width: 90%;
  height: 25px;
  background: #bcbcbc00;
  color: #efefff;
  font-size: 12px;
}
</style>
