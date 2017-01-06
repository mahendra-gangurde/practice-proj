import "babel-polyfill";
import React from "react";
import {render} from "react-dom";
import {Router, browserHistory} from "react-router";
import routes from "./routes";
import * as courseActions from './actions/courseAction';
import * as auhtorActions from './actions/authorAction';
import './styles/styles.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/toastr/build/toastr.min.css";
import {Provider} from 'react-redux';
import configureStore  from './store/configureStore';

const store =configureStore();
store.dispatch(courseActions.loadCourses());
store.dispatch(auhtorActions.loadAuthors());

render(
        <Provider store={store}>
          <Router history={browserHistory}  routes={routes}/>
        </Provider>,
        document.getElementById('app')
);
