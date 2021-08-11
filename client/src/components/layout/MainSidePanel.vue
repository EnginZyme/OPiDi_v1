<template>
  <div>
    <div class="function_nav_bar">
      <div class="function_nav_bar__grid">
        <img alt="EnginZyme Logo" src="../../assets/logo_light.svg" />
      </div>
      <div></div>
      <div class="function_nav_bar__grid">
        <UserAvatarMenu />
      </div>
    </div>
  </div>
</template>

<script>
import UserAvatarMenu from "../base/UserAvatarMenu";

/**
 * A component that renders the funciton navigation bar.
 */
export default {
  name: "MainSidePanel",
  components: {
    UserAvatarMenu,
  },
};
</script>

<style scoped>
.function_nav_bar__grid {
  display: grid;
  flex-direction: column;
  justify-items: center;
  align-self: center;
  grid-gap: 12px;
}
.function_nav_bar {
  background: #171a2e;
  height: 100%;
  width: 75px;
  display: grid;
  direction: column;
  grid-template-rows: 50px 1fr 70px;
  filter: drop-shadow(2px 2px 2px #040716);
}
</style>
