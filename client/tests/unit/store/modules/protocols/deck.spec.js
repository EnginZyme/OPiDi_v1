import deckModule from "@/store/modules/protocols/deck";
import types from "@/types";

const sampleState = {
  cache: {
    deck: {
      left_pipette: {
        pipette: {
          name: "8 Channel 300 uL - Gen 2",
          id: "p300_multi_gen2",
          is_multichannel: true,
        },
        tipracks: [8],
      },
      right_pipette: {
        pipette: {
          name: "Single Channel 300 uL - Gen 1",
          id: "p300_single",
          is_multichannel: true,
        },
        tipracks: [7],
      },
      slots: {
        "1": {
          name: "wellplate_1",
          labware_name: "test 96 wellplate 2ml 3xT",
          labware_type: "shakerLabware",
          labware_id: "test_96_wellplate_2ml_3xT",
          nickname: "",
          display_name: "test 96 wellplate 2ml 3xT [1]",
          id: 1,
        },
        "2": {
          name: "tuberack_2",
          labware_name: "test tuberack 65 mL tubes",
          labware_type: "tubeRack",
          labware_id: "test_tuberack_65_mL_tubes",
          nickname: "",
          display_name: "test tuberack 65 mL tubes [2]",
          id: 2,
        },
        "3": {},
        "4": {},
        "5": {
          name: "reservoir_5",
          labware_name: "test slot 3 mL",
          labware_type: "reservoir",
          labware_id: "test_slot_3_mL",
          nickname: "",
          display_name: "test slot 3 mL [5]",
          id: 5,
        },
        "6": {},
        "7": {
          name: "tiprack_7",
          labware_name: "Opentrons 96 Tip Rack 0.3 mL",
          labware_type: "tipRack",
          labware_id: "opentrons_96_tiprack_300ul",
          nickname: "",
          display_name: "Opentrons 96 Tip Rack 0.3 mL [7]",
          id: 7,
        },
        "8": {
          name: "tiprack_8",
          labware_name: "Opentrons 96 Tip Rack 0.3 mL",
          labware_type: "tipRack",
          labware_id: "opentrons_96_tiprack_300ul",
          nickname: "",
          display_name: "Opentrons 96 Tip Rack 0.3 mL [8]",
          id: 8,
        },
        "9": {},
        "10": {},
        "11": {},
        "12": {},
      },
    },
  },
};

describe("deck module getters", () => {
  const state = JSON.parse(JSON.stringify(sampleState));

  test("has a correctly functioning 'cachedProtocolDeck' member", () => {
    expect(deckModule.getters.cachedProtocolDeck(state)).toStrictEqual(state.cache.deck);
  });

  test("has a correctly functioning 'cachedProtocolPipettes' member", () => {
    expect(deckModule.getters.cachedProtocolPipettes(state)).toStrictEqual([
      {
        name: "(Left) 8 Channel 300 uL - Gen 2",
        category: "left_pipette",
        is_multichannel: true,
      },
      {
        name: "(Right) Single Channel 300 uL - Gen 1",
        category: "right_pipette",
        is_multichannel: true,
      },
    ]);
  });

  test("has a correctly functioning 'nonTipRackLabwares' member", () => {
    expect(deckModule.getters.nonTipRackLabwares(state)).toStrictEqual([
      {
        name: "wellplate_1",
        labware_name: "test 96 wellplate 2ml 3xT",
        labware_type: "shakerLabware",
        labware_id: "test_96_wellplate_2ml_3xT",
        nickname: "",
        display_name: "test 96 wellplate 2ml 3xT [1]",
        id: 1,
      },
      {
        name: "tuberack_2",
        labware_name: "test tuberack 65 mL tubes",
        labware_type: "tubeRack",
        labware_id: "test_tuberack_65_mL_tubes",
        nickname: "",
        display_name: "test tuberack 65 mL tubes [2]",
        id: 2,
      },
      {
        name: "reservoir_5",
        labware_name: "test slot 3 mL",
        labware_type: "reservoir",
        labware_id: "test_slot_3_mL",
        nickname: "",
        display_name: "test slot 3 mL [5]",
        id: 5,
      },
    ]);
  });

  test("has a correctly functioning 'chosenTipRacks' member", () => {
    expect(deckModule.getters.chosenTipRacks(state)).toStrictEqual([
      {
        name: "tiprack_7",
        labware_name: "Opentrons 96 Tip Rack 0.3 mL",
        labware_type: "tipRack",
        labware_id: "opentrons_96_tiprack_300ul",
        nickname: "",
        display_name: "Opentrons 96 Tip Rack 0.3 mL [7]",
        id: 7,
      },
      {
        name: "tiprack_8",
        labware_name: "Opentrons 96 Tip Rack 0.3 mL",
        labware_type: "tipRack",
        labware_id: "opentrons_96_tiprack_300ul",
        nickname: "",
        display_name: "Opentrons 96 Tip Rack 0.3 mL [8]",
        id: 8,
      },
    ]);
  });

  test("has a correctly functioning 'slot1' member", () => {
    expect(deckModule.getters.slot1(state)).toStrictEqual(state.cache.deck.slots[1]);
  });

  test("has a correctly functioning 'slot2' member", () => {
    expect(deckModule.getters.slot2(state)).toStrictEqual(state.cache.deck.slots[2]);
  });

  test("has a correctly functioning 'slot3' member", () => {
    expect(deckModule.getters.slot3(state)).toStrictEqual(state.cache.deck.slots[3]);
  });

  test("has a correctly functioning 'slot4' member", () => {
    expect(deckModule.getters.slot4(state)).toStrictEqual(state.cache.deck.slots[4]);
  });

  test("has a correctly functioning 'slot5' member", () => {
    expect(deckModule.getters.slot5(state)).toStrictEqual(state.cache.deck.slots[5]);
  });

  test("has a correctly functioning 'slot6' member", () => {
    expect(deckModule.getters.slot6(state)).toStrictEqual(state.cache.deck.slots[6]);
  });

  test("has a correctly functioning 'slot7' member", () => {
    expect(deckModule.getters.slot7(state)).toStrictEqual(state.cache.deck.slots[7]);
  });

  test("has a correctly functioning 'slot8' member", () => {
    expect(deckModule.getters.slot8(state)).toStrictEqual(state.cache.deck.slots[8]);
  });

  test("has a correctly functioning 'slot9' member", () => {
    expect(deckModule.getters.slot9(state)).toStrictEqual(state.cache.deck.slots[9]);
  });

  test("has a correctly functioning 'slot10' member", () => {
    expect(deckModule.getters.slot10(state)).toStrictEqual(state.cache.deck.slots[10]);
  });

  test("has a correctly functioning 'slot11' member", () => {
    expect(deckModule.getters.slot11(state)).toStrictEqual(state.cache.deck.slots[11]);
  });

  test("has a correctly functioning 'slot12' member", () => {
    expect(deckModule.getters.slot12(state)).toStrictEqual(state.cache.deck.slots[12]);
  });
});

describe("deck module mutations", () => {
  test("has a correctly functioning 'types.UPDATE_CACHED_PROTOCOL_DECK' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const obj = {};

    deckModule.mutations[types.UPDATE_CACHED_PROTOCOL_DECK](state, obj);

    expect(state.cache.deck).toStrictEqual(obj);
  });

  test("has a correctly functioning 'types.RESET_DECK' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));

    deckModule.mutations[types.RESET_DECK](state);

    expect(state.cache.deck).toStrictEqual({});
  });

  test("has a correctly functioning 'types.ADD_LABWARE' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const data = {
      labware: {
        labware_name: "labware_name",
        labware_type: "labware_type",
        labware_id: "labware_id",
      },
      id: 1,
    };

    deckModule.mutations[types.ADD_LABWARE](state, data);

    expect(state.cache.deck.slots[data.id]["labware_id"]).toStrictEqual(
      data.labware.labware_id
    );
  });

  test("has a correctly functioning 'types.REMOVE_LABWARE_FROM_DECK_SLOT' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const id = 1;

    deckModule.mutations[types.REMOVE_LABWARE_FROM_DECK_SLOT](state, id);

    expect(state.cache.deck.slots[id]).toStrictEqual({});
  });

  test("has a correctly functioning 'types.UPDATE_SLOT_NICKNAME' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const data = {
      id: 1,
      nickname: "nickname",
    };

    deckModule.mutations[types.UPDATE_SLOT_NICKNAME](state, data);

    expect(state.cache.deck.slots[data.id].name).toStrictEqual(`${data.nickname}_${data.id}`);
  });

  test("has a correctly functioning 'types.UPDATE_LEFT_PIPETTE' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const pipette = {};
    deckModule.mutations[types.UPDATE_LEFT_PIPETTE](state, pipette);
    expect(state.cache.deck.left_pipette.pipette).toStrictEqual(pipette);
  });

  test("has a correctly functioning 'types.UPDATE_RIGHT_PIPETTE' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const pipette = {};

    deckModule.mutations[types.UPDATE_RIGHT_PIPETTE](state, pipette);

    expect(state.cache.deck.right_pipette.pipette).toStrictEqual(pipette);
  });

  test("has a correctly functioning 'types.UPDATE_LEFT_TIPRACKS' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const tipRacks = [];

    deckModule.mutations[types.UPDATE_LEFT_TIPRACKS](state, tipRacks);

    expect(state.cache.deck.left_pipette.tipracks).toStrictEqual(tipRacks);
  });

  test("has a correctly functioning 'types.UPDATE_RIGHT_TIPRACKS' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const tipRacks = [];

    deckModule.mutations[types.UPDATE_RIGHT_TIPRACKS](state, tipRacks);
    
    expect(state.cache.deck.right_pipette.tipracks).toStrictEqual(tipRacks);
  });

  describe("has a correctly functioning 'types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_LEFT_TIPRACKS' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    test("in the UPDATE use case", () => {
      const obj = {
        signal: "UPDATE",
        value: {
          id: 8
        }
      };

      deckModule.mutations[
        types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_LEFT_TIPRACKS
      ](state, obj);

      expect(state.cache.deck.left_pipette.tipracks.includes(obj.value.id)).toBeFalsy();
    });

    test("in the DELETE use case", () => {
      const obj = {
        signal: "DELETE",
        value: {
          id: 8
        }
      };

      deckModule.mutations[
        types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_LEFT_TIPRACKS
      ](state, obj);

      expect(state.cache.deck.left_pipette.tipracks.includes(obj.value.id)).toBeFalsy();
    });
  });
  describe("has a correctly functioning 'types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_RIGHT_TIPRACKS' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));

    test("in the UPDATE use case", () => {
      const obj = {
        signal: "UPDATE",
        value: {
          id: 7
        }
      };

      deckModule.mutations[
        types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_RIGHT_TIPRACKS
      ](state, obj);

      expect(state.cache.deck.right_pipette.tipracks.includes(obj.value.id)).toBeFalsy();
    });

    test("in the DELETE use case", () => {
      const obj = {
        signal: "DELETE",
        value: {
          id: 7
        }
      };

      deckModule.mutations[
        types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_RIGHT_TIPRACKS
      ](state, obj);

      expect(state.cache.deck.right_pipette.tipracks.includes(obj.value.id)).toBeFalsy();
    });
  });
});
