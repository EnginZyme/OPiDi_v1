<template>
  <div
    @click="openProtocolInEditor"
    :class="{
      'protocol-card': true,
      'protocol-card--verified': protocolIsVerified,
      'protocol-card--not-verified': !protocolIsVerified,
    }"
  >
    <p class="protocol-card__protocol-name">{{ protocolName }}</p>
    <p class="protocol-card__protocol-description">{{ protocolDescription }}</p>
    <p class="protocol-card__protocol-author">{{ protocolAuthorName }}</p>
  </div>
</template>

<script>
import types from "../../types";

/**
 * A component that renders information about a protocol on a card and allows
 * click events to load the protocol editor with the protocol's data.
 */
export default {
  name: "ProtocolCard",
  props: {
    /**
     * The protocol whose information is to be displayed on the card.
     */
    protocol: Object,
  },
  methods: {
    /**
     * Loads the protocol editor with the protocol's data.
     */
    openProtocolInEditor() {
      this.$store.dispatch(types.VIEW_PROTOCOL, this.protocol).then(() => {
        this.$router.push(`protocol/${this.protocol.id}/metadata`);
      });
    },
  },
  computed: {
    /**
     * A getter for the protocol object mapped to this component.
     */
    protocolObject() {
      return this.protocol.protocol;
    },
    /**
     * A getter for the name of the mapped protocol.
     */
    protocolName() {
      return this.protocolObject.metadata.name;
    },
    /**
     * A getter for the description of the mapped protocol.
     */
    protocolDescription() {
      return this.protocolObject.metadata.description;
    },
    /**
     * A getter for the name of the mapped protocol's author.
     */
    protocolAuthorName() {
      let splitNames = this.protocolObject.metadata.author.name.split(" ");
      return `${splitNames[0][0]}. ${splitNames[1]}`;
    },
    /**
     * A getter for the verification status of the mapped protocol.
     */
    protocolIsVerified() {
      return this.protocolObject.metadata.is_verified;
    },
  },
};
</script>

<style scoped>
.protocol-card--not-verified {
  border-left: 5px solid #c4c4c4;
}
.protocol-card--verified {
  border-left: 5px solid #1246a988;
}
.protocol-card {
  background: #efefff;
  box-shadow: 4px 4px 4px 2px rgba(255, 255, 255, 0.25),
    4px 4px 9px 2px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  padding: 20px 22px 10px 22px;
  display: grid;
  grid-row-gap: 10px;
  grid-template-rows: minmax(2em, auto) minmax(6.5em, auto) 1em;
  cursor: pointer;
}
.protocol-card:hover {
  box-shadow: 4px 4px 4px 2px rgba(255, 255, 255, 0.25),
    4px 4px 9px 2px #2196f377;
}
.protocol-card:active {
  border-top: thin solid #2196f377;
  border-right: thin solid #2196f377;
  border-bottom: thin solid #2196f377;
  border-left: 5px solid #2196f377;
}
.protocol-card__protocol-name {
  margin: 0;
  font-weight: 600;
  font-size: 12px;
  color: #040716;
  overflow: hidden;
  word-wrap: break-word;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.protocol-card__protocol-description {
  margin: 0;
  font-weight: 600;
  font-size: 9px;
  color: #040716;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 9;
  -webkit-box-orient: vertical;
}
.protocol-card__protocol-author {
  margin: 0;
  font-weight: 600;
  font-size: 8px;
  text-align: right;
  color: #767676;
}
</style>
