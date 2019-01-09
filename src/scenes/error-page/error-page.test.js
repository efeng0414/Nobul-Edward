import React from "react";
import renderer from "react-test-renderer";
import ErrorPageWrapped from "./index";

describe("Error Page Container", () => {
  const { WrappedComponent: ErrorPage } = ErrorPageWrapped;

  const ravenMock = {
    watchObject: {
      lastEventIdCallCount: 0,
      showReportDialogCallCount: 0
    },
    createLastEventIdFunction: function({ returnValue }) {
      return () => {
        this.watchObject.lastEventIdCallCount += 1;
        return returnValue;
      };
    },
    lastEventId: null,
    showReportDialog: function() {
      this.watchObject.showReportDialogCallCount += 1;
    }
  };

  const componentProps = {
    intl: global.getIntl(),
    Raven: ravenMock
  };
  const componentJSX = <ErrorPage {...componentProps} />;

  const triggerErrorReportDialogSpy = jest.spyOn(
    ErrorPage.prototype,
    "triggerErrorReportDialog"
  );

  describe("Component Snapshot", () => {
    const componentSnapshot = renderer.create(componentJSX).toJSON();
    it("should match existing snapshot", () => {
      expect(componentSnapshot).toMatchSnapshot();
    });
  });

  describe("Component Render", () => {
    const componentMount = global.Enzyme.shallow(componentJSX);

    describe("triggerErrorReportDialog", () => {
      it("should check if there is an existing error", () => {
        ravenMock.lastEventId = ravenMock.createLastEventIdFunction({
          returnValue: false
        });

        componentMount.instance().triggerErrorReportDialog();

        expect(ravenMock.watchObject.lastEventIdCallCount).toBe(1);
      });

      it("should not call the showReportDialogFunction if there is an existing Error", () => {
        ravenMock.lastEventId = ravenMock.createLastEventIdFunction({
          returnValue: false
        });

        componentMount.instance().triggerErrorReportDialog();

        expect(ravenMock.watchObject.showReportDialogCallCount).toBe(0);
      });

      it("should call the showReportDialogFunction if there is an existing Error", () => {
        ravenMock.lastEventId = ravenMock.createLastEventIdFunction({
          returnValue: true
        });

        componentMount.instance().triggerErrorReportDialog();

        expect(ravenMock.watchObject.showReportDialogCallCount).toBe(1);
      });
    });

    describe("Card click event", () => {
      it("should trigger the triggerErrorReportDialog function", () => {
        triggerErrorReportDialogSpy.mockReset();
        componentMount.find(".error-card").simulate("click");
        expect(triggerErrorReportDialogSpy.mock.calls.length).toBe(1);
      });
    });
  });
});
