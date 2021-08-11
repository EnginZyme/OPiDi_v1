<template>
  <div class="user_avatar_menu">
    <OverlayPanel
      ref="user_avatar_menu__overlay"
      appendTo="body"
      class="user_avatar_menu__overlay"
    >
      <SignOutView />
    </OverlayPanel>
    <div
      @click="toggleSignOutViewVisibility"
      aria:haspopup="true"
      id="user_avatar_menu__toggle_button"
    >
      <UserAvatarImage />
    </div>
  </div>
</template>

<script>
import UserAvatarImage from "./UserAvatarImage";
import SignOutView from "../views/SignOutView";

/**
 * A component to display the image of the authenticated user and to trigger the display of the
 * sign out view when clicked upon
 */
export default {
  name: "UserAvatarMenu",
  components: {
    UserAvatarImage,
    SignOutView,
  },
  methods: {
    /**
     * Triggers the opening/closing of the sign out view.
     * 
     * @param {object} event - User initiated toggle event.
     */
    toggleSignOutViewVisibility(event) {
      this.$refs.user_avatar_menu__overlay.toggle(event);
    },
  },
};
</script>

<style scoped>
.user_avatar_menu__overlay {
  background: #efefff;
  box-shadow: 2px 2px 9px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  width: 271px;
}
.user_avatar_menu {
  display: grid;
  align-content: center;
  cursor: pointer;
}
</style>
