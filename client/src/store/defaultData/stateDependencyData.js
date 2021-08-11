import types from "../../types";

/**
 * A getter that returns an array representation of the dependencies present in a newly created protocol
 * @returns {array} - An array representation of the dependencies present in a newly created protocol
 */
export function getDefaultStateDependencies() {
  return [
    {
      sink: "pipettes_card",
      sink_hash: "",
      sink_ppty: "left_tiprack",
      source: "slot",
      source_hash: "",
      atype: types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_LEFT_TIPRACKS,
    },
    {
      sink: "pipettes_card",
      sink_hash: "",
      sink_ppty: "right_tiprack",
      source: "slot",
      source_hash: "",
      atype: types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_RIGHT_TIPRACKS,
    },
  ];
}
