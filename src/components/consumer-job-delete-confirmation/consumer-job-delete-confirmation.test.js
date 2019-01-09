import React from "react";
import renderer from "react-test-renderer";
import ConsumerJobDeleteConfirmation from "./index";

describe("ConsumerJobDeleteConfirmation", () => {
  const componentProps = {
    closeModal: () => {},
    deleteJob: () => {},
    jobType: "buy",
    jobId: "abc123",
    intl: global.getIntl()
  };
  const componentJSX = <ConsumerJobDeleteConfirmation {...componentProps} />;

  describe("Component Snapshot", () => {
    const componentSnapshot = renderer.create(componentJSX).toJSON();
    it("should match existing snapshot", () => {
      expect(componentSnapshot).toMatchSnapshot();
    });
  });

  describe("Component render", () => {
    const functionsToReset = ["clickHandle"];
    const componentPrototypeResets = functionsToReset.reduce(
      global.createComponentPrototypeResets({
        component: ConsumerJobDeleteConfirmation
      }),
      {}
    );
    const componentMount = Enzyme.mount(
      componentJSX,
      global.getIntlContext({ intl: componentProps.intl })
    );
    beforeEach(() => {
      functionsToReset.map(
        global.resetPropertyComponentProperty({
          component: ConsumerJobDeleteConfirmation,
          componentMount,
          componentPrototypeResets
        })
      );
    });
    it("should call clickHandle on buttonClick", () => {
      const mockClickHandle = jest.fn(() => Promise.resolve());
      componentMount.instance().clickHandle = mockClickHandle;
      componentMount.setProps({ a: 1 });
      componentMount
        .find(".modal-confirm-button")
        .find("Button")
        .simulate("click");
      expect(mockClickHandle).toHaveBeenCalled();
    });

    it("should call props.deleteJob when clickHandle is called", () => {
      const mockDeletejob = jest.fn(() => Promise.resolve());
      componentMount.setProps({ deleteJob: mockDeletejob });
      componentMount
        .find(".modal-confirm-button")
        .find("Button")
        .simulate("click");
      expect(mockDeletejob).toHaveBeenCalledWith({
        jobId: "abc123",
        jobType: "buy"
      });
    });
    it("should call closeModal function when clickHandle is called", async () => {
      const fakePromise = Promise;
      const mockCloseModal = jest.fn(() => fakePromise.resolve());
      componentMount.setProps({ closeModal: mockCloseModal });
      componentMount
        .find(".modal-confirm-button")
        .find("Button")
        .simulate("click");
      await Promise.all([fakePromise]);
      expect(mockCloseModal).toHaveBeenCalled();
    });
  });
});
