
import { REQUEST_STATUS } from "../../utils/constants";

export const selectNewsList = (state) => state.news.newsList;
export const selectNewsLoading = (state) => state.news.request.status === REQUEST_STATUS.LOADING;
export const selectNewsError = (state) => state.news.request.error;