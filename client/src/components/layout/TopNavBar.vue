<template>
  <div>
    <div class="top_nav_bar">
      <div class="top_nav_bar__content">
        <div></div>
        <AppBanner :showImage="false" />
      </div>
    </div>
  </div>
</template>

<script>
import AppBanner from "../base/AppBanner";

/**
 * A component that renders the top navigation bar.
 */
export default {
  name: "TopNavBar",
  components: {
    AppBanner,
  },
};
</script>

<style scoped>
.top_nav_bar {
  height: 50px;
  background: rgb(23, 26, 46);
  background: linear-gradient(
    180deg,
    rgba(23, 26, 46, 0.9603991254705007) 0%,
    rgba(23, 26, 46, 1) 74%
  );
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  display: grid;
}
.top_nav_bar__content {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  margin-left: 28px;
  margin-right: 28px;
}
</style>
