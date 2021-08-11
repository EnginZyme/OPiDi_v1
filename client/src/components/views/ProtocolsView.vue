<template>
  <div>
    <div class="protocols_view">
      <div class="protocols_view__header">
        <div class="protocols_view__header__title">
          <span class="protocols_view__header__title__text">Protocols</span>
          <InputText
            type="text"
            placeholder="Search"
            class="protocols_view__header__title__input--search"
            v-model.lazy="searchString"
          />
        </div>
      </div>
      <div class="protocols_view__body">
        <div class="protocols_view__body__side_panel">
          <Button
            label="My Protocols"
            class="p-button-text small_font"
            :class="activeTab === 0 ? '' : 'p-button-secondary'"
            @click="renderUserProtocolsTab"
          />
          <Button
            label="Shared Protocols"
            class="p-button-text small_font"
            :class="activeTab === 1 ? '' : 'p-button-secondary'"
            @click="renderSharedProtocolsTab"
          />
        </div>
        <div class="protocols_view__body__main_view">
          <div
            class="protocols_view__body__main_view__scroll_panel"
            v-if="filteredProtocols.length"
          >
            <ProtocolCard
              v-for="protocol in filteredProtocols"
              :key="protocol.id"
              :protocol="protocol"
            />
          </div>
          <div class="protocols_view__body__main_view__empty_message" v-else>
            Sorry, no protocols here yet!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProtocolCard from "../base/ProtocolCard";
import { mapGetters } from "vuex";

/**
 * A component that renders the protocols view.
 */
export default {
  name: "ProtocolsView",
  components: {
    ProtocolCard,
  },
  data() {
    return {
      /**
       * Determines which protocols view tab is visible.
       */
      activeTab: 0,
      /**
       * The user protocol search input.
       */
      searchString: "",
    };
  },
  methods: {
    /**
     * Makes the user protocols tab visible.
     */
    renderUserProtocolsTab() {
      this.activeTab = 0;
    },
    /**
     * Makes the shared protocols tab visible.
     */
    renderSharedProtocolsTab() {
      this.activeTab = 1;
    },
    /**
     * Asserts that a string matches a list of search keywords.
     *
     * @param {array} searchKeys - The said search keywords.
     * @param {string} str - The said string.
     */
    assertKeywordsMatch(searchKeys, str) {
      for (let i = 0; i < searchKeys.length; i++) {
        if (!str.includes(searchKeys[i])) return false;
      }
      return true;
    },
    /**
     * Asserts that a protocol object matches a given search string.
     *
     * @param {string} searchString - The said search string.
     * @param {object} protocol - The said protocol object.
     */
    assertProtocolMatchesSearchString(searchString, protocol) {
      if (
        this.assertKeywordsMatch(
          searchString.toLowerCase().split(" "),
          protocol.protocol.metadata.name.toLowerCase()
        )
      )
        return true;
      if (
        this.assertKeywordsMatch(
          searchString.toLowerCase().split(" "),
          protocol.protocol.metadata.description.toLowerCase()
        )
      )
        return true;
      if (
        this.assertKeywordsMatch(
          searchString.toLowerCase().split(" "),
          protocol.protocol.metadata.author.name.toLowerCase()
        )
      )
        return true;
      if (
        this.assertKeywordsMatch(
          searchString.toLowerCase().split(" "),
          protocol.protocol.metadata.author.email.toLowerCase()
        )
      )
        return true;
    },
  },
  computed: {
    ...mapGetters(["userProtocols", "sharedProtocols"]),
    /**
     * Returns the appropriate list of protocols to be listed.
     */
    protocols() {
      if (this.activeTab === 0) return this.userProtocols;
      return this.sharedProtocols;
    },
    /**
     * Returns a list of protocols to be listed filtered by the user's search term(s).
     */
    filteredProtocols() {
      return this.protocols.filter((protocol) =>
        this.assertProtocolMatchesSearchString(this.searchString, protocol)
      );
    },
  },
};
</script>

<style type="scss" scoped>
.protocols_view__header__title__text {
  font-weight: 600;
  font-size: 18px;
  color: #040716;
  margin-left: 32px;
}
.protocols_view__header__title__input--search {
  background: #efefff;
  box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.25),
    inset -2px -2px 4px 3px rgba(255, 255, 255, 0.25),
    inset -2px -2px 4px 3px rgba(255, 255, 255, 0.25);
  border-radius: 6px;
  font-size: 14px;
  width: 352px;
  height: 32px;
  border: none;
  margin-left: 31px;
}
.protocols_view {
  min-width: 900px;
  height: 85vh;
  width: 90%;
  background: #efefff;
  box-shadow: 6px 6px 9px 4px rgba(0, 0, 0, 0.25),
    -10px -10px 9px 4px rgba(255, 255, 255, 0.25);
  border-radius: 5px;
  display: grid;
  justify-self: center;
  align-self: center;
  direction: column;
  grid-template-rows: auto 1fr;
}
.protocols_view__header {
  height: 48px;
  background: #efefff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: grid;
  align-content: center;
}
.protocols_view__body {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
}
.scroll_panel {
  width: 100px;
  height: 100px;
}
.protocols_view__body__main_view__scroll_panel {
  display: grid;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: minmax(210px, 22vh);
  grid-row-gap: 22px;
  grid-column-gap: max(22px, 1vw);
}
.protocols_view__body__main_view__empty_message {
  display: grid;
  height: 100%;
  align-content: center;
  justify-content: center;
  font-style: italic;
  font-weight: 350;
  font-size: 14px;
}
.protocols_view__body__main_view {
  padding-left: 16px;
  padding-right: 16px;
  width: 100%;
  height: 76vh;
  overflow: auto;
}
.protocols_view__body__side_panel {
  display: grid;
  direction: column;
  grid-template-rows: 30px 30px;
  margin-top: 53px;
  margin-left: 15px;
  grid-row-gap: 8px;
  grid-auto-columns: 170px;
  width: 200px;
}
.small_font {
  font-size: 12px;
  text-align: left;
  margin-left: 12px;
  margin-right: 2px;
}
</style>
