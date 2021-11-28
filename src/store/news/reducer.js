import { REQUEST_STATUS } from "../../utils/constants";
import { REQUEST_NEWS_LOADING, REQUEST_NEWS_SUCCESS, REQUEST_NEWS_FAILURE } from "./actions";

const initialState = {
    newsList: [],
    request: {
        status: REQUEST_STATUS.IDLE,
        error: "",
    },
};

export const newsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case REQUEST_NEWS_LOADING:
            return {
                ...state,
                request: {
                    ...state.request,
                    status: REQUEST_STATUS.LOADING,
                },
            };
        case REQUEST_NEWS_SUCCESS:
            return {
                ...state,
                newsList: payload,
                request: {
                    error: "",
                    status: REQUEST_STATUS.SUCCESS,
                },
            };
        case REQUEST_NEWS_FAILURE:
            return {
                ...state,
                request: {
                    error: payload,
                    status: REQUEST_STATUS.FAILURE,
                },
            };
        default:
            return state;
    }
};