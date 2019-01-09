import React from "react";
import renderer from "react-test-renderer";
import { intlShape } from "react-intl";
import ConsumerJobItemWrapped from "./index";
import { BrowserRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { shape } from "prop-types";

describe("ConsumerJobItem", () => {
  const { WrappedComponent: ConsumerJobItem } = ConsumerJobItemWrapped;
  const componentProps = {
    intl: global.getCustomIntl({
      defaultTitle: "Default Title",
      editPostingTitle: "Edit posting",
      "offer.confirmation": "Confirm",
      proposals: "Proposals"
    }),
    job: {
      name: "austin",
      status: "open",
      description: "this is open",
      createdAt: new Date(2017, 11, 10),
      bathrooms: "",
      bedrooms: "",
      regions: [{ name: "austin" }],
      offerCount: 12,
      jobType: "buy",
      propertyType: "rental"
    },
    id: "123abc",
    deleteJob: () => {},
    updateJob: () => {}
  };

  const componentJSX = <ConsumerJobItem {...componentProps} />;

  describe("Component Render", () => {
    const router = {
      history: new BrowserRouter().history || "",
      route: {
        location: {},
        match: {}
      }
    };
    const mockStore = {
      subscribe: () => {},
      dispatch: () => {},
      getState: () => ({
        breakpoints: {
          currentBreakPoint: ""
        },
        authentication: {
          isLoading: false
        }
      })
    };
    const mockContext = {
      context: { intl: componentProps.intl, store: mockStore, router },
      childContextTypes: {
        intl: intlShape.isRequired,
        store: PropTypes.object,
        router: shape({})
      }
    };

    const functionsToReset = [
      "editTitle",
      "handleTitleSubmit",
      "closeEditModal",
      "deleteJobModalHandle",
      "closeConfirmationModal"
    ];
    const componentPrototypeResets = functionsToReset.reduce(
      global.createComponentPrototypeResets({ component: ConsumerJobItem }),
      {}
    );
    let componentMount = Enzyme.shallow(componentJSX, mockContext);

    beforeEach(() => {
      functionsToReset.map(
        global.resetPropertyComponentProperty({
          component: ConsumerJobItem,
          componentMount,
          componentPrototypeResets
        })
      );
      componentMount.setState({
        jobTitle: "",
        editModalVisible: false,
        resetTitleInput: false,
        confirmationModalVisible: false
      });
    });
    const mockEvent = {
      preventDefault: function() {
        this.preventDefaultCalled = true;
      },
      preventDefaultCalled: false
    };

    describe("Component Snapshot", () => {
      it("should match existing snapshot", () => {
        expect(componentMount).toMatchSnapshot();
      });
    });

    describe("closeEditModal", () => {
      it("should setState of when modal is closed", () => {
        const expectedstate = {
          editModalVisible: false,
          resetTitleInput: true
        };
        componentMount.instance().closeEditModal();
        expect(componentMount.state()).toMatchObject(expectedstate);
      });
    });

    describe("EditTitle", () => {
      it("should call editTitle on click", () => {
        const editTitleMock = jest.fn();
        componentMount.instance().editTitle = editTitleMock;
        componentMount.setProps({ a: 1 });
        componentMount
          .find("Item")
          .find("Icon")
          .at(0)
          .simulate("click", mockEvent);

        expect(editTitleMock).toBeCalled();
      });

      it("should call preventDefault on the event", () => {
        componentMount
          .find("Item")
          .find("Icon")
          .at(0)
          .simulate("click", mockEvent);

        expect(mockEvent.preventDefaultCalled).toBe(true);
      });

      it("should setState correctly on icon click", () => {
        const currentState = {
          editModalVisible: "yes",
          resetTitleInput: "false"
        };
        componentMount.setState({
          editModalVisible: currentState.editModalVisible,
          resetTitleInput: currentState.resetTitleInput
        });
        const expectedstate = {
          editModalVisible: true,
          resetTitleInput: false
        };
        componentMount
          .find("Item")
          .find("Icon")
          .at(0)
          .simulate("click", mockEvent);
        expect(componentMount.state()).toMatchObject(expectedstate);
      });
    });

    describe("deleteJobModalHandle", () => {
      it("should call deleteJobModalHandle on trash icon click", () => {
        const deleteJobModalHandleMock = jest.fn();
        componentMount.instance().deleteJobModalHandle = deleteJobModalHandleMock;
        componentMount.setProps({ b: 1 });
        componentMount.find("FaTrashO").simulate("click", mockEvent);

        expect(deleteJobModalHandleMock).toHaveBeenCalled();
      });

      it("should call preventDefault on the event", () => {
        componentMount.find("FaTrashO").simulate("click", mockEvent);
        expect(mockEvent.preventDefaultCalled).toBe(true);
      });

      it("should setState correctly on trash icon click", () => {
        const expectedstate = {
          confirmationModalVisible: true
        };
        componentMount.find("FaTrashO").simulate("click", mockEvent);

        expect(componentMount.state().confirmationModalVisible).toEqual(
          expectedstate.confirmationModalVisible
        );
      });
    });

    describe("handleTitleSubmit", () => {
      const newTitle = { NAME: "Test" };
      it("should call closeEditModal on submit", () => {
        const closeEditModalMock = jest.fn();
        componentMount.instance().closeEditModal = closeEditModalMock;
        componentMount.instance().handleTitleSubmit({ newTitle });

        expect(closeEditModalMock).toHaveBeenCalled();
      });

      it("should call props.updateJob when handleTitleSubmit is called", () => {
        const updateJobMock = jest.fn();
        componentMount.setProps({ updateJob: updateJobMock });
        const newTitle = { name: "Test" };
        const jobData = {
          jobType: componentProps.job.jobType,
          name: newTitle.name
        };
        componentMount.instance().handleTitleSubmit({ newTitle });
        expect(updateJobMock).toHaveBeenCalledWith({
          jobData,
          jobId: componentProps.id
        });
      });
    });

    describe("closeConfirmationModal", () => {
      it("should set state of confirmationModalVisible to false on closing modal", () => {
        const currentConfirmationModalVisible = "is true";
        componentMount.setState({
          confirmationModalVisible: currentConfirmationModalVisible
        });
        const expectedState = {
          confirmationModalVisible: false
        };
        componentMount.instance().closeConfirmationModal();

        expect(componentMount.state().confirmationModalVisible).toEqual(
          expectedState.confirmationModalVisible
        );
      });
    });
  });
});
