/* eslint-disable no-undef */
import React from "react";
import renderer from "react-test-renderer";
import AgentSummary from "./index";

describe("AgentSummary", () => {
  const componentProps = {
    avatarUrl: "demo_avatar_url.jpg",
    firstName: "shil",
    lastName: "last",
    averageRating: 3.1
  };
  const componentJSX = <AgentSummary {...componentProps} />;

  describe("Component Snapshot", () => {
    const componentSnapshot = renderer.create(componentJSX).toJSON();
    it("should match existing snapshot", () => {
      expect(componentSnapshot).toMatchSnapshot();
    });
  });
});
