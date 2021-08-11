import authModule from "@/store/modules/auth";
import types from "@/types";

describe("auth module getters", () => {
  const state = {
    user: {
      name: "",
      email: "",
      imageURL: "",
      isLoggedIn: false,
      aToken: "",
      tokenRefresher: () => {},
      tokenExpiryTime: 0,
    },
  };
  test("has correctly functioning 'userIsLoggedIn' member", () => {
    expect(authModule.getters.userIsLoggedIn(state)).toStrictEqual(
      state.user.isLoggedIn
    );
  });
  test("has correctly functioning 'userImageURL' member", () => {
    expect(authModule.getters.userImageURL(state)).toStrictEqual(state.user.imageURL);
  });
  test("has correctly functioning 'userName' member", () => {
    expect(authModule.getters.userName(state)).toStrictEqual(state.user.name);
  });
  test("has correctly functioning 'userEmail' member", () => {
    expect(authModule.getters.userEmail(state)).toStrictEqual(state.user.email);
  });
  test("has correctly functioning 'userAuthToken' member", () => {
    expect(authModule.getters.userAuthToken(state)).toStrictEqual(state.user.aToken);
  });
});

describe("auth module mutations", () => {
  types.DEREGISTER_USER;
  test("has correctly functioning 'types.REGISTER_USER' member", () => {
    const state = {
      user: {
        name: "",
        email: "",
        imageURL: "",
        isLoggedIn: false,
        aToken: "",
        tokenRefresher: () => {},
        tokenExpiryTime: 0,
      },
    };
    const newUser = {
      name: "name",
      email: "email",
      imageURL: "url",
      isLoggedIn: true,
      aToken: "uioiu",
      tokenRefresher: () => {},
      tokenExpiryTime: 0,
    };
    authModule.mutations[types.REGISTER_USER](state, newUser);
    expect(state.user.name).toStrictEqual(newUser.name);
    expect(state.user.email).toStrictEqual(newUser.email);
    expect(state.user.imageURL).toStrictEqual(newUser.imageURL);
    expect(state.user.isLoggedIn).toStrictEqual(newUser.isLoggedIn);
    expect(state.user.aToken).toStrictEqual(newUser.aToken);
    expect(state.user.tokenExpiryTime).toStrictEqual(newUser.tokenExpiryTime);
  });
  test("has correctly functioning 'types.DEREGISTER_USER' member", () => {
    const state = {
      user: {
        name: "name",
        email: "email",
        imageURL: "url",
        isLoggedIn: true,
        aToken: "uioiu",
        tokenRefresher: () => {},
        tokenExpiryTime: 0,
      },
    };
    authModule.mutations[types.DEREGISTER_USER](state);
    expect(state.user.name).toStrictEqual("");
    expect(state.user.email).toStrictEqual("");
    expect(state.user.imageURL).toStrictEqual("");
    expect(state.user.isLoggedIn).toStrictEqual(false);
    expect(state.user.aToken).toStrictEqual("");
    expect(state.user.tokenExpiryTime).toStrictEqual(0);
  });
});
