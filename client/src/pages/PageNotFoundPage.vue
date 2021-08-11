<template>
  <section class="message_container">
    <p class="error">404</p>
    <p class="greeting">Rough Day?</p>
    <Button
      label="Go Home"
      class="base_button medium_button_ go_home_button"
      @click="goHome"
    />
  </section>
</template>

<script>
/**
 * A component that renders the "404" page.
 */
export default {
  name: "PageNotFoundPage",
  methods: {
    goHome() {
      this.$router.push({ name: "Authentication" });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono");

.message_container {
  justify-self: center;
  align-self: center;
  display: grid;
  width: 384px;
  height: 237px;
  grid-template-rows: auto auto auto;
  box-shadow: -10px -10px 9px 4px rgba(255, 255, 255, 0.25),
    6px 6px 9px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
}
.error {
  font-family: "Roboto Mono", monospace;
  margin: 0px;
  padding: 0px;
  font-weight: 600;
  font-size: 40px;
  justify-self: center;
  align-self: center;
}
.greeting {
  justify-self: center;
  align-self: center;
  margin: 0px;
  color: #767676;
  opacity: 1;
  font-style: italic;
  font-weight: 600;
  font-size: 22px;
}
.go_home_button {
  justify-self: center;
  align-self: center;
}
</style>
