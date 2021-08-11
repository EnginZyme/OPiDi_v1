<template>
  <div class="sign_out_view">
    <div class="sign_out_view__group">
      <UserAvatarImage size="large" />
    </div>
    <div>
      <p class="sign_out_view__name_text">{{ userName }}</p>
      <p class="sign_out_view__email_text">{{ userEmail }}</p>
    </div>
    <div class="sign_out_view__group">
      <Button
        label="Sign Out"
        class="base_button medium_button_"
        @click="signOut"
      />
    </div>
  </div>
</template>

<script>
import UserAvatarImage from "../base/UserAvatarImage";
import { mapGetters } from "vuex";
import types from "../../types";

/**
 * A component that renders the sign-out view.
 */
export default {
  name: "SignOutView",
  components: {
    UserAvatarImage,
  },
  methods: {
    /**
     * Signs the current user out.
     */
    signOut() {
      let auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {});

      setTimeout(() => {
        this.$store.dispatch(types.DEREGISTER_USER).then(() => {
          // Redirect to "Authentication"
          this.$router.push({
            name: "Authentication",
          });
        });
      }, 1000);
    },
  },
  computed: {
    ...mapGetters(["userName", "userEmail"]),
  },
};
</script>

<style scoped>
.sign_out_view {
  display: grid;
  justify-content: center;
  padding-top: 8px;
  padding-bottom: 12px;
  width: 100%;
  height: 100%;
}
.sign_out_view__name_text {
  text-align: center;
  font-size: 18px;
  color: #000000;
}
.sign_out_view__email_text {
  text-align: center;
  font-size: 16px;
  color: #767676;
}
.sign_out_view__group {
  display: grid;
  justify-content: center;
}
</style>
