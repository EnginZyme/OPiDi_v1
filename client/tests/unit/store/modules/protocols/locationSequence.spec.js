import locationSequenceModule from "@/store/modules/protocols/locationSequence";
import types from "@/types";

const sampleState = {
  vars: {
    locSeqID: -1,
    locSeqCategory: "",
  },
  cache: {
    sequences: [
      {
        name: "tube_rack",
        id: 0,
        locations: [
          { slot_number: 2, slot_name: "tuberack_2", id: 0, wells: ["A1"] },
        ],
        locationCounter: 200,
      },
      {
        name: "well_plate",
        id: 1,
        locations: [
          {
            slot_number: 1,
            slot_name: "wellplate_1",
            id: 0,
            wells: ["A1", "B1", "C1", "F12", "G12", "H12"],
          },
        ],
        locationCounter: 200,
      },
    ],
    sequenceCounter: 2,
  },
};

describe("locationSequence module getters", () => {
  const state = JSON.parse(JSON.stringify(sampleState));

  test("has a correctly functioning 'cachedProtocolSequences' member", () => {
    expect(
      locationSequenceModule.getters.cachedProtocolSequences(state)
    ).toStrictEqual(state.cache.sequences);
  });

  test("has a correctly functioning 'cachedProtocolSequenceCounter' member", () => {
    expect(
      locationSequenceModule.getters.cachedProtocolSequenceCounter(state)
    ).toStrictEqual(state.cache.sequenceCounter);
  });
});

describe("locationSequence module mutations", () => {
  test("has a correctly functioning 'types.UPDATE_CACHED_PROTOCOL_LOCATION_SEQUENCES' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const sequences = [];

    locationSequenceModule.mutations[
      types.UPDATE_CACHED_PROTOCOL_LOCATION_SEQUENCES
    ](state, sequences);

    expect(state.cache.sequences).toStrictEqual(sequences);
  });

  test("has a correctly functioning 'types.RESET_LOCATION_SEQUENCES' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));

    locationSequenceModule.mutations[types.RESET_LOCATION_SEQUENCES](state);

    expect(state.cache.sequences).toStrictEqual([]);
  });

  describe("has a correctly functioning 'types.UPDATE_SEQUENCE_NAME' member", () => {
    test("in the case where the name is unique", () => {
      const state = JSON.parse(JSON.stringify(sampleState));
      const data = {
        value: "name",
        seqIdx: 0,
      };

      locationSequenceModule.mutations[types.UPDATE_SEQUENCE_NAME](state, data);

      expect(
        state.cache.sequences.filter((item) => item.id === data.seqIdx)[0].name
      ).toStrictEqual(data.value);
    });

    test("in the case where the name is not unique", () => {
      const state = JSON.parse(JSON.stringify(sampleState));
      const data = {
        value: "well_plate",
        seqIdx: 0,
      };

      locationSequenceModule.mutations[types.UPDATE_SEQUENCE_NAME](state, data);

      expect(
        state.cache.sequences.filter((item) => item.id === data.seqIdx)[0].name
        .includes(data.value)
      ).toBeTruthy();
      expect(
        state.cache.sequences.filter((item) => item.id === data.seqIdx)[0].name
          .length > data.value.length
      ).toBeTruthy();
    });
  });

  test("has a correctly functioning 'types.UPDATE_LOCATION_SLOT_NAME' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const data = {
      seqIdx: 0,
      locIdx: 0,
      value: {
        name: "name",
        id: 0,
      },
    };

    locationSequenceModule.mutations[types.UPDATE_LOCATION_SLOT_NAME](
      state,
      data
    );

    expect(
      state.cache.sequences
        .filter((item) => item.id === data.seqIdx)[0]
        .locations.filter((item) => item.id === data.locIdx)[0].slot_name
    ).toStrictEqual(data.value.name);
    expect(
      state.cache.sequences
        .filter((item) => item.id === data.seqIdx)[0]
        .locations.filter((item) => item.id === data.locIdx)[0].slot_number
    ).toStrictEqual(data.value.id);
  });

  describe("has a correctly functioning 'types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_LOCATION_SLOT_NAME' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const seqIdx = 0;
    const locIdx = 0;

    test("in the case of an UPDATE", () => {
      const obj = {
        signal: "UPDATE",
        sink_hash: `${seqIdx}-${locIdx}`,
        value: {
          name: "name",
          id: 0,
        },
      };

      locationSequenceModule.mutations[
        types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_LOCATION_SLOT_NAME
      ](state, obj);

      expect(
        state.cache.sequences
          .filter((item) => item.id === seqIdx)[0]
          .locations.filter((item) => item.id === locIdx)[0].slot_name
      ).toStrictEqual(obj.value.name);
      expect(
        state.cache.sequences
          .filter((item) => item.id === seqIdx)[0]
          .locations.filter((item) => item.id === locIdx)[0].slot_number
      ).toStrictEqual(obj.value.id);
    });

    test("in the case of a DELETE", () => {
      const obj = {
        signal: "DELETE",
        sink_hash: `${seqIdx}-${locIdx}`,
      };

      locationSequenceModule.mutations[
        types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_LOCATION_SLOT_NAME
      ](state, obj);

      expect(
        state.cache.sequences
          .filter((item) => item.id === seqIdx)[0]
          .locations.filter((item) => item.id === locIdx)[0].slot_name
      ).toStrictEqual("");
      expect(
        state.cache.sequences
          .filter((item) => item.id === seqIdx)[0]
          .locations.filter((item) => item.id === locIdx)[0].slot_number
      ).toStrictEqual(-1);
    });
  });

  test("has a correctly functioning 'types.UPDATE_LOCATION_WELLS' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const obj = {
      seqIdx: 0,
      locIdx: 0,
      value: [],
    };

    locationSequenceModule.mutations[types.UPDATE_LOCATION_WELLS](state, obj);

    expect(
      state.cache.sequences
        .filter((item) => item.id === obj.seqIdx)[0]
        .locations.filter((item) => item.id === obj.locIdx)[0].wells
    ).toStrictEqual(obj.value);
  });

  test("has a correctly functioning 'types.CREATE_LOCATION_SEQUENCE' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));

    locationSequenceModule.mutations[types.CREATE_LOCATION_SEQUENCE](state);

    expect(state.cache.sequences.length).toStrictEqual(
      sampleState.cache.sequences.length + 1
    );
  });

  test("has a correctly functioning 'types.CREATE_LOCATION' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const seqIdx = 0;

    locationSequenceModule.mutations[types.CREATE_LOCATION](state, seqIdx);

    expect(
      state.cache.sequences.filter((item) => item.id === seqIdx)[0].locations
        .length
    ).toStrictEqual(
      sampleState.cache.sequences.filter((item) => item.id === seqIdx)[0]
        .locations.length + 1
    );
  });

  test("has a correctly functioning 'types.RESET_LOCATION_SEQUENCE_VARIABLES' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));

    locationSequenceModule.mutations[types.RESET_LOCATION_SEQUENCE_VARIABLES](
      state
    );

    expect(state.vars.locSeqID).toStrictEqual("");
    expect(state.vars.locSeqCategory).toStrictEqual("");
  });

  test("has a correctly functioning 'types.UPDATE_LOCATION_SEQUENCE_VARIABLES' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const obj = {
      temp: "hello world",
    };

    locationSequenceModule.mutations[types.UPDATE_LOCATION_SEQUENCE_VARIABLES](
      state,
      obj
    );

    expect(state.vars.temp).toStrictEqual(obj.temp);
  });

  test("has a correctly functioning 'types.DELETE_LOCATION_SEQUENCE' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const seqIdx = 0;

    locationSequenceModule.mutations[types.DELETE_LOCATION_SEQUENCE](
      state,
      seqIdx
    );

    expect(
      state.cache.sequences.filter((item) => item.id === seqIdx)
    ).toStrictEqual([]);
  });

  test("has a correctly functioning 'types.UPDATE_CACHED_PROTOCOL_SEQUENCE_COUNTER' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const value = 10;

    locationSequenceModule.mutations[
      types.UPDATE_CACHED_PROTOCOL_SEQUENCE_COUNTER
    ](state, value);

    expect(state.cache.sequenceCounter).toStrictEqual(value);
  });

  test("has a correctly functioning 'types.DELETE_LOCATION' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const obj = {
      seqIdx: 0,
      locIdx: 0,
    };

    locationSequenceModule.mutations[types.DELETE_LOCATION](state, obj);

    expect(
      state.cache.sequences
        .filter((item) => item.id === obj.seqIdx)[0]
        .locations.filter((item) => item.id === obj.locIdx)
    ).toStrictEqual([]);
  });
});
