import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./redux/reducers/index";

const middleware = [thunk];
const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(...middleware),
        //Use after using reduct chrome devtool
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
    )
);
export default store;
