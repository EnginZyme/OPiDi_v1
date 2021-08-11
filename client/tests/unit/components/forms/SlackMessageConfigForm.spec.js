import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import SlackMessageConfigForm from "@/components/forms/SlackMessageConfigForm";

const localVue = createLocalVue();

localVue.use(Vuex);

const sampleFormType = "slack_message";
const sampleStepID = 5;
const sampleCachedProtocolSteps = [
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
const sampleNonTipRackLabwares = [
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
];
const sampleSlackWebhooks = [
  {
    webhook:
      "https://hooks.slack.com/services/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",
    channel: "opentrons05_hercules",
  },
];

describe("shallowMounted SlackMessageConfigForm", () => {
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      cachedProtocolSteps: () => sampleCachedProtocolSteps,
      nonTipRackLabwares: () => sampleNonTipRackLabwares,
      slackWebhooks: () => sampleSlackWebhooks,
    };

    store = new Vuex.Store({
      getters,
    });

    wrapper = shallowMount(SlackMessageConfigForm, {
      store,
      localVue,
      propsData: {
        formType: sampleFormType,
        stepID: sampleStepID,
      },
    });
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
