import Vue from "vue";
import VueRouter from "vue-router";
import ProtocolDesignerPage from "../pages/ProtocolDesignerPage";
import AuthenticationPage from "../pages/AuthenticationPage";
import PageNotFoundPage from "../pages/PageNotFoundPage";
import ProtocolSidePanel from "../components/layout/ProtocolSidePanel";
import ProtocolEditorSidePanel from "../components/layout/ProtocolEditorSidePanel";
import TopNavBar from "../components/layout/TopNavBar";
import ProtocolEditorTopNavBar from "../components/layout/ProtocolEditorTopNavBar";
import CreateProtocolForm from "../components/forms/CreateProtocolForm";
import ProtocolMetaDataForm from "../components/forms/ProtocolMetaDataForm";
import ProtocolsView from "../components/views/ProtocolsView";
import DeckSetupView from "../components/views/DeckSetupView";
import SequencesView from "../components/views/SequencesView";
import StepsView from "../components/views/StepsView";
import GenerateView from "../components/views/GenerateView";
import ConfigView from "../components/views/ConfigView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/create",
    name: "ProtocolDesignerPage",
    component: ProtocolDesignerPage,
    children: [
      {
        path: "create",
        components: {
          LeftSidePanel: ProtocolSidePanel,
          DisplayView: CreateProtocolForm,
          TopNavBar: TopNavBar,
        },
      },
      {
        path: "explore",
        components: {
          LeftSidePanel: ProtocolSidePanel,
          DisplayView: ProtocolsView,
          TopNavBar: TopNavBar,
        },
      },
      {
        path: "protocol/:id/metadata",
        components: {
          LeftSidePanel: ProtocolEditorSidePanel,
          DisplayView: ProtocolMetaDataForm,
          TopNavBar: ProtocolEditorTopNavBar,
        },
      },
      {
        path: "protocol/:id/deck",
        components: {
          LeftSidePanel: ProtocolEditorSidePanel,
          DisplayView: DeckSetupView,
          TopNavBar: ProtocolEditorTopNavBar,
        },
      },
      {
        path: "protocol/:id/sequences",
        components: {
          LeftSidePanel: ProtocolEditorSidePanel,
          DisplayView: SequencesView,
          TopNavBar: ProtocolEditorTopNavBar,
        },
      },
      {
        path: "protocol/:id/steps",
        components: {
          LeftSidePanel: ProtocolEditorSidePanel,
          DisplayView: StepsView,
          TopNavBar: ProtocolEditorTopNavBar,
        },
      },
      {
        path: "protocol/:id/generate",
        components: {
          LeftSidePanel: ProtocolEditorSidePanel,
          DisplayView: GenerateView,
          TopNavBar: ProtocolEditorTopNavBar,
        },
      },
      {
        path: "protocol/:id/config",
        components: {
          LeftSidePanel: ProtocolEditorSidePanel,
          DisplayView: ConfigView,
          TopNavBar: ProtocolEditorTopNavBar,
        },
      },
    ],
  },
  {
    path: "/auth",
    name: "Authentication",
    component: AuthenticationPage,
  },
  {
    path: "*",
    name: "PageNotFound",
    component: PageNotFoundPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
