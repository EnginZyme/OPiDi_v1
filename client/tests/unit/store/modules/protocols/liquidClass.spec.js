import liquidClassModule from "@/store/modules/protocols/liquidClass";
import types from "@/types";

const sampleState = {
  vars: {
    chosenLiquidClassID: -1,
  },
  cache: {
    liquid_classes: [
      {
        name: "Default",
        id: 0,
        liquid_config_object: {
          touch_tip: false,
          blow_out: true,
          carryover: true,
          air_gap: 0,
          blowout_location: "destination well",
          mix_before: { repetitions: 0, volume: 0 },
          mix_after: { repetitions: 0, volume: 0 },
          aspirate_rate: 1,
          dispense_rate: 1,
          blow_out_rate: 1,
        },
      },
    ],
    liquidClassCounter: 1,
  },
};

describe("liquidClass module getters", () => {
  const state = JSON.parse(JSON.stringify(sampleState));

  test("has a correctly functioning 'cachedProtocolLiquidClasses' member", () => {
    expect(liquidClassModule.getters.cachedProtocolLiquidClasses(state)).toStrictEqual(
      state.cache.liquid_classes
    );
  });
  test("has a correctly functioning 'cachedProtocolLiquidClassCounter' member", () => {
    expect(
      liquidClassModule.getters.cachedProtocolLiquidClassCounter(state)
    ).toStrictEqual(state.cache.liquidClassCounter);
  });
});

describe("liquidClass module mutations", () => {
  test("has a correctly functioning 'types.UPDATE_CACHED_PROTOCOL_LIQUID_CLASSES' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const liquidClasses = [];

    liquidClassModule.mutations[types.UPDATE_CACHED_PROTOCOL_LIQUID_CLASSES](
      state,
      liquidClasses
    );

    expect(state.cache.liquid_classes).toStrictEqual(liquidClasses);
  });
  test("has a correctly functioning 'types.RESET_LIQUID_CLASSES' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));

    liquidClassModule.mutations[types.RESET_LIQUID_CLASSES](state);

    expect(state.cache.liquid_classes).toStrictEqual([]);
    expect(state.cache.liquidClassCounter).toStrictEqual(1);
  });
  test("has a correctly functioning 'types.UPDATE_LIQUID_CLASS_NAME' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const data = {
      lcIdx: 0,
      value: "name",
    };

    liquidClassModule.mutations[types.UPDATE_LIQUID_CLASS_NAME](state, data);

    expect(state.cache.liquid_classes[0].name).toStrictEqual(data.value);
  });
  test("has a correctly functioning 'types.UPDATE_LIQUID_CLASS_TOUCH_TIP' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const data = {
      lcIdx: 0,
      value: true,
    };

    liquidClassModule.mutations[types.UPDATE_LIQUID_CLASS_TOUCH_TIP](
      state,
      data
    );

    expect(state.cache.liquid_classes[0].liquid_config_object.touch_tip).toStrictEqual(
      data.value
    );
  });
  test("has a correctly functioning 'types.UPDATE_LIQUID_CLASS_BLOW_OUT' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const data = {
      lcIdx: 0,
      value: true,
    };

    liquidClassModule.mutations[types.UPDATE_LIQUID_CLASS_BLOW_OUT](
      state,
      data
    );

    expect(state.cache.liquid_classes[0].liquid_config_object.blow_out).toStrictEqual(
      data.value
    );
  });
  test("has a correctly functioning 'types.UPDATE_LIQUID_CLASS_CARRY_OVER' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const data = {
      lcIdx: 0,
      value: true,
    };

    liquidClassModule.mutations[types.UPDATE_LIQUID_CLASS_CARRY_OVER](
      state,
      data
    );

    expect(state.cache.liquid_classes[0].liquid_config_object.carryover).toStrictEqual(
      data.value
    );
  });
  test("has a correctly functioning 'types.UPDATE_LIQUID_CLASS_AIR_GAP' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const data = {
      lcIdx: 0,
      value: 10,
    };

    liquidClassModule.mutations[types.UPDATE_LIQUID_CLASS_AIR_GAP](state, data);

    expect(state.cache.liquid_classes[0].liquid_config_object.air_gap).toStrictEqual(
      data.value
    );
  });
  test("has a correctly functioning 'types.UPDATE_LIQUID_CLASS_BLOWOUT_LOCATION' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const data = {
      lcIdx: 0,
      value: "blowout_location",
    };

    liquidClassModule.mutations[types.UPDATE_LIQUID_CLASS_BLOWOUT_LOCATION](
      state,
      data
    );

    expect(
      state.cache.liquid_classes[0].liquid_config_object.blowout_location
    ).toStrictEqual(data.value);
  });
  test("has a correctly functioning 'types.UPDATE_LIQUID_CLASS_MIX_BEFORE_VOLUME' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const data = {
      lcIdx: 0,
      value: 10,
    };

    liquidClassModule.mutations[types.UPDATE_LIQUID_CLASS_MIX_BEFORE_VOLUME](
      state,
      data
    );

    expect(
      state.cache.liquid_classes[0].liquid_config_object.mix_before.volume
    ).toStrictEqual(data.value);
  });
  test("has a correctly functioning 'types.UPDATE_LIQUID_CLASS_MIX_BEFORE_REPS' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const data = {
      lcIdx: 0,
      value: 2,
    };

    liquidClassModule.mutations[types.UPDATE_LIQUID_CLASS_MIX_BEFORE_REPS](
      state,
      data
    );

    expect(
      state.cache.liquid_classes[0].liquid_config_object.mix_before.repetitions
    ).toStrictEqual(data.value);
  });
  test("has a correctly functioning 'types.UPDATE_LIQUID_CLASS_MIX_AFTER_VOLUME' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const data = {
      lcIdx: 0,
      value: 10,
    };

    liquidClassModule.mutations[types.UPDATE_LIQUID_CLASS_MIX_AFTER_VOLUME](
      state,
      data
    );

    expect(
      state.cache.liquid_classes[0].liquid_config_object.mix_after.volume
    ).toStrictEqual(data.value);
  });
  test("has a correctly functioning 'types.UPDATE_LIQUID_CLASS_MIX_AFTER_REPS' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const data = {
      lcIdx: 0,
      value: 2,
    };

    liquidClassModule.mutations[types.UPDATE_LIQUID_CLASS_MIX_AFTER_REPS](
      state,
      data
    );

    expect(
      state.cache.liquid_classes[0].liquid_config_object.mix_after.repetitions
    ).toStrictEqual(data.value);
  });
  test("has a correctly functioning 'types.UPDATE_LIQUID_CLASS_ASPIRATE_RATE' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const data = {
      lcIdx: 0,
      value: 2,
    };

    liquidClassModule.mutations[types.UPDATE_LIQUID_CLASS_ASPIRATE_RATE](
      state,
      data
    );

    expect(
      state.cache.liquid_classes[0].liquid_config_object.aspirate_rate
    ).toStrictEqual(data.value);
  });
  test("has a correctly functioning 'types.UPDATE_LIQUID_CLASS_DISPENSE_RATE' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const data = {
      lcIdx: 0,
      value: 2,
    };

    liquidClassModule.mutations[types.UPDATE_LIQUID_CLASS_DISPENSE_RATE](
      state,
      data
    );

    expect(
      state.cache.liquid_classes[0].liquid_config_object.dispense_rate
    ).toStrictEqual(data.value);
  });
  test("has a correctly functioning 'types.UPDATE_LIQUID_CLASS_BLOW_OUT_RATE' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const data = {
      lcIdx: 0,
      value: 2,
    };

    liquidClassModule.mutations[types.UPDATE_LIQUID_CLASS_BLOW_OUT_RATE](
      state,
      data
    );

    expect(
      state.cache.liquid_classes[0].liquid_config_object.blow_out_rate
    ).toStrictEqual(data.value);
  });
  test("has a correctly functioning 'types.CREATE_LIQUID_CLASS' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));

    liquidClassModule.mutations[types.CREATE_LIQUID_CLASS](state);

    expect(state.cache.liquid_classes.length).toStrictEqual(sampleState.cache.liquid_classes.length + 1);
  });
  test("has a correctly functioning 'types.RESET_LIQUID_CLASS_VARIABLES' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));

    liquidClassModule.mutations[types.RESET_LIQUID_CLASS_VARIABLES](state);

    expect(state.vars.chosenLiquidClassID).toStrictEqual(-1);
  });
  test("has a correctly functioning 'types.UPDATE_LIQUID_CLASS_VARIABLES' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const data = {
      temp: "hello world",
    };

    liquidClassModule.mutations[types.UPDATE_LIQUID_CLASS_VARIABLES](
      state,
      data
    );

    expect(state.vars.temp).toStrictEqual(data.temp);
  });
  test("has a correctly functioning 'types.DELETE_LIQUID_CLASS' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const id = 0;

    liquidClassModule.mutations[types.DELETE_LIQUID_CLASS](state, id);

    expect(state.cache.liquid_classes.length).toStrictEqual(
      sampleState.cache.liquid_classes.length - 1
    );
  });
  test("has a correctly functioning 'types.UPDATE_CACHED_PROTOCOL_LIQUID_CLASS_COUNTER' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const value = 9;

    liquidClassModule.mutations[
      types.UPDATE_CACHED_PROTOCOL_LIQUID_CLASS_COUNTER
    ](state, value);

    expect(state.cache.liquidClassCounter).toStrictEqual(value);
  });
});
