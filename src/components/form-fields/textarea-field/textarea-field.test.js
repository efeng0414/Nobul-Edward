import React from "react";
import renderer from "react-test-renderer";
import { IntlProvider } from "react-intl";
import TextAreaFieldWrapped from "./index";

const { WrappedComponent: TextAreaField } = TextAreaFieldWrapped;

describe("TextAreaField Component", () => {
  const componentProps = {
    intl: global.getIntl(),
    form: {
      getFieldDecorator: config => jsx => jsx,
      setFieldsValue: () => {}
    },
    id: "Testing",
    initialValue: "TESTING",
    isTextArea: true
  };

  const componentJSX = <TextAreaField {...componentProps} />;

  describe("Component Snapshot", () => {
    const snapshotJSX = (
      <IntlProvider {...global.getIntl()}>{componentJSX}</IntlProvider>
    );

    it("should match stored snapshot", () => {
      const componentSnapshot = renderer.create(snapshotJSX).toJSON();

      expect(componentSnapshot).toMatchSnapshot();
    });
  });

  describe("Component Render", () => {
    const componentMount = global.Enzyme.mount(
      componentJSX,
      global.getIntlContext({ intl: componentProps.intl })
    );

    describe("check constraints on TextAreaField component", () => {
      it("should callback with an error message if value contains email(s)", () => {
        const mockValue = "Contact me directly at efeng@nobul.com";

        const watchObject = {
          errorMessageReceived: null
        };

        const mockCallback = errorMessage => {
          watchObject.errorMessageReceived = errorMessage;
        };

        componentMount
          .instance()
          .checkCustomConstraints(null, mockValue, mockCallback);

        expect(watchObject.errorMessageReceived).toBeTruthy();
      });

      it("should callback with an error message if value contains phone number(s)", () => {
        const mockValue = "Contact me directly at 123-123-1234";

        const watchObject = {
          errorMessageReceived: null
        };

        const mockCallback = errorMessage => {
          watchObject.errorMessageReceived = errorMessage;
        };

        componentMount
          .instance()
          .checkCustomConstraints(null, mockValue, mockCallback);

        expect(watchObject.errorMessageReceived).toBeTruthy();
      });

      it("should callback with an error message if value contains hyperlink(s)", () => {
        const mockValue = "Contact me at my website: edwardRealtor.ca";

        const watchObject = {
          errorMessageReceived: null
        };

        const mockCallback = errorMessage => {
          watchObject.errorMessageReceived = errorMessage;
        };

        componentMount
          .instance()
          .checkCustomConstraints(null, mockValue, mockCallback);

        expect(watchObject.errorMessageReceived).toBeTruthy();
      });

      it("should callback with an error message if value contains MLS number", () => {
        const mockValue = "Check out my other listing: E1234567";

        const watchObject = {
          errorMessageReceived: null
        };

        const mockCallback = errorMessage => {
          watchObject.errorMessageReceived = errorMessage;
        };

        componentMount
          .instance()
          .checkCustomConstraints(null, mockValue, mockCallback);

        expect(watchObject.errorMessageReceived).toBeTruthy();
      });

      it("should not callback with an error message if value passes all constraints", () => {
        const mockValue =
          "I've sold $15 million in total volume. Number #1 agent in Toronto 5 years straight";

        const watchObject = {
          errorMessageReceived: null
        };

        const mockCallback = errorMessage => {
          watchObject.errorMessageReceived = errorMessage;
        };

        componentMount
          .instance()
          .checkCustomConstraints(null, mockValue, mockCallback);

        expect(watchObject.errorMessageReceived).toBe(undefined);
      });

      it("should clean itself if value contains inappropriate words", () => {
        const mockValue = "Accept my offer, asshole";

        const watchObject = {
          newMessageReceived: null
        };

        let mockFn = jest.fn(values => {
          watchObject.errorMessageReceived =
            values[componentMount.instance().props.id];
        });

        componentMount.setProps({
          form: {
            getFieldDecorator: config => jsx => jsx,
            setFieldsValue: mockFn
          }
        });

        componentMount.instance().checkBadWords(null, mockValue, () => {});

        expect(mockFn).toHaveBeenCalled();
        //mockValue (inappropriate) vs. newMessageReceived (clean)
        expect(watchObject.newMessageReceived).not.toEqual(mockValue);
      });
    });
  });
});
