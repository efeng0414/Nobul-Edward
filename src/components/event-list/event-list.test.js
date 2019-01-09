import React from "react";
import EventListWrapped from "./index";
import toJson from "enzyme-to-json";

describe("EventList", () => {
  const { WrappedComponent: EventList } = EventListWrapped;
  const mockeventsThunk = jest.fn();
  const componentProps = {
    events: {
      abc123: { startTime: 9999999999999, status: "accepted" }
    },
    getEventThunk: mockeventsThunk,
    currentUser: {},
    title: "Buyer",
    eventsIsLoading: true,
    userId: "abc12"
  };
  const componentJSX = <EventList {...componentProps} />;
  const componentMount = Enzyme.shallow(componentJSX);

  describe("Component Snapshot", () => {
    it("should match stored snapshot", () => {
      expect(toJson(componentMount)).toMatchSnapshot();
    });
  });

  describe("ComponentDidMount", () => {
    it("should call props.getEventThunk on mount", () => {
      expect(mockeventsThunk).toHaveBeenCalledWith({
        userId: componentProps.userId
      });
    });
  });

  describe("Component Render", () => {
    it("should render eventsCount to be 1 for a valid status and startTime ", () => {
      expect(componentMount.find("EventListTitle").props().eventCount).toBe(1);
    });

    it("should render eventsCount to be 0 for an invalid status and startTime ", () => {
      componentMount.setProps({
        events: { abc12: { startTime: 123, status: "isDeleted" } }
      });
      expect(componentMount.find("EventListTitle").props().eventCount).toBe(0);
    });

    it("should render correct number of event list items", () => {
      componentMount.setProps({
        events: {
          abc123: { startTime: 9999999999999, status: "accepted" },
          xyz456: { startTime: 1535711160008, status: "deleted" }
        }
      });
      expect(componentMount.find("Connect(EventListItem)").length).toEqual(1);
    });
  });
});
