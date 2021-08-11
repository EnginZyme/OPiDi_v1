import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import StepCardsView from "@/components/views/StepCardsView";

const localVue = createLocalVue();

localVue.use(Vuex);

const sampleList = null;
const sampleValue = [
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
  {
    type: "loop",
    name: "Loop (1)",
    id: 1,
    num_iterations: 3,
    substeps: [
      {
        type: "simple_transfer",
        name: "Simple Transfer (2)",
        id: 2,
        substeps: [],
        parameters: {
          pipette: "right_pipette",
          pipette_obj: {
            name: "(Right) Single Channel 300 uL - Gen 1",
            category: "right_pipette",
          },
          pipette_strategy: "",
          volumes: [100],
          volumes_string: "100",
          source: { slot_number: 5, slot_name: "reservoir_5", wells: ["A1"] },
          destination: {
            slot_number: 1,
            slot_name: "wellplate_1",
            wells: ["D6"],
          },
          liquidClass: "Default",
          liquidClassId: 0,
          tipsStrategy: "ECO",
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
  {
    type: "pause",
    name: "Pause (3)",
    id: 3,
    substeps: [],
    auto_resume: false,
    pause_time: 15,
  },
  {
    type: "array_transfer",
    name: "Array Transfer (8)",
    id: 8,
    substeps: [],
    parameters: {
      pipette: "right_pipette",
      pipette_obj: {
        name: "(Right) Single Channel 300 uL - Gen 1",
        category: "right_pipette",
      },
      pipette_strategy: "",
      array_map_filename: "demo.csv",
      source_var_map: {
        "buffer 1": {
          slot_name: "tuberack_2",
          slot_number: 2,
          wells: ["A3"],
          destinations: {
            destination_plate: { volumes: ["500", "0"], wells: ["A1", "B1"] },
          },
        },
        "buffer 2": {
          slot_name: "tuberack_2",
          slot_number: 2,
          wells: ["A4"],
          destinations: {
            destination_plate: { volumes: ["0", "500"], wells: ["A1", "B1"] },
          },
        },
        water: {
          slot_name: "reservoir_5",
          slot_number: 5,
          wells: ["A1"],
          destinations: {
            destination_plate: {
              volumes: ["1000", "1000"],
              wells: ["A1", "B1"],
            },
          },
        },
      },
      destination_var_map: {
        destination_plate: { slot_name: "wellplate_1", slot_number: 1 },
      },
      hasMapConflict: false,
      mappingComplete: true,
      array_map: [
        ["tuberack_2", "A3", "wellplate_1", "A1", "500"],
        ["tuberack_2", "A3", "wellplate_1", "B1", "0"],
        ["tuberack_2", "A4", "wellplate_1", "A1", "0"],
        ["tuberack_2", "A4", "wellplate_1", "B1", "500"],
        ["reservoir_5", "A1", "wellplate_1", "A1", "1000"],
        ["reservoir_5", "A1", "wellplate_1", "B1", "1000"],
      ],
      liquidClass: "Default",
      liquidClassId: 0,
      tipsStrategy: "ECO",
      offset: {
        source: 1,
        destination: 1,
        source_type: "Bottom",
        destination_type: "Bottom",
      },
    },
  },
  {
    type: "bioshake_3000t",
    name: "Bioshake 3000T (4)",
    id: 4,
    substeps: [],
    parameters: {
      speed: 1500,
      setpoint: 25,
      tempControl: false,
      cooldown: true,
      duration: 10,
      wait_for_stop: true,
      force_stop: false,
    },
  },
  {
    type: "slack_message",
    name: "Slack Message (5)",
    id: 5,
    substeps: [],
    channel: "",
    webhook: "",
    message: "",
    channel_object: {},
  },
];
const sampleProtocolEditorVariables = {
  stepsstepID: -1,
  stepsFormType: "",
  chosenLiquidClassID: "",
  locSeqID: "",
  locSeqCategory: "",
};

describe("shallowMounted StepCardsView", () => {
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      protocolEditorVariables: () => sampleProtocolEditorVariables,
    };

    store = new Vuex.Store({
      getters,
    });

    wrapper = shallowMount(StepCardsView, {
      store,
      localVue,
      propsData: {
        list: sampleList,
        value: sampleValue,
      },
    });
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
