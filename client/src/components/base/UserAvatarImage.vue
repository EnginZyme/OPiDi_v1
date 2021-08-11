<template>
  <img
    :src="userImageURL"
    alt="Avatar"
    :class="['user-avatar-image', `user-avatar-image--${size}`]"
  />
</template>

<script>
import { mapGetters } from "vuex";

/**
 * A component to display the image of the authenticated user.
 */
export default {
  name: "UserAvatarImage",
  props: {
    /**
     * Determines the size of the rendered image.
     * 
     * @values small, large
     */
    size: {
      type: String,
      default: "small",
    },
  },
  computed: {
    ...mapGetters(["userImageURL"]),
  },
};
</script>

<style scoped>
.user-avatar-image {
  align-self: center;
  vertical-align: middle;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
.user-avatar-image--large {
  width: 80px;
  height: 80px;
}
</style>
