import protocolsModule from "@/store/modules/protocols";
import types from "@/types";

const sampleState = {
  protocols: [
    {
      id: 168,
      protocol: {
        dependencies: [],
        metadata: {
          name: "Functionality test protocol",
          description: "test for OPD 2.1.0",
          author: { name: "foo bar", email: "foo@acme.com" },
          is_verified: false,
          is_shared: true,
          created: 1613569949644,
        },
        hasChanged: false,
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
        steps: [],
        liquid_classes: [],
        sequences: [],
        stepCounter: 0,
        sequenceCounter: 0,
        liquidClassCounter: 0,
      },
    },
  ],
  cache: {
    id: 168,
    hasChanged: false,
    metadata: {
      name: "Functionality test protocol",
      description: "test for OPD 2.1.0",
      author: { name: "Foo Bar", email: "foo@acme.com" },
      is_verified: false,
      is_shared: true,
      created: 1613569949644,
    },
    dependencies: [],
  },
};

describe("protocols module getters", () => {
  const state = JSON.parse(JSON.stringify(sampleState));

  test("has correctly functioning 'allProtocols' member", () => {
    expect(protocolsModule.getters.allProtocols(state)).toStrictEqual(state.protocols);
  });
  test("has correctly functioning 'userProtocols' member", () => {
    expect(
      protocolsModule.getters.userProtocols(state, null, {
        auth: {
          user: {
            email: "foo@acme.com",
          },
        },
      })
    ).toStrictEqual(state.protocols);
  });
  test("has correctly functioning 'sharedProtocols' member", () => {
    expect(protocolsModule.getters.sharedProtocols(state)).toStrictEqual(
      state.protocols
    );
  });
  test("has correctly functioning 'cachedProtocol' member", () => {
    const rootState = {
      protocols: {
        deck: {
          cache: {
            deck: {},
          },
        },
        steps: {
          cache: {
            steps: {},
            stepCounter: 0,
          },
        },
        liquidClass: {
          cache: {
            liquid_classes: {},
            liquidClassCounter: 0,
          },
        },
        locationSequence: {
          cache: {
            sequences: {},
            sequenceCounter: 0,
          },
        },
      },
    };

    expect(
      protocolsModule.getters.cachedProtocol(state, null, rootState).id
    ).toStrictEqual(state.cache.id);
    expect(
      protocolsModule.getters.cachedProtocol(state, null, rootState).protocol
        .dependencies
    ).toStrictEqual(state.cache.dependencies);
    expect(
      protocolsModule.getters.cachedProtocol(state, null, rootState).protocol
        .metadata
    ).toStrictEqual(state.cache.metadata);
    expect(
      protocolsModule.getters.cachedProtocol(state, null, rootState).protocol
        .hasChanged
    ).toStrictEqual(state.cache.hasChanged);
    expect(
      protocolsModule.getters.cachedProtocol(state, null, rootState).protocol
        .deck
    ).toStrictEqual(rootState.protocols.deck.cache.deck);
    expect(
      protocolsModule.getters.cachedProtocol(state, null, rootState).protocol
        .steps
    ).toStrictEqual(rootState.protocols.steps.cache.steps);
    expect(
      protocolsModule.getters.cachedProtocol(state, null, rootState).protocol
        .liquid_classes
    ).toStrictEqual(rootState.protocols.liquidClass.cache.liquid_classes);
    expect(
      protocolsModule.getters.cachedProtocol(state, null, rootState).protocol
        .sequences
    ).toStrictEqual(rootState.protocols.locationSequence.cache.sequences);
    expect(
      protocolsModule.getters.cachedProtocol(state, null, rootState).protocol
        .stepCounter
    ).toStrictEqual(rootState.protocols.steps.cache.stepCounter);
    expect(
      protocolsModule.getters.cachedProtocol(state, null, rootState).protocol
        .sequenceCounter
    ).toStrictEqual(rootState.protocols.locationSequence.cache.sequenceCounter);
    expect(
      protocolsModule.getters.cachedProtocol(state, null, rootState).protocol
        .liquidClassCounter
    ).toStrictEqual(rootState.protocols.liquidClass.cache.liquidClassCounter);
  });
  test("has correctly functioning 'protocolEditorVariables' member", () => {
    expect(
      protocolsModule.getters.protocolEditorVariables(null, null, {
        protocols: {
          steps: {
            vars: {},
          },
          liquidClass: {
            vars: {},
          },
          locationSequence: {
            vars: {},
          },
        },
      })
    ).toStrictEqual({});
  });
  test("has correctly functioning 'cacheChangeRegister' member", () => {
    expect(protocolsModule.getters.cacheChangeRegister(state)).toStrictEqual(
      state.cache.hasChanged
    );
  });
  test("has correctly functioning 'cachedProtocolName' member", () => {
    expect(protocolsModule.getters.cachedProtocolName(state)).toStrictEqual(
      state.cache.metadata.name
    );
  });
  test("has correctly functioning 'cachedProtocolDescription' member", () => {
    expect(protocolsModule.getters.cachedProtocolDescription(state)).toStrictEqual(
      state.cache.metadata.description
    );
  });
  test("has correctly functioning 'cachedProtocolAuthor' member", () => {
    expect(protocolsModule.getters.cachedProtocolAuthor(state)).toStrictEqual(
      state.cache.metadata.author.name
    );
  });
  test("has correctly functioning 'cachedProtocolDependencies' member", () => {
    expect(protocolsModule.getters.cachedProtocolDependencies(state)).toStrictEqual(
      state.cache.dependencies
    );
  });
  test("has correctly functioning 'cachedProtocolIsVerified' member", () => {
    expect(protocolsModule.getters.cachedProtocolIsVerified(state)).toStrictEqual(
      state.cache.metadata.is_verified
    );
  });
  test("has correctly functioning 'cachedProtocolIsShared' member", () => {
    expect(protocolsModule.getters.cachedProtocolIsShared(state)).toStrictEqual(
      state.cache.metadata.is_shared
    );
  });
  test("has correctly functioning 'cachedProtocolIsRetired' member", () => {
    expect(protocolsModule.getters.cachedProtocolIsRetired(state)).toStrictEqual(
      state.cache.metadata.is_retired
    );
  });
});

describe("protocols module mutations", () => {
  test("has correctly functioning 'types.LOAD_PROTOCOLS' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const protocols = [{}];
    protocolsModule.mutations[types.LOAD_PROTOCOLS](state, protocols);

    expect(state.protocols).toStrictEqual(protocols);
  });
  test("has correctly functioning 'types.UNLOAD_PROTOCOLS' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));

    protocolsModule.mutations[types.UNLOAD_PROTOCOLS](state);

    expect(state.protocols).toStrictEqual([]);
  });
  test("has correctly functioning 'types.CREATE_PROTOCOL' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const protocol = {};

    protocolsModule.mutations[types.CREATE_PROTOCOL](state, protocol);

    expect(state.protocols.includes(protocol)).toBeTruthy();
    expect(state.protocols.length).toStrictEqual(sampleState.protocols.length + 1);
  });
  test("has correctly functioning 'types.DELETE_PROTOCOL' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const id = 168;

    protocolsModule.mutations[types.DELETE_PROTOCOL](state, id);

    expect(state.protocols).toStrictEqual([]);
  });
  test("has correctly functioning 'types.UPDATE_CACHED_PROTOCOL_DESCRIPTION' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const description = "description";

    protocolsModule.mutations[types.UPDATE_CACHED_PROTOCOL_DESCRIPTION](
      state,
      description
    );

    expect(state.cache.metadata.description).toStrictEqual(description);
  });
  test("has correctly functioning 'types.UPDATE_CACHED_PROTOCOL_NAME' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const name = "name";

    protocolsModule.mutations[types.UPDATE_CACHED_PROTOCOL_NAME](state, name);

    expect(state.cache.metadata.name).toStrictEqual(name);
  });
  test("has correctly functioning 'types.UPDATE_CACHED_PROTOCOL_SHARED_STATUS' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const sharedStatus = false;

    protocolsModule.mutations[types.UPDATE_CACHED_PROTOCOL_SHARED_STATUS](
      state,
      sharedStatus
    );

    expect(state.cache.metadata.is_shared).toStrictEqual(sharedStatus);
  });
  test("has correctly functioning 'types.UPDATE_CACHED_PROTOCOL_VERIFICATION_STATUS' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const verificationStatus = true;

    protocolsModule.mutations[types.UPDATE_CACHED_PROTOCOL_VERIFICATION_STATUS](
      state,
      verificationStatus
    );

    expect(state.cache.metadata.is_verified).toStrictEqual(verificationStatus);
  });
  test("has correctly functioning 'types.UPDATE_CACHED_PROTOCOL_RETIREMENT_STATUS' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const retirementStatus = true;

    protocolsModule.mutations[types.UPDATE_CACHED_PROTOCOL_RETIREMENT_STATUS](
      state,
      retirementStatus
    );

    expect(state.cache.metadata.is_retired).toStrictEqual(retirementStatus);
  });
  test("has correctly functioning 'types.UPDATE_CACHED_PROTOCOL_ID' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const id = 0;

    protocolsModule.mutations[types.UPDATE_CACHED_PROTOCOL_ID](state, id);

    expect(state.cache.id).toStrictEqual(id);
  });
  test("has correctly functioning 'types.RESET_CACHED_PROTOCOL_ID' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));

    protocolsModule.mutations[types.RESET_CACHED_PROTOCOL_ID](state);

    expect(state.cache.id).toStrictEqual(null);
  });
  test("has correctly functioning 'types.UPDATE_CACHED_PROTOCOL_DEPENDENCY_LINKS' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const dependencies = [];

    protocolsModule.mutations[types.UPDATE_CACHED_PROTOCOL_DEPENDENCY_LINKS](
      state,
      dependencies
    );

    expect(state.cache.dependencies).toStrictEqual(dependencies);
  });
  test("has correctly functioning 'types.DUPLICATE_CACHED_PROTOCOL_DEPENDENCY_LINK' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    state.cache.dependencies.push({
      sink: "transfer",
      sink_hash: 0,
      sink_ppty: "source_sequence",
      source: "sequence",
      source_hash: [0],
      atype:
        "PUSH_LINKED_DEPENDENCY_CHANGE_TO_SEQUENCE_TRANSFER_SOURCE_SEQUENCE",
    });
    const data = {
      sink: "transfer",
      oldIdx: 0,
      newIdx: 1,
    };

    protocolsModule.mutations[types.DUPLICATE_CACHED_PROTOCOL_DEPENDENCY_LINK](
      state,
      data
    );

    expect(
      state.cache.dependencies.filter((item) => item.sink_hash === data.newIdx)
        .length > 0
    ).toBeTruthy();
  });
  test("has correctly functioning 'types.RESET_CACHED_PROTOCOL_DEPENDENCY_LINKS' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));

    protocolsModule.mutations[types.RESET_CACHED_PROTOCOL_DEPENDENCY_LINKS](
      state
    );

    expect(state.cache.dependencies).toStrictEqual([]);
  });
  test("has correctly functioning 'types.UPDATE_CACHED_PROTOCOL_METADATA' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const metadata = {};

    protocolsModule.mutations[types.UPDATE_CACHED_PROTOCOL_METADATA](
      state,
      metadata
    );

    expect(state.cache.metadata).toStrictEqual(metadata);
  });
  test("has correctly functioning 'types.RESET_PROTOCOL_METADATA' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));

    protocolsModule.mutations[types.RESET_PROTOCOL_METADATA](state);

    expect(state.cache.metadata).toStrictEqual({});
  });
  test("has correctly functioning 'types.REGISTER_PROCOTOL_CACHE_CHANGE' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));

    protocolsModule.mutations[types.REGISTER_PROCOTOL_CACHE_CHANGE](state);

    expect(state.cache.hasChanged).toStrictEqual(true);
  });
  test("has correctly functioning 'types.RESET_PROTOCOL_CHANGE_REGISTER' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));

    protocolsModule.mutations[types.RESET_PROTOCOL_CHANGE_REGISTER](state);

    expect(state.cache.hasChanged).toStrictEqual(false);
  });
  test("has correctly functioning 'types.ADD_CACHED_PROTOCOL_DEPENDENCY_LINK' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const dependency = {};

    protocolsModule.mutations[types.ADD_CACHED_PROTOCOL_DEPENDENCY_LINK](
      state,
      dependency
    );

    expect(state.cache.dependencies.includes(dependency)).toBeTruthy();
    expect(state.cache.dependencies.length).toStrictEqual(
      sampleState.cache.dependencies.length + 1
    );
  });
});
