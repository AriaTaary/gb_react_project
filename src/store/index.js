import { createStore, combineReducers, compose, applyMiddleware } from "redux";

import { chatsReducer } from "./chats/reducer";
import { messagesReducer } from "./messages/reducer";
import { profileReducer } from "./profile/reducer";

import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const ce = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const config = {
    key: "gbRctMsngr",
    storage,
    blacklist: ["profile"],
};

const persistedReducer = persistReducer(
    config,
    combineReducers({
        chats: chatsReducer,
        messages: messagesReducer,
        profile: profileReducer,
    })
);

export const store = createStore(persistedReducer, ce(applyMiddleware(thunk)));
export const persistor = persistStore(store);
