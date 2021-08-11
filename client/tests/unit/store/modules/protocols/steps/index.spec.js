import stepsModule from "@/store/modules/protocols/steps";
import types from "@/types";
import { findDeep } from "../../../../../../src/utils";

const sampleState = {
  vars: {
    stepsstepID: -1,
    stepsFormType: "",
  },
  cache: {
    stepCounter: 1,
    steps: [
      {
        type: "sequence_transfer",
        name: "Sequence Transfer (0)",
        id: 0,
        substeps: [],
        parameters: {
          pipette: "right_pipette",
          pipette_obj: {
            name: "(Right) Single Channel 300 uL - Gen 1",
            category: "right_pipette",
          },
          pipette_strategy: "",
          volumes: [250],
          volumes_string: "250",
          source_sequence: "tube_rack",
          sourceSequenceId: 0,
          destination_sequence: "well_plate",
          destinationSequenceId: 1,
          liquidClass: "Default",
          liquidClassId: 0,
          tipsStrategy: "STANDARD",
          offset: {
            source: 1,
            destination: 1,
            source_type: "Bottom",
            destination_type: "Bottom",
          },
        },
      },
    ],
  },
  slack_webhooks: [],
};

describe("steps module getters", () => {
  const state = JSON.parse(JSON.stringify(sampleState));

  test("has a correctly functioning 'cachedProtocolStepCounter' member", () => {
    expect(stepsModule.getters.cachedProtocolStepCounter(state)).toStrictEqual(
      state.cache.stepCounter
    );
  });

  test("has a correctly functioning 'cachedProtocolSteps' member", () => {
    expect(stepsModule.getters.cachedProtocolSteps(state)).toStrictEqual(
      state.cache.steps
    );
  });

  test("has a correctly functioning 'slackWebhooks' member", () => {
    expect(stepsModule.getters.slackWebhooks(state)).toStrictEqual(state.slack_webhooks);
  });
});

describe("steps module mutations", () => {
  test("has a correctly functioning 'types.RESET_STEP_VARIABLES' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));

    stepsModule.mutations[types.RESET_STEP_VARIABLES](state);

    expect(state.vars.stepsstepID).toStrictEqual(-1);
    expect(state.vars.stepsFormType).toStrictEqual("");
  });

  test("has a correctly functioning 'types.UPDATE_STEP_VARIABLES' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const data = {
      temp: "hello world",
    };

    stepsModule.mutations[types.UPDATE_STEP_VARIABLES](state, data);

    expect(state.vars.temp).toStrictEqual(data.temp);
  });

  test("has a correctly functioning 'types.UPDATE_CACHED_PROTOCOL_STEP_COUNTER' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const data = 10;

    stepsModule.mutations[types.UPDATE_CACHED_PROTOCOL_STEP_COUNTER](
      state,
      data
    );

    expect(state.cache.stepCounter).toStrictEqual(data);
  });

  test("has a correctly functioning 'types.LOAD_SLACK_WEBHOOK_OBJECTS' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const data = [];

    stepsModule.mutations[types.LOAD_SLACK_WEBHOOK_OBJECTS](state, data);

    expect(state.slack_webhooks).toStrictEqual(data);
  });

  test("has a correctly functioning 'types.UNLOAD_SLACK_WEBHOOK_OBJECTS' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));

    stepsModule.mutations[types.UNLOAD_SLACK_WEBHOOK_OBJECTS](state);

    expect(state.slack_webhooks).toStrictEqual([]);
  });

  test("has a correctly functioning 'types.UPDATE_CACHED_PROTOCOL_STEPS' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const data = [];

    stepsModule.mutations[types.UPDATE_CACHED_PROTOCOL_STEPS](state, data);

    expect(state.cache.steps).toStrictEqual(data);
  });

  test("has a correctly functioning 'types.RESET_STEPS' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));

    stepsModule.mutations[types.RESET_STEPS](state);

    expect(state.cache.steps).toStrictEqual([]);
  });

  test("has a correctly functioning 'types.DELETE_STEP' member", () => {
    const state = JSON.parse(JSON.stringify(sampleState));
    const id = 0;

    stepsModule.mutations[types.DELETE_STEP](state, id);

    expect(findDeep(state.cache.steps, id)).toBeNull();
  });
});
