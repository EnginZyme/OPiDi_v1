<template>
  <div>
    <div class="protocol_side_panel">
      <div class="protocol_side_panel__grid">
        <span class="protocol_side_panel__title"> Protocol </span>
      </div>
      <div class="protocol_side_panel__button_group">
        <div class="protocol_side_panel__grid">
          <Button
            label="Explore"
            class="base_button large_button_"
            @click="openProtocolExploreView"
          />
          <Button
            label="Create New"
            class="base_button large_button_"
            @click="openProtocolCreationForm"
          />
        </div>
        <div class="protocol_side_panel__grid">
          <Button
            label="Import"
            class="base_button large_button_"
            @click="requestUploadFile"
            for="uploadmyfile"
          />
        </div>
        <input
          type="file"
          id="uploadmyfile"
          ref="uploadmyfile"
          @change="importProtocolFromFile"
          accept="application/json"
        />
      </div>
    </div>
  </div>
</template>

<script>
import types from "../../types";
import Ajv from "ajv"
import jsonSchema from "../../schemas/protocol.json"

/**
 * A component that renders the protocol side panel.
 */
export default {
  name: "ProtocolSidePanel",
  data() {
    return {
      /**
       * Validates JSON content against the protocol objects schema
       */
      protocolJSONValidator: () => {}
    }
  },
  beforeMount() {
    var ajv = new Ajv({schemaId: 'id'});
    this.protocolJSONValidator = ajv.compile(jsonSchema);
  },
  methods: {
    /**
     * Opens the protocol creation form.
     */
    openProtocolCreationForm() {
      this.$router.push("create");
    },
    /**
     * Opens the protocol explore view.
     */
    openProtocolExploreView() {
      this.$router.push("explore");
    },
    /**
     * Opens a protocol in the protocol editor.
     */
    viewProtocol(obj) {
      this.$store
        .dispatch(types.VIEW_PROTOCOL, {
          id: -1,
          protocol: obj,
        })
        .then(() => {
          this.$router.push(`protocol/imported/metadata`);
        })
        .catch(() => {
          this.$toast.add({
            severity: "error",
            summary: "Notification",
            detail: "Protocol Import Failed",
            life: 1700,
          });
        });
    },
    /**
     * Imports a protocol from a file into the protocol editor.
     */
    importProtocolFromFile() {
      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = JSON.parse(reader.result);
        
        if (this.protocolJSONValidator(fileContent)) {
          this.viewProtocol(fileContent);
        } else {
          this.$toast.add({
            severity: "error",
            summary: "Notification",
            detail: "Invalid Protocol File",
            life: 1700,
          });
        }
      };
      reader.readAsText(this.$el.querySelector("#uploadmyfile").files[0]);
      this.$refs.uploadmyfile.value = null;
    },
    requestUploadFile() {
      this.$refs.uploadmyfile.click();
    },
  },
};
</script>

<style scoped>
.protocol_side_panel__title {
  margin-top: 12px;
  font-size: 18px;
  font-weight: 600;
  color: #efefff;
}
#uploadmyfile {
  display: none;
}
.protocol_side_panel__grid {
  display: grid;
  flex-direction: column;
  justify-items: center;
  align-self: start;
  grid-gap: 12px;
}
.protocol_side_panel__button_group {
  display: grid;
  flex-direction: column;
  justify-items: center;
  margin-top: 25px;
  margin-bottom: 100px;
  align-self: stretch;
  grid-template-rows: 1fr auto;
}
.protocol_side_panel {
  background: #171a2e;
  height: 100%;
  width: 270px;
  display: grid;
  direction: column;
  grid-template-rows: 60px 1fr;
}
</style>
