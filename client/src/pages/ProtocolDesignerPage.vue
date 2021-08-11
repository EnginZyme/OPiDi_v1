<template>
  <div class="main_container">
    <MainSidePanel />
    <router-view id="left_side_panel" name="LeftSidePanel" />
    <div class="secondary_container">
      <router-view id="top_nav_bar" name="TopNavBar" />
      <router-view id="display_view" name="DisplayView" />
    </div>
  </div>
</template>

<script>
import MainSidePanel from "../components/layout/MainSidePanel.vue";

/**
 * A component that renders the protocol designer page.
 */
export default {
  components: { MainSidePanel },
  name: "ProtocolDesignerPage",
  beforeCreate: function() {
    const userIsLoggedIn = this.$store.getters.userIsLoggedIn;

    if (!userIsLoggedIn)
      this.$router.push({
        name: "Authentication",
      });
  },
};
</script>

<style scoped>
.main_container {
  display: flex;
  flex-direction: row;
  align-items: stretch;
}
.secondary_container {
  display: flex;
  flex-direction: column;
  justify-items: stretch;
  width: 100%;
}
#display_view {
  display: grid;
  width: 100%;
  height: 100%;
  justify-content: stretch;
  align-content: stretch;
}
</style>
