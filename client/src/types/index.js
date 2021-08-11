export default {
  // Authentication management
  REGISTER_USER: "REGISTER_USER",
  DEREGISTER_USER: "DEREGISTER_USER",
  REFRESH_USER_REGISTRATION: "REFRESH_USER_REGISTRATION",

  // Labware handling
  LOAD_LABWARES: "LOAD_LABWARES",
  LOAD_LABWARE_DEFINITION_OBJECTS: "LOAD_LABWARE_DEFINITION_OBJECTS",
  LOAD_LABWARE_OBJECTS: "LOAD_LABWARE_OBJECTS",
  LOAD_PIPETTE_OBJECTS: "LOAD_PIPETTE_OBJECTS",
  LOAD_SLACK_WEBHOOK_OBJECTS: "LOAD_SLACK_WEBHOOK_OBJECTS",
  UNLOAD_LABWARES: "UNLOAD_LABWARES",
  UNLOAD_LABWARE_DEFINITION_OBJECTS: "UNLOAD_LABWARE_DEFINITION_OBJECTS",
  UNLOAD_LABWARE_OBJECTS: "UNLOAD_LABWARE_OBJECTS",
  UNLOAD_PIPETTE_OBJECTS: "UNLOAD_PIPETTE_OBJECTS",
  UNLOAD_SLACK_WEBHOOK_OBJECTS: "UNLOAD_SLACK_WEBHOOK_OBJECTS",

  // Protocol handling
  LOAD_PROTOCOLS: "LOAD_PROTOCOLS",
  UNLOAD_PROTOCOLS: "UNLOAD_PROTOCOLS",
  VIEW_PROTOCOL: "VIEW_PROTOCOL",
  CREATE_PROTOCOL: "CREATE_PROTOCOL",
  DELETE_PROTOCOL: "DELETE_PROTOCOL",
  CLONE_PROTOCOL: "CLONE_PROTOCOL",
  UPDATE_PROTOCOL_CACHE: "UPDATE_PROTOCOL_CACHE",
  REGISTER_PROCOTOL_CACHE_CHANGE: "REGISTER_PROCOTOL_CACHE_CHANGE",
  RESET_PROTOCOL_CHANGE_REGISTER: "RESET_PROTOCOL_CHANGE_REGISTER",
  RESET_PROTOCOL_EDITOR_VARIABLES: "RESET_PROTOCOL_EDITOR_VARIABLES",
  RESET_PROTOCOL_CACHE: "RESET_PROTOCOL_CACHE",
  RESET_PROTOCOL_METADATA: "RESET_PROTOCOL_METADATA",
  SAVE_PROTOCOL_CACHE: "SAVE_PROTOCOL_CACHE",
  UPDATE_CACHED_PROTOCOL_DESCRIPTION: "UPDATE_CACHED_PROTOCOL_DESCRIPTION",
  UPDATE_CACHED_PROTOCOL_NAME: "UPDATE_CACHED_PROTOCOL_NAME",
  ADD_CACHED_PROTOCOL_DEPENDENCY_LINK: "ADD_CACHED_PROTOCOL_DEPENDENCY_LINK",
  DUPLICATE_CACHED_PROTOCOL_DEPENDENCY_LINK:
    "DUPLICATE_CACHED_PROTOCOL_DEPENDENCY_LINK",
  UPDATE_CACHED_PROTOCOL_DEPENDENCY_LINKS:
    "UPDATE_CACHED_PROTOCOL_DEPENDENCY_LINKS",
  RESET_CACHED_PROTOCOL_DEPENDENCY_LINKS:
    "RESET_CACHED_PROTOCOL_DEPENDENCY_LINKS",
  UPDATE_CACHED_PROTOCOL_METADATA: "UPDATE_CACHED_PROTOCOL_METADATA",
  UPDATE_CACHED_PROTOCOL_ID: "UPDATE_CACHED_PROTOCOL_ID",
  RESET_CACHED_PROTOCOL_ID: "RESET_CACHED_PROTOCOL_ID",
  UPDATE_CACHED_PROTOCOL_SHARED_STATUS: "UPDATE_CACHED_PROTOCOL_SHARED_STATUS",
  UPDATE_CACHED_PROTOCOL_VERIFICATION_STATUS:
    "UPDATE_CACHED_PROTOCOL_VERIFICATION_STATUS",
  UPDATE_CACHED_PROTOCOL_RETIREMENT_STATUS:
    "UPDATE_CACHED_PROTOCOL_RETIREMENT_STATUS",
  LOAD_CACHED_PROTOCOL_DEPENDENCY_LINKS:
    "LOAD_CACHED_PROTOCOL_DEPENDENCY_LINKS",

  // Location Sequence
  UPDATE_CACHED_PROTOCOL_SEQUENCE_COUNTER:
    "UPDATE_CACHED_PROTOCOL_SEQUENCE_COUNTER",
  UPDATE_CACHED_PROTOCOL_LOCATION_SEQUENCES:
    "UPDATE_CACHED_PROTOCOL_LOCATION_SEQUENCES",
  DELETE_CACHED_PROTOCOL_LOCATION_SEQUENCES:
    "DELETE_CACHED_PROTOCOL_LOCATION_SEQUENCES",
  UPDATE_LOCATION_SEQUENCE_VARIABLES: "UPDATE_LOCATION_SEQUENCE_VARIABLES",
  RESET_LOCATION_SEQUENCE_VARIABLES: "RESET_LOCATION_SEQUENCE_VARIABLES",
  CREATE_LOCATION_SEQUENCE: "CREATE_LOCATION_SEQUENCE",
  CREATE_LOCATION: "CREATE_LOCATION",
  UPDATE_LOCATION_SLOT_NAME: "UPDATE_LOCATION_SLOT_NAME",
  PUSH_LINKED_DEPENDENCY_CHANGE_TO_LOCATION_SLOT_NAME:
    "PUSH_LINKED_DEPENDENCY_CHANGE_TO_LOCATION_SLOT_NAME",
  UPDATE_LOCATION_WELLS: "UPDATE_LOCATION_WELLS",
  UPDATE_LOCATION_OFFSET_VALUE: "UPDATE_LOCATION_OFFSET_VALUE",
  UPDATE_LOCATION_OFFSET_TYPE: "UPDATE_LOCATION_OFFSET_TYPE",
  DELETE_LOCATION_SEQUENCE: "DELETE_LOCATION_SEQUENCE",
  DELETE_LOCATION: "DELETE_LOCATION",
  UPDATE_SEQUENCE_NAME: "UPDATE_SEQUENCE_NAME",
  RESET_LOCATION_SEQUENCES: "RESET_LOCATION_SEQUENCES",
  DUPLICATE_LOCATION_SEQUENCE: "DUPLICATE_LOCATION_SEQUENCE",
  DUPLICATE_LOCATION: "DUPLICATE_LOCATION",
  LOAD_LOCATION_DEPENDENCY_LINKS: "LOAD_LOCATION_DEPENDENCY_LINKS",

  // Liquid Class
  UPDATE_CACHED_PROTOCOL_LIQUID_CLASS_COUNTER:
    "UPDATE_CACHED_PROTOCOL_LIQUID_CLASS_COUNTER",
  UPDATE_CACHED_PROTOCOL_LIQUID_CLASSES:
    "UPDATE_CACHED_PROTOCOL_LIQUID_CLASSES",
  DELETE_CACHED_PROTOCOL_LIQUID_CLASSES:
    "DELETE_CACHED_PROTOCOL_LIQUID_CLASSES",
  UPDATE_LIQUID_CLASS_VARIABLES: "UPDATE_LIQUID_CLASS_VARIABLES",
  RESET_LIQUID_CLASS_VARIABLES: "RESET_LIQUID_CLASS_VARIABLES",
  CREATE_LIQUID_CLASS: "CREATE_LIQUID_CLASS",
  UPDATE_LIQUID_CLASS_NAME: "UPDATE_LIQUID_CLASS_NAME",
  UPDATE_LIQUID_CLASS_TOUCH_TIP: "UPDATE_LIQUID_CLASS_TOUCH_TIP",
  UPDATE_LIQUID_CLASS_BLOW_OUT: "UPDATE_LIQUID_CLASS_BLOW_OUT",
  UPDATE_LIQUID_CLASS_CARRY_OVER: "UPDATE_LIQUID_CLASS_CARRY_OVER",
  UPDATE_LIQUID_CLASS_AIR_GAP: "UPDATE_LIQUID_CLASS_AIR_GAP",
  UPDATE_LIQUID_CLASS_BLOWOUT_LOCATION: "UPDATE_LIQUID_CLASS_BLOWOUT_LOCATION",
  UPDATE_LIQUID_CLASS_MIX_BEFORE_REPS: "UPDATE_LIQUID_CLASS_MIX_BEFORE_REPS",
  UPDATE_LIQUID_CLASS_MIX_BEFORE_VOLUME:
    "UPDATE_LIQUID_CLASS_MIX_BEFORE_VOLUME",
  UPDATE_LIQUID_CLASS_MIX_AFTER_REPS: "UPDATE_LIQUID_CLASS_MIX_AFTER_REPS",
  UPDATE_LIQUID_CLASS_MIX_AFTER_VOLUME: "UPDATE_LIQUID_CLASS_MIX_AFTER_VOLUME",
  UPDATE_LIQUID_CLASS_ASPIRATE_RATE: "UPDATE_LIQUID_CLASS_ASPIRATE_RATE",
  UPDATE_LIQUID_CLASS_DISPENSE_RATE: "UPDATE_LIQUID_CLASS_DISPENSE_RATE",
  UPDATE_LIQUID_CLASS_BLOW_OUT_RATE: "UPDATE_LIQUID_CLASS_BLOW_OUT_RATE",
  DELETE_LIQUID_CLASS: "DELETE_LIQUID_CLASS",
  RESET_LIQUID_CLASSES: "RESET_LIQUID_CLASSES",
  DUPLICATE_LIQUID_CLASS: "DUPLICATE_LIQUID_CLASS",

  // Deck
  UPDATE_CACHED_PROTOCOL_DECK: "UPDATE_CACHED_PROTOCOL_DECK",
  DELETE_CACHED_PROTOCOL_DECK: "DELETE_CACHED_PROTOCOL_DECK",
  UPDATE_SLOT_NICKNAME: "UPDATE_SLOT_NICKNAME",
  UPDATE_LEFT_PIPETTE: "UPDATE_LEFT_PIPETTE",
  UPDATE_RIGHT_PIPETTE: "UPDATE_RIGHT_PIPETTE",
  UPDATE_LEFT_TIPRACKS: "UPDATE_LEFT_TIPRACKS",
  UPDATE_RIGHT_TIPRACKS: "UPDATE_RIGHT_TIPRACKS",
  PUSH_LINKED_DEPENDENCY_CHANGE_TO_LEFT_TIPRACKS:
    "PUSH_LINKED_DEPENDENCY_CHANGE_TO_LEFT_TIPRACKS",
  PUSH_LINKED_DEPENDENCY_CHANGE_TO_RIGHT_TIPRACKS:
    "PUSH_LINKED_DEPENDENCY_CHANGE_TO_RIGHT_TIPRACKS",
  ADD_LABWARE: "ADD_LABWARE",
  REMOVE_LABWARE_FROM_DECK_SLOT: "REMOVE_LABWARE_FROM_DECK_SLOT",
  RESET_DECK: "RESET_DECK",
  LOAD_LEFT_TIPRACKS_DEPENDENCY_LINKS: "LOAD_LEFT_PIPETTE_DEPENDENCY_LINKS",
  LOAD_RIGHT_TIPRACKS_DEPENDENCY_LINKS: "LOAD_RIGHT_PIPETTE_DEPENDENCY_LINKS",

  // Step
  UPDATE_CACHED_PROTOCOL_STEPS: "UPDATE_CACHED_PROTOCOL_STEPS",
  UPDATE_CACHED_PROTOCOL_STEP_COUNTER: "UPDATE_CACHED_PROTOCOL_STEP_COUNTER",
  DELETE_CACHED_PROTOCOL_STEPS: "DELETE_CACHED_PROTOCOL_STEPS",
  UPDATE_STEP_VARIABLES: "UPDATE_STEP_VARIABLES",
  RESET_STEP_VARIABLES: "RESET_STEP_VARIABLES",
  CREATE_STEP: "CREATE_STEP",
  DELETE_STEP: "DELETE_STEP",
  DUPLICATE_STEP: "DUPLICATE_STEP",
  RESET_STEPS: "RESET_STEPS",

  // Loop
  CREATE_LOOP_STEP: "CREATE_LOOP_STEP",
  UPDATE_LOOP_STEP_NAME: "UPDATE_LOOP_STEP_NAME",
  UPDATE_LOOP_NUMBER: "UPDATE_LOOP_NUMBER",

  // Pause
  CREATE_PAUSE_STEP: "CREATE_PAUSE_STEP",
  UPDATE_PAUSE_STEP_NAME: "UPDATE_PAUSE_STEP_NAME",
  UPDATE_PAUSE_TIME: "UPDATE_PAUSE_TIME",
  UPDATE_PAUSE_AUTORESUME: "UPDATE_PAUSE_AUTORESUME",

  // Array Transfer
  CREATE_ARRAY_TRANSFER_STEP: "CREATE_ARRAY_TRANSFER_STEP",
  UPDATE_ARRAY_TRANSFER_STEP_NAME: "UPDATE_ARRAY_TRANSFER_STEP_NAME",
  UPDATE_ARRAY_TRANSFER_PIPETTE: "UPDATE_ARRAY_TRANSFER_PIPETTE",
  UPDATE_ARRAY_TRANSFER_PIPETTE_STRATEGY:
    "UPDATE_ARRAY_TRANSFER_PIPETTE_STRATEGY",
  UPDATE_ARRAY_TRANSFER_TIPS_STRATEGY: "UPDATE_ARRAY_TRANSFER_TIPS_STRATEGY",
  UPDATE_ARRAY_TRANSFER_LIQUID_CLASS: "UPDATE_ARRAY_TRANSFER_LIQUID_CLASS",
  UPDATE_ARRAY_TRANSFER_SOURCE_OFFSET: "UPDATE_ARRAY_TRANSFER_SOURCE_OFFSET",
  UPDATE_ARRAY_TRANSFER_DESTINATION_OFFSET:
    "UPDATE_ARRAY_TRANSFER_DESTINATION_OFFSET",
  UPDATE_ARRAY_TRANSFER_SOURCE_OFFSET_TYPE:
    "UPDATE_ARRAY_TRANSFER_SOURCE_OFFSET_TYPE",
  UPDATE_ARRAY_TRANSFER_DESTINATION_OFFSET_TYPE:
    "UPDATE_ARRAY_TRANSFER_DESTINATION_OFFSET_TYPE",
  UPDATE_ARRAY_MAP_FILENAME: "UPDATE_ARRAY_MAP_FILENAME",
  UPDATE_ARRAY_MAP_PARSED_FILE: "UPDATE_ARRAY_MAP_PARSED_FILE",
  PUSH_LINKED_DEPENDENCY_CHANGE_TO_ARRAY_TRANSFER_LIQUID_CLASS:
    "PUSH_LINKED_DEPENDENCY_CHANGE_TO_ARRAY_TRANSFER_LIQUID_CLASS",
  PUSH_LINKED_DEPENDENCY_CHANGE_TO_ARRAY_TRANSFER_PIPETTE:
    "PUSH_LINKED_DEPENDENCY_CHANGE_TO_ARRAY_TRANSFER_PIPETTE",
  LOAD_ARRAY_TRANSFER_DEPENDENCY_LINKS:
    "LOAD_ARRAY_TRANSFER_DEPENDENCY_LINKS",
  UPDATE_ARRAY_SOURCE_VAR_MAP: "UPDATE_ARRAY_SOURCE_VAR_MAP",
  UPDATE_ARRAY_DESTINATION_VAR_MAP: "UPDATE_ARRAY_DESTINATION_VAR_MAP",
  UPDATE_ARRAY_MAP_SOURCE_VARIABLE_LABWARE:
    "UPDATE_ARRAY_MAP_SOURCE_VARIABLE_LABWARE",
  UPDATE_ARRAY_SOURCE_WELLS: "UPDATE_ARRAY_SOURCE_WELLS",
  UPDATE_ARRAY_MAP_DESTINATION_VARIABLE_LABWARE:
    "UPDATE_ARRAY_MAP_DESTINATION_VARIABLE_LABWARE",
  UPDATE_ARRAY_MAP: "UPDATE_ARRAY_MAP",
  CHECK_FOR_MAP_COMPLETENESS: "CHECK_FOR_MAP_COMPLETENESS",
  PUSH_LINKED_DEPENDENCY_CHANGE_TO_ARRAY_TRANSFER_SOURCE_VAR_MAP_SLOT:
    "PUSH_LINKED_DEPENDENCY_CHANGE_TO_ARRAY_TRANSFER_SOURCE_VAR_MAP_SLOT",
  PUSH_LINKED_DEPENDENCY_CHANGE_TO_ARRAY_TRANSFER_DESTINATION_VAR_MAP_SLOT:
    "PUSH_LINKED_DEPENDENCY_CHANGE_TO_ARRAY_TRANSFER_DESTINATION_VAR_MAP_SLOT",

  // Sequence Transfer
  CREATE_SEQUENCE_TRANSFER_STEP: "CREATE_SEQUENCE_TRANSFER_STEP",
  UPDATE_SEQUENCE_TRANSFER_STEP_NAME: "UPDATE_SEQUENCE_TRANSFER_STEP_NAME",
  UPDATE_SEQUENCE_TRANSFER_PIPETTE: "UPDATE_SEQUENCE_TRANSFER_PIPETTE",
  UPDATE_SEQUENCE_TRANSFER_PIPETTE_STRATEGY:
    "UPDATE_SEQUENCE_TRANSFER_PIPETTE_STRATEGY",
  UPDATE_SEQUENCE_TRANSFER_SOURCE_SEQUENCE:
    "UPDATE_SEQUENCE_TRANSFER_SOURCE_SEQUENCE",
  UPDATE_SEQUENCE_TRANSFER_DESTINATION_SEQUENCE:
    "UPDATE_SEQUENCE_TRANSFER_DESTINATION_SEQUENCE",
  UPDATE_SEQUENCE_TRANSFER_SOURCE_OFFSET:
    "UPDATE_SEQUENCE_TRANSFER_SOURCE_OFFSET",
  UPDATE_SEQUENCE_TRANSFER_DESTINATION_OFFSET:
    "UPDATE_SEQUENCE_TRANSFER_DESTINATION_OFFSET",
  UPDATE_SEQUENCE_TRANSFER_SOURCE_OFFSET_TYPE:
    "UPDATE_SEQUENCE_TRANSFER_SOURCE_OFFSET_TYPE",
  UPDATE_SEQUENCE_TRANSFER_DESTINATION_OFFSET_TYPE:
    "UPDATE_SEQUENCE_TRANSFER_DESTINATION_OFFSET_TYPE",
  UPDATE_SEQUENCE_TRANSFER_TIPS_STRATEGY:
    "UPDATE_SEQUENCE_TRANSFER_TIPS_STRATEGY",
  UPDATE_SEQUENCE_TRANSFER_LIQUID_CLASS:
    "UPDATE_SEQUENCE_TRANSFER_LIQUID_CLASS",
  UPDATE_SEQUENCE_TRANSFER_VOLUMES: "UPDATE_SEQUENCE_TRANSFER_VOLUMES",
  PUSH_LINKED_DEPENDENCY_CHANGE_TO_SEQUENCE_TRANSFER_SOURCE_SEQUENCE:
    "PUSH_LINKED_DEPENDENCY_CHANGE_TO_SEQUENCE_TRANSFER_SOURCE_SEQUENCE",
  PUSH_LINKED_DEPENDENCY_CHANGE_TO_SEQUENCE_TRANSFER_DESTINATION_SEQUENCE:
    "PUSH_LINKED_DEPENDENCY_CHANGE_TO_SEQUENCE_TRANSFER_DESTINATION_SEQUENCE",
  PUSH_LINKED_DEPENDENCY_CHANGE_TO_SEQUENCE_TRANSFER_LIQUID_CLASS:
    "PUSH_LINKED_DEPENDENCY_CHANGE_TO_SEQUENCE_TRANSFER_LIQUID_CLASS",
  PUSH_LINKED_DEPENDENCY_CHANGE_TO_SEQUENCE_TRANSFER_PIPETTE:
    "PUSH_LINKED_DEPENDENCY_CHANGE_TO_SEQUENCE_TRANSFER_PIPETTE",
  LOAD_SEQUENCE_TRANSFER_DEPENDENCY_LINKS:
    "LOAD_SEQUENCE_TRANSFER_DEPENDENCY_LINKS",

  // Simple transfer
  CREATE_SIMPLE_TRANSFER_STEP: "CREATE_SIMPLE_TRANSFER_STEP",
  UPDATE_SIMPLE_TRANSFER_STEP_NAME: "UPDATE_SIMPLE_TRANSFER_STEP_NAME",
  UPDATE_SIMPLE_TRANSFER_PIPETTE: "UPDATE_SIMPLE_TRANSFER_PIPETTE",
  UPDATE_SIMPLE_TRANSFER_PIPETTE_STRATEGY:
    "UPDATE_SIMPLE_TRANSFER_PIPETTE_STRATEGY",
  UPDATE_SIMPLE_TRANSFER_TIPS_STRATEGY: "UPDATE_SIMPLE_TRANSFER_TIPS_STRATEGY",
  UPDATE_SIMPLE_TRANSFER_LIQUID_CLASS: "UPDATE_SIMPLE_TRANSFER_LIQUID_CLASS",
  UPDATE_SIMPLE_TRANSFER_SOURCE_SLOT: "UPDATE_SIMPLE_TRANSFER_SOURCE_SLOT",
  UPDATE_SIMPLE_TRANSFER_DESTINATION_SLOT:
    "UPDATE_SIMPLE_TRANSFER_DESTINATION_SLOT",
  UPDATE_SIMPLE_TRANSFER_SOURCE_WELLS: "SIMPLE_TRANSFER_SOURCE_WELLS",
  UPDATE_SIMPLE_TRANSFER_DESTINATION_WELLS: "SIMPLE_TRANSFER_DESTINATION_WELLS",
  UPDATE_SIMPLE_TRANSFER_SOURCE_OFFSET: "UPDATE_SIMPLE_TRANSFER_SOURCE_OFFSET",
  UPDATE_SIMPLE_TRANSFER_DESTINATION_OFFSET:
    "UPDATE_SIMPLE_TRANSFER_DESTINATION_OFFSET",
  UPDATE_SIMPLE_TRANSFER_SOURCE_OFFSET_TYPE:
    "UPDATE_SIMPLE_TRANSFER_SOURCE_OFFSET_TYPE",
  UPDATE_SIMPLE_TRANSFER_DESTINATION_OFFSET_TYPE:
    "UPDATE_SIMPLE_TRANSFER_DESTINATION_OFFSET_TYPE",
  UPDATE_SIMPLE_TRANSFER_VOLUMES: "UPDATE_SIMPLE_TRANSFER_VOLUMES",
  PUSH_DEPENDENCY_LINK_CHANGE_TO_SIMPLE_TRANSFER_SOURCE_SLOT:
    "PUSH_DEPENDENCY_LINK_CHANGE_TO_SIMPLE_TRANSFER_SOURCE_SLOT",
  PUSH_DEPENDENCY_LINK_CHANGE_TO_SIMPLE_TRANSFER_DESTINATION_SLOT:
    "PUSH_DEPENDENCY_LINK_CHANGE_TO_SIMPLE_TRANSFER_DESTINATION_SLOT",
  PUSH_DEPENDENCY_LINK_CHANGE_TO_SIMPLE_TRANSFER_LIQUID_CLASS:
    "PUSH_DEPENDENCY_LINK_CHANGE_TO_SIMPLE_TRANSFER_LIQUID_CLASS",
  PUSH_DEPENDENCY_LINK_CHANGE_TO_SIMPLE_TRANSFER_PIPETTE:
    "PUSH_DEPENDENCY_LINK_CHANGE_TO_SIMPLE_TRANSFER_PIPETTE",
  LOAD_SIMPLE_TRANSFER_DEPENDENCY_LINKS:
    "LOAD_SIMPLE_TRANSFER_DEPENDENCY_LINKS",

  // Slack message
  CREATE_SLACK_MESSAGE_STEP: "CREATE_SLACK_MESSAGE_STEP",
  UPDATE_SLACK_MESSAGE_STEP_NAME: "UPDATE_SLACK_MESSAGE_STEP_NAME",
  UPDATE_SLACK_MESSAGE_MESSAGE: "UPDATE_SLACK_MESSAGE_MESSAGE",
  UPDATE_SLACK_MESSAGE_CHANNEL: "UPDATE_SLACK_MESSAGE_CHANNEL",

  // Timer
  CREATE_TIMER_STEP: "CREATE_TIMER_STEP",
  UPDATE_TIMER_STEP_NAME: "UPDATE_TIMER_STEP_NAME",
  UPDATE_TIMER_ELAPSED_TIME: "UPDATE_TIMER_ELAPSED_TIME",
  UPDATE_TIMER_ACTIONS: "UPDATE_TIMER_ACTIONS",

  // Bioshake
  CREATE_BIOSHAKE_STEP: "CREATE_BIOSHAKE_STEP",
  UPDATE_BIOSHAKE_STEP_NAME: "UPDATE_BIOSHAKE_STEP_NAME",
  UPDATE_BIOSHAKE_SPEED: "UPDATE_BIOSHAKE_SPEED",
  UPDATE_BIOSHAKE_SETPOINT: "UPDATE_BIOSHAKE_SETPOINT",
  UPDATE_BIOSHAKE_TEMPERATURE_CONTROL: "UPDATE_BIOSHAKE_TEMPERATURE_CONTROL",
  UPDATE_BIOSHAKE_COOLDOWN: "UPDATE_BIOSHAKE_COOLDOWN",
  UPDATE_BIOSHAKE_WAIT_FOR_STOP: "UPDATE_BIOSHAKE_WAIT_FOR_STOP",
  UPDATE_BIOSHAKE_FORCE_STOP: "UPDATE_BIOSHAKE_FORCE_STOP",
  UPDATE_BIOSHAKE_DURATION: "UPDATE_BIOSHAKE_DURATION",
};
