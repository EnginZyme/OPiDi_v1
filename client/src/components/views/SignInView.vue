<template>
  <section class="sign_in_view">
    <div class="sign_in_view__app_banner">
      <AppBanner dark />
    </div>
    <p class="sign_in_view__greeting">Hej!</p>
    <div
      id="google-signin-button"
      class="sign_in_view__sign_in_button g-signin2"
    ></div>
  </section>
</template>

<script>
import Vue from "vue";
import AppBanner from "../base/AppBanner";
import types from "../../types";

// Create a global observable to enable the window object to communicate back to the Vue instance
const userData = Vue.observable({
  data: {
    name: "",
    email: "",
    imageURL: "",
    isLoggedIn: false,
    atoken: "",
    tokenRefresher: () => {},
    tokenExpiryTime: 0,
  },
});

Object.defineProperty(Vue.prototype, "$userData", {
  get() {
    return userData.data;
  },

  set(value) {
    userData.data = value;
  },
});

// Callback function which mutates the userData Vue observable upon successful user log in
function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  userData.data = {
    name: profile.getName(),
    email: profile.getEmail(),
    imageURL: profile.getImageUrl(),
    aToken: googleUser.getAuthResponse().id_token,
    isLoggedIn: true,
    tokenRefresher: () => googleUser.reloadAuthResponse(),
    tokenExpiryTime: googleUser.getAuthResponse().expires_at,
  };
}

/**
 * A component that renders the sign-in view.
 */
export default {
  name: "SignInView",
  components: {
    AppBanner,
  },
  mounted: function() {
    // Registers a callback that is triggered when Google SSO sign-in is successful
    console.log(process.env.VUE_APP_GOOGLE_AUTH_ENABLED);
    if (process.env.VUE_APP_GOOGLE_AUTH_ENABLED !== "TRUE") {
      this.$store
        .dispatch(types.REGISTER_USER, {
          name: "Guest Visitor",
          email: "guest@acme.com",
          imageURL: "https://i.pravatar.cc/150?img=50",
          aToken: "tokenekot",
          isLoggedIn: true,
          tokenRefresher: () =>
            new Promise((resolve) => {
              resolve({
                id_token: "tokenoket",
                expires_at: 9999999999,
              });
            }),
          tokenExpiryTime: 9999999999,
        })
        .then(() => {
          this.$store.dispatch(types.LOAD_PROTOCOLS);
          this.$store.dispatch(types.LOAD_LABWARES);
          this.$store.dispatch(types.LOAD_SLACK_WEBHOOK_OBJECTS);
          // Redirect to "ProtocolDesignerPage"
          this.$router.push({
            name: "ProtocolDesignerPage",
          });
        });
    } else {
      window.gapi.load("auth2", () => {
        window.gapi.signin2.render("google-signin-button", {
          onsuccess: onSignIn,
        });
      });
    }
  },
  watch: {
    $userData() {
      if (userData.data.isLoggedIn) {
        setTimeout(() => {
          // Push the user data to the Vue store
          this.$store.dispatch(types.REGISTER_USER, userData.data).then(() => {
            this.$store.dispatch(types.LOAD_PROTOCOLS);
            this.$store.dispatch(types.LOAD_LABWARES);
            this.$store.dispatch(types.LOAD_SLACK_WEBHOOK_OBJECTS);
            // Redirect to "ProtocolDesignerPage"
            this.$router.push({
              name: "ProtocolDesignerPage",
            });
          });
        }, 1000);
      }
    },
  },
};
</script>

<style scoped>
.sign_in_view__app_banner {
  position: relative;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
}
.sign_in_view {
  display: flex;
  flex-direction: column;
  justify-items: center;
  width: 384px;
  height: 237px;

  box-shadow: -10px -10px 9px 4px rgba(255, 255, 255, 0.25),
    6px 6px 9px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
}
.sign_in_view__greeting {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  color: #767676;
  opacity: 1;
  margin-top: 32px;
  font-style: italic;
  font-weight: 600;
  font-size: 24px;
}
.sign_in_view__sign_in_button {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  margin-top: 16px;
}
</style>
