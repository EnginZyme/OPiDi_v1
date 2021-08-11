<template>
  <div class="protocol-file-banner">
    <div class="protocol-file-banner__file-name">{{ cachedProtocolName }}</div>
    <div class="protocol-file-banner__author-name"> {{ cachedProtocolAuthor }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

/**
 * A component that renders and styles the name of the protocol and the name of the author as well.
 */
export default {
  name: "ProtocolFileBanner",
  computed: {
    ...mapGetters(["cachedProtocolAuthor", "cachedProtocolName"]),
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Cedarville+Cursive');

.protocol-file-banner {
    display: grid;
    width: 99%;
    grid-template-columns: 2fr auto;
    grid-column-gap: 10px;
    align-items: center;
}
.protocol-file-banner__file-name {
  color: #ffffff;
  font-size: 20px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.protocol-file-banner__author-name {
  color: #ffffff;
  font-size: 14px;
  text-align: end;
  font-family: 'Cedarville Cursive', cursive;;
}
</style>
