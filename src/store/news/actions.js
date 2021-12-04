import { API } from "../../utils/constants";

export const REQUEST_NEWS_LOADING = "NEWS::REQUEST_LOADING";
export const REQUEST_NEWS_FAILURE = "NEWS::REQUEST_FAILURE";
export const REQUEST_NEWS_SUCCESS = "NEWS::REQUEST_SUCCESS";

export const getNewsLoading = () => ({
    type: REQUEST_NEWS_LOADING,
});
export const getNewsSuccess = (news) => ({
    type: REQUEST_NEWS_SUCCESS,
    payload: news,
});
export const getNewsFailure = (error) => ({
    type: REQUEST_NEWS_FAILURE,
    payload: error,
});

export const getNews = () => async (dispatch) => {
    dispatch(getNewsLoading());

    try {
        const response = await fetch(API);

        if (!response.ok) {
            throw new Error("Response error");
        }

        const result = await response.json();

        dispatch(getNewsSuccess(result));
    } catch (error) {
        dispatch(getNewsFailure(error.message));
    }
};

export const foo = () => {
    throw new Error("New error");
};