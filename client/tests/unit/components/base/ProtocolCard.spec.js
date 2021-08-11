import { shallowMount } from "@vue/test-utils";
import ProtocolCard from "@/components/base/ProtocolCard";

const protocolName = "protocol-metadata-name";
const protocolDescription = "protocol-metadata-description";
const protocolAuthorName = "foo bar";

describe("shallowMounted Unverified ProtocolCard", () => {
  const sampleProtocol = {
    id: 3,
    protocol: {
      metadata: {
        name: protocolName,
        description: protocolDescription,
        author: {
          name: protocolAuthorName,
        },
        is_verified: false,
      },
    },
  };

  const wrapper = shallowMount(ProtocolCard, {
    propsData: {
      protocol: sampleProtocol,
    },
  });

  it("contains the set protocol name", () => {
    expect(wrapper.text()).toContain(protocolName);
  });

  it("contains the set protocol description", () => {
    expect(wrapper.text()).toContain(protocolDescription);
  });

  it("contains the set protocol author name", () => {
    expect(wrapper.text()).toContain(
      `${protocolAuthorName.split(" ")[0].charAt(0)}. ${
        protocolAuthorName.split(" ")[1]
      }`
    );
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("shallowMounted Verified ProtocolCard", () => {
  const sampleProtocol = {
    id: 3,
    protocol: {
      metadata: {
        name: protocolName,
        description: protocolDescription,
        author: {
          name: protocolAuthorName,
        },
        is_verified: true,
      },
    },
  };

  const wrapper = shallowMount(ProtocolCard, {
    propsData: {
      protocol: sampleProtocol,
    },
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
