import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import "../../matchMedia";
// import WellSelectionForm from "@/components/forms/WellSelectionForm";

const localVue = createLocalVue();

localVue.use(Vuex);

// const sampleLabwareId = "test_slot_3_mL";
// const sampleValue = ["A1"];
// const sampleLabwareDefinitions = [
//   {
//     id: "test_slot_3_mL",
//     labware_def: {
//       ordering: [["A1"], ["A2"], ["A3"], ["A4"], ["A5"], ["A6"]],
//       brand: { brand: "Brand", brandId: ["six-well-reservoir"] },
//       metadata: {
//         displayName: "test slot 3 mL",
//         displayCategory: "reservoir",
//         displayVolumeUnits: "µL",
//         tags: [],
//       },
//       dimensions: { xDimension: 127.8, yDimension: 85.5, zDimension: 44 },
//       schemaVersion: 2,
//       version: 1,
//       namespace: "custom_beta",
//       wells: {
//         A1: {
//           depth: 40,
//           totalLiquidVolume: 50000,
//           shape: "rectangular",
//           xDimension: 18,
//           yDimension: 70,
//           x: 19,
//           y: 43,
//           z: 4,
//         },
//         A2: {
//           depth: 40,
//           totalLiquidVolume: 50000,
//           shape: "rectangular",
//           xDimension: 18,
//           yDimension: 70,
//           x: 37,
//           y: 43,
//           z: 4,
//         },
//         A3: {
//           depth: 40,
//           totalLiquidVolume: 50000,
//           shape: "rectangular",
//           xDimension: 18,
//           yDimension: 70,
//           x: 55,
//           y: 43,
//           z: 4,
//         },
//         A4: {
//           depth: 40,
//           totalLiquidVolume: 50000,
//           shape: "rectangular",
//           xDimension: 18,
//           yDimension: 70,
//           x: 73,
//           y: 43,
//           z: 4,
//         },
//         A5: {
//           depth: 40,
//           totalLiquidVolume: 50000,
//           shape: "rectangular",
//           xDimension: 18,
//           yDimension: 70,
//           x: 91,
//           y: 43,
//           z: 4,
//         },
//         A6: {
//           depth: 40,
//           totalLiquidVolume: 50000,
//           shape: "rectangular",
//           xDimension: 18,
//           yDimension: 70,
//           x: 109,
//           y: 43,
//           z: 4,
//         },
//       },
//       parameters: {
//         format: "irregular",
//         quirks: ["centerMultichannelOnWells", "touchTipDisabled"],
//         isTiprack: false,
//         isMagneticModuleCompatible: false,
//         loadName: "test_slot_3_mL",
//       },
//       groups: [
//         {
//           metadata: { wellBottomShape: "flat" },
//           wells: ["A1", "A2", "A3", "A4", "A5", "A6"],
//         },
//       ],
//       cornerOffsetFromSlot: { x: 0, y: 0, z: 0 },
//     },
//   },
// ];

//TODO
// describe("shallowMounted WellSelectionForm", () => {
//   let getters;
//   let store;
//   let wrapper;

//   beforeEach(() => {
//     getters = {
//       labwareDefinitions: () => sampleLabwareDefinitions,
//     };

//     store = new Vuex.Store({
//       getters,
//     });

//     wrapper = shallowMount(WellSelectionForm, {
//       store,
//       localVue,
//       propsData: {
//         labwareId: sampleLabwareId,
//         value: sampleValue,
//         shouldDisplayModal: true,
//       },
//     });
//   });

//   it("renders correctly", () => {
//     expect(wrapper.element).toMatchSnapshot();
//   });
// });

describe("placeholder test", () => {
  test("dummy test", () => {
    expect(2 + 2).toBe(4);
  });
});
