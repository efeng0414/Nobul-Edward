import { getAllBuyJobs } from "../jobs";
import { mockStore, getAction } from "../../../src/tests/reduxMock";
import { GET_ALL_BUY_JOBS_SUCCESS } from "../../types/jobs";

jest.mock("../../firebase/jobs", () => ({
  fetchAllBuyJobs: () => {
    return Promise.resolve({ val: () => ({ user: "123" }) });
  }
}));

describe("Jobs thunk", () => {
  it("Gets all buy jobs", async () => {
    const store = mockStore();
    store.dispatch(getAllBuyJobs());
    expect(await getAction(store, GET_ALL_BUY_JOBS_SUCCESS)).toEqual({
      type: GET_ALL_BUY_JOBS_SUCCESS,
      payload: { user: "123" }
    });
  });
});
