import {
    foo,
    getNews,
    getNewsFailure,
    getNewsLoading,
    getNewsSuccess,
    REQUEST_NEWS_LOADING,
    REQUEST_NEWS_SUCCESS,
} from "../actions";

describe("getNewsLoading", () => {
    it("should return obj with certain type", () => {
        const expected = {
            type: REQUEST_NEWS_LOADING,
        };

        const received = getNewsLoading();

        expect(received).toEqual(expected);
    });
});

describe("getNewsSuccess", () => {
    it("should return obj with type and payload", () => {
        const payload = [];
        const expected = {
            type: REQUEST_NEWS_SUCCESS,
            payload,
        };

        const received = getNewsSuccess(payload);

        expect(received).toEqual(expected);
    });
});

describe("getNewsFailure", () => {
    it("should return obj with type and payload", () => {
        const payload = [];
        const expected = {
            type: REQUEST_NEWS_FAILURE,
            payload,
        };

        const received = getNewsFailure(payload);

        expect(received).toEqual(expected);
    });
});

describe("getNews", () => {
    it("dispatches getNewsLoading", () => {
        const mockDispatch = jest.fn();

        getNews()(mockDispatch);

        expect(mockDispatch).toHaveBeenCalledWith(getNewsLoading());
    });

    it("dispatches success action on successfull fetch", async () => {
        const result = { news: [] };
        fetch.mockResponseOnce(JSON.stringify(result));
        const mockDispatch = jest.fn();
        await getNews()(mockDispatch);

        expect(mockDispatch).toHaveBeenLastCalledWith(getNewsSuccess(result));
    });

    it("dispatches failure action on error in fetch", async () => {
        fetch.mockRejectOnce(new Error('test'));
        const mockDispatch = jest.fn();
        await getNews()(mockDispatch);

        expect(mockDispatch).toHaveBeenLastCalledWith(getNewsFailure('test'));
    });
});

it('throws error', () => {
    expect(() => foo()).toThrow();
})