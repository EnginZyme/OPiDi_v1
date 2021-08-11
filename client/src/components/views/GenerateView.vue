<template>
  <div>
    <div class="generate_view">
      <div class="generate_view__header">
        <div class="generate_view__header__title">
          <span class="generate_view__header__title__text">Generate</span>
        </div>
      </div>
      <div class="generate_view__body">
        <div class="generate_view__body__header">
          <div class="generate_view__body__header__button_group">
            <ProgressSpinner
              class="spinner"
              strokeWidth="8"
              animationDuration=".5s"
              v-show="isGenerating || isPreviewing"
            />
            <Button
              label="Get Protocol Design File"
              class="base_button_white medium_button_"
              @click="exportProtocol"
            />
            <Button
              label="Preview Steps"
              class="base_button_white medium_button_"
              @click="simulateProtocol"
              :disabled="isPreviewing"
            />
            <Button
              label="Get Robot Protocol"
              class="base_button_white medium_button_"
              @click="generateProtocol"
              :disabled="isGenerating"
            />
          </div>
        </div>
        <div class="generate_view__body__simulation_view">
          <div class="generate_view__body__simulation_view__content">
            <ul
              class="generate_view__body__simulation_view__list"
              v-show="simulationTextArray.length >= 1"
            >
              <li v-for="(text, index) in simulationTextArray" :key="index">
                {{ text }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Axios from "axios";
import { saveAs } from "file-saver";
import { sendLogToLogStream } from "../../utils";
import { GENERATOR_API_URL as API_URL } from "../../urls";
import types from "../../types";

const stringify = require("json-stringify-pretty-compact");

/**
 * A component that renders the protocol generate view.
 */
export default {
  name: "GenerateView",
  data() {
    return {
      /**
       * The content of the protocol simulation display.
       */
      simulationTextArray: [],
      /**
       * Determines if the user can generate a protocol robot file (or not).
       */
      canGenerateProtocol: false,
      /**
       * Indicates if a protocol robot file is currently being generated.
       */
      isGenerating: false,
      /**
       * Indicates if a protocol simulation is currently being run.
       */
      isPreviewing: false,
    };
  },
  computed: {
    ...mapGetters(["cachedProtocol", "userName", "userEmail", "userAuthToken"]),
  },
  methods: {
    /**
     * Exports string data into a Python file.
     *
     * @param {string} textData - The said string data.
     * @param {string} filename - The name of the said Python file.
     */
    exportPythonFile(textData, filename) {
      let blob = new Blob([textData], {
        type: "text/plain;charset=utf-8;",
      });
      saveAs(blob, filename);
    },
    /**
     * Exports an object into a JSON file.
     *
     * @param {object} jsonData - The said object.
     * @param {string} filename - The name of the said JSON file.
     */
    exportJSONFile(jsonData, filename) {
      let blob = new Blob([stringify(jsonData, null, 2)], {
        type: "text/plain;charset=utf-8;",
      });
      saveAs(blob, filename);
    },
    /**
     * Exports a JSON representation of the protocol in the protocol editor.
     */
    exportProtocol() {
      let protocol = this.cachedProtocol.protocol;
      this.exportJSONFile(
        {
          metadata: protocol.metadata,
          deck: protocol.deck,
          steps: protocol.steps,
          liquid_classes: protocol.liquid_classes,
          sequences: protocol.sequences,
          stepCounter: protocol.stepCounter,
          sequenceCounter: protocol.sequenceCounter,
          liquidClassCounter: protocol.liquidClassCounter,
        },
        `${this.cachedProtocol.protocol.metadata.name
          .split(" ")
          .join("_")}.json`
      );
      this.$toast.add({
        severity: "info",
        summary: "Notification",
        detail: "Protocol Exported",
        life: 1700,
      });
    },
    /**
     * Returns a formatted copy of the simulation text array.
     */
    formatSimulationTextArray(arr) {
      const errorEntries = arr.filter((item) => item.startsWith("ERROR:"));
      if (errorEntries.length) {
        return errorEntries;
      }
      return arr;
    },
    /**
     * Generates the simulation output for the protocol in the protocol editor.
     */
    simulateProtocol() {
      const self = this;
      this.isPreviewing = true;
      let protocol = this.cachedProtocol.protocol;
      this.$store.dispatch(types.REFRESH_USER_REGISTRATION).then(() => {
        Axios.post(
          `${API_URL}/simulate/`,
          {
            protocol: {
              metadata: protocol.metadata,
              deck: protocol.deck,
              steps: protocol.steps,
              liquid_classes: protocol.liquid_classes,
              sequences: protocol.sequences,
              stepCounter: protocol.stepCounter,
              sequenceCounter: protocol.sequenceCounter,
              liquidClassCounter: protocol.liquidClassCounter,
            },
          },
          {
            headers: {
              Authorization: this.userAuthToken,
            },
          }
        ).then(
          (response) => {
            this.simulationTextArray = this.formatSimulationTextArray(
              response.data.simulation.split(/\r?\n/)
            );
            this.canGenerateProtocol = true;
            this.isPreviewing = false;
            this.$toast.add({
              severity: "info",
              summary: "Notification",
              detail: "Protocol Simulated",
              life: 1700,
            });
            sendLogToLogStream(
              JSON.stringify(
                JSON.parse(`{
                        "user": "${self.userEmail}",
                        "action": "PREVIEW",
                        "protocol_ID": "${self.cachedProtocol.id}",
                        "summary": "${self.userName} PREVIEWED Protocol with ID: ${self.cachedProtocol.id} without errors",
                        "errors": false
                      }`)
              ),
              this.userAuthToken
            );
          },
          (error) => {
            if (error.response) {
              if (error.response.status === 422) {
                this.simulationTextArray = error.response.data.simulation.split(
                  /\r?\n/
                );
              }
            }
            this.$toast.add({
              severity: "error",
              summary: "Notification",
              detail: "Protocol Simulation Failed",
              life: 1700,
            });
            sendLogToLogStream(
              JSON.stringify(
                JSON.parse(`{
                      "user": "${self.userEmail}",
                      "action": "PREVIEW",
                      "protocol_ID": "${self.cachedProtocol.id}",
                      "summary": "${self.userName} PREVIEWED Protocol with ID: ${self.cachedProtocol.id} with errors",
                      "errors": true
                    }`)
              ),
              this.userAuthToken
            );
            this.isPreviewing = false;
          }
        );
      });
    },
    /**
     * Generates the robot file for the protocol in the protocol editor.
     */
    generateProtocol() {
      if (!this.canGenerateProtocol) {
        this.$toast.add({
          severity: "warn",
          summary: "Notification",
          detail: "Kindly preview your steps first",
          life: 1700,
        });
        return;
      }
      const self = this;
      this.isGenerating = true;
      let protocol = this.cachedProtocol.protocol;
      this.$store.dispatch(types.REFRESH_USER_REGISTRATION).then(() => {
        Axios.post(
          `${API_URL}/generate/`,
          {
            protocol: {
              metadata: protocol.metadata,
              deck: protocol.deck,
              steps: protocol.steps,
              liquid_classes: protocol.liquid_classes,
              sequences: protocol.sequences,
              stepCounter: protocol.stepCounter,
              sequenceCounter: protocol.sequenceCounter,
              liquidClassCounter: protocol.liquidClassCounter,
            },
          },
          {
            headers: {
              Authorization: this.userAuthToken,
            },
          }
        ).then(
          (response) => {
            this.exportPythonFile(
              response.data.protocol,
              `${this.cachedProtocol.protocol.metadata.name
                .split(" ")
                .join("_")}.py`
            );
            this.isGenerating = false;
            this.$toast.add({
              severity: "info",
              summary: "Notification",
              detail: "Protocol Generated",
              life: 1700,
            });
            sendLogToLogStream(
              JSON.stringify(
                JSON.parse(`{
                        "user": "${self.userEmail}",
                        "action": "GENERATE",
                        "protocol_ID": "${self.cachedProtocol.id}",
                        "summary": "${self.userName} GENERATED Protocol with ID: ${self.cachedProtocol.id}",
                        "errors": false
                      }`)
              ),
              this.userAuthToken
            );
          },
          () => {
            this.$toast.add({
              severity: "error",
              summary: "Notification",
              detail: "Protocol Generation Failed",
              life: 1700,
            });
          }
        );
      });
    },
  },
};
</script>

<style type="scss" scoped>
.generate_view__header__title__text {
  font-weight: 600;
  font-size: 18px;
  color: #040716;
  margin-left: 32px;
}
.spinner {
  height: 29px;
  width: 29px;
}
.generate_view {
  min-height: 650px;
  min-width: 1000px;
  width: 95%;
  height: 90vh;
  align-self: center;
  justify-self: center;
  background: #efefff;
  box-shadow: 6px 6px 9px 4px rgba(0, 0, 0, 0.25),
    -10px -10px 9px 4px rgba(255, 255, 255, 0.25);
  border-radius: 5px;
  display: grid;
  direction: column;
  grid-template-rows: auto 1fr;
}
.generate_view__header {
  width: 1140;
  height: 48px;
  background: #efefff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: grid;
  align-content: center;
}
.generate_view__body {
  display: grid;
  grid-template-rows: auto 10fr;
  padding: 20px;
}
.generate_view__body__header {
  display: grid;
  justify-content: end;
}
.generate_view__body__header__button_group {
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-column-gap: 6px;
  width: 100%;
}
.generate_view__body__simulation_view {
  margin-top: 18px;
  padding-left: 16px;
  height: 70vh;
  overflow: auto;
  -webkit-user-select: text; /* Chrome all / Safari all */
  -moz-user-select: text; /* Firefox all */
  -ms-user-select: text; /* IE 10+ */
  user-select: text;
}
.generate_view__body__simulation_view__content {
  position: relative;
  height: auto;
  width: 100%;
}
.generate_view__body__simulation_view__list {
  color: #555;
  font-size: 16px;
  font-weight: 530;
  padding: 0;
  font-family: courier, monospace;
  border: 1px solid #dedede;
}
.generate_view__body__simulation_view__list li {
  list-style: none;
  border-bottom: 1px dotted #ccc;
  height: auto;
  padding: 10px;
  padding-left: 60px;
}
.generate_view__body__simulation_view__list li:hover {
  background-color: #ffffffaa;
  transition: all 0.2s;
  -webkit-transition: all 0.2s;
  -moz-transition: all 0.2s;
  -ms-transition: all 0.2s;
  -o-transition: all 0.2s;
}
.generate_view__body__simulation_view__content:before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 50px;
  background: radial-gradient(#55555599 6px, transparent 7px) repeat-y;
  background-size: 40px 40px;
  border-right: 3px solid #ffaa9f;
  box-sizing: border-box;
}
</style>
