import labwareModule from "@/store/modules/labwares";
import types from "@/types";

describe("labware module getters", () => {
  const state = {
    labwares: [],
    pipettes: [],
    labwareDefinitions: [],
  };
  test("has correctly functioning 'pipettes' member", () => {
    expect(labwareModule.getters.pipettes(state)).toStrictEqual(state.pipettes);
  });
  test("has correctly functioning 'tipRacks' member", () => {
    expect(labwareModule.getters.tipRacks(state)).toStrictEqual(
      state.labwares.filter((item) => item.labware_type === "tipRack")
    );
  });
  test("has correctly functioning 'tubeRacks' member", () => {
    expect(labwareModule.getters.tipRacks(state)).toStrictEqual(
      state.labwares.filter((item) => item.labware_type === "tubeRack")
    );
  });
  test("has correctly functioning 'wellPlates' member", () => {
    expect(labwareModule.getters.tipRacks(state)).toStrictEqual(
      state.labwares.filter((item) => item.labware_type === "wellPlate")
    );
  });
  test("has correctly functioning 'reservoirs' member", () => {
    expect(labwareModule.getters.tipRacks(state)).toStrictEqual(
      state.labwares.filter((item) => item.labware_type === "reservoir")
    );
  });
  test("has correctly functioning 'shakerLabwares' member", () => {
    expect(labwareModule.getters.tipRacks(state)).toStrictEqual(
      state.labwares.filter((item) => item.labware_type === "shakerLabware")
    );
  });
  test("has correctly functioning 'labwareDefinitions' member", () => {
    expect(labwareModule.getters.labwareDefinitions(state)).toStrictEqual(
      state.labwareDefinitions
    );
  });
});

describe("labware module mutations", () => {
  test("has correctly functioning 'types.LOAD_LABWARE_DEFINITION_OBJECTS' member", () => {
    const state = {
      labwares: [],
      pipettes: [],
      labwareDefinitions: [],
    };
    const objects = [{}];
    labwareModule.mutations[types.LOAD_LABWARE_DEFINITION_OBJECTS](
      state,
      objects
    );
    expect(state.labwareDefinitions).toStrictEqual(objects);
  });
  test("has correctly functioning 'types.LOAD_LABWARE_OBJECTS' member", () => {
    const state = {
      labwares: [],
      pipettes: [],
      labwareDefinitions: [],
    };
    const objects = [{}];
    labwareModule.mutations[types.LOAD_LABWARE_OBJECTS](state, objects);
    expect(state.labwares).toStrictEqual(objects);
  });
  test("has correctly functioning 'types.LOAD_PIPETTE_OBJECTS' member", () => {
    const state = {
      labwares: [],
      pipettes: [],
      labwareDefinitions: [],
    };
    const objects = [{}];
    labwareModule.mutations[types.LOAD_PIPETTE_OBJECTS](state, objects);
    expect(state.pipettes).toStrictEqual(objects);
  });
  test("has correctly functioning 'types.UNLOAD_LABWARE_DEFINITION_OBJECTS' member", () => {
    const state = {
      labwares: [],
      pipettes: [],
      labwareDefinitions: [{}],
    };
    labwareModule.mutations[types.UNLOAD_LABWARE_DEFINITION_OBJECTS](state);
    expect(state.labwareDefinitions).toStrictEqual([]);
  });
  test("has correctly functioning 'types.UNLOAD_LABWARE_OBJECTS' member", () => {
    const state = {
      labwares: [{}],
      pipettes: [],
      labwareDefinitions: [],
    };
    labwareModule.mutations[types.UNLOAD_LABWARE_OBJECTS](state);
    expect(state.labwares).toStrictEqual([]);
  });
  test("has correctly functioning 'types.UNLOAD_PIPETTE_OBJECTS' member", () => {
    const state = {
      labwares: [],
      pipettes: [{}],
      labwareDefinitions: [],
    };
    labwareModule.mutations[types.UNLOAD_PIPETTE_OBJECTS](state);
    expect(state.pipettes).toStrictEqual([]);
  });
});
