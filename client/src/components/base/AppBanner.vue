<template>
  <div class="app-banner__grid">
    <div :class="dark ? 'app-banner--dark' : 'app-banner--light'">
      <img
        v-if="showImage && dark"
        alt="EnginZyme Logo"
        src="../../assets/logo_dark.svg"
      />
      <img
        v-if="showImage && !dark"
        alt="EnginZyme Logo"
        src="../../assets/logo_light.svg"
      />
      <span class="app-banner__app-name">OPiDi</span>
      <span class="app-banner__app-version">{{ version }}</span>
    </div>
  </div>
</template>

<script>
import appData from "../../../package.json";
/**
 * A component that renders the app banner.
 */
export default {
  name: "AppBanner",
  props: {
    /**
     * The color theme of the banner.
     */
    dark: {
      type: Boolean,
      default: false,
    },
    /**
     * Determines if the log will be present in the render or not.
     */
    showImage: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      /**
       * The version of the application.
       */
      version: appData.version,
    };
  },
};
</script>

<style scoped>
.app-banner__app-name {
  margin-left: 1em;
  font-style: normal;
  font-weight: 1000;
  font-size: 20px;
}
.app-banner__app-version {
  margin-left: 0.5em;
  font-size: 10px;
  font-weight: 700;
}
.app-banner--dark {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #070b1f;
  opacity: 1;
}
.app-banner--light {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #ffffff;
  opacity: 1;
}
.app-banner__grid {
  display: grid;
  align-items: center;
}
</style>
