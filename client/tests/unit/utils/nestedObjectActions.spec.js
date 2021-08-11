import {
  findDeep,
  deleteDeep,
  duplicateDeep,
} from "@/utils/nestedObjectActions";

describe("findDeep util function", () => {
  test("finds root level object", () => {
    const testArray = [
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
              source: {
                slot_number: 5,
                slot_name: "reservoir_5",
                wells: ["A1"],
              },
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
    ];
    const obj = findDeep(testArray, 1);
    expect(obj).not.toBeNull();
    expect(obj.id).toBe(1);
  });
  test("finds object nested one level deep", () => {
    const testArray = [
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
              source: {
                slot_number: 5,
                slot_name: "reservoir_5",
                wells: ["A1"],
              },
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
    ];
    const obj = findDeep(testArray, 2);
    expect(obj).not.toBeNull();
    expect(obj.id).toBe(2);
  });
  test("finds object nested two levels deep", () => {
    const testArray = [
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
              source: {
                slot_number: 5,
                slot_name: "reservoir_5",
                wells: ["A1"],
              },
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
          {
            type: "loop",
            name: "Loop (1)",
            id: 3,
            num_iterations: 3,
            substeps: [
              {
                type: "simple_transfer",
                name: "Simple Transfer (2)",
                id: 4,
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
                  source: {
                    slot_number: 5,
                    slot_name: "reservoir_5",
                    wells: ["A1"],
                  },
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
        ],
      },
    ];
    const obj = findDeep(testArray, 4);
    expect(obj).not.toBeNull();
    expect(obj.id).toBe(4);
  });
});

describe("deleteDeep util function", () => {
  test("deletes root object", () => {
    let testArray = [
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
              source: {
                slot_number: 5,
                slot_name: "reservoir_5",
                wells: ["A1"],
              },
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
    ];
    testArray = deleteDeep(testArray, 1);
    const obj = findDeep(testArray, 1);
    expect(obj).toBeNull();
  });
  test("deletes object nested one level deep", () => {
    let testArray = [
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
              source: {
                slot_number: 5,
                slot_name: "reservoir_5",
                wells: ["A1"],
              },
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
    ];
    testArray = deleteDeep(testArray, 2);
    const obj = findDeep(testArray, 2);
    expect(obj).toBeNull();
  });
  test("deletes object nested two levels deep", () => {
    let testArray = [
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
              source: {
                slot_number: 5,
                slot_name: "reservoir_5",
                wells: ["A1"],
              },
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
          {
            type: "loop",
            name: "Loop (1)",
            id: 3,
            num_iterations: 3,
            substeps: [
              {
                type: "simple_transfer",
                name: "Simple Transfer (2)",
                id: 4,
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
                  source: {
                    slot_number: 5,
                    slot_name: "reservoir_5",
                    wells: ["A1"],
                  },
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
        ],
      },
    ];
    testArray = deleteDeep(testArray, 4);
    const obj = findDeep(testArray, 4);
    expect(obj).toBeNull();
  });
});

describe("duplicateDeep util function", () => {
  test("duplicates root object", () => {
    const testArray = [
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
              source: {
                slot_number: 5,
                slot_name: "reservoir_5",
                wells: ["A1"],
              },
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
    ];
    const obj = duplicateDeep(testArray, 1);
    expect(obj === {}).toBeFalsy();
  });
  test("duplicates object nested one level deep", () => {
    const testArray = [
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
              source: {
                slot_number: 5,
                slot_name: "reservoir_5",
                wells: ["A1"],
              },
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
    ];
    const obj = duplicateDeep(testArray, 2);
    expect(obj === {}).toBeFalsy();
  });
  test("duplicates object nested two levels deep", () => {
    const testArray = [
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
              source: {
                slot_number: 5,
                slot_name: "reservoir_5",
                wells: ["A1"],
              },
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
          {
            type: "loop",
            name: "Loop (1)",
            id: 3,
            num_iterations: 3,
            substeps: [
              {
                type: "simple_transfer",
                name: "Simple Transfer (2)",
                id: 4,
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
                  source: {
                    slot_number: 5,
                    slot_name: "reservoir_5",
                    wells: ["A1"],
                  },
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
        ],
      },
    ];
    const obj = duplicateDeep(testArray, 4);
    expect(obj === {}).toBeFalsy();
  });
});
