<template>
  <div class="sign_in_card">
    <SignInView />
  </div>
</template>

<script>
import SignInView from "../components/views/SignInView";

/**
 * A component that renders the authentication page.
 */
export default {
  name: "AuthenticationPage",
  components: {
    SignInView,
  },
};
</script>

<style scoped>
.sign_in_card {
  justify-self: center;
  align-self: center;
}
</style>
